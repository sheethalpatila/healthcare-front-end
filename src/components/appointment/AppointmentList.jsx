// frontend/src/components/appointment/AppointmentList.jsx
import React from 'react';
import API from '../../api/api';

const AppointmentList = ({ appointments = [], refresh }) => {
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/appointments/${id}`, { status });
      if (refresh) refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const del = async (id) => {
    try {
      await API.delete(`/appointments/${id}`);
      if (refresh) refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3 className="font-semibold mb-2">Appointments</h3>
      {appointments.length === 0 && <div>No appointments</div>}
      <ul>
        {appointments.map(a => (
          <li key={a._id} className="mb-3 p-3 border rounded">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{a.patient?.name} → {a.provider?.name}</div>
                <div className="text-sm">Start: {new Date(a.startTime).toLocaleString()}</div>
                <div className="text-sm">Status: {a.status}</div>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => updateStatus(a._id, 'confirmed')} className="p-1 bg-green-600 text-white rounded">Confirm</button>
                <button onClick={() => updateStatus(a._id, 'cancelled')} className="p-1 bg-yellow-600 text-white rounded">Cancel</button>
                <button onClick={() => del(a._id)} className="p-1 bg-red-600 text-white rounded">Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
