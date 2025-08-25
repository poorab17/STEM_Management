import React, { useState, useEffect } from "react";

const StudentForm = ({ onSubmit, existingStudent }) => {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    studentClass: "",
    schoolName: "",
    gender: "Male",
    photo: null,
  });



  useEffect(() => {
    if (existingStudent) {
      setFormData({
        name: existingStudent.name,
        rollNumber: existingStudent.rollNumber,
        studentClass: existingStudent.class,
        schoolName: existingStudent.schoolName,
        gender: existingStudent.gender,
        photo: null,
      });
    }
  }, [existingStudent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//       console.log("Submitting form data:", formData);

//     const data = new FormData();
    
    
//     data.append("name", formData.name);
//     data.append("rollNumber", formData.rollNumber);
//     data.append("className", formData.studentClass);
//     data.append("schoolName", formData.schoolName);
//     data.append("gender", formData.gender);
//     if (formData.photo) data.append("photo", formData.photo);

//     // ✅ Log FormData contents
// for (let [key, value] of data.entries()) {
//   console.log(key, value);
// }

//     onSubmit(data);
   

//     setFormData({
//       name: "",
//       rollNumber: "",
//       studentClass: "",
//       schoolName: "",
//       gender: "Male",
//       photo: null,
//     });
//     e.target.reset();
//   };

const handleSubmit = (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("name", formData.name);
  data.append("rollNumber", formData.rollNumber);
  data.append("className", formData.studentClass);
  data.append("schoolName", formData.schoolName);
  data.append("gender", formData.gender);
  if (formData.photo) data.append("photo", formData.photo);

  // ✅ Do NOT set headers manually
  fetch("http://localhost:5000/api/students", {
    method: "POST",
    body: data
  })
    .then(res => res.json())
    .then(resData => console.log(resData))
    .catch(err => console.error(err));
};


  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        name="name"
        placeholder="Student Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="rollNumber"
        placeholder="Roll Number"
        value={formData.rollNumber}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="studentClass"
        placeholder="Class"
        value={formData.studentClass}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="schoolName"
        placeholder="School Name"
        value={formData.schoolName}
        onChange={handleChange}
        required
      />
      <select name="gender" value={formData.gender} onChange={handleChange}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input type="file" name="photo" accept="image/*" onChange={handleFileChange} />
      <button type="submit">
        {existingStudent ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
};

export default StudentForm;
