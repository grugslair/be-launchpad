import { Router } from 'express';
import { registerBinding, checkBinding } from '../modules/walletBinding/WalletBinding.controller';

const walletBindingRouter = Router();

walletBindingRouter.post('/register', registerBinding);
walletBindingRouter.get('/check/:ethereumAddress', checkBinding);

export { walletBindingRouter };
