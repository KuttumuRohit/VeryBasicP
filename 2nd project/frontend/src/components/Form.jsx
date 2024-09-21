import React, { useState } from 'react';

function Form() {
  const [data, setData] = useState({
    num1: '',
    num2: '',
    operation: '',
  });
  const [result, setResult] = useState(''); // State to store the result

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submitted the info to backend');
    try {
      const response = await fetch('http://localhost:5000/solution', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const responseData = await response.json(); // Renamed 'data' to 'responseData' to avoid conflict with state variable
        setResult(responseData.result); // Set the result state with the response
        console.log('Response from backend:', responseData);
      } else {
        alert('Failed to submit form!');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="num1">Num1:</label>
          <input
            type="text"
            name="num1"
            id="num1"
            value={data.num1}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="num2">Num2:</label>
          <input
            type="text"
            name="num2"
            id="num2"
            value={data.num2}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="operation">Operation:</label>
          <input
            type="text"
            name="operation"
            id="operation"
            value={data.operation}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Get answer</button>
      </form>
      {result && (
        <div>
          <h2>Result: {result}</h2>
        </div>
      )}
    </div>
  );
}

export default Form;
