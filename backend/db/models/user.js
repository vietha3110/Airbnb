'use strict';
const bcrypt = require('bcryptjs');
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, firstName, lastName, username, email } = this;
      return {id, firstName, lastName, username, email}
    };
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    };
    static getCurrentUserById(id) {
      return User.scope('currentUser').findByPk(id);
    };

    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    };

    static async signup({ username, email, password, firstName, lastName }) {
      const hashedPassword = bcrypt.hashSync(password); 
      const user = await User.create({
        username,
        email,
        hashedPassword,
        firstName,
        lastName
      });
      return await User.scope('currentUser').findByPk(user.id);
    }
    static associate(models) {
      // define association here
      User.hasMany(
        models.Spot, {
        foreignKey: 'ownerId',
        onDelete: 'CASCADE',
        hooks: true
      }
      );
      User.hasMany(
        models.Review, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        hooks: true
      }
      );
      User.hasMany(
        models.Booking, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
          hooks: true
        }
      )
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING, 
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error(`Cannot be an email.`)
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    firstName: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: [
          'hashedPassword',
          'email',
          'createdAt',
          'updatedAt'
        ]
      }
    }, 
    scopes: {
      currentUser: {
        attributes: {
          exclude: [
            'hashedPassword',
            'createdAt',
            'updatedAt'
          ]
        }
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};
