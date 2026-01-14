import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

const MessagesTab = () => {
  const { data, addMessage, updateMessage, deleteMessage } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', message: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    addMessage(formData);
    setIsAdding(false);
    setFormData({ title: '', message: '' });
  };

  const handleUpdate = (messageId) => {
    updateMessage(messageId, formData);
    setEditingId(null);
    setFormData({ title: '', message: '' });
  };

  const handleDelete = (messageId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    deleteMessage(messageId);
  };

  const startEdit = (msg) => {
    setEditingId(msg.id);
    setFormData({ title: msg.title, message: msg.message });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({ title: '', message: '' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>
          Personal Messages
        </h2>
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 rounded-lg font-bold text-white flex items-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #D4A574 0%, #8B7355 100%)',
              fontFamily: 'Georgia, serif'
            }}>
            <Plus size={20} /> Add Message
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="bg-white rounded-lg p-6 mb-6 shadow-lg" style={{ border: '2px solid #d4c4b0' }}>
          <h3 className="text-xl font-bold mb-4" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>
            {isAdding ? 'Add New Message' : 'Edit Message'}
          </h3>
          <form onSubmit={isAdding ? handleAdd : (e) => { e.preventDefault(); handleUpdate(editingId); }}>
            <div className="mb-4">
              <label className="block mb-2 font-bold" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 rounded border-2"
                style={{ borderColor: '#d4c4b0', background: '#fff8f0' }}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 rounded border-2"
                style={{ borderColor: '#d4c4b0', background: '#fff8f0', minHeight: '120px' }}
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-6 py-2 rounded font-bold text-white flex items-center gap-2"
                style={{ background: 'linear-gradient(135deg, #D4A574 0%, #8B7355 100%)' }}>
                <Save size={18} /> {isAdding ? 'Add' : 'Save'}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="px-6 py-2 rounded font-bold bg-gray-300 flex items-center gap-2">
                <X size={18} /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Messages List */}
      {data.messages.length === 0 ? (
        <div className="text-center py-8" style={{ color: '#A0522D', fontFamily: 'Georgia, serif' }}>
          No messages yet. Add some to get started!
        </div>
      ) : (
        <div className="space-y-4">
          {data.messages.map((msg) => (
            <div key={msg.id} className="bg-white rounded-lg p-6 shadow-lg" style={{ border: '2px solid #d4c4b0' }}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>
                    {msg.title}
                  </h3>
                  <p style={{ color: '#5D4037' }}>{msg.message}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => startEdit(msg)}
                    className="p-2 rounded hover:bg-gray-100" style={{ color: '#8B4513' }}>
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-2 rounded hover:bg-red-100 text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesTab;
