  'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Contact extends Model { }

  Contact.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        is: ["^[a-z]+$", 'i'],
        len: [4, 13]
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [8, 15],
        not: ["[a-z]", 'i']
      }
    },
    quote: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [0, 70]
      }
    }
  }, { sequelize });

  Contact.associate = function (models) {
    // associations can be defined here
  };
  return Contact;
};