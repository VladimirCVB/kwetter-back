import { Entity, Filter, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../database/entities/base-entity.entity';

@Entity()
@Filter({
  name: 'isActive',
  cond: { deletedAt: null },
  default: true,
})
export class BannedUsers extends BaseEntity {
  @Property({ type: String, nullable: false })
  userId!: string;

  @Property({ type: String, nullable: false })
  userName!: string;

  @Property({ nullable: true })
  deletedAt?: Date;
}
