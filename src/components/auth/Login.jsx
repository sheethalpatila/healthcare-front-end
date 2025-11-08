// frontend/src/components/auth/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import API from '../../api/api';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState(null);
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      login(res.data.token);
      navigate('/dashboard');
    } catch (error) {
      setErr(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded">
      <h2 className="text-2xl mb-4">Login</h2>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <form onSubmit={onSubmit}>
        <label className="block mb-2">Email
          <input name="email" onChange={onChange} value={form.email} className="w-full p-2 border rounded" />
        </label>
        <label className="block mb-4">Password
          <input type="password" name="password" onChange={onChange} value={form.password} className="w-full p-2 border rounded" />
        </label>
        <button className="w-full p-2 bg-blue-600 text-white rounded">Login</button>
      </form>
      <p className="mt-3">No account? <Link to="/signup" className="text-blue-600">Signup</Link></p>
    </div>
  );
};

export default Login;
