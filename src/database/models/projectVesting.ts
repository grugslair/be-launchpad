import { DataTypes, Model, Sequelize } from 'sequelize';

export interface ProjectVestingAttributes {
  id: number;
  chainId: number;
  vestingContractAddress: string;
  version: number;
  details: Record<string, any>;
}

export class ProjectVesting extends Model implements ProjectVestingAttributes {
  public id!: number;
  public chainId!: number;
  public vestingContractAddress!: string;
  public version!: number;
  public details!: Record<string, any>;

  static initModel(sequelize: Sequelize): void {
    ProjectVesting.init({
      projectId: { type: DataTypes.INTEGER },
      vestingContractAddress: { type: DataTypes.STRING, field: 'contract_address' },
      version: { type: DataTypes.INTEGER },
      details: { type: DataTypes.JSONB },
    }, {
      sequelize,
      tableName: 'project_vesting',
      underscored: true,
      defaultScope: {
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        }
      }
    });
  }

  static associateModel(sequelize: Sequelize): void {
    // set assoc here
    ProjectVesting.belongsTo(sequelize.models.Project, { foreignKey: 'projectId' });
  }
}

