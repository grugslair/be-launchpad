import { DataTypes, Model, Sequelize } from 'sequelize';

export interface ChainAttributes {
  id: Number
  networkId: String
  rpcUrl: String
  name: String
  logo: String
  color: String
}

export class Chain extends Model implements ChainAttributes {
  public id!: Number;
  public networkId!: String
  public rpcUrl!: String
  public name!: String
  public logo!: String
  public color!: String

  static initModel(sequelize: Sequelize): void {
    Chain.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'id'
      },
      networkId: { type: DataTypes.STRING },
      rpcUrl: { type: DataTypes.STRING },
      name: { type: DataTypes.STRING },
      logo: { type: DataTypes.STRING },
      color: { type: DataTypes.STRING },
    }, {
      sequelize,
      tableName: 'chains',
      underscored: true,
    });
  }

  static associateModel(): void {
    // set assoc here
  }
}

