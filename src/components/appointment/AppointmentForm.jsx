// frontend/src/components/appointment/AppointmentForm.jsx
import React, { useState } from 'react';
import API from '../../api/api';

const AppointmentForm = ({ onCreated }) => {
  const [form, setForm] = useState({ provider: '', startTime: '', endTime: '', notes: '' });
  const [msg, setMsg] = useState(null);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/appointments', form);
      setForm({ provider: '', startTime: '', endTime: '', notes: '' });
      setMsg('Created');
      if (onCreated) onCreated();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed');
    }
  };

  return (
    <div className="mb-6 border p-4 rounded">
      <h3 className="font-semibold mb-2">Book Appointment</h3>
      {msg && <div className="mb-2">{msg}</div>}
      <form onSubmit={onSubmit}>
        <input name="provider" value={form.provider} onChange={onChange} placeholder="Provider ID" className="w-full p-2 mb-2 border rounded" />
        <input name="startTime" value={form.startTime} onChange={onChange} placeholder="Start ISO datetime" className="w-full p-2 mb-2 border rounded" />
        <input name="endTime" value={form.endTime} onChange={onChange} placeholder="End ISO datetime (optional)" className="w-full p-2 mb-2 border rounded" />
        <textarea name="notes" value={form.notes} onChange={onChange} placeholder="Notes" className="w-full p-2 mb-2 border rounded" />
        <button className="p-2 bg-blue-600 text-white rounded">Create</button>
      </form>
      <p className="text-xs mt-2 text-gray-500">You can paste provider user id in Provider ID field for now.</p>
    </div>
  );
};

export default AppointmentForm;
