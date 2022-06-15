import { Migration } from '@mikro-orm/migrations';

export class Migration20220615121427 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "user_mention" drop constraint "user_mention_user_id_id_foreign";',
    );
    this.addSql(
      'alter table "user_mention" drop constraint "user_mention_user_mentiones_id_foreign";',
    );

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
      'alter table "user_data" drop constraint "user_data_user_id_id_foreign";',
    );

    this.addSql(
      'alter table "user_mention" add constraint "user_mention_user_id_id_foreign" foreign key ("user_id_id") references "user_log" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "user_mention" add constraint "user_mention_user_mentiones_id_foreign" foreign key ("user_mentiones_id") references "user_log" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "user_follow" add constraint "user_follow_user_id_id_foreign" foreign key ("user_id_id") references "user_log" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "user_follow" add constraint "user_follow_user_followed_id_foreign" foreign key ("user_followed_id") references "user_log" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "user_follow" add constraint "user_follow_user_following_id_foreign" foreign key ("user_following_id") references "user_log" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "user_data" add constraint "user_data_user_id_id_foreign" foreign key ("user_id_id") references "user_log" ("id") on update cascade on delete cascade;',
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
}
