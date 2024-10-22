const express = require('express');
const connectToDatabase = require('./db');
const cors = require('cors');
const bcrypt = require('bcrypt'); // For password hashing

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());
app.use(express.json());

connectToDatabase().then(db => {
  // Registration route
  app.post('/register', async (req, res) => {
    try {
      const { username, email, password, phone, dob } = req.body;

      // Check if user exists
      const usersCollection = db.collection('users');
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = {
        username,
        email,
        password: hashedPassword,  // Store hashed password
        phone,
        dob,
      };
      const result = await usersCollection.insertOne(newUser);
      res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
    } catch (error) {
      res.status(500).json({ message: 'Registration failed', error: error.message });
    }
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(error => console.error(error));
