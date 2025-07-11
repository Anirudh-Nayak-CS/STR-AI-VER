from fastapi import APIRouter,Depends,HTTPException,Security
from sqlmodel import Session, select
from models.models import Answer
from db import get_session
from fastapi import Depends
from utils import verifyToken

router = APIRouter(prefix="/answers", tags=["Answers"])
auth=verifyToken()

@router.post("/postanswer", response_model=Answer)
def post_answer(answer:Answer,session: Session = Depends(get_session),auth_result: str = Security(auth.verify)):
    session.add(answer)
    session.commit()
    session.refresh(answer)
    return answer

@router.put("/{answer_id}", response_model=Answer)
def edit_answer(newanswer:Answer,answer_id: int, session: Session = Depends(get_session),auth_result: str = Security(auth.verify)):
    answer = session.get(Answer, answer_id)
    if not answer:
            raise HTTPException(status_code=404, detail="Answer not found")     
    answer.content=newanswer.content
    session.add(answer)
    session.commit()
    session.refresh(answer)
    return answer

@router.delete("/{answer_id}", response_model=Answer)
def delete_answer(answer_id: int, session: Session = Depends(get_session),auth_result: str = Security(auth.verify)):
    answer = session.get(Answer, answer_id)
    if not answer:
          raise HTTPException(status_code=404, detail="Answer not found")      
    session.delete(answer)
    session.commit()
    return answer
