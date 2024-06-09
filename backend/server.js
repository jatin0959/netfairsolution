// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const multer = require('multer');
// const cors = require('cors');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// const session = require('express-session');
// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: false
// }));
// // MongoDB connection
// const dbURI = 'mongodb+srv://vp0072003:Starwar007@blog.euwyrii.mongodb.net/netfairsolution?retryWrites=true&w=majority';

// mongoose.connect(dbURI, {})
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.log(err));

// // Routes
// app.use('/api/auth', require('./routes/auth'));

// app.use('/api/contactUs', require('./routes/contactUs'));

// app.use("/api/saveEmail", require('./routes/saveEmail'));

// app.use('/api/saveComment', require('./routes/saveComment'));

// app.use('/api/getKycSubmission', require('./routes/getKycSubmission'));


// // Serve static files from the uploads directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Import routes
// const verificationRoutes = require('./routes/verification');
// app.use('/api/verification', verificationRoutes);


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// server.js or app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const User = require('./models/User');
const KYC = require('./models/Verification');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const dbURI = 'mongodb+srv://vp0072003:Starwar007@blog.euwyrii.mongodb.net/netfairsolution?retryWrites=true&w=majority';

mongoose.connect(dbURI, { })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contactUs', require('./routes/contactUs'));
app.use("/api/saveEmail", require('./routes/saveEmail'));
app.use('/api/saveComment', require('./routes/saveComment'));
app.use('/api/getKycSubmission', require('./routes/getKycSubmission'));


// Route to fetch user emails
app.get('/api/getUserEmails', async (req, res) => {
  try {
    // Find users where kycverification is false
    const users = await User.find({ kycverification: false }, 'email');
    const emails = users.map((user) => user.email);
    res.status(200).json({ emails });
  } catch (error) {
    console.error('Error fetching user emails:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Route to fetch KYC details by email
app.get('/api/getKYCDetailsByEmail', async (req, res) => {
  const { email } = req.query;
  try {
    const kycDetails = await KYC.findOne({ email });
    if (!kycDetails) {
      return res.status(404).json({ message: 'KYC details not found for the provided email' });
    }
    res.status(200).json({ kycDetails });
  } catch (error) {
    console.error('Error fetching KYC details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to verify KYC
app.post('/api/verifyKYC', async (req, res) => {
  const { email } = req.body;
  try {
    await User.updateOne({ email }, { kycverification: true });
    const updatedKYCDetails = await User.findOneAndUpdate({ email }, { kycverification: true });
    res.status(200).json({ kycDetails: updatedKYCDetails });
  } catch (error) {
    console.error('Error verifying KYC:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const verificationRoutes = require('./routes/verification');
app.use('/api/verification', verificationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
