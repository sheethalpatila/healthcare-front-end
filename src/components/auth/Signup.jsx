// frontend/src/components/auth/Signup.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/api';
import { AuthContext } from '../../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'patient' });
  const [err, setErr] = useState(null);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/signup', form);
      login(res.data.token);
      navigate('/dashboard');
    } catch (error) {
      setErr(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded">
      <h2 className="text-2xl mb-4">Signup</h2>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <form onSubmit={onSubmit}>
        <label className="block mb-2">Name
          <input name="name" onChange={onChange} value={form.name} className="w-full p-2 border rounded" />
        </label>
        <label className="block mb-2">Email
          <input name="email" onChange={onChange} value={form.email} className="w-full p-2 border rounded" />
        </label>
        <label className="block mb-2">Password
          <input type="password" name="password" onChange={onChange} value={form.password} className="w-full p-2 border rounded" />
        </label>
        <label className="block mb-4">Role
          <select name="role" value={form.role} onChange={onChange} className="w-full p-2 border rounded">
            <option value="patient">Patient</option>
            <option value="provider">Provider</option>
          </select>
        </label>
        <button className="w-full p-2 bg-green-600 text-white rounded">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
