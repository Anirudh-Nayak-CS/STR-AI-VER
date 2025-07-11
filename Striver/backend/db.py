from models.models import *
from sqlmodel import SQLModel,create_engine,Session
from config import get_settings 


postgres_url=get_settings().vite_postgres_url

engine=create_engine(postgres_url,echo=True)

def get_session():
  with Session(engine) as session:
    yield session 