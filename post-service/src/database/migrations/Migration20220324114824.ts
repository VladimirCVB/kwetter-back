import { Migration } from '@mikro-orm/migrations';

export class Migration20220324114824 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "post_trends" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "post_id" varchar(255) not null, "trend_name" varchar(255) not null);');
    this.addSql('alter table "post_trends" add constraint "post_trends_pkey" primary key ("id");');

    this.addSql('create table "post_data" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id" varchar(255) not null, "hearts" varchar(255) not null, "text" varchar(255) not null, "trends" varchar(255) not null);');
    this.addSql('alter table "post_data" add constraint "post_data_pkey" primary key ("id");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "post_trends" cascade;');

    this.addSql('drop table if exists "post_data" cascade;');
  }

}
