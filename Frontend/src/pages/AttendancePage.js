import React, { useState, useEffect } from "react";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceList from "../components/AttendanceList";

const API_URL = "http://localhost:5000/api/attendance";

const AttendancePage = () => {
  const [records, setRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);

  // Fetch attendance records
  const fetchRecords = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Add or update attendance
  const handleSubmit = async (recordData) => {
    try {
      if (editingRecord) {
        const res = await fetch(`${API_URL}/${editingRecord._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(recordData),
        });
        const updated = await res.json();
        setRecords(records.map((r) => (r._id === updated._id ? updated : r)));
        setEditingRecord(null);
      } else {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(recordData),
        });
        const newRecord = await res.json();
        setRecords([...records, newRecord]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (record) => setEditingRecord(record);

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setRecords(records.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Attendance Management</h2>
      <AttendanceForm onSubmit={handleSubmit} existingRecord={editingRecord} />
      <AttendanceList
        records={records}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AttendancePage;
