import { Optional } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./User";

export interface PostAttributes {
  id: number;
  title: string;
  content: string;
  userId: number;
}

export interface PostCreationAttributes extends Optional<
  PostAttributes,
  "id"
> {}

@Table({ tableName: "posts" })
export class Post
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes
{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public title!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  public content!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public userId!: number;

  @BelongsTo(() => User)
  public user!: User;
}
