import { DataTypes, Model, Sequelize } from 'sequelize';

export interface RaffleAttributes {
  starknet_wallet_address: string;
  starknet_id: string;
  discord_id: string;
  discord_username: string;
  discord_role_wojak: boolean;
  twitter_username: string;
  twitter_tweeted: boolean;
  twitter_followed_grug: boolean;
  twitter_followed_briq: boolean;
}

export class Raffle extends Model implements RaffleAttributes {
  public starknet_wallet_address!: string;
  public starknet_id!: string;
  public discord_id!: string;
  public discord_username!: string;
  public discord_role_wojak!: boolean;
  public twitter_username!: string;
  public twitter_tweeted!: boolean;
  public twitter_followed_grug!: boolean;
  public twitter_followed_briq!: boolean;

  static initModel(sequelize: Sequelize): void {
    Raffle.init({
      starknet_wallet_address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        field: 'starknet_wallet_address'
      },
      starknet_id: { type: DataTypes.STRING },
      discord_id: { type: DataTypes.STRING, unique: true },
      discord_username: { type: DataTypes.STRING },
      discord_role_wojak: { type: DataTypes.BOOLEAN },
      twitter_username: { type: DataTypes.STRING, unique: true },
      twitter_tweeted: { type: DataTypes.BOOLEAN },
      twitter_followed_grug: { type: DataTypes.BOOLEAN },
      twitter_followed_briq: { type: DataTypes.BOOLEAN },
    }, {
      sequelize,
      tableName: 'raffles',
      paranoid: true,
      underscored: true,
    });
  }

  static associateModel(sequelize: Sequelize): void {
    // set associations here
    Raffle.belongsTo(sequelize.models.Raffle, { foreignKey: 'starknet_wallet_address' });
  }
}
