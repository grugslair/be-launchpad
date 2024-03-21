import { Request, Response } from 'express';
import { WalletBinding } from '../../database/models/walletBinding'; // Adjust the path as necessary

class WalletBindingController {
    constructor() {
        this.binding = this.binding.bind(this);
        this.checkBinding = this.checkBinding.bind(this);
        this.checkWhitelist = this.checkWhitelist.bind(this);
        this.unbinding = this.unbinding.bind(this);
    }

    public async checkWhitelist(req: Request, res: Response): Promise<Response> {
        const { ethereumAddress } = req.query;

        if (!ethereumAddress) {
            return res.status(400).json({ message: "Ethereum address is required." });
        }
    
        console.log("Checking whitelist status for Ethereum address:", ethereumAddress);
    
        try {
            const whitelistEntry = await WalletBinding.findOne({
                where: { ethereumAddress },
                attributes: ['whitelistAmount']
            });

            const { whitelistAmount = 0 } = whitelistEntry || {};
    
            return res.status(200).json({ whitelistAmount });
        } catch (error) {
            console.error("Error checking whitelist status:", error);
    
            return res.status(500).json({ message: "Error checking whitelist status." });
        }
    }

    public async binding(req: Request, res: Response): Promise<Response> {
        const { ethereumAddress, starkNetAddress } = req.body;

        if (!ethereumAddress) {
            return res.status(400).json({ message: "Ethereum address is required." });
        }

        if (!starkNetAddress) {
            return res.status(400).json({ message: "Starknet address is required." });
        }

        const whitelistEntry = await WalletBinding.findOne({ where: { ethereumAddress } });

        if (!whitelistEntry) {
            return res.status(400).json({ message: "Ethereum address is not whitelisted." });
        }

        if (whitelistEntry.starkNetAddress) {
            return res.status(422).json({ message: "Ethereum address is already bound to a StarkNet wallet." });
        }

        await whitelistEntry.update({ starkNetAddress });

        return res.status(200).json({ message: "Successfully binding" });
    }

    public async unbinding(req: Request, res: Response): Promise<Response> {
        const { ethereumAddress } = req.body;

        if (!ethereumAddress) {
            return res.status(400).json({ message: "Ethereum address is required." });
        }

        const whitelistEntry = await WalletBinding.findOne({ where: { ethereumAddress } });

        if (!whitelistEntry) {
            return res.status(400).json({ message: "Ethereum address is not whitelisted." });
        }

        if (!whitelistEntry.starkNetAddress) {
            return res.status(422).json({ message: "Ethereum address is not connected to any StarkNet wallet." });
        }

        await whitelistEntry.update({ starkNetAddress: null });

        return res.status(200).json({ message: "Succesfully unbinding" });
    }

    public async checkBinding(req: Request, res: Response): Promise<Response> {
        const { ethereumAddress, starkNetAddress } = req.query;

        if (!ethereumAddress) {
            return res.status(400).json({ message: "Ethereum address is required." });
        }

        if (!starkNetAddress) {
            return res.status(400).json({ message: "StarkNet address is required." });
        }

        try {
            const binding = await WalletBinding.findOne({ where: { ethereumAddress } });

            if (!binding) {
                return res.status(400).json({ message: "Ethereum address is invalid" });
            }

            if (binding.starkNetAddress) {
                if (binding.starkNetAddress === starkNetAddress) {
                    return res.status(200).json({ status: 'connected' });
                } else {
                    return res.status(200).json({ status: 'connected_to_other' })
                }
            } else {
                return res.status(200).json({ status: 'not_connected' })
            }
        } catch (error) {
            console.error("Error checking wallet binding:", error);
            return res.status(500).json({ message: "Error checking wallet binding." });
        }
    }
}

export { WalletBindingController };