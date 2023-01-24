import { DataTypes, Model, Sequelize } from 'sequelize';

export interface RegistrationAttributes {
  id: number;
  projectId: number;
  walletAddress: string;
  amount: number;
}

export class Registration extends Model implements RegistrationAttributes {
  public id!: number;
  public projectId!: number;
  public walletAddress!: string;
  public amount!: number;

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

