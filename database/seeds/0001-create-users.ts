import type { Knex } from 'knex';
import { faker } from '@faker-js/faker';
import { v4 as uuidV4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';
import { UserEntityInterface } from 'src/infrastructure/database/interfaces';
import { UserEntity } from 'src/infrastructure/database/objection/entities';
import { MOCK_LECTURER_OMGTU_ID, MOCK_PASSWORD, MOCK_STABLE_USER_EMAIL } from 'database/helpers/mock-constants';

export async function seed(knex: Knex): Promise<any> {
  const isProd = process.env.NODE_ENV === 'production';

  const usersCount = await knex(UserEntity.tableName).count();

  if (isProd) {
    Logger.log('Production mode. Skipping seed.');
    return;
  }

  if (usersCount[0].count !== '0') {
    Logger.log('Users already exist. Skipping seed.');
    return;
  }

  const users = await createUsers();

  await Promise.all(users.map((user) => knex(UserEntity.tableName).insert(user)));
}

async function createUsers(): Promise<UserEntityInterface[]> {
  const usersCount = MOCK_LECTURER_OMGTU_ID.length;

  const password = await bcrypt.hash(MOCK_PASSWORD, await bcrypt.genSalt());

  return new Array(usersCount).fill(undefined).map<UserEntityInterface>((_, index) => {
    const firstName = faker.name.findName();
    const lastName = faker.name.lastName();

    // create one stable user
    const email = index === 0 ? MOCK_STABLE_USER_EMAIL : faker.internet.email(firstName, lastName).toLowerCase();

    return {
      id: uuidV4(),
      email,
      password,
      firstName,
      lastName,
      lecturerOmgtuRaspId: MOCK_LECTURER_OMGTU_ID[index],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
}
