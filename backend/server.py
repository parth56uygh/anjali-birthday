from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Form, Depends, Header
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime
import shutil

# Load environment variables FIRST before other imports
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from models import (
    Settings, SettingsUpdate, LoveLetter, LoveLetterUpdate,
    Message, MessageCreate, MessageUpdate, Photo, PhotoUpdate,
    AdminLogin, Song
)
from auth import verify_password, get_password_hash, create_access_token, verify_token

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create uploads directory
UPLOAD_DIR = ROOT_DIR / "uploads" / "photos"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Auth dependency
async def get_current_admin(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith('Bearer '):
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token = authorization.replace('Bearer ', '')
    payload = verify_token(token)
    
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    return payload

# Initialize default data
async def initialize_data():
    # Check if settings exist
    settings = await db.settings.find_one()
    if not settings:
        default_settings = Settings(
            birthday_date="2026-02-04T00:00:00",
            unlock_password="love",
            girlfriend_name="Anjali",
            admin_password=get_password_hash("admin123")
        )
        await db.settings.insert_one(default_settings.dict())
        logger.info("Default settings created")
    
    # Check if love letter exists
    love_letter = await db.love_letters.find_one()
    if not love_letter:
        default_letter = LoveLetter(
            title="A Letter From My Heart",
            content="Dear Anjali,\\n\\nThis is a placeholder for your heartfelt message. You can edit this in the admin panel.\\n\\nHappy Birthday!\\n\\nWith all my love,\\nYour Love"
        )
        await db.love_letters.insert_one(default_letter.dict())
        logger.info("Default love letter created")
    
    # Check if messages exist
    message_count = await db.messages.count_documents({})
    if message_count == 0:
        default_messages = [
            Message(title="Why I Love You", message="You make every day brighter with your smile.", order=1),
            Message(title="Our First Memory", message="I'll never forget the first time we met.", order=2),
            Message(title="What Makes You Special", message="Your love for Taylor Swift, food, and makeup makes you uniquely you.", order=3),
            Message(title="Looking Forward", message="I can't wait to create more memories with you!", order=4)
        ]
        await db.messages.insert_many([m.dict() for m in default_messages])
        logger.info("Default messages created")

@app.on_event("startup")
async def startup_event():
    await initialize_data()

# Admin Authentication
@api_router.post("/admin/login")
async def admin_login(login: AdminLogin):
    settings = await db.settings.find_one()
    if not settings:
        raise HTTPException(status_code=500, detail="Settings not found")
    
    if not verify_password(login.password, settings['admin_password']):
        raise HTTPException(status_code=401, detail="Invalid password")
    
    token = create_access_token({"sub": "admin"})
    return {"success": True, "token": token}

# Settings Endpoints
@api_router.get("/settings")
async def get_settings():
    settings = await db.settings.find_one({}, {'birthday_date': 1, 'unlock_password': 1, 'girlfriend_name': 1})
    if not settings:
        raise HTTPException(status_code=404, detail="Settings not found")
    
    return {
        "birthday_date": settings['birthday_date'],
        "unlock_password": settings['unlock_password'],
        "girlfriend_name": settings['girlfriend_name']
    }

@api_router.put("/settings")
async def update_settings(settings_update: SettingsUpdate, admin = Depends(get_current_admin)):
    update_data = {k: v for k, v in settings_update.dict().items() if v is not None}
    
    if 'admin_password' in update_data:
        update_data['admin_password'] = get_password_hash(update_data['admin_password'])
    
    result = await db.settings.update_one({}, {"$set": update_data})
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Settings not found")
    
    return {"success": True, "message": "Settings updated"}

# Love Letter Endpoints
@api_router.get("/love-letter")
async def get_love_letter():
    love_letter = await db.love_letters.find_one()
    if not love_letter:
        raise HTTPException(status_code=404, detail="Love letter not found")
    
    return {
        "title": love_letter['title'],
        "content": love_letter['content']
    }

@api_router.put("/love-letter")
async def update_love_letter(letter_update: LoveLetterUpdate, admin = Depends(get_current_admin)):
    update_data = letter_update.dict()
    update_data['updated_at'] = datetime.utcnow()
    
    result = await db.love_letters.update_one({}, {"$set": update_data})
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Love letter not found")
    
    return {"success": True, "message": "Love letter updated"}

# Message Endpoints
@api_router.get("/messages")
async def get_messages():
    messages = await db.messages.find({}, {'id': 1, 'title': 1, 'message': 1, 'order': 1}).sort("order", 1).to_list(100)
    return [{
        "id": msg['id'],
        "title": msg['title'],
        "message": msg['message'],
        "order": msg.get('order', 0)
    } for msg in messages]

@api_router.post("/messages")
async def create_message(message: MessageCreate, admin = Depends(get_current_admin)):
    # Get max order
    max_order_msg = await db.messages.find_one(sort=[("order", -1)])
    next_order = (max_order_msg['order'] + 1) if max_order_msg else 1
    
    new_message = Message(**message.dict(), order=next_order)
    await db.messages.insert_one(new_message.dict())
    
    return {"success": True, "message": "Message created", "id": new_message.id}

@api_router.put("/messages/{message_id}")
async def update_message(message_id: str, message_update: MessageUpdate, admin = Depends(get_current_admin)):
    update_data = {k: v for k, v in message_update.dict().items() if v is not None}
    
    result = await db.messages.update_one({"id": message_id}, {"$set": update_data})
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    
    return {"success": True, "message": "Message updated"}

@api_router.delete("/messages/{message_id}")
async def delete_message(message_id: str, admin = Depends(get_current_admin)):
    result = await db.messages.delete_one({"id": message_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    
    return {"success": True, "message": "Message deleted"}

# Photo Endpoints
@api_router.get("/photos")
async def get_photos():
    photos = await db.photos.find({}, {'id': 1, 'url': 1, 'caption': 1, 'order': 1}).sort("order", 1).to_list(100)
    # Use APP_URL which Emergent provides, fallback to REACT_APP_BACKEND_URL for local dev
    backend_url = os.environ.get('APP_URL', os.environ.get('REACT_APP_BACKEND_URL', 'http://localhost:8001'))
    
    return [{
        "id": photo['id'],
        "url": f"{backend_url}{photo['url']}" if not photo['url'].startswith('http') else photo['url'],
        "caption": photo['caption'],
        "order": photo.get('order', 0)
    } for photo in photos]

@api_router.post("/photos/upload")
async def upload_photo(
    photo: UploadFile = File(...),
    caption: str = Form(...),
    admin = Depends(get_current_admin)
):
    # Validate file type
    if not photo.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    # Generate unique filename
    import uuid
    file_extension = photo.filename.split('.')[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = UPLOAD_DIR / unique_filename
    
    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(photo.file, buffer)
    
    # Get max order
    max_order_photo = await db.photos.find_one(sort=[("order", -1)])
    next_order = (max_order_photo['order'] + 1) if max_order_photo else 1
    
    # Save to database
    new_photo = Photo(
        url=f"/api/uploads/photos/{unique_filename}",
        caption=caption,
        order=next_order
    )
    await db.photos.insert_one(new_photo.dict())
    
    # Use APP_URL which Emergent provides, fallback to REACT_APP_BACKEND_URL for local dev
    backend_url = os.environ.get('APP_URL', os.environ.get('REACT_APP_BACKEND_URL', 'http://localhost:8001'))
    
    return {
        "success": True,
        "message": "Photo uploaded",
        "id": new_photo.id,
        "url": f"{backend_url}/api/uploads/photos/{unique_filename}"
    }

@api_router.put("/photos/{photo_id}")
async def update_photo(photo_id: str, photo_update: PhotoUpdate, admin = Depends(get_current_admin)):
    result = await db.photos.update_one({"id": photo_id}, {"$set": {"caption": photo_update.caption}})
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Photo not found")
    
    return {"success": True, "message": "Photo updated"}

@api_router.delete("/photos/{photo_id}")
async def delete_photo(photo_id: str, admin = Depends(get_current_admin)):
    photo = await db.photos.find_one({"id": photo_id})
    
    if not photo:
        raise HTTPException(status_code=404, detail="Photo not found")
    
    # Delete file if it's a local file
    if not photo['url'].startswith('http'):
        file_path = ROOT_DIR / photo['url'].lstrip('/')
        if file_path.exists():
            file_path.unlink()
    
    await db.photos.delete_one({"id": photo_id})
    
    return {"success": True, "message": "Photo deleted"}

# Playlist Endpoint
@api_router.get("/playlist")
async def get_playlist():
    playlist = [
        Song(id=1, title="Love Story", artist="Taylor Swift", album="Fearless"),
        Song(id=2, title="Blank Space", artist="Taylor Swift", album="1989"),
        Song(id=3, title="Shake It Off", artist="Taylor Swift", album="1989"),
        Song(id=4, title="You Belong With Me", artist="Taylor Swift", album="Fearless"),
        Song(id=5, title="Anti-Hero", artist="Taylor Swift", album="Midnights"),
        Song(id=6, title="Cruel Summer", artist="Taylor Swift", album="Lover"),
        Song(id=7, title="Willow", artist="Taylor Swift", album="evermore"),
        Song(id=8, title="Cardigan", artist="Taylor Swift", album="folklore"),
        Song(id=9, title="All Too Well", artist="Taylor Swift", album="Red"),
        Song(id=10, title="Style", artist="Taylor Swift", album="1989"),
    ]
    return [song.dict() for song in playlist]

# Include the router in the main app
app.include_router(api_router)

# Serve uploaded files
app.mount("/api/uploads", StaticFiles(directory=str(UPLOAD_DIR.parent)), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
