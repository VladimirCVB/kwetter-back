import { Migration } from '@mikro-orm/migrations';

export class Migration20220324115431 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post_data" drop constraint if exists "post_data_hearts_check";');
    this.addSql('alter table "post_data" alter column "hearts" type int using ("hearts"::int);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post_data" drop constraint if exists "post_data_hearts_check";');
    this.addSql('alter table "post_data" alter column "hearts" type varchar(255) using ("hearts"::varchar(255));');
  }

}
