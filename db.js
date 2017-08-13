import Sequelize from 'sequelize';
import _ from 'lodash';
import Faker from 'faker';


const Conn = new Sequelize(
  'food_deli_network',
  'root',
  'soujonno#*',
  {
    dialect: 'mysql',
    host: 'localhost'
  }
) ;


const Users = Conn.define('users', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  }
});

const UserOrder = Conn.define('user_order', {
  itemName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  itemPrice: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false
  }
});

// Relations
Users.hasMany(UserOrder);
UserOrder.belongsTo(Users);

Conn.sync({ force: true }).then(()=> {
  _.times(10, ()=> {
    return Users.create({
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      email: Faker.internet.email()
    }).then(users => {
      return users.createUser_order({
        itemName: 'Masala Dosa',
        itemPrice: 50.55
      });
    });
  });
});

export default Conn;
