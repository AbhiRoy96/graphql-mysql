import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLDecimal,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';

import Db from './db';

const UserOrder = new GraphQLObjectType({
  name: 'UserOrder',
  description: 'Orders Taken',
  fields () {
    return {
      id: {
        type: GraphQLInt,
        resolve (user_order) {
          return user_order.id;
        }
      },
      itemName: {
        type: GraphQLString,
        resolve (user_order) {
          return user_order.itemName;
        }
      },
      itemPrice: {
        type: GraphQLDecimal,
        resolve (user_order) {
          return user_order.itemPrice;
        }
      }
    };
  }
});

const User = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a User',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve (users) {
          return users.id;
        }
      },
      firstName: {
        type: GraphQLString,
        resolve (users) {
          return users.firstName;
        }
      },
      lastName: {
        type: GraphQLString,
        resolve (users) {
          return users.lastName;
        }
      },
      email: {
        type: GraphQLString,
        resolve (users) {
          return users.email;
        }
      },
    };
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields: () => {
    return {
      Customers: {
        type: new GraphQLList(User),
        args: {
          id: {
            type: GraphQLInt
          },
          email: {
            type: GraphQLString
          }
        },
        resolve (root, args) {
          return Db.models.users.findAll({ where: args });
        }
      },
    };
  }
});



const Schema = new GraphQLSchema({
  query: Query,

});

export default Schema;
