const mongoose = require('mongoose');
const dotenv = require("dotenv");
const Role = require('../models/roleModel');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');

    const roles = [
      { _id: new mongoose.Types.ObjectId(), roleName: 'admin', spec_id: 1 },
      { _id: new mongoose.Types.ObjectId(), roleName: 'customer', spec_id: 3 },
      { _id: new mongoose.Types.ObjectId(), roleName: 'tenant', spec_id: 2 }
    ];

    // Add created_date to each role
    const currentDate = new Date();
    const roleDocs = roles.map(role => ({
      ...role,
      created_date: currentDate
    }));

    try {
      await Role.insertMany(roleDocs);
      console.log('Roles seeded successfully');
    } catch (err) {
      console.error('Error seeding roles:', err);
    } finally {
      mongoose.disconnect();
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });