import { DataTypes, Model, Sequelize } from 'sequelize';
import { Chain } from './chain';
import { Currency } from './currency';
import { VestingRule } from './vestingRule';

export interface ProjectAttributes {
  id: number
  chainId: number
  vestingRuleId: number
  name: string
  tokenContractAddress: string
  crowdSmartContract: string
  tokenSymbol: string
  tokenDecimals: number
  tokenInitialSupply: number
  tokenTotalSupply: number
  description: string
  status: string
  banner: string
  logo: string
  targetAmount: number
  publicSaleTokenAmount: number
  publicSaleTokenSold: number
  publicSalePrice: number
  publicSaleCurrencyId: string
  maxAllocation: number
  minStaking: number
  registrationPeriodStart: Date
  registrationPeriodEnd: Date
  buyPeriodStart: Date
  buyPeriodEnd: Date
  claimPeriodStart: Date
  discordUrl: string
  twitterUrl: string
  mediumUrl: string
  officialUrl: string
}

export class Project extends Model implements ProjectAttributes {
  public id!: number;
  public chainId!: number;
  public vestingRuleId!: number;
  public name!: string;
  public tokenContractAddress!: string;
  public crowdSmartContract!: string;
  public tokenSymbol!: string;
  public tokenDecimals!: number;
  public tokenInitialSupply!: number;
  public tokenTotalSupply!: number;
  public description!: string;
  public status!: string;
  public banner!: string;
  public logo!: string;
  public targetAmount!: number;
  public publicSaleTokenAmount!: number;
  public publicSaleTokenSold!: number;
  public publicSalePrice!: number;
  public publicSaleCurrencyId!: string;
  public minStaking!: number;
  public maxAllocation!: number;
  public registrationPeriodStart!: Date;
  public registrationPeriodEnd!: Date;
  public buyPeriodStart!: Date;
  public buyPeriodEnd!: Date;
  public claimPeriodStart!: Date;
  public discordUrl!: string;
  public twitterUrl!: string;
  public mediumUrl!: string;
  public officialUrl!: string;

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
      crowdSmartContract: { type: DataTypes.STRING },
      tokenSymbol: { type: DataTypes.STRING },
      tokenDecimals: { type: DataTypes.INTEGER },
      tokenInitialSupply: { type: DataTypes.INTEGER },
      tokenTotalSupply: { type: DataTypes.INTEGER }, 
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
      maxAllocation: { type: DataTypes.FLOAT },
      registrationPeriodStart: { type: DataTypes.DATE },
      registrationPeriodEnd: { type: DataTypes.DATE },
      buyPeriodStart: { type: DataTypes.DATE },
      buyPeriodEnd: { type: DataTypes.DATE },
      claimPeriodStart: { type: DataTypes.DATE },
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

