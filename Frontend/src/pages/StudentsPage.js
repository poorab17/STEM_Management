import React, { useState, useEffect } from "react";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";

const API_URL = "http://localhost:5000/api/students";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  // Fetch students
  const fetchStudents = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Add or update student
  const handleSubmit = async (studentData) => {
    try {
      if (editingStudent) {
        // Update
        const res = await fetch(`${API_URL}/${editingStudent._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentData),
        });
        const updated = await res.json();
        setStudents(
          students.map((s) => (s._id === updated._id ? updated : s))
        );
        setEditingStudent(null);
      } else {
        // Add
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentData),
        });
        const newStudent = await res.json();
        setStudents([...students, newStudent]);
      }
    } catch (err) {
      console.error(err);
    }
  };

 


  const handleEdit = (student) => setEditingStudent(student);

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setStudents(students.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Student Management</h2>
      <StudentForm onSubmit={handleSubmit} existingStudent={editingStudent} />
      <StudentList
        students={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default StudentsPage;
