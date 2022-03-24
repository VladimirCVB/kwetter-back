import { Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
// import { PostTrends } from '../../post-trends/entities/post-trends.entity';
import { BaseEntity } from '../../database/entities/base-entity.entity';

@Entity()
export class PostData extends BaseEntity {
  @Property()
  userId!: string;

  @Property()
  hearts!: number;

  @Property()
  text!: string;

  @Property()
  trends: string;

  // @Property()
  // testProp: PostTrends;
}