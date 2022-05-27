import { Migration } from '@mikro-orm/migrations';

export class Migration20220519192340 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user_log" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "user_role" text not null default \'regular\', "deleted_at" timestamptz(0) null);',
    );
    this.addSql(
      'alter table "user_log" add constraint "user_log_user_name_unique" unique ("user_name");',
    );
    this.addSql(
      'alter table "user_log" add constraint "user_log_email_unique" unique ("email");',
    );
    this.addSql(
      'alter table "user_log" add constraint "user_log_pkey" primary key ("id");',
    );

    this.addSql(
      'create table "user_follow" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id_id" varchar(255) not null, "user_followed_id" varchar(255) null, "user_following_id" varchar(255) null, "deleted_at" timestamptz(0) null);',
    );
    this.addSql(
      'alter table "user_follow" add constraint "user_follow_user_id_id_unique" unique ("user_id_id");',
    );
    this.addSql(
      'alter table "user_follow" add constraint "user_follow_pkey" primary key ("id");',
    );

    this.addSql(
      'create table "user_mention" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id_id" varchar(255) not null, "user_mentiones_id" varchar(255) not null, "post_id" varchar(255) not null, "deleted_at" timestamptz(0) null);',
    );
    this.addSql(
      'alter table "user_mention" add constraint "user_mention_user_id_id_unique" unique ("user_id_id");',
    );
    this.addSql(
      'alter table "user_mention" add constraint "user_mention_pkey" primary key ("id");',
    );

    this.addSql(
      'create table "user_data" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id_id" varchar(255) not null, "first_name" varchar(255) null, "last_name" varchar(255) null, "school" varchar(255) null, "web" varchar(255) null, "bio" varchar(255) null, "deleted_at" timestamptz(0) null);',
    );
    this.addSql(
      'alter table "user_data" add constraint "user_data_user_id_id_unique" unique ("user_id_id");',
    );
    this.addSql(
      'alter table "user_data" add constraint "user_data_pkey" primary key ("id");',
    );

    this.addSql(
      'alter table "user_follow" add constraint "user_follow_user_id_id_foreign" foreign key ("user_id_id") references "user_log" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "user_follow" add constraint "user_follow_user_followed_id_foreign" foreign key ("user_followed_id") references "user_log" ("id") on update cascade on delete set null;',
    );
    this.addSql(
      'alter table "user_follow" add constraint "user_follow_user_following_id_foreign" foreign key ("user_following_id") references "user_log" ("id") on update cascade on delete set null;',
    );

    this.addSql(
      'alter table "user_mention" add constraint "user_mention_user_id_id_foreign" foreign key ("user_id_id") references "user_log" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "user_mention" add constraint "user_mention_user_mentiones_id_foreign" foreign key ("user_mentiones_id") references "user_log" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "user_data" add constraint "user_data_user_id_id_foreign" foreign key ("user_id_id") references "user_log" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "user_follow" drop constraint "user_follow_user_id_id_foreign";',
    );

    this.addSql(
      'alter table "user_follow" drop constraint "user_follow_user_followed_id_foreign";',
    );

    this.addSql(
      'alter table "user_follow" drop constraint "user_follow_user_following_id_foreign";',
    );

    this.addSql(
      'alter table "user_mention" drop constraint "user_mention_user_id_id_foreign";',
    );

    this.addSql(
      'alter table "user_mention" drop constraint "user_mention_user_mentiones_id_foreign";',
    );

    this.addSql(
      'alter table "user_data" drop constraint "user_data_user_id_id_foreign";',
    );

    this.addSql('drop table if exists "user_log" cascade;');

    this.addSql('drop table if exists "user_follow" cascade;');

    this.addSql('drop table if exists "user_mention" cascade;');

    this.addSql('drop table if exists "user_data" cascade;');
  }
}
