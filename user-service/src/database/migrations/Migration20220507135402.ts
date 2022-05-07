import { Migration } from '@mikro-orm/migrations';

export class Migration20220507135402 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user_log" drop constraint "user_log_user_followed_id_foreign";');
    this.addSql('alter table "user_log" drop constraint "user_log_user_following_id_foreign";');

    this.addSql('alter table "user_log" drop constraint if exists "user_log_user_followed_id_check";');
    this.addSql('alter table "user_log" alter column "user_followed_id" type varchar(255) using ("user_followed_id"::varchar(255));');
    this.addSql('alter table "user_log" alter column "user_followed_id" drop not null;');
    this.addSql('alter table "user_log" drop constraint if exists "user_log_user_following_id_check";');
    this.addSql('alter table "user_log" alter column "user_following_id" type varchar(255) using ("user_following_id"::varchar(255));');
    this.addSql('alter table "user_log" alter column "user_following_id" drop not null;');
    this.addSql('alter table "user_log" add constraint "user_log_user_followed_id_foreign" foreign key ("user_followed_id") references "user_follow" ("id") on update cascade on delete set null;');
    this.addSql('alter table "user_log" add constraint "user_log_user_following_id_foreign" foreign key ("user_following_id") references "user_follow" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user_log" drop constraint "user_log_user_followed_id_foreign";');
    this.addSql('alter table "user_log" drop constraint "user_log_user_following_id_foreign";');

    this.addSql('alter table "user_log" drop constraint if exists "user_log_user_followed_id_check";');
    this.addSql('alter table "user_log" alter column "user_followed_id" type varchar(255) using ("user_followed_id"::varchar(255));');
    this.addSql('alter table "user_log" alter column "user_followed_id" set not null;');
    this.addSql('alter table "user_log" drop constraint if exists "user_log_user_following_id_check";');
    this.addSql('alter table "user_log" alter column "user_following_id" type varchar(255) using ("user_following_id"::varchar(255));');
    this.addSql('alter table "user_log" alter column "user_following_id" set not null;');
    this.addSql('alter table "user_log" add constraint "user_log_user_followed_id_foreign" foreign key ("user_followed_id") references "user_follow" ("id") on update cascade;');
    this.addSql('alter table "user_log" add constraint "user_log_user_following_id_foreign" foreign key ("user_following_id") references "user_follow" ("id") on update cascade;');
  }

}
