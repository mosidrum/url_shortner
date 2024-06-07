import express from 'express';
import dotenv from 'dotenv';
import { logger } from "./services";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

app.get('/', (req, res) => {
	logger.info('GET / request was received successfully')
	res.send('Welcome to url shorter api');
});

app.listen(port, () => {
	logger.info(`Server started and listening on port: ${port}`)
	console.log(`Server started and listening on port: ${port}`);
});

app.use((err: any, res: any) => {
	logger.error(err.stack);
	res.status(500).send('Something went wrong!')
})
