import { DataTypes, Model, Sequelize } from 'sequelize';

export interface VestingRuleAttributes {
  id: number
  label: string
  tgePercentage: number
  type: string
  periodPercentage: number
  cliffPeriod: number
}

export class VestingRule extends Model implements VestingRuleAttributes {
  public id!: number;
  public label!: string
  public tgePercentage!: number
  public type!: string
  public periodPercentage!: number
  public cliffPeriod!: number

  static initModel(sequelize: Sequelize): void {
    VestingRule.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'id'
      },
      label: { type: DataTypes.STRING },
      tgePercentage: { type: DataTypes.INTEGER },
      type: { type: DataTypes.STRING },
      periodPercentage: { type: DataTypes.INTEGER },
      cliffPeriod: { type: DataTypes.INTEGER },
    }, {
      sequelize,
      tableName: 'vesting_rules',
//      paranoid: true,
      underscored: true,
    });
  }

  static associateModel(): void {
    // set assoc here
  }
}

