import { DataTypes, Model, Sequelize } from 'sequelize';
import { TRANSACTION_STATUS } from '../../utils/constants';
import { Chain } from './chain';
import { Currency } from './currency';

export interface CurrencyToChainAttributes {
  currencyId: number;
  chainId: number;
}

export class CurrencyToChain extends Model implements CurrencyToChainAttributes {
  public currencyId!: number;
  public chainId!: number;

  static initModel(sequelize: Sequelize): void {
    CurrencyToChain.init({
      currencyId: { type: DataTypes.INTEGER },
      chainId: { type: DataTypes.INTEGER },
    }, {
      sequelize,
      tableName: 'currency_to_chain',
      underscored: true,
    });
  }

  static associateModel(sequelize: Sequelize): void {
    // set assoc here
    CurrencyToChain.belongsTo(sequelize.models.Currency, { foreignKey: 'currencyId' });
    CurrencyToChain.belongsTo(sequelize.models.Chain, { foreignKey: 'chainId' });
  }
}

