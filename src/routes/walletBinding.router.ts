import { Router } from 'express';
import { registerBinding, checkBinding, checkWhitelist } from '../modules/walletBinding/WalletBinding.controller';

const walletBindingRouter = Router();

walletBindingRouter.post('/register', registerBinding);
walletBindingRouter.get('/check/:ethereumAddress', checkBinding);
walletBindingRouter.get('/whitelist/:ethereumAddress', checkWhitelist);

export { walletBindingRouter };
