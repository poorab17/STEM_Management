import React from "react";

function AttendanceList({ records, onEdit, onDelete }) {
  return (
    <ul>
      {records.map((record) => (
        <li key={record._id}>
          {record.studentName} - {record.date} - {record.status}
          <button onClick={() => onEdit(record)}>Edit</button>
          <button onClick={() => onDelete(record._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default AttendanceList;
