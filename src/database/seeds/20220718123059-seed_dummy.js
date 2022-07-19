'use strict';
const vestingRuleId = 1;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const vestingRule = await queryInterface.rawSelect(
      'vesting_rules',
      { where: { id: vestingRuleId } },
      ['id']
    );

    if(!vestingRule) {
      await queryInterface.bulkInsert('vesting_rules', [
        {
          id: vestingRuleId,
          label: 'test rule 1',
          tge_percentage: 10,
          type: 'monthly',
          period_percentage: 5,
          cliff_period: 6,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
    }

    const projects = await queryInterface.rawSelect('projects', {}, ['id']);

    if (!projects) {
      return queryInterface.bulkInsert('projects', [
        {
          chain_id: 1,
          vesting_rule_id: vestingRuleId,
          name: 'Project A',
          token_contract_address: '0xd74cd9f124aa70784540bd7ce7634bac826018d9',
          token_symbol: 'INT',
          token_decimals: 1,
          token_initial_supply: 10000,
          description: 'Lorem Ipsum',
          status: 'pending',
          banner: null,
          logo: null,
          target_amount: 500000,
          public_sale_token_amount: 10000,
          public_sale_token_sold: 1000,
          public_sale_price: 2,
          min_investment: 100,
          period_start: '2022-07-01',
          period_end: '2022-07-31',
          discord_url: null,
          twitter_url: null,
          medium_url: null,
          official_url: null,
          created_at: new Date(),
          updated_at: new Date(),
        }
      ])
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('projects', { where: { vesting_rule_id: vestingRuleId } });

    return queryInterface.bulkDelete('vesting_rules', { where: { id: vestingRuleId } });
  }
};
