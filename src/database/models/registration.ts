import { DataTypes, Model, Sequelize } from 'sequelize';

export interface RegistrationAttributes {
  id: Number;
  projectId: Number;
  walletAddress: String;
  amount: Number;
}

export class Registration extends Model implements RegistrationAttributes {
  public id!: Number;
  public projectId!: Number;
  public walletAddress!: String;
  public amount!: Number;

  static initModel(sequelize: Sequelize): void {
    Registration.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'id'
      },
      projectId: { type: DataTypes.INTEGER },
      walletAddress: { type: DataTypes.STRING },
      amount: { type: DataTypes.STRING },
    }, {
      sequelize,
      tableName: 'registrations',
      paranoid: true,
      underscored: true,
    });
  }

  static associateModel(): void {
    // set assoc here
  }
}

