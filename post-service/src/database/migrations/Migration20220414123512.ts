import { Migration } from '@mikro-orm/migrations';

export class Migration20220414123512 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "post_data" add column "deleted_at" timestamptz(0) null;',
    );
    this.addSql(
      'alter table "post_data" rename column "trends" to "user_name";',
    );

    this.addSql(
      'alter table "post_trends" add column "deleted_at" timestamptz(0) null;',
    );
    this.addSql(
      'alter table "post_trends" rename column "trend_name" to "trends_id";',
    );
    this.addSql(
      'alter table "post_trends" add constraint "post_trends_trends_id_foreign" foreign key ("trends_id") references "post_data" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "post_trends" drop constraint "post_trends_trends_id_foreign";',
    );

    this.addSql('alter table "post_data" drop column "deleted_at";');
    this.addSql(
      'alter table "post_data" rename column "user_name" to "trends";',
    );

    this.addSql('alter table "post_trends" drop column "deleted_at";');
    this.addSql(
      'alter table "post_trends" rename column "trends_id" to "trend_name";',
    );
  }
}
