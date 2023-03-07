import { DataTypes, Model, Sequelize } from 'sequelize';
import { TRANSACTION_STATUS } from '../../utils/constants';

export interface CommitAttributes {
  id: number;
  projectId: number;
  trxHash: string;
  trxTimestamp: Date;
  status: string;
  walletAddress: string;
  amount: number;
}

export class Commit extends Model implements CommitAttributes {
  public id!: number;
  public projectId!: number;
  public trxHash!: string;
  public trxTimestamp!: Date;
  public status!: string;
  public walletAddress!: string;
  public amount!: number;

  static initModel(sequelize: Sequelize): void {
    Commit.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'id'
      },
      projectId: { type: DataTypes.INTEGER },
      status: { type: DataTypes.STRING, defaultValue: TRANSACTION_STATUS.SUCCESS },
      trxHash: { type: DataTypes.STRING },
      trxTimestamp: { type: DataTypes.DATE },
      walletAddress: { type: DataTypes.STRING },
      amount: { type: DataTypes.INTEGER },
    }, {
      sequelize,
      tableName: 'commits',
      underscored: true,
    });
  }

  static associateModel(): void {
    // set assoc here
  }
}

