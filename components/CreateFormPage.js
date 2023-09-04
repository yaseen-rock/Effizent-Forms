import { useState } from 'react';
import { useRouter } from 'next/router';
import API_URL from '../config';
import styles from '../styles/form.module.css';
import Logo from './Logo';
import axios from 'axios';
import { createConfirmationEmail } from './email/confirmationEmail';

function CreateFormPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    phoneNumber: '',
    email: '',
    name: '',
    dateOfBirth: '',
    username: '',
  });

  const sendConfirmationEmail = async (formData) => {
    const apiKey = 'Brevo Api Key'; // Replace with your Brevo API key
    const emailHtml = createConfirmationEmail(formData);
    const emailData = {
      sender: {
        name: 'Effizent Pvt Ltd',
        email: 'sender@example.com',
      },
      to: [
        {
          email: formData.email,
          name: formData.name,
        },
      ],
      subject: 'Confirmation Email',
      htmlContent: emailHtml,
    
};

    try {
      const response = await axios.post('https://api.sendinblue.com/v3/smtp/email', emailData, {
        headers: {
          'accept': 'application/json',
          'api-key': apiKey,
          'content-type': 'application/json',
        },
      });

      console.log('Confirmation email sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Call the function to send the confirmation email
        sendConfirmationEmail(formData);
        router.push('/result');
      } else {
        console.error('Error creating user');
      }
    } catch (error) {
      console.error('Error creating user', error);
    }
  };
  return (
    <div className={styles.pageContainer}>
      <div className={styles.logoContainer}>
        <Logo /> {/* Use the Logo component here */}
      </div>
      <div className={styles.formContainer}>
        <h1 className={styles.formHeader}>Create User Form</h1>
        <forms className={styles.form}> {/* * */}
          <input
            type="text"
            placeholder="Username *"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone Number *"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Email *"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Name *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {/* Use the date input with type="date" */}
          <input
            type="date"
            placeholder="Date of Birth *"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
          />
          <button onClick={handleSubmit} className={styles.formButton}>Submit</button>
          <button onClick={() => router.push('/')} className={styles.formButton}>Cancel</button>
        </forms>
      </div>
    </div>
  );
}

export default CreateFormPage;
