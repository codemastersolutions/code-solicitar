import { gql } from 'apollo-server-express';

const UserTypeDefs = gql`
  type User {
    id: String
    active: Boolean
    name: String
    username: String
    email: String
    createdAt: String
    updatedAt: String
    deletedAt: String
  }

  type Pagination {
    currentPage: Int
    data: [User]
    lastPage: Int
    nextPage: Int
    perPage: Int
    prevPage: Int
    total: Int
  }

  type Query {
    user(id: String, name: String, email: String, username: String): User
    users(page: Int = 1, perPage: Int = 15): Pagination
    usersWithArgs(id: String, name: String, email: String, username: String): [User]
  }
`;

export default UserTypeDefs;
