// frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AppointmentList from '../components/appointment/AppointmentList';
import AppointmentForm from '../components/appointment/AppointmentForm';
import API from '../api/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  const fetch = async () => {
    try {
      const res = await API.get('/appointments');
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetch(); }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Dashboard - {user?.role}</h1>
      {user?.role === 'patient' && <AppointmentForm onCreated={fetch} />}
      <AppointmentList appointments={appointments} refresh={fetch} />
    </div>
  );
};

export default Dashboard;
