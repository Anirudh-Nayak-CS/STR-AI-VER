from fastapi import FastAPI, Depends
from sqlmodel import *
from db import engine
from contextlib import asynccontextmanager
from routes.answers import router as answers_router
from routes.questions import router as questions_router
from routes.users import router as users_router

@asynccontextmanager 
async def lifespan(app: FastAPI):
    SQLModel.metadata.create_all(engine)
    yield

app = FastAPI(lifespan=lifespan)
app.include_router(answers_router)
app.include_router(users_router)
app.include_router(questions_router)

@app.get('/')
def check():
    return "It's working"