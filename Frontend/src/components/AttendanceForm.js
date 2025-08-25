import React, { useState, useEffect } from "react";

function AttendanceForm({ onSubmit, existingRecord }) {
  const [studentName, setStudentName] = useState("");
 
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  useEffect(() => {
    if (existingRecord) {     
      setStudentName(existingRecord.studentName);
      setDate(existingRecord.date);
      setStatus(existingRecord.status);
    }
  }, [existingRecord]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ studentName, date, status });
    setStudentName("");
    setDate("");
    setStatus("Present");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Student Name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>
      <button type="submit">{existingRecord ? "Update" : "Add"} Attendance</button>
    </form>
  );
}

export default AttendanceForm;
