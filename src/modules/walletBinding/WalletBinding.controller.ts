import { Request, Response } from 'express';
import { WalletBinding } from '../../database/models/walletBinding'; // Adjust the path as necessary

class WalletBindingController {
    constructor() {
        // Ensuring 'this' is correctly bound in the methods used as Express middleware
        this.registerBinding = this.registerBinding.bind(this);
        this.checkBinding = this.checkBinding.bind(this);
        this.checkWhitelist = this.checkWhitelist.bind(this);
    }

    public async checkWhitelist(req: Request, res: Response): Promise<Response> {
        const { ethereumAddress } = req.params;
    
        // Log the incoming Ethereum address to verify it's correctly received
        console.log("Checking whitelist status for Ethereum address:", ethereumAddress);
    
        try {
            console.log('WalletBinding model:', WalletBinding); // This logs the model to ensure it's imported correctly
            const whitelistEntry = await WalletBinding.findOne({
                where: { ethereumAddress },
                attributes: ['whitelistAmount'] // Adjust if your actual database column name uses a different case or format
            });
    
            // Log the result of the query to see what was found
            console.log("Whitelist entry found:", whitelistEntry);
    
            if (whitelistEntry) {
                // Log to confirm the branch and data
                console.log("Whitelist amount for the address:", whitelistEntry.whitelistAmount);
    
                return res.status(200).json({ 
                    isWhitelisted: true, 
                    whitelistAmount: whitelistEntry.whitelistAmount 
                });
            } else {
                // Log to confirm that no entry was found for the provided address
                console.log("No whitelist entry found for the address.");
    
                return res.status(200).json({ isWhitelisted: false, whitelistAmount: 0 });
            }
        } catch (error) {
            // Log the error to help diagnose the issue
            console.error("Error checking whitelist status:", error);
    
            return res.status(500).json({ message: "Error checking whitelist status." });
        }
    }

    private async isAlreadyBound(ethereumAddress: string): Promise<boolean> {
        const binding = await WalletBinding.findOne({ where: { ethereumAddress } });
        return !!binding;
    }

    public async registerBinding(req: Request, res: Response): Promise<Response> {
        const { ethereumAddress, starkNetAddress } = req.body;

        if (!ethereumAddress) {
            return res.status(400).json({ message: "Ethereum address is required." });
        }

        // Perform the whitelist check directly here
        const whitelistEntry = await WalletBinding.findOne({ where: { ethereumAddress } });
        if (!whitelistEntry) {
            return res.status(400).json({ message: "Ethereum address is not whitelisted." });
        }

        if (await WalletBinding.findOne({ where: { ethereumAddress } })) {
            return res.status(400).json({ message: "Ethereum address is already bound to a StarkNet wallet." });
        }

        const newBinding = await WalletBinding.create({ ethereumAddress, starkNetAddress: starkNetAddress || null });
        return res.status(201).json({ message: "Binding successfully created.", binding: newBinding });
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
export const { registerBinding, checkBinding, checkWhitelist } = walletBindingController;