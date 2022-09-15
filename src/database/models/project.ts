import { DataTypes, Model, Sequelize } from 'sequelize';
import { Chain } from './chain';
import { Currency } from './currency';
import { VestingRule } from './vestingRule';

export interface ProjectAttributes {
  id: Number
  chainId: Number
  vestingRuleId: Number
  name: String
  tokenContractAddress: String
  tokenSymbol: String
  tokenDecimals: Number
  tokenInitialSupply: Number
  tokenTotalSupply: Number
  description: String
  status: String
  banner: String
  logo: String
  targetAmount: Number
  publicSaleTokenAmount: Number
  publicSaleTokenSold: Number
  publicSalePrice: Number
  publicSaleCurrencyId: String
  minStaking: Number
  periodStart: Date
  periodEnd: Date
  discordUrl: String
  twitterUrl: String
  mediumUrl: String
  officialUrl: String
}

export class Project extends Model implements ProjectAttributes {
  public id!: Number;
  public chainId!: Number;
  public vestingRuleId!: Number;
  public name!: String;
  public tokenContractAddress!: String;
  public tokenSymbol!: String;
  public tokenDecimals!: Number;
  public tokenInitialSupply!: Number;
  public tokenTotalSupply!: Number;
  public description!: String;
  public status!: String;
  public banner!: String;
  public logo!: String;
  public targetAmount!: Number;
  public publicSaleTokenAmount!: Number;
  public publicSaleTokenSold!: Number;
  public publicSalePrice!: Number;
  public publicSaleCurrencyId!: String;
  public minStaking!: Number;
  public periodStart!: Date;
  public periodEnd!: Date;
  public discordUrl!: String;
  public twitterUrl!: String;
  public mediumUrl!: String;
  public officialUrl!: String;

  static initModel(sequelize: Sequelize): void {
    Project.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'id'
      },
      chainId: { type: DataTypes.INTEGER },
      vestingRuleId: { type: DataTypes.INTEGER },
      name: { type: DataTypes.STRING },
      tokenContractAddress: { type: DataTypes.STRING },
      tokenSymbol: { type: DataTypes.STRING },
      tokenDecimals: { type: DataTypes.INTEGER },
      tokenInitialSupply: { type: DataTypes.INTEGER },
      description: { type: DataTypes.TEXT },
      status: { type: DataTypes.STRING },
      banner: { type: DataTypes.STRING },
      logo: { type: DataTypes.STRING },
      targetAmount: { type: DataTypes.INTEGER },
      publicSaleTokenAmount: { type: DataTypes.FLOAT },
      publicSaleTokenSold: { type: DataTypes.FLOAT },
      publicSalePrice: { type: DataTypes.FLOAT },
      publicSaleCurrencyId: { type: DataTypes.INTEGER },
      minStaking: { type: DataTypes.FLOAT },
      periodStart: { type: DataTypes.DATE },
      periodEnd: { type: DataTypes.DATE },
      discordUrl: { type: DataTypes.STRING },
      twitterUrl: { type: DataTypes.STRING },
      mediumUrl: { type: DataTypes.STRING },
      officialUrl: { type: DataTypes.STRING },
    }, {
      sequelize,
      tableName: 'projects',
      paranoid: true,
      underscored: true,
    });
  }

  static associateModel(): void {
    // set assoc here
    Project.belongsTo(Chain, { foreignKey: 'chainId' });
    Project.belongsTo(Currency, { foreignKey: 'publicSaleCurrencyId' });
    Project.belongsTo(VestingRule, { foreignKey: 'vestingRuleId' });
  }
}

