import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Trash2, Edit2, Save, X } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const PhotosTab = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editCaption, setEditCaption] = useState('');

  const fetchPhotos = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/photos`);
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const onDrop = useCallback(async (acceptedFiles) => {
    for (const file of acceptedFiles) {
      const caption = prompt('Enter a caption for this photo:');
      if (!caption) continue;

      setUploading(true);
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('caption', caption);

      try {
        const token = localStorage.getItem('admin_token');
        await axios.post(`${BACKEND_URL}/api/photos/upload`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        await fetchPhotos();
      } catch (error) {
        alert('Error uploading photo: ' + (error.response?.data?.detail || error.message));
      } finally {
        setUploading(false);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {'image/*': []},
    multiple: true
  });

  const handleDelete = async (photoId) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      await axios.delete(`${BACKEND_URL}/api/photos/${photoId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      await fetchPhotos();
    } catch (error) {
      alert('Error deleting photo: ' + (error.response?.data?.detail || error.message));
    }
  };

  const handleEditStart = (photo) => {
    setEditingId(photo.id);
    setEditCaption(photo.caption);
  };

  const handleEditSave = async (photoId) => {
    try {
      const token = localStorage.getItem('admin_token');
      await axios.put(`${BACKEND_URL}/api/photos/${photoId}`, 
        { caption: editCaption },
        { headers: { 'Authorization': `Bearer ${token}` }}
      );
      setEditingId(null);
      await fetchPhotos();
    } catch (error) {
      alert('Error updating photo: ' + (error.response?.data?.detail || error.message));
    }
  };

  if (loading) {
    return <div className="text-center py-8" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>Loading photos...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>
        Photo Gallery Management
      </h2>

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className="border-2 border-dashed rounded-lg p-8 mb-8 text-center cursor-pointer transition-all"
        style={{
          borderColor: isDragActive ? '#D4A574' : '#d4c4b0',
          background: isDragActive ? '#fff8f0' : 'transparent'
        }}>
        <input {...getInputProps()} />
        <Upload className="mx-auto mb-4" size={48} style={{ color: '#8B4513' }} />
        <p className="text-lg font-bold mb-2" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>
          {isDragActive ? 'Drop photos here...' : 'Drag & drop photos here'}
        </p>
        <p style={{ color: '#A0522D' }}>or click to select files</p>
        {uploading && <p className="mt-4 text-pink-600">Uploading...</p>}
      </div>

      {/* Photos Grid */}
      {photos.length === 0 ? (
        <div className="text-center py-8" style={{ color: '#A0522D', fontFamily: 'Georgia, serif' }}>
          No photos yet. Upload some to get started!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-lg shadow-lg overflow-hidden" style={{
              border: '2px solid #d4c4b0'
            }}>
              <img src={photo.url} alt={photo.caption} className="w-full h-64 object-cover" />
              <div className="p-4">
                {editingId === photo.id ? (
                  <div className="mb-2">
                    <input
                      type="text"
                      value={editCaption}
                      onChange={(e) => setEditCaption(e.target.value)}
                      className="w-full px-3 py-2 border-2 rounded" style={{ borderColor: '#d4c4b0' }}
                    />
                  </div>
                ) : (
                  <p className="mb-2" style={{ color: '#5D4037', fontFamily: 'Georgia, serif' }}>{photo.caption}</p>
                )}
                <div className="flex gap-2">
                  {editingId === photo.id ? (
                    <>
                      <button
                        onClick={() => handleEditSave(photo.id)}
                        className="flex-1 px-3 py-2 rounded flex items-center justify-center gap-2 text-white" style={{
                          background: 'linear-gradient(135deg, #D4A574 0%, #8B7355 100%)'
                        }}>
                        <Save size={16} /> Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex-1 px-3 py-2 rounded flex items-center justify-center gap-2 bg-gray-300">
                        <X size={16} /> Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditStart(photo)}
                        className="flex-1 px-3 py-2 rounded flex items-center justify-center gap-2" style={{
                          background: '#f0e6d3',
                          color: '#8B4513'
                        }}>
                        <Edit2 size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(photo.id)}
                        className="flex-1 px-3 py-2 rounded flex items-center justify-center gap-2 bg-red-100 text-red-700">
                        <Trash2 size={16} /> Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotosTab;
