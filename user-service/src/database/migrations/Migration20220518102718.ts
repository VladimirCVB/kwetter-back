import { Migration } from '@mikro-orm/migrations';

export class Migration20220518102718 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user_log" add constraint "user_log_user_name_unique" unique ("user_name");');
    this.addSql('alter table "user_log" add constraint "user_log_email_unique" unique ("email");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user_log" drop constraint "user_log_user_name_unique";');
    this.addSql('alter table "user_log" drop constraint "user_log_email_unique";');
  }

}
