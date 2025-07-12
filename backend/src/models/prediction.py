from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
import os
from dotenv import load_dotenv

load_dotenv()

Base = declarative_base()

class Prediction(Base):
    __tablename__ = 'predictions'

    id = Column(Integer, primary_key=True)
    imagePath = Column(String(255), nullable=False)
    disease = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)
    confidence = Column(Float, nullable=False)
    createdAt = Column(DateTime, nullable=False, default=func.now())
    updatedAt = Column(DateTime, nullable=False, default=func.now(), onupdate=func.now())

# Create database engine
engine = create_engine(os.getenv('DATABASE_URL'))

# Create tables
Base.metadata.create_all(engine)