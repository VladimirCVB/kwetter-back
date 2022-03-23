import { Migration } from '@mikro-orm/migrations';

export class Migration20220323162048 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user_log" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null);');
    this.addSql('alter table "user_log" add constraint "user_log_pkey" primary key ("id");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user_log" cascade;');
  }

}
