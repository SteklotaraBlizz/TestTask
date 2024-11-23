import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserMigration1732376346575 implements MigrationInterface {
  name = 'UserMigration1732376346575';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying(256), "lastName" character varying(256), "gender" character varying(256), "address" character varying(256), "city" character varying(256), "phone" character varying(256), "email" character varying(256), "status" character varying(256), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
