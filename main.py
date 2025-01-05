from sqlalchemy import create_engine, Column, Integer, String, Float, Date
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import date

from fastapi import FastAPI, Depends, HTTPException
from typing import List, Optional

app = FastAPI()

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
    fighter = db.query(Fighter).filter(Fighter.id == id).first()
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