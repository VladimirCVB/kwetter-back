import { Migration } from '@mikro-orm/migrations';

export class Migration20220324101203 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user_mention" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id" varchar(255) not null, "user_mentioned" varchar(255) not null, "post_id" varchar(255) not null);',
    );
    this.addSql(
      'alter table "user_mention" add constraint "user_mention_pkey" primary key ("id");',
    );

    this.addSql(
      'create table "user_follow" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id" varchar(255) not null, "user_followed" varchar(255) not null, "user_following" jsonb not null);',
    );
    this.addSql(
      'alter table "user_follow" add constraint "user_follow_pkey" primary key ("id");',
    );

    this.addSql(
      'alter table "user_data" add column "user_id" varchar(255) not null;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user_mention" cascade;');

    this.addSql('drop table if exists "user_follow" cascade;');

    this.addSql('alter table "user_data" drop column "user_id";');
  }
}
