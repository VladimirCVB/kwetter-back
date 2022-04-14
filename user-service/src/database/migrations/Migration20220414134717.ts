import { Migration } from '@mikro-orm/migrations';

export class Migration20220414134717 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user_follow" add column "user_id_id" varchar(255) not null, add column "deleted_at" timestamptz(0) null;');
    this.addSql('alter table "user_follow" add constraint "user_follow_user_id_id_foreign" foreign key ("user_id_id") references "user_log" ("id") on update cascade;');
    this.addSql('alter table "user_follow" drop column "user_id";');
    this.addSql('alter table "user_follow" drop column "user_followed";');
    this.addSql('alter table "user_follow" drop column "user_following";');
    this.addSql('alter table "user_follow" add constraint "user_follow_user_id_id_unique" unique ("user_id_id");');

    this.addSql('alter table "user_log" add column "user_followed_id" varchar(255) not null, add column "user_following_id" varchar(255) not null, add column "deleted_at" timestamptz(0) null;');
    this.addSql('alter table "user_log" add constraint "user_log_user_followed_id_foreign" foreign key ("user_followed_id") references "user_follow" ("id") on update cascade;');
    this.addSql('alter table "user_log" add constraint "user_log_user_following_id_foreign" foreign key ("user_following_id") references "user_follow" ("id") on update cascade;');

    this.addSql('alter table "user_data" add column "deleted_at" timestamptz(0) null;');
    this.addSql('alter table "user_data" rename column "user_id" to "user_id_id";');
    this.addSql('alter table "user_data" add constraint "user_data_user_id_id_foreign" foreign key ("user_id_id") references "user_log" ("id") on update cascade;');
    this.addSql('alter table "user_data" add constraint "user_data_user_id_id_unique" unique ("user_id_id");');

    this.addSql('alter table "user_mention" add column "user_id_id" varchar(255) not null, add column "user_mentiones_id" varchar(255) not null, add column "deleted_at" timestamptz(0) null;');
    this.addSql('alter table "user_mention" add constraint "user_mention_user_id_id_foreign" foreign key ("user_id_id") references "user_log" ("id") on update cascade;');
    this.addSql('alter table "user_mention" add constraint "user_mention_user_mentiones_id_foreign" foreign key ("user_mentiones_id") references "user_log" ("id") on update cascade;');
    this.addSql('alter table "user_mention" drop column "user_id";');
    this.addSql('alter table "user_mention" drop column "user_mentioned";');
    this.addSql('alter table "user_mention" add constraint "user_mention_user_id_id_unique" unique ("user_id_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user_mention" drop constraint "user_mention_user_id_id_foreign";');
    this.addSql('alter table "user_mention" drop constraint "user_mention_user_mentiones_id_foreign";');

    this.addSql('alter table "user_follow" drop constraint "user_follow_user_id_id_foreign";');

    this.addSql('alter table "user_log" drop constraint "user_log_user_followed_id_foreign";');
    this.addSql('alter table "user_log" drop constraint "user_log_user_following_id_foreign";');

    this.addSql('alter table "user_data" drop constraint "user_data_user_id_id_foreign";');

    this.addSql('alter table "user_mention" add column "user_id" varchar(255) not null, add column "user_mentioned" varchar(255) not null;');
    this.addSql('alter table "user_mention" drop constraint "user_mention_user_id_id_unique";');
    this.addSql('alter table "user_mention" drop column "user_id_id";');
    this.addSql('alter table "user_mention" drop column "user_mentiones_id";');
    this.addSql('alter table "user_mention" drop column "deleted_at";');

    this.addSql('alter table "user_follow" add column "user_followed" varchar(255) not null, add column "user_following" jsonb not null;');
    this.addSql('alter table "user_follow" drop constraint "user_follow_user_id_id_unique";');
    this.addSql('alter table "user_follow" drop column "deleted_at";');
    this.addSql('alter table "user_follow" rename column "user_id_id" to "user_id";');

    this.addSql('alter table "user_log" drop column "user_followed_id";');
    this.addSql('alter table "user_log" drop column "user_following_id";');
    this.addSql('alter table "user_log" drop column "deleted_at";');

    this.addSql('alter table "user_data" drop constraint "user_data_user_id_id_unique";');
    this.addSql('alter table "user_data" drop column "deleted_at";');
    this.addSql('alter table "user_data" rename column "user_id_id" to "user_id";');
  }

}
