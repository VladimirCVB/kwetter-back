import { Migration } from '@mikro-orm/migrations';

export class Migration20220324114944 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post_data" add column "test_prop" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post_data" drop column "test_prop";');
  }

}
