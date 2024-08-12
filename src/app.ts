import express from 'express';
import v1Endpoints from './endpoints/v1/v1.endpoints';
import swaggerV1 from './swagger/v1/swagger-v1';

const app = express();

app.use(express.json());

app.use('/api', v1Endpoints);
app.use('/api-docs', swaggerV1);

app.listen(process.env.PORT || 5000);
