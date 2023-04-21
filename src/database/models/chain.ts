import { DataTypes, Model, Sequelize } from 'sequelize';

export interface ChainAttributes {
  id: number
  networkId: string
  rpcUrl: string
  name: string
  logo: string
  color: string
}

export class Chain extends Model implements ChainAttributes {
  public id!: number;
  public networkId!: string
  public rpcUrl!: string
  public name!: string
  public logo!: string
  public color!: string

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
      defaultScope: {
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        }
      }
    });
  }

  static associateModel(): void {
    // set assoc here
  }
}

