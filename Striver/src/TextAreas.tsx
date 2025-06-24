
import { useEffect, useState } from "react";
import { PlaceholdersAndVanishInput } from "./components/ui/placeholders-and-vanish-input";
import { GoogleGenAI } from "@google/genai";
import {Button} from "./components/ui/button"
import  supabase  from "./utils/supabase.ts";
import { useAuth0 } from "@auth0/auth0-react";
import Markdown from 'react-markdown'
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { toast } from "sonner"
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'
const key=import.meta.env.VITE_API_KEY
const ai = new GoogleGenAI({ apiKey: key });

export function Chat() {

  const placeholders = [
    "Most optimal approach for the 2-Sum problem?",
    "Explain to me Binary trees?",
    "How is popping an element from stack taking 0(1) TC?",
    "Find the errors in my code.",
    "Optimise my code."
  ];
   const[question,setQuestion]=useState<string|undefined>("")
   const[chatHistory,setChatHistory]=useState<Array<{ sender: string; message: string|undefined }>>([])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value)
  
  };
  
  const [reply,setReply]=useState<string|undefined>("")
  const [request,setRequest]=useState<string>("")
  const [saveq,setSaveq]=useState<number>(-1)
  const {user}=useAuth0()

  useEffect(()=>{
    const t=async () => {
      let n=chatHistory.length
      let botmsg=chatHistory[n-1];
      let usermsg=chatHistory[n-2];
      let {data:Userdata,error:Usererror}=await supabase.from('users').select('user_id').eq('id',user?.sub).single()
   
      if (!Userdata) {
  console.log("Userdata not found");
  return;
}
     else if(Usererror)
        console.log(Usererror)
  let uid=Userdata?.user_id
    let {data:usermesg,error:usererr}=await supabase.from('chatmessages').upsert([{...usermsg,user_id:uid}])
    let {data,error}=await supabase.from('chatmessages').upsert([{...botmsg,user_id:uid}])
   
    
   if(error || usererr) {
  console.log(error)
    }
  
  } 
  t()
}
,[chatHistory])

   useEffect(()=>{
    const t=async () => {
      let n=chatHistory.length
    
      let botmsg=chatHistory[n-1]?.message;
      let usermsg=chatHistory[n-2]?.message
      if(typeof usermsg=="string")
      usermsg=usermsg.replace(request,'').trim()
   let {data:Userdata,error:Usererror}=await supabase.from('users').select('user_id').eq('id',user?.sub).single()
   if (!Userdata) {
  console.log("Userdata not found");
  return;
}
     else if(Usererror)
        console.log(Usererror)
      let uid=Userdata?.user_id
          let {data,error}=await supabase.from('saved_questions').upsert([{question:usermsg,solution:botmsg,user_id:uid}])
  
   
   
    if(error)
  console.log(error)
  } 
  t()
}
,[saveq])

  const displaySave=()=> {
       toast("Saved solution", {
          description: "The solution has been saved.You can view it in Saved Questions",
        
        })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let finalquestion=request+question
    console.log("submitted");
    
   
    const getResponse=async ()=> {
      try {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: finalquestion,
     config: {
      thinkingConfig: {
        thinkingBudget: 0, 
      },
     
    }
  
  });
  
setReply(response.text)
setChatHistory([...chatHistory,{sender:'user',message:finalquestion},{sender:"bot",message:response.text}])


      }
    catch(e)
    {console.log(e)
    }
   
  }
   getResponse()
}
  return (
   
     
      <>
      
     {reply==='' ?(
      <>
       <div className="h-auto  flex flex-col justify-center  items-center px-4 w-screen self-center ">
          <h2 className="mb-10 sm:mb-10 text-xl text-center sm:text-4xl dark:text-white text-black ml-5">
     <TypingAnimation>How can I help you?</TypingAnimation>
      </h2>
     
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
        
      />
     
    
      <div className="flex flex-col sm:flex-row sm:gap-10  gap-2">
    <Button onClick={()=> setRequest('Optimise the following code:(give code also) ')} className="bg-orange-400  mt-8 h-9 rounded-2xl w-28 cursor-pointer">Optimise</Button>
        <Button onClick={()=> setRequest('Give a hint for this:')} className="bg-blue-400  mt-8 h-9 rounded-2xl w-28 cursor-pointer">Give hint</Button>
         <Button onClick={()=> setRequest('Give the most optimised solution for this(with code) ')} className="bg-red-400  mt-8 h-9 rounded-2xl w-28 cursor-pointer">Give solution</Button>
             <Button onClick={()=> setRequest('Debug this ')} className="bg-violet-400  mt-8 h-9 rounded-2xl w-28 cursor-pointer">Debug it</Button>
      </div>
   
      </div>
      
      </>
   )
      :<>
       <div className="max-h-screen  flex flex-col  items-center px-4 w-screen self-top">
      <h2 className="mb-10 sm:mb-20 text-xl mt-12 text-center font-serif sm:text-4xl dark:text-white text-black">
      Clear chat & ask more doubts :D
      </h2>
      
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />  <div className="flex  gap-10">
      <Button onClick={()=> setReply('')} className="bg-orange-400  mt-8 h-9 rounded-2xl w-28 cursor-pointer">Clear chat</Button>
      <Button onClick={()=> {
       displaySave()
       let n=Math.random()
       setSaveq(n)
      }} className="bg-green-400  mt-8 h-9 rounded-2xl w-28 cursor-pointer">Save solution</Button>
      </div>
       <div className="overflow-x-auto mb-10 sm:mb-20 text-xs font-sans sm:text-sm mt-8 dark:text-white text-black  text-left overflow-y-auto max-h-[50vh] whitespace-pre-wrap max-w-[90vw]">
                 <Markdown remarkPlugins={[remarkGfm]}
          children={reply}
          components={{
            code(props) {
              const {children, className, node, ...rest} = props
              const match = /language-(\w+)/.exec(className || '')
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  children={String(children).replace(/\n$/, '')}
                  language={match[1]}
                  style={dark}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              )
            }
          }}
        /> 
            
                </div>
      
      { /*<div className="mb-10 sm:mb-20 text-xs font-sans sm:text-sm mt-8 dark:text-white text-black  text-left overflow-y-auto max-h-[50vh] whitespace-pre-wrap">
      <Markdown>
          {reply}

      </Markdown>
      </div>
      */}
   
    
     
       
      </div>
       
     
      
  
   </>
}


</>

  )}

