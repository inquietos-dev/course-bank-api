import {MigrationInterface, QueryRunner} from "typeorm";

export class ModifyUserCityLenght1619715821992 implements MigrationInterface {
    name = 'ModifyUserCityLenght1619715821992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "fullname_index"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "city" character varying(180)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "fullname_index" ON "user" ("name", "surname") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "fullname_index"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "city" character varying(200)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "fullname_index" ON "user" ("name", "surname") `);
    }

}
