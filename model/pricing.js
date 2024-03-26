const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Organization = require('./organization');
const Item = require('./item');

const Pricing = sequelize.define('Pricing', {
  zone:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  base_distance_in_km: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue:5,
  },
  km_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      validPrice(value) {
        if (value !== 1 && value !== 1.5) {
          throw new Error('Price must be either 1 or 1.5');
        }
      }
    }
  },
  fix_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue:10
  },
});

// Define associations
Pricing.belongsTo(Organization, { foreignKey: 'organization_id', onDelete: 'CASCADE' });
Pricing.belongsTo(Item, { foreignKey: 'item_id', onDelete: 'CASCADE' });

module.exports = Pricing;
