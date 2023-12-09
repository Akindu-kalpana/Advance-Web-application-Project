// src/controllers/index.js
const express = require('express');
const bodyParser = require('body-parser');
const { User, Parcel } = require('../models');
const jwt = require('jsonwebtoken');

const router = express.Router();
router.use(bodyParser.json());

// // Authentication middleware
// function authenticateToken(req, res, next) {
//   const token = req.header('Authorization');
//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, '123456', (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

// User authentication endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email, password } });

    if (user) {
      const accessToken = jwt.sign({ id: user.id, user_type: user.user_type }, 'yourSecretKey');
      res.json({ accessToken });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Parcel creation endpoint (requires authentication)
router.post('/parcels', async (req, res) => {
  const { recipient, recipient_phoneNo, recipient_name, recipient_address, date_and_time, status, size } = req.body;
  const user_id = req.user.id;

  try {
    const parcel = await Parcel.create({
      user_id,
      recipient,
      recipient_phoneNo,
      recipient_name,
      recipient_address,
      date_and_time,
      status,
      size
    });

    res.json(parcel);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Parcel retrieval endpoint (requires authentication)
router.get('/parcels',  async (req, res) => {
  // const user_id = req.user.id;

  try {
    const userParcels = await Parcel.findAll();
    res.json(userParcels);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Parcel delivery endpoint (requires authentication)
router.put('/parcels/:parcelId/deliver', async (req, res) => {
  const user_id = req.user.id;
  const parcelId = parseInt(req.params.parcelId);

  try {
    const parcel = await Parcel.findOne({ where: { user_id, id: parcelId } });

    if (!parcel) {
      return res.sendStatus(404);
    }

    parcel.status = 'Delivered';
    await parcel.save();

    res.json(parcel);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
