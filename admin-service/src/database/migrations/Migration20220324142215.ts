import { Migration } from '@mikro-orm/migrations';

export class Migration20220324142215 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user_administrator" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id" varchar(255) not null);',
    );
    this.addSql(
      'alter table "user_administrator" add constraint "user_administrator_pkey" primary key ("id");',
    );

    this.addSql(
      'create table "banned_users" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id" varchar(255) not null);',
    );
    this.addSql(
      'alter table "banned_users" add constraint "banned_users_pkey" primary key ("id");',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user_administrator" cascade;');

    this.addSql('drop table if exists "banned_users" cascade;');
  }
}
