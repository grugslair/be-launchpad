import { Request, Response } from 'express';
import { WalletBinding } from '../../database/models/walletBinding'; // Adjust the path as necessary

class WalletBindingController {
    constructor() {
        // Ensuring 'this' is correctly bound in the methods used as Express middleware
        this.registerBinding = this.registerBinding.bind(this);
        this.checkBinding = this.checkBinding.bind(this);
    }

    private async isWhitelisted(ethereumAddress: string): Promise<boolean> {
        // Implement actual whitelist checking logic here
        return true; // Placeholder implementation
    }

    private async isAlreadyBound(ethereumAddress: string): Promise<boolean> {
        const binding = await WalletBinding.findOne({ where: { ethereumAddress } });
        return !!binding;
    }

    public async registerBinding(req: Request, res: Response): Promise<Response> {
        const { ethereumAddress, starkNetAddress } = req.body;

        if (!ethereumAddress || !starkNetAddress) {
            return res.status(400).json({ message: "Ethereum and StarkNet addresses are required." });
        }

        try {
            if (!await this.isWhitelisted(ethereumAddress)) {
                return res.status(400).json({ message: "Ethereum address is not whitelisted." });
            }

            if (await this.isAlreadyBound(ethereumAddress)) {
                return res.status(400).json({ message: "Ethereum address is already bound to a StarkNet wallet." });
            }

            const newBinding = await WalletBinding.create({ ethereumAddress, starkNetAddress });
            return res.status(201).json({ message: "Binding successfully created.", binding: newBinding });
        } catch (error) {
            console.error("Error registering wallet binding:", error);
            return res.status(500).json({ message: "Error registering wallet binding." });
        }
    }

    public async checkBinding(req: Request, res: Response): Promise<Response> {
        const { ethereumAddress } = req.params;

        try {
            const binding = await WalletBinding.findOne({ where: { ethereumAddress } });
            if (binding) {
                return res.status(200).json({ isBound: true, starkNetAddress: binding.starkNetAddress });
            } else {
                return res.status(200).json({ isBound: false });
            }
        } catch (error) {
            console.error("Error checking wallet binding:", error);
            return res.status(500).json({ message: "Error checking wallet binding." });
        }
    }
}

// Create a single instance of the controller
const walletBindingController = new WalletBindingController();

// Export the instance methods directly
export const { registerBinding, checkBinding } = walletBindingController;