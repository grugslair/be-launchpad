import { Request, Response } from "express";
import { DB, RaffleAttributes } from "../../database/models";

export class RaffleController {
  constructor() {
    this.updateRaffle = this.updateRaffle.bind(this);
    this.getRaffle = this.getRaffle.bind(this);
  }

  private async getDiscordUpdates(raffle: RaffleAttributes, discord_id: string, discord_username: string, discord_role_wojak: boolean) {
    if (discord_id && discord_username && discord_role_wojak) {
      return {
        discord_id: raffle.discord_id ? raffle.discord_id : discord_id,
        discord_username: raffle.discord_username ? raffle.discord_username : discord_username,
        discord_role_wojak: raffle.discord_role_wojak ? raffle.discord_role_wojak : true,
      };
    }
    return {};
  }

  private async getTwitterUpdates(raffle: RaffleAttributes, twitter_username: string, twitter_tweeted: boolean) {
    if (twitter_username && twitter_tweeted) {
      return {
        twitter_username: raffle.twitter_username ? raffle.twitter_username : twitter_username,
        twitter_tweeted: raffle.twitter_tweeted ? raffle.twitter_tweeted : true,
      };
    }
    return {};
  }

  public async getRaffle(req: Request, res: Response) {
    const { starknet_wallet_address } = req.params;
  
    const raffle = await DB.Raffle.findOne({
      where: { starknet_wallet_address },
      attributes: ['discord_role_wojak', 'twitter_tweeted', 'twitter_followed_grug', 'twitter_followed_briq']  // Only fetch these fields
    });
  
    if (!raffle) {
      return res.status(404).send("No raffle data found for this wallet address.");
    }
  
    res.json(raffle);
  }

  public async updateRaffle(req: Request, res: Response) {
    const { starknet_wallet_address, starknet_id, discord_id, discord_username, discord_role_wojak, twitter_username, twitter_tweeted, twitter_followed_grug, twitter_followed_briq } = req.body;

    let raffle = await DB.Raffle.findOne({
      where: { starknet_wallet_address }
    });

    if (!raffle) {
      raffle = await DB.Raffle.create({
        starknet_wallet_address,
        starknet_id,
        discord_id,
        discord_username,
        discord_role_wojak: discord_role_wojak || false,
        twitter_username,
        twitter_tweeted: twitter_tweeted || false,
        twitter_followed_grug: twitter_followed_grug || false,
        twitter_followed_briq: twitter_followed_briq || false
      });

      return res.status(201).json({message: "New row created successfully", starknet_wallet_address: raffle.starknet_wallet_address});
    } else {
      // Get grouped update parameters
      const discordUpdates = await this.getDiscordUpdates(raffle, discord_id, discord_username, discord_role_wojak);
      const twitterUpdates = await this.getTwitterUpdates(raffle, twitter_username, twitter_tweeted);

      // Update following fields individually
      const followingUpdates = {
        twitter_followed_grug: twitter_followed_grug && !raffle.twitter_followed_grug ? true : raffle.twitter_followed_grug,
        twitter_followed_briq: twitter_followed_briq && !raffle.twitter_followed_briq ? true : raffle.twitter_followed_briq,
      };

      // Combine all updates into a single object
      const updateParams = { starknet_id, ...discordUpdates, ...twitterUpdates, ...followingUpdates };

      // Check if there are any fields to update
      if (Object.keys(updateParams).length > 0) {
        await raffle.update(updateParams);
        // Return success message
        return res.json({message: "Update successful"});
      } else {
        return res.status(400).json({message: "No updates were made"});
      }
    }
  }
}