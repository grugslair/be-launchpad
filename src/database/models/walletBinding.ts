import { Model, DataTypes, Sequelize } from 'sequelize';

export class WalletBinding extends Model {
  public id!: number;
  public ethereumAddress!: string;
  public starkNetAddress!: string;
  public whitelistAmount!: number; // Add this line to define the new attribute in your class

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
        allowNull: true,
      },
      whitelistAmount: { // Add the new column definition
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Assuming 0 as default, adjust based on your needs
      },
    }, {
      sequelize,
      modelName: 'WalletBinding',
      // Consider adding timestamps if not already included
      timestamps: true, // This adds createdAt and updatedAt automatically
      underscored: true,
      // Note: If you manually manage timestamps, you may need additional setup for updatedAt
    });
    console.log('WalletBinding model initialized:', WalletBinding)
    console.log('WalletBinding model sequelize initialized:', sequelize.models.WalletBinding);
  }

  // Model associations
  static associateModel(): void {
    // Define any associations here
  }
}
