import { Migration } from '@mikro-orm/migrations';

export class Migration20220615121359 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "post_trends" drop constraint "post_trends_post_id_id_foreign";',
    );

    this.addSql(
      'alter table "post_trends" add constraint "post_trends_post_id_id_foreign" foreign key ("post_id_id") references "post_data" ("id") on update cascade on delete cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "post_trends" drop constraint "post_trends_post_id_id_foreign";',
    );

    this.addSql(
      'alter table "post_trends" add constraint "post_trends_post_id_id_foreign" foreign key ("post_id_id") references "post_data" ("id") on update cascade;',
    );
  }
}
