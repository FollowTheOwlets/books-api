import { Router } from 'express';
import { isAdmin, isAuthenticated } from '../../middleware/auth.middleware';
import { changeUserRole, getUserInfo } from '../../services/user.service';

const userEndpoints = Router();

userEndpoints.get('/users/me', isAuthenticated, getUserInfo);
userEndpoints.put('/users/:id/:role', isAdmin, changeUserRole);

export default userEndpoints;
