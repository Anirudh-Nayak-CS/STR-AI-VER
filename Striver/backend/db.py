from .models.models import *
from sqlmodel import SQLModel,create_engine,Session
import os

postgres_url=os.environ["VITE_POSTGRES_URL"]

engine=create_engine(postgres_url,echo=True)

def get_session():
  with Session(engine) as session:
    yield session 