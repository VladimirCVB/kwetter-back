import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../database/entities/base-entity.entity';

@Entity()
export class PostTrends extends BaseEntity {
  @Property()
  postId!: string;

  @Property()
  trendName!: string;
}
