import { Migration } from '@mikro-orm/migrations';

export class Migration20220323135410 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user_data" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "school" varchar(255) not null, "web" varchar(255) not null, "bio" varchar(255) not null);');
    this.addSql('alter table "user_data" add constraint "user_data_pkey" primary key ("id");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user_data" cascade;');
  }

}
