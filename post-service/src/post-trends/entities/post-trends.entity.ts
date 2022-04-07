import { Entity, Filter, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../database/entities/base-entity.entity';

@Entity()
@Filter({
  name: 'isActive',
  cond: { deletedAt: null },
  default: true,
})
export class PostTrends extends BaseEntity {
  @Property()
  postId!: string;

  @Property()
  trends!: string[];

  @Property({ nullable: true })
  deletedAt?: Date;
}
