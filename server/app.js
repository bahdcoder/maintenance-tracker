import cors from 'cors';
import logger from 'morgan';
import winston from 'winston';
import bodyParser from 'body-parser';
import Express from 'express';
import routes from './routes/index';

const app = new Express();


const port = process.env.PORT || 3000;
app.use(cors());
app.use(logger('development'));
app.use(bodyParser.json());

app.get('/', (request, response) => response.redirect('https://app.swaggerhub.com/apis/maureen-api/Maintenance-tracker-api/1.0.0'));

app.use(bodyParser.urlencoded({
  extended: false,
}));
routes(app);
app.use('/client', Express.static('public'));
if (!module.parent) {
  app.listen(port);
}

app.all('*', (req, res) => res.status(404).json({
  message: 'route is invalid, please put in valid route',
  status: 'fail',
}));

winston.log(`server is running at http://localhost:${port}`);

export default app;
