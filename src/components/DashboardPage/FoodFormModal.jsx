import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addFood, updateFood } from '../../redux/authThunk';
import { LuX, LuUpload, LuImage } from 'react-icons/lu';

const CATEGORIES = ['Starter', 'Main Course', 'Dessert', 'Beverages', 'Snacks', 'Other'];

const FoodFormModal = ({ isOpen, onClose, editingFood }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: '',
    price: '',
    category: 'Starter',
    description: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');

  const baseUrl = import.meta.env.VITE_BASE_URL?.replace('/api', '') || '';

  // Populate form when editing
  useEffect(() => {
    if (editingFood) {
      setForm({
        title: editingFood.title || '',
        price: editingFood.price?.toString() || '',
        category: editingFood.category || 'Starter',
        description: editingFood.description || '',
      });
      setPreview(editingFood.image ? `${baseUrl}${editingFood.image}` : '');
      setImage(null);
    } else {
      setForm({ title: '', price: '', category: 'Starter', description: '' });
      setPreview('');
      setImage(null);
    }
    setError('');
  }, [editingFood, isOpen, baseUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('price', Number(form.price));
      formData.append('category', form.category);
      formData.append('description', form.description);
      if (image) formData.append('image', image);

      if (editingFood) {
        await dispatch(updateFood({ id: editingFood._id, formData })).unwrap();
      } else {
        await dispatch(addFood(formData)).unwrap();
      }
      onClose();
    } catch (err) {
      setError(err || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#1a1a1a] rounded-3xl shadow-2xl border border-gray-100 dark:border-[#2e2e2e] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-[#2e2e2e]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {editingFood ? 'Edit Food Item' : 'Add Food Item'}
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:scale-110 transition-all">
            <LuX className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Image Upload */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 dark:border-[#3e3e3e] bg-gray-50 dark:bg-[#252525] flex items-center justify-center">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <LuImage className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <label className="cursor-pointer px-4 py-2 rounded-xl bg-gray-100 dark:bg-[#252525] text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#333] transition-all flex items-center gap-2">
              <LuUpload className="w-4 h-4" />
              {preview ? 'Change Photo' : 'Upload Photo'}
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Title</label>
            <input
              type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Paneer Tikka" required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#2e2e2e] bg-gray-50 dark:bg-[#1e1e1e] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E23744] focus:border-transparent text-sm transition-all"
            />
          </div>

          {/* Price & Category row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Price (₹)</label>
              <input
                type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="0" required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#2e2e2e] bg-gray-50 dark:bg-[#1e1e1e] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E23744] focus:border-transparent text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Category</label>
              <select
                value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#2e2e2e] bg-gray-50 dark:bg-[#1e1e1e] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E23744] focus:border-transparent text-sm transition-all"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
            <textarea
              value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Short description of the dish..." rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#2e2e2e] bg-gray-50 dark:bg-[#1e1e1e] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E23744] focus:border-transparent text-sm transition-all resize-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 border border-gray-200 dark:border-[#2e2e2e] text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-[#252525] transition-all text-sm"
            >
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-3 bg-[#E23744] text-white font-semibold rounded-xl hover:bg-[#c8202d] active:scale-95 transition-all text-sm shadow-lg shadow-red-200 dark:shadow-none disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
                  Saving...
                </span>
              ) : editingFood ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodFormModal;
