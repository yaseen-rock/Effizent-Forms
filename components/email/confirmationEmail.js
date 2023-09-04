export function createConfirmationEmail(formData) {
    return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333;
            font-size: 24px;
          }
          ul {
            list-style: none;
            padding: 0;
          }
          li {
            margin-bottom: 10px;
            font-size: 14px;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 18px;
            margin-top: 20px;
            transition: background-color 0.3s;
          }
          .button:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Hello ${formData.name},</h1>
          <p>Thank you for registering with us. Here are your details:</p>
          <ul>
            <li><strong>Name:</strong> ${formData.name}</li>
            <li><strong>Username:</strong> ${formData.username}</li>
            <li><strong>Phone Number:</strong> ${formData.phoneNumber}</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            <li><strong>Date of Birth:</strong> ${formData.dateOfBirth}</li>
          </ul>
          <p>Have a great day!</p>
          <a class="button" href="https://www.effizentseele.com/">Click Here</a>
        </div>
      </body>
    </html>
  `;
  }