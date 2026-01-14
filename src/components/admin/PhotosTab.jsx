import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Trash2, Edit2, Save, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

const PhotosTab = () => {
  const { data, addPhoto, updatePhoto, deletePhoto } = useData();
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editCaption, setEditCaption] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(file => {
      const caption = prompt('Enter a caption for this photo:');
      if (!caption) return;

      const reader = new FileReader();
      reader.onload = () => {
        addPhoto({
          url: reader.result, // Base64 encoded image
          caption: caption
        });
      };
      reader.readAsDataURL(file);
    });
  }, [addPhoto]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {'image/*': []},
    multiple: true
  });

  const handleDelete = (photoId) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return;
    deletePhoto(photoId);
  };

  const handleEditStart = (photo) => {
    setEditingId(photo.id);
    setEditCaption(photo.caption);
  };

  const handleEditSave = (photoId) => {
    updatePhoto(photoId, { caption: editCaption });
    setEditingId(null);
  };

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
        <p className="text-sm mt-2" style={{ color: '#A0522D' }}>Photos are stored in your browser</p>
      </div>

      {/* Photos Grid */}
      {data.photos.length === 0 ? (
        <div className="text-center py-8" style={{ color: '#A0522D', fontFamily: 'Georgia, serif' }}>
          No photos yet. Upload some to get started!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.photos.map((photo) => (
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
