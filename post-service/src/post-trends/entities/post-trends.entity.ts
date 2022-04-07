import { Entity, Filter, ManyToOne, Property } from '@mikro-orm/core';
import { PostData } from 'src/post-data/entities/post-data.entity';
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

  @ManyToOne({ entity: () => PostData, wrappedReference: true })
  lobby!: PostData;

  @Property({ nullable: true })
  deletedAt?: Date;
}
