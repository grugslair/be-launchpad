import { DataTypes, Model, Sequelize } from 'sequelize';

export interface ProjectCurrencyChainAttributes {
  currencyId: number;
  chainId: number;
  projectId: number;
  version: number;
  contractAddress: string;
}

export class ProjectCurrencyChain extends Model implements ProjectCurrencyChainAttributes {
  public currencyId!: number;
  public chainId!: number;
  public projectId!: number;
  public version!: number;
  public contractAddress!: string;

  static initModel(sequelize: Sequelize): void {
    ProjectCurrencyChain.init({
      currencyId: { type: DataTypes.INTEGER },
      chainId: { type: DataTypes.INTEGER },
      projectId: { type: DataTypes.INTEGER },
      version: { type: DataTypes.INTEGER },
      contractAddress: { type: DataTypes.STRING },
    }, {
      sequelize,
      tableName: 'project_currency_chain',
      underscored: true,
    });
  }

  static associateModel(sequelize: Sequelize): void {
    // set assoc here
    ProjectCurrencyChain.belongsTo(sequelize.models.Project, { foreignKey: 'projectId' });
    ProjectCurrencyChain.belongsTo(sequelize.models.Currency, { foreignKey: 'currencyId' });
    ProjectCurrencyChain.belongsTo(sequelize.models.Chain, { foreignKey: 'chainId' });
  }
}

