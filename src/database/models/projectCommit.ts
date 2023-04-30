import { DataTypes, Model, Sequelize } from 'sequelize';

export interface ProjectCommitAttributes {
  currencyId: number;
  projectId: number;
  version: number;
  commitContractAddress: string;
}

export class ProjectCommit extends Model implements ProjectCommitAttributes {
  public currencyId!: number;
  public projectId!: number;
  public version!: number;
  public commitContractAddress!: string;

  static initModel(sequelize: Sequelize): void {
    ProjectCommit.init({
      currencyId: { type: DataTypes.INTEGER },
      projectId: { type: DataTypes.INTEGER },
      version: { type: DataTypes.INTEGER },
      commitContractAddress: { type: DataTypes.STRING, field: 'contract_address' },
    }, {
      sequelize,
      tableName: 'project_commit',
      underscored: true,
    });
  }

  static associateModel(sequelize: Sequelize): void {
    // set assoc here
    ProjectCommit.belongsTo(sequelize.models.Project, { foreignKey: 'projectId' });
    ProjectCommit.belongsTo(sequelize.models.Currency, { foreignKey: 'currencyId' });

    ProjectCommit.removeAttribute('id');
  }
}

