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

export interface HardwareProfileAttributes {
  id: number;
  cpu: string;
  gpu: string;
  ram: number;
  vram: number;
  resolution: string;
  userId: number;
}

export interface HardwareProfileCreationAttributes extends Optional<
  HardwareProfileAttributes,
  "id"
> {}

@Table({ tableName: "hardware_profiles" })
export class HardwareProfile
  extends Model<HardwareProfileAttributes, HardwareProfileCreationAttributes>
  implements HardwareProfileAttributes
{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public cpu!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public gpu!: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public ram!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public vram!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public resolution!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public userId!: number;

  @BelongsTo(() => User)
  public user!: User;
}
