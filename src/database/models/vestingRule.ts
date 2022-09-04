import { DataTypes, Model, Sequelize } from 'sequelize';

export interface VestingRuleAttributes {
  id: Number
  label: String
  tgePercentage: Number
  type: String
  periodPercentage: Number
  cliffPeriod: Number
}

export class VestingRule extends Model implements VestingRuleAttributes {
  public id!: Number;
  public label!: String
  public tgePercentage!: Number
  public type!: String
  public periodPercentage!: Number
  public cliffPeriod!: Number

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

