from fastapi import APIRouter,Depends,HTTPException,Security
from sqlmodel import Session, select
from models.models import Question,Answer
from db import get_session
from utils import verifyToken


router = APIRouter(prefix="/questions", tags=["Questions"])
auth=verifyToken()

@router.post("/postquestion", response_model=Question)
def create_question(question:Question,session: Session = Depends(get_session),auth_result: str = Security(auth.verify)):
    session.add(question)
    session.commit()
    session.refresh(question)
    return question

@router.get("/{question_id}", response_model=Question)
def get_question(question_id: int, session: Session = Depends(get_session)):
    question = session.get(Question, question_id)
    if not question:
            raise HTTPException(status_code=404, detail="Question not found")   
    return question


@router.put("/{question_id}", response_model=Question)
def edit_question(newquestion:Question,question_id: int, session: Session = Depends(get_session),auth_result: str = Security(auth.verify)):
    question = session.get(Question, question_id)
    if not question:
            raise HTTPException(status_code=404, detail="Question not found")     
    question.title=newquestion.title
    question.description=newquestion.description
    session.add(question)
    session.commit()
    session.refresh(question)
    return question

@router.get("/", response_model=Question)
def get_all_questions(session: Session = Depends(get_session)):
    questions = session.exec(select(Question)).all()
    if not questions:
            raise HTTPException(status_code=404, detail="Questions not found")    
    return questions

@router.get("/{question_id}/answers", response_model=Answer)
def get_all_answers(question_id:int,session: Session = Depends(get_session)):
    answers = session.exec(select(Answer).where(Answer.question_id==question_id)).all()
    if not answers:
            raise HTTPException(status_code=404, detail="Answers not found")    
    return answers

@router.delete("/{question_id}", response_model=Question)
def delete_question(question_id: int, session: Session = Depends(get_session),auth_result: str = Security(auth.verify)):
    question = session.get(Question, question_id)
    if not question:
            raise HTTPException(status_code=404, detail="Question not found")      
    session.delete(question)
    session.commit()
    return question