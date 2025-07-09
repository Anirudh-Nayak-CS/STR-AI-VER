from fastapi import APIRouter,Depends
from sqlmodel import Session, select
from ..models.models import Answer
from ..db import get_session
from fastapi import Depends

router = APIRouter(prefix="/answers", tags=["Answers"])

@router.post("/postanswer", response_model=Answer)
def post_answer(answer:Answer,session: Session = Depends(get_session)):
    session.add(answer)
    session.commit()
    session.refresh(answer)
    return answer

@router.put("/{answer_id}", response_model=Answer)
def edit_answer(newanswer:Answer,answer_id: int, session: Session = Depends(get_session)):
    answer = session.get(Answer, answer_id)
    answer.content=newanswer.content
    session.add(answer)
    session.commit()
    session.refresh(answer)
    return answer

@router.delete("/{answer_id}", response_model=Answer)
def delete_answer(answer_id: int, session: Session = Depends(get_session)):
    answer = session.get(Answer, answer_id)
    session.delete(answer)
    session.commit()
    return answer
