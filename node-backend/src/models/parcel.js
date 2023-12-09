// src/models/parcel.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Parcel = sequelize.define('Parcel', {
    recipient: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recipient_phoneNo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recipient_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recipient_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_and_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Parcel;
};
