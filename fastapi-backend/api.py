from sqlalchemy import create_engine, Column, Integer, String, Float, Date
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import date
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Query

from fastapi import FastAPI, Depends, HTTPException
from typing import List, Optional
import joblib

# Path to the model file
model_path = "fastapi-backend/models/model.pickle"

# Load the model
model = joblib.load(model_path)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Trusted origins (e.g., frontend URL)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)


DATABASE_URL = "postgresql://postgres:Leting61468126@127.0.0.1:5433/postgres"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Original fighters table
class Fighter(Base):
    __tablename__ = "fighters"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    height=Column(String, index=True)
    weight=Column(Float, index=True)
    reach=Column(Float, index=True)
    stance=Column(String, index=True)
    dob=Column(Date, index=True)
    slpm=Column(Float, index=True)
    stracc=Column(String, index=True)
    sapm=Column(Float, index=True)
    strdef=Column(String, index=True)
    tdavg=Column(Float, index=True)
    tdacc=Column(String, index=True)
    tddef=Column(String, index=True)
    subavg=Column(Float, index=True)
    record=Column(String, index=True)

# Modified fighters table that matches with the processed table
class FilteredFighters(Base):
    __tablename__ = "filtered_fighters"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    height=Column(String, index=True)
    weight=Column(Float, index=True)
    reach=Column(Float, index=True)
    stance=Column(String, index=True)
    dob=Column(Date, index=True)
    slpm=Column(Float, index=True)
    stracc=Column(String, index=True)
    sapm=Column(Float, index=True)
    strdef=Column(String, index=True)
    tdavg=Column(Float, index=True)
    tdacc=Column(String, index=True)
    tddef=Column(String, index=True)
    subavg=Column(Float, index=True)
    record=Column(String, index=True)

# Standardized fighter data that's ready for training
class Processed(Base):
    __tablename__ = "processed"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    height=Column(Float, index=True)
    weight=Column(Float, index=True)
    reach=Column(Float, index=True)
    slpm=Column(Float, index=True)
    stracc=Column(Float, index=True)
    sapm=Column(Float, index=True)
    strdef=Column(Float, index=True)
    tdavg=Column(Float, index=True)
    tdacc=Column(Float, index=True)
    tddef=Column(Float, index=True)
    subavg=Column(Float, index=True)
    win=Column(Float, index=True)
    draw=Column(Float, index=True)
    loss=Column(Float, index=True)

Base.metadata.create_all(bind=engine)

class FighterCreate(BaseModel):
    name: str
    height: str
    weight: float
    reach: float
    stance: str
    dob: date
    slpm: float
    stracc: str
    sapm: float
    strdef: str
    tdavg: float
    tdacc: str
    tddef: str
    subavg: float
    record: str

class FighterUpdate(BaseModel):
    name: Optional[str] = None
    height: Optional[str] = None
    weight: Optional[float] = None
    reach: Optional[float] = None
    stance: Optional[str] = None
    dob: Optional[date] = None
    slpm: Optional[float] = None
    stracc: Optional[str] = None
    sapm: Optional[float] = None
    strdef: Optional[str] = None
    tdavg: Optional[float] = None
    tdacc: Optional[str] = None
    tddef: Optional[str] = None
    subavg: Optional[float] = None
    record: Optional[str] = None

class FighterResponse(BaseModel):
    id: int
    name: Optional[str] = None
    height: Optional[str] = None
    weight: Optional[float] = None
    reach: Optional[float] = None
    stance: Optional[str] = None
    dob: Optional[date] = None
    slpm: Optional[float] = None
    stracc: Optional[str] = None
    sapm: Optional[float] = None
    strdef: Optional[str] = None
    tdavg: Optional[float] = None
    tdacc: Optional[str] = None
    tddef: Optional[str] = None
    subavg: Optional[float] = None
    record: Optional[str] = None

    class Config:
        from_attributes = True

class PredictionResponse(BaseModel):
    id: int
    name: str
    height: float
    weight: float
    reach: float
    slpm: float
    stracc: float
    sapm: float
    strdef: float
    tdavg: float
    tdacc: float
    tddef: float
    subavg: float
    win: float
    loss: float
    draw: float

# Create a new fighter
@app.post("/fighter/", response_model=FighterResponse)
def create_fighter(fighter: FighterCreate, db: Session = Depends(get_db)):
    db_fighter = Fighter(**fighter.model_dump())
    db.add(db_fighter)
    db.commit()
    db.refresh(db_fighter)
    return db_fighter

# Get a certain amount of fighters
@app.get("/fighters/", response_model=List[FighterResponse])
def read_fighters(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    fighters = db.query(Fighter).offset(skip).limit(limit).all()
    return fighters

# Get a fighter by id
@app.get("/fighter/{id}", response_model=FighterResponse)
def read_fighter(id: int, db: Session = Depends(get_db)):
    fighter = db.query(FilteredFighters).filter(FilteredFighters.id == id).first()
    if fighter is None:
        raise HTTPException(status_code=404, detail="User not found")
    return fighter

# Update a fighter
@app.put("/fighter/{id}", response_model=FighterResponse)
def update_fighter(id: int, fighter: FighterUpdate, db: Session = Depends(get_db)):
    db_fighter = db.query(Fighter).filter(Fighter.id == id).first()
    if db_fighter is None:
        raise HTTPException(status_code=404, detail="User not found")
    for field, value in fighter.model_dump().items():
        setattr(db_fighter, field, value)
    db.commit()
    db.refresh(db_fighter)
    return db_fighter

# Delete a fighter
@app.delete("/fighter/{id}", response_model=FighterResponse)
def delete_fighter(id: int, db: Session = Depends(get_db)):
    db_fighter = db.query(Fighter).filter(Fighter.id == id).first()
    if db_fighter is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_fighter)
    db.commit()
    return db_fighter

# Predict match outcome
@app.post("/predict/{ids}")
def predict(ids: str, db: Session = Depends(get_db)):
    fighter_ids = [int(x.strip()) for x in ids.split(",") if x.strip().isdigit()]
    print(fighter_ids)
    if not fighter_ids:
        raise HTTPException(status_code=400, detail="No valid fighter IDs provided.")
    if len(fighter_ids) != 2:
        raise HTTPException(status_code=400, detail="At least two fighters are required.")
    
    fighter1 = db.query(Processed).filter(Processed.id == fighter_ids[0]).first()
    fighter2 = db.query(Processed).filter(Processed.id == fighter_ids[1]).first()

    prediction = model.predict([[fighter1.height, fighter1.weight, fighter1.reach, fighter1.slpm, fighter1.stracc, fighter1.sapm, fighter1.strdef, fighter1.tdavg, fighter1.tdacc, fighter1.tddef, fighter1.subavg, fighter1.win, fighter1.loss, fighter1.draw,
            fighter2.height, fighter2.weight, fighter2.reach, fighter2.slpm, fighter2.stracc, fighter2.sapm, fighter2.strdef, fighter2.tdavg, fighter2.tdacc, fighter2.tddef, fighter2.subavg, fighter2.win, fighter2.loss, fighter2.draw]])
    
    prediction_list = prediction.tolist()

# returns the fighter id of the winner
    return {'Winner': fighter_ids[prediction_list[0] - 1]}