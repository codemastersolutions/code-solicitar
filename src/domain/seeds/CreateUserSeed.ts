/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Factory, Seeder } from 'typeorm-seeding';
import User from '../models/User';

export default class CreateUserSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(User)().createMany(100);
  }
}
