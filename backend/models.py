from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import uuid

# Settings Model
class Settings(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    birthday_date: str
    unlock_password: str
    girlfriend_name: str
    admin_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class SettingsUpdate(BaseModel):
    birthday_date: Optional[str] = None
    unlock_password: Optional[str] = None
    girlfriend_name: Optional[str] = None
    admin_password: Optional[str] = None

# Love Letter Model
class LoveLetter(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    content: str
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class LoveLetterUpdate(BaseModel):
    title: str
    content: str

# Message Model
class Message(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    message: str
    order: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)

class MessageCreate(BaseModel):
    title: str
    message: str

class MessageUpdate(BaseModel):
    title: Optional[str] = None
    message: Optional[str] = None

# Photo Model
class Photo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    url: str
    caption: str
    order: int = 0
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)

class PhotoUpdate(BaseModel):
    caption: str

# Admin Login
class AdminLogin(BaseModel):
    password: str

# Playlist Song
class Song(BaseModel):
    id: int
    title: str
    artist: str
    album: str
