import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
// Error Handler for Dev
import errorHandler from 'errorhandler';
// Routes
// import { dummyData } from './routes/dummy.js';

const app = express();
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** **************CROS*************** */
app.use(
	cors({
		origin: '*',
	})
);
app.options('*', cors());

/** **************DOTENV*************** */
dotenv.config({
	path: path.join(__dirname, '.env'),
});

/** **************REQUEST LOG*************** */
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8000);

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

// Serve our static build files
app.use(express.static(path.join(__dirname, './build')));

app.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname, './build/index.html'));
});

/** **************DEFAULT API ENDPOINT*************** */
app.use('/api', router);

/** **************DEVELOPMENT SERVER ERROR HANDLER*************** */
if (process.env.NODE_ENV === 'development') {
	app.use(errorHandler());
}

console.log('ads', process.env.NODE_ENV);

app.listen(app.get('port'), () => {
	console.log(
		`Node.js App is running at http://localhost:${app.get('port')} in ${app.get(
			'env'
		)} server`
	);
	console.log('Press CTRL-C to stop\n');
});

/** ************************************************************ */
/** **********************ALL Routes*************************** */
/** ********************************************************** */
// dummyData(router);

// Serving react on routes unused by previous routing
app.get('*', (req, res) => {
	res.status(404).send('Custom 404 Page Not Found!');
});

export default app;
