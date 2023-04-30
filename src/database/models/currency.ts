import { DataTypes, Model, Sequelize } from 'sequelize';

export interface CurrencyAttributes {
  id: number
  symbol: string
  contractAddress: string
  chainName: string
  networkId: string
  rpcUrl: string
  chainLogo: string
  chainColor: string
  name: string
  decimals: number
  rate: number
}

export class Currency extends Model implements CurrencyAttributes {
  public id!: number;
  public symbol!: string
  public contractAddress!: string
  public chainName!: string
  public networkId!: string
  public rpcUrl!: string
  public chainLogo!: string
  public chainColor!: string
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
      chainName: { type: DataTypes.STRING },
      networkId: { type: DataTypes.STRING },
      rpcUrl: { type: DataTypes.STRING },
      chainLogo: { type: DataTypes.STRING },
      chainColor: { type: DataTypes.STRING },
    }, {
      sequelize,
      tableName: 'currencies',
      underscored: true,
    });
  }

  static associateModel(sequelize: Sequelize): void {
    // set assoc here
    Currency.hasMany(sequelize.models.ProjectCommit, {
      foreignKey: 'currencyId',
    });
  }
}

