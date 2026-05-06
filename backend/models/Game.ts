import { Optional } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
} from "sequelize-typescript";

export type Platform = "Steam" | "Epic" | "GOG";

export interface GameAttributes {
  id: number;
  title: string;
  platform: Platform;
  performanceScore: number;
  expectedFps: number;
  cover: string;
}

export interface GameCreationAttributes extends Optional<
  GameAttributes,
  "id"
> {}

@Table({ tableName: "games" })
export class Game
  extends Model<GameAttributes, GameCreationAttributes>
  implements GameAttributes
{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public title!: string;

  @AllowNull(false)
  @Column(DataType.ENUM("Steam", "Epic", "GOG"))
  public platform!: Platform;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public performanceScore!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public expectedFps!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public cover!: string;
}
