// src/database/models/walletBinding.ts
import { Model, DataTypes, Sequelize } from 'sequelize';

export class WalletBinding extends Model {
  // Define model attributes here
  public id!: number;
  public ethereumAddress!: string;
  public starkNetAddress!: string;

  // Initialize model
  static initModel(sequelize: Sequelize): void {
    WalletBinding.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ethereumAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      starkNetAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'WalletBinding',
    });
  }

  // Model associations
  static associateModel(): void {
    // Define any associations here
  }
}
