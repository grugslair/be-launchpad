import { DataTypes, Model, Sequelize } from 'sequelize';

export interface ProjectToCurrencyAttributes {
  projectId: number;
  currencyId: number;
  crowdSmartContract: string;
}

export class ProjectToCurrency extends Model implements ProjectToCurrencyAttributes {
  public projectId!: number;
  public currencyId!: number;
  public crowdSmartContract!: string;

  static initModel(sequelize: Sequelize): void {
    ProjectToCurrency.init({
      projectId: { type: DataTypes.INTEGER },
      currencyId: { type: DataTypes.INTEGER },
      crowdSmartContract: { type: DataTypes.STRING },
    }, {
      sequelize,
      tableName: 'project_to_currency',
      underscored: true,
    });
  }

  static associateModel(sequelize: Sequelize): void {
    // set assoc here
    ProjectToCurrency.belongsTo(sequelize.models.Project, { foreignKey: 'projectId' });
    ProjectToCurrency.belongsTo(sequelize.models.Currency, { foreignKey: 'currencyId' });
  }
}

