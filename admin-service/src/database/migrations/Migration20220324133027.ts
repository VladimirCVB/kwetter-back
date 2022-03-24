import { Migration } from '@mikro-orm/migrations';

export class Migration20220324133027 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user_manager" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id" varchar(255) not null);');
    this.addSql('alter table "user_manager" add constraint "user_manager_pkey" primary key ("id");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user_manager" cascade;');
  }

}
