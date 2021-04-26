/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Faker from 'faker';
import { define } from 'typeorm-seeding';
import User from '../models/User';

Faker.locale = 'pt_BR';

define(User, (faker: typeof Faker) => {
  const user = new User();
  user.active = faker.random.boolean();
  user.email = faker.internet.email();
  user.name = faker.name.findName();
  user.password = 'password';
  user.username = faker.internet.userName();
  return user;
});
