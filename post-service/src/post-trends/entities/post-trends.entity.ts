import { Entity, Filter, ManyToOne, Property } from '@mikro-orm/core';
import { PostData } from '../../post-data/entities/post-data.entity';
import { BaseEntity } from '../../database/entities/base-entity.entity';

@Entity()
@Filter({
  name: 'isActive',
  cond: { deletedAt: null },
  default: true,
})
export class PostTrends extends BaseEntity {
  @ManyToOne({ entity: () => PostData, wrappedReference: true, onDelete: 'cascade'  })
  postId!: PostData;

  @Property()
  trends!: string[];

  @Property({ nullable: true })
  deletedAt?: Date;
}
