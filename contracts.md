# Backend Integration Contracts

## Overview
Building a full-stack birthday website with admin panel for managing content.

## API Endpoints

### Admin Authentication
- `POST /api/admin/login` - Login to admin panel
  - Body: `{ password: string }`
  - Response: `{ success: boolean, token: string }`

### Settings
- `GET /api/settings` - Get all settings (birthday date, unlock password)
- `PUT /api/settings` - Update settings
  - Body: `{ birthdayDate?: string, unlockPassword?: string, girlfriendName?: string }`

### Love Letter
- `GET /api/love-letter` - Get love letter
- `PUT /api/love-letter` - Update love letter
  - Body: `{ title: string, content: string }`

### Personal Messages
- `GET /api/messages` - Get all messages
- `POST /api/messages` - Create message
  - Body: `{ title: string, message: string }`
- `PUT /api/messages/:id` - Update message
- `DELETE /api/messages/:id` - Delete message

### Photos
- `GET /api/photos` - Get all photos
- `POST /api/photos/upload` - Upload photo (multipart/form-data)
  - Body: FormData with `photo` file and `caption` string
- `PUT /api/photos/:id` - Update photo caption
- `DELETE /api/photos/:id` - Delete photo

### Music Playlist
- `GET /api/playlist` - Get Taylor Swift playlist

## Database Models

### Settings
```javascript
{
  _id: ObjectId,
  birthdayDate: Date,
  unlockPassword: string,
  girlfriendName: string,
  adminPassword: string (hashed)
}
```

### LoveLetter
```javascript
{
  _id: ObjectId,
  title: string,
  content: string,
  updatedAt: Date
}
```

### Message
```javascript
{
  _id: ObjectId,
  title: string,
  message: string,
  order: number,
  createdAt: Date
}
```

### Photo
```javascript
{
  _id: ObjectId,
  url: string (stored file path or URL),
  caption: string,
  order: number,
  uploadedAt: Date
}
```

## Frontend Integration

### Mock Data Removal
- Remove dependency on mock.js
- Fetch all data from API endpoints on component mount

### Admin Panel Routes
- `/admin/login` - Admin login page
- `/admin/dashboard` - Main dashboard with tabs:
  - Photos tab
  - Love Letter tab
  - Messages tab
  - Settings tab

### File Storage
- Photos will be stored in `/app/backend/uploads/photos/`
- Served via static file endpoint

## Implementation Notes
- Use simple password-based admin auth (store hashed password in settings)
- Default admin password: "admin123" (user should change)
- Default unlock password: "love"
- Photos stored on filesystem, URLs in database
- Form validation on both frontend and backend
