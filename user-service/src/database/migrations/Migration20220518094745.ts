import { Migration } from '@mikro-orm/migrations';

export class Migration20220518094745 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user_log" add column "user_role" text not null default \'regular\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user_log" drop column "user_role";');
  }

}
