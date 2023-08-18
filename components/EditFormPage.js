// components/EditFormPage.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import API_URL from '../config';
import styles from '../styles/form.module.css';
import Logo from './Logo';

function EditFormPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    phoneNumber: '',
    email: '',
    name: '',
    dateOfBirth: '',
    username: '',
  });

  const handleSubmit = async () => {
    const response = await fetch(`${API_URL}/user/${router.query.username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push('/result');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/user/${router.query.username}`);
        if (response.ok) {
          const user = await response.json();
          // Convert the date of birth to the format expected by the date input
          const formattedDateOfBirth = new Date(user.dateOfBirth).toISOString().split('T')[0];
          // Update the formData to include the formatted dateOfBirth
          setFormData({ ...user, dateOfBirth: formattedDateOfBirth });
        } else {
          console.error('Error fetching user data');
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
    fetchData();
  }, [router.query.username]);

  return (
    <div className={styles.pageContainer}>
    <div className={styles.logoContainer}>
      <Logo /> {/* Use the Logo component here */}
    </div>
    <div className={styles.formContainer}>
      <h1 className={styles.formHeader}>Edit User</h1>
      <forms className={styles.form}>
      <input
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={(e) =>
          setFormData({ ...formData, phoneNumber: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      {/* Use the date input with type="date" */}
      {/* Use the date input with type="date" */}
      <input
        type="date"
        placeholder="Date of Birth"
        value={formData.dateOfBirth}
        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
      />
      <button onClick={handleSubmit} className={styles.formButton}>Submit</button>
      <button onClick={() => router.push('/')}className={styles.formButton}>Cancel</button>
      </forms>
      </div>
      </div>

  );
}

export default EditFormPage;
