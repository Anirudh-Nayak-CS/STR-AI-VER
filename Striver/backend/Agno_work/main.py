from agno.agent import Agent
from agno.knowledge.langchain import LangChainKnowledgeBase
from agno.models.google import Gemini
from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import os
from langchain_community.vectorstores.chroma import Chroma
from dotenv import load_dotenv
import shutil
import argparse
import os
from agno.memory.v2.db.postgres import PostgresMemoryDb
from agno.memory.v2.memory import Memory
from agno.storage.postgres import PostgresStorage
from textwrap import dedent



CHROMA_PATH = "chroma"
path="/home/anirudh-nayak/stack/STR-AI-VER/Striver/backend/.env"
load_dotenv(dotenv_path=path)

KEY=os.getenv('GEMINI_API_KEY')
if KEY is None:
    raise EnvironmentError("GEMINI_API_KEY not found in .env file!")
dburl=os.getenv('VITE_postgres_url')
if dburl is None:
    raise EnvironmentError("VITE_postgres_url not found in .env file!")


urls = ["https://roadmap.sh/typescript","https://roadmap.sh/javascript","https://roadmap.sh/datastructures-and-algorithms","https://www.geeksforgeeks.org/dsa/complete-roadmap-to-learn-dsa-from-scratch/""https://roadmap.sh/cpp", "https://roadmap.sh/python", "https://takeuforward.org/strivers-a2z-dsa-course/","https://leetcode.com/studyplan/top-interview-150/","https://www.geeksforgeeks.org/dsa/dsa-sheet-by-love-babbar/","https://learnyard.com/practice/dsa","https://neetcode.io/practice?tab=neetcode150%3Ftab%3Dneetcode150","https://leetcode.com/problem-list/oizxjoit/"]

loader=WebBaseLoader(urls)
documents=loader.load()

text_splitter=RecursiveCharacterTextSplitter(
   chunk_size=800,
   chunk_overlap=80,
   length_function=len,
   is_separator_regex=False,
)

chunks=text_splitter.split_documents(documents)
embeddings=GoogleGenerativeAIEmbeddings(
    model="models/embedding-001", 
    google_api_key=KEY)

db=Chroma(
  persist_directory=CHROMA_PATH,embedding_function=embeddings
)

def clear_database():
    if os.path.exists(CHROMA_PATH):
        shutil.rmtree(CHROMA_PATH)

parser = argparse.ArgumentParser()
parser.add_argument("--reset", action="store_true", help="Reset the database.")
args = parser.parse_args()
if args.reset:
    print("Clearing Database")
    clear_database()

def calculate_chunk_ids(chunks):
    # This will create IDs like "data/monopoly.pdf:6:2"
    # Page Source : Page Number : Chunk Index
    last_page_id = None
    current_chunk_index = 0
    for chunk in chunks:
        source = chunk.metadata.get("source")
        page = chunk.metadata.get("page")
        current_page_id = f"{source}:{page}"
        # If the page ID is the same as the last one, increment the index.
        if current_page_id == last_page_id:
            current_chunk_index += 1
        else:
            current_chunk_index = 0
        # Calculate the chunk ID.
        chunk_id = f"{current_page_id}:{current_chunk_index}"
        last_page_id = current_page_id
        # Add it to the page meta-data.
        chunk.metadata["id"] = chunk_id
    return chunks


# Calculate Page IDs.
chunks_with_ids = calculate_chunk_ids(chunks)

# Add or Update the documents.
existing_items = db.get(include=[])  # IDs are always included by default
existing_ids = set(existing_items["ids"])
print(f"Number of existing documents in DB: {len(existing_ids)}")

# Only add documents that don't exist in the DB.
new_chunks = []
for chunk in chunks_with_ids:
    if chunk.metadata["id"] not in existing_ids:
        new_chunks.append(chunk)

if len(new_chunks):
    print(f"Adding new documents: {len(new_chunks)}")
    new_chunk_ids = [chunk.metadata["id"] for chunk in new_chunks]
    db.add_documents(new_chunks, ids=new_chunk_ids)
else:
    print("No new documents to add")
   
retriever=db.as_retriever()
knowledge_base=LangChainKnowledgeBase(retriever=retriever)


memory = Memory(
   
    model=Gemini(id="gemini-2.0-flash-exp",api_key=KEY),
   
    db=PostgresMemoryDb(table_name="user_memory", db_url=dburl),

    delete_memories=False,
    clear_memories=False,
)

storage = PostgresStorage(
    table_name="agent_longterm_memory",  
    db_url=dburl,
)

agent=Agent(
    model=Gemini(id="gemini-2.0-flash-exp",api_key=KEY),
    markdown=True,
    knowledge=knowledge_base,
    description=dedent("""\
        You are highly skilled DSA tutor.You are expert in breaking down tough Data Structure And Algorithms(DSA) concepts into simple,easy to understand parts.You are also an expert in providing DSA Roadmaps based on the level of proficiency of the user (beginner,mediocre,advanced,expert etc..) in DSA.

       Your response should depend on the level of proficiency of user.If he/she is a beginner give easy explanations.If he/she is at an advanced level deep dive into the doubts/concepts they ask.
    """),
   instructions = dedent("""
    When a user asks a DSA-related question:
   
   1. First ask them their level of proficiency in DSA (e.g., brand new/beginner, intermediate,expert etc..).
                         
   2. If they ask for an explanation of concept:
     - Break the concept down in steps.
     - Use  examples to make it more clear.
     - Include  text-based diagrams if it enhances understanding.
   
   3. If they want a roadmap:
     - Ask about their goals (placement/interview prep , mastering DP or specific concept/concepts).
     - Create a structured weekly or topic-wise plan with checkpoints.
                         
   
   4. If they request a visual representation:
     - Use clean  diagrams to show how structures like trees,stacks,queues etc.. work.
   
   5. Always ask follow-up questions if their response is incomplete or vague.
                         
   6. Once ur done in the end of ur response do ask if they have any further questions or if they want a dry run/more examples.                      
   
   Focus on making the user understand rather than throwing some answer.
"""
),
    search_knowledge=True,
    memory=memory,
    storage=storage,
    enable_agentic_memory=True,
    add_datetime_to_instructions=False,
    add_history_to_messages=True,  
  
)
user_query=input("Enter your message:")
agent.print_response(user_query,show_full_reasoning=True,stream_intermediate_steps=True)

   