import { DataTypes, Model, Sequelize } from 'sequelize';

export interface CurrencyAttributes {
  id: number
  symbol: string
  contractAddress: string
  name: string
  decimals: number
  rate: number
}

export class Currency extends Model implements CurrencyAttributes {
  public id!: number;
  public symbol!: string
  public contractAddress!: string
  public name!: string
  public decimals!: number
  public rate!: number

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

