import { Entity, Filter, OneToMany, Property } from '@mikro-orm/core';
import { PostTrends } from '../../post-trends/entities/post-trends.entity';
import { BaseEntity } from '../../database/entities/base-entity.entity';

@Entity()
@Filter({
  name: 'isActive',
  cond: { deletedAt: null },
  default: true,
})
export class PostData extends BaseEntity {
  @Property()
  userId!: string;

  @Property()
  userName!: string;

  @Property()
  hearts!: number;

  @Property()
  text!: string;

  @OneToMany({ entity: () => PostTrends, mappedBy: 'trends', hidden: true })
  trends: PostTrends[];

  @Property({ nullable: true })
  deletedAt?: Date;
}
