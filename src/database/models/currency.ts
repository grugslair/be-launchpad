import { DataTypes, Model, Sequelize } from 'sequelize';

export interface CurrencyAttributes {
  id: Number
  symbol: String
  contractAddress: String
  name: String
  decimals: Number
  rate: Number
}

export class Currency extends Model implements CurrencyAttributes {
  public id!: Number;
  public symbol!: String
  public contractAddress!: String
  public name!: String
  public decimals!: Number
  public rate!: Number

  static initModel(sequelize: Sequelize): void {
    Currency.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'id'
      },
      symbol: { type: DataTypes.STRING },
      contractAddress: { type: DataTypes.STRING },
      name: { type: DataTypes.STRING },
      decimals: { type: DataTypes.INTEGER },
      rate: { type: DataTypes.INTEGER },
    }, {
      sequelize,
      tableName: 'currencies',
      underscored: true,
    });
  }

  static associateModel(): void {
    // set assoc here
  }
}

