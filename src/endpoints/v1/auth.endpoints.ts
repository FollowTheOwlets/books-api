import { Router } from 'express';
import { register, login, confirmEmail } from '../../services/auth.service';

const authEndpoint = Router();

authEndpoint.post('/register', register);
authEndpoint.get('/users/confirm/:token', confirmEmail);
authEndpoint.post('/login', login);

export default authEndpoint;
