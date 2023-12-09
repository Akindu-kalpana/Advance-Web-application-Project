// src/models/index.js
const { Sequelize } = require('sequelize');
const UserModel = require('./user');
const ParcelModel = require('./parcel');

const sequelize = new Sequelize('parcel_application', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = UserModel(sequelize, Sequelize);
const Parcel = ParcelModel(sequelize, Sequelize);

// Associations
User.hasMany(Parcel);
Parcel.belongsTo(User);

sequelize.sync();

module.exports = {
  User,
  Parcel
};
