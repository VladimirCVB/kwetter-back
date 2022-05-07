import { Migration } from '@mikro-orm/migrations';

export class Migration20220507145728 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user_data" drop constraint if exists "user_data_first_name_check";');
    this.addSql('alter table "user_data" alter column "first_name" type varchar(255) using ("first_name"::varchar(255));');
    this.addSql('alter table "user_data" alter column "first_name" drop not null;');
    this.addSql('alter table "user_data" drop constraint if exists "user_data_last_name_check";');
    this.addSql('alter table "user_data" alter column "last_name" type varchar(255) using ("last_name"::varchar(255));');
    this.addSql('alter table "user_data" alter column "last_name" drop not null;');
    this.addSql('alter table "user_data" drop constraint if exists "user_data_school_check";');
    this.addSql('alter table "user_data" alter column "school" type varchar(255) using ("school"::varchar(255));');
    this.addSql('alter table "user_data" alter column "school" drop not null;');
    this.addSql('alter table "user_data" drop constraint if exists "user_data_web_check";');
    this.addSql('alter table "user_data" alter column "web" type varchar(255) using ("web"::varchar(255));');
    this.addSql('alter table "user_data" alter column "web" drop not null;');
    this.addSql('alter table "user_data" drop constraint if exists "user_data_bio_check";');
    this.addSql('alter table "user_data" alter column "bio" type varchar(255) using ("bio"::varchar(255));');
    this.addSql('alter table "user_data" alter column "bio" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user_data" drop constraint if exists "user_data_first_name_check";');
    this.addSql('alter table "user_data" alter column "first_name" type varchar(255) using ("first_name"::varchar(255));');
    this.addSql('alter table "user_data" alter column "first_name" set not null;');
    this.addSql('alter table "user_data" drop constraint if exists "user_data_last_name_check";');
    this.addSql('alter table "user_data" alter column "last_name" type varchar(255) using ("last_name"::varchar(255));');
    this.addSql('alter table "user_data" alter column "last_name" set not null;');
    this.addSql('alter table "user_data" drop constraint if exists "user_data_school_check";');
    this.addSql('alter table "user_data" alter column "school" type varchar(255) using ("school"::varchar(255));');
    this.addSql('alter table "user_data" alter column "school" set not null;');
    this.addSql('alter table "user_data" drop constraint if exists "user_data_web_check";');
    this.addSql('alter table "user_data" alter column "web" type varchar(255) using ("web"::varchar(255));');
    this.addSql('alter table "user_data" alter column "web" set not null;');
    this.addSql('alter table "user_data" drop constraint if exists "user_data_bio_check";');
    this.addSql('alter table "user_data" alter column "bio" type varchar(255) using ("bio"::varchar(255));');
    this.addSql('alter table "user_data" alter column "bio" set not null;');
  }

}
