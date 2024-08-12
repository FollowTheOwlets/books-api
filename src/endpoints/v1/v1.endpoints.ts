import { Router } from 'express';
import userEndpoints from './user.endpoints';
import bookEndpoints from './book.endpoints';
import authEndpoint from './auth.endpoints';

const v1 = Router();

v1.get('/v1', userEndpoints);
v1.put('/v1', bookEndpoints);
v1.put('/v1', authEndpoint);

export default v1;
