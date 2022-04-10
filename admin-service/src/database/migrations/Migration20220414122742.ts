import { Migration } from '@mikro-orm/migrations';

export class Migration20220414122742 extends Migration {
  async up(): Promise<void> {
    this.addSql('drop table if exists "user_administrator" cascade;');

    this.addSql(
      'alter table "user_manager" add column "user_name" varchar(255) not null, add column "deleted_at" timestamptz(0) null;',
    );

    this.addSql(
      'alter table "banned_users" add column "user_name" varchar(255) not null, add column "deleted_at" timestamptz(0) null;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'create table "user_administrator" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id" varchar(255) not null);',
    );
    this.addSql(
      'alter table "user_administrator" add constraint "user_administrator_pkey" primary key ("id");',
    );

    this.addSql('alter table "user_manager" drop column "user_name";');
    this.addSql('alter table "user_manager" drop column "deleted_at";');

    this.addSql('alter table "banned_users" drop column "user_name";');
    this.addSql('alter table "banned_users" drop column "deleted_at";');
  }
}
