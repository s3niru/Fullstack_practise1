import React, { useState,useEffect } from 'react';
import axios from 'axios';

function Formcomponent({ token }) {
  const [platform, setPlatform] = useState('YouTube');
  const [data, setData] = useState('');
  const [message, setMessage] = useState('');
  const [formData, setForms]  = useState([]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/forms/submit', {
        token,
        platform,
        data,
      });
      setMessage(res.data.message);

    } catch (err) {
      setMessage('Error submitting form');
    }
  };
   const viewForm = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/forms/user-forms', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data);
        setForms(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    useEffect(() => {
        console.log('Form Data:', formData);
    }, [formData]);

  return (
    <div>
      <h2>Submit a Form</h2>
      <h2>{platform}</h2>
      <textarea
        placeholder="Enter form data..."
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <p>{message}</p>

      <button onClick={viewForm}>View Form Data</button>
      <div>
        <h2>Submitted Forms:</h2>
        {Array.isArray(formData) && formData.length > 0 ? (
          formData.map((form) => (
            <div key={form._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
              <p><strong>Platform:</strong> {form.platform}</p>
              <p><strong>Data:</strong> {form.data}</p>
              <p><strong>User ID:</strong> {form.user}</p>
            </div>
          ))
        ) : (
          <p>No forms submitted yet.</p>
        )}
      </div>
    </div>
  );
}

export default Formcomponent;
