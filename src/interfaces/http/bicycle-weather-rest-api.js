import express from 'express';
import bodyParser from 'body-parser';

const HTTP_PORT = 3000;
const app = express();
const router = express.Router();

export class BicycleWeatherRestApi {
    constructor(){
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
    }

    starter() {
        app.get('/', (req, res) => {
            console.log('Calling path: ', req.route.path);
            res.send('hello world')
        });

        app.get('/health', (req, res) => {
            console.log('Calling path: ', req.route.path);
            res.send('Info');
        });

        app.listen(HTTP_PORT);

        console.log(`Started RESTful API server on: ${HTTP_PORT} ...`);
    }
}
