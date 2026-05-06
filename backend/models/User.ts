import { Optional } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
} from "sequelize-typescript";

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface UserCreationAttributes extends Optional<
  UserAttributes,
  "id"
> {}

@Table({ tableName: "users" })
export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public name!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  public email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public password!: string;
}
