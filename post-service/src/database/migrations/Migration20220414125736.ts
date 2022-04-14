import { Migration } from '@mikro-orm/migrations';

export class Migration20220414125736 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "post_trends" drop constraint "post_trends_trends_id_foreign";',
    );

    this.addSql(
      'alter table "post_trends" add column "post_id_id" varchar(255) not null, add column "trends" text[] not null;',
    );
    this.addSql(
      'alter table "post_trends" add constraint "post_trends_post_id_id_foreign" foreign key ("post_id_id") references "post_data" ("id") on update cascade;',
    );
    this.addSql('alter table "post_trends" drop column "post_id";');
    this.addSql('alter table "post_trends" drop column "trends_id";');
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "post_trends" drop constraint "post_trends_post_id_id_foreign";',
    );

    this.addSql(
      'alter table "post_trends" add column "trends_id" varchar(255) not null;',
    );
    this.addSql(
      'alter table "post_trends" add constraint "post_trends_trends_id_foreign" foreign key ("trends_id") references "post_data" ("id") on update cascade;',
    );
    this.addSql('alter table "post_trends" drop column "trends";');
    this.addSql(
      'alter table "post_trends" rename column "post_id_id" to "post_id";',
    );
  }
}
