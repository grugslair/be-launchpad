import { DataTypes, Model, Sequelize } from 'sequelize';
import { Commit } from './commit';
import { Currency } from './currency';
import { ProjectVesting } from './projectVesting';
import { ProjectCommit } from './projectCommit';
import { Registration } from './registration';
import { VestingRule } from './vestingRule';
import { ProjectToCurrency } from './projectToCurrency';
import { Chain } from './chain';

export interface ProjectAttributes {
  id: number
  chainId: number
  vestingRuleId: number
  name: string
  tokenContractAddress: string
  crowdSmartContract: string
  tokenSymbol: string
  tokenDecimals: number
  tokenInitialSupply: string
  tokenTotalSupply: string
  description: string
  status: string
  banner: string
  logo: string
  targetAmount: number
  publicSaleTokenAmount: string
  publicSaleTokenSold: string
  publicSalePrice: string
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
  public tokenInitialSupply!: string;
  public tokenTotalSupply!: string;
  public description!: string;
  public status!: string;
  public banner!: string;
  public logo!: string;
  public targetAmount!: number;
  public publicSaleTokenAmount!: string;
  public publicSaleTokenSold!: string;
  public publicSalePrice!: string;
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
      tokenInitialSupply: { type: DataTypes.STRING },
      tokenTotalSupply: { type: DataTypes.STRING }, 
      description: { type: DataTypes.TEXT },
      status: { type: DataTypes.STRING },
      banner: { type: DataTypes.STRING },
      logo: { type: DataTypes.STRING },
      targetAmount: { type: DataTypes.STRING },
      publicSaleTokenAmount: { type: DataTypes.STRING },
      publicSaleTokenSold: { type: DataTypes.STRING },
      publicSalePrice: { type: DataTypes.STRING },
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
    Project.belongsToMany(Currency, {
      through: {
        model: ProjectToCurrency,
        unique: false
      },
      foreignKey: 'projectId',
      constraints: false,
    });
    Project.belongsTo(Chain, { foreignKey: 'chainId' });
    Project.belongsTo(VestingRule, { foreignKey: 'vestingRuleId' });
    Project.hasOne(ProjectVesting, { foreignKey: 'projectId' });
    Project.hasMany(Registration, { foreignKey: 'projectId' });
    Project.hasMany(Commit, { foreignKey: 'projectId' });
    Project.hasMany(ProjectCommit, { foreignKey: 'projectId' });
  }
}

