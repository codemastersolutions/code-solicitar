/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import UserResolver from './UserResolver';

const resolvers = {
  Query: {
    user: async (
      parent: any, args: any, context: any, info: any,
    ) => new UserResolver().user({ ...args }),
    users: async (
      parent: any, args: any, context: any, info: any,
    ) => new UserResolver().users({ ...args }),
    usersWithArgs: async (
      parent: any, args: any, context: any, info: any,
    ) => new UserResolver().usersWithArgs({ ...args }),
  },
};

export default resolvers;
