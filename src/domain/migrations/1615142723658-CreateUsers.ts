import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1615142723658 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isUnique: true,
          generationStrategy: 'uuid',
          default: 'gen_random_uuid()',
        },
        {
          name: 'active',
          type: 'boolean',
          default: true,
          isNullable: false,
        },
        {
          name: 'username',
          type: 'varchar',
          length: '30',
          isUnique: true,
          isNullable: false,
        },
        {
          name: 'name',
          type: 'varchar',
          length: '150',
          isNullable: false,
        },
        {
          name: 'email',
          type: 'varchar',
          length: '50',
          isUnique: true,
          isNullable: false,
        },
        {
          name: 'password',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
          isNullable: false,
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
          isNullable: false,
        },
        {
          name: 'deleted_at',
          type: 'timestamp',
          default: 'now()',
          isNullable: false,
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
