import React, { useState } from 'react'

function Form() {

    const [formData,setFormData]=useState({
        name:"",
        rollno:"",
        email:""
    });
    const handlechange=(e)=>{
        const {name,value}=e.target;
        setFormData({
            ...formData,
            [name]:value
        })
        
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log("submitted successfully !!!",formData)

        try {
            const response= await fetch('http://localhost:5000/submission',{
                method:'POST',
                headers:{
                    'Content-type':'application/json',
                },
                body:JSON.stringify(formData),
            })
            if (response.ok) {
                const data = await response.text();
                console.log("Response from backend:", data);
                alert("Form submitted successfully!");
              } else {
                alert("Failed to submit form!");
              }
        } catch (error) {
            console.error("Error submitting the form:", error);
            alert("An error occurred while submitting the form.");
        }
    }



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handlechange} />
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handlechange} />
        </div>
        <div>
            <label htmlFor="rollno">Rollno:</label>
            <input type="text" name="rollno" id="rollno" value={formData.rollno} onChange={handlechange} />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Form
