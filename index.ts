import express, { Application, Request, Response, Errback, NextFunction, ErrorRequestHandler } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { Database } from './app/core/database'
import { cinemaRouter } from './app/routes/cinema.routes'


export default class Server {
    expressInstance: express.Express;

    constructor() {
        this.expressInstance = express();
        this.middlewareSetup();
        this.routingSetup();
        this.connectDatabase()
    }

    private middlewareSetup() {
        // Setup common security protection
        this.expressInstance.use(helmet());

        // Setup requests format parsing (Only JSON requests will be valid)
        this.expressInstance.use(bodyParser.urlencoded({ extended: true }));
        this.expressInstance.use(bodyParser.json());
    }

    private async connectDatabase(): Promise<void> {
        const database = new Database({
            url: 'mongodb://127.0.0.1:27017/testMongo',
            connectionOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        })
        await database.connect()
        // Global.App.Database = database
    }

    private routingSetup() {
        // Add to server routes
        this.expressInstance.use('/api/v1', cinemaRouter);

        // by deafult route
        this.expressInstance.get('/', (req, res) => {
            res.send("Welcome 🫰")
        });

        // error handler
        this.expressInstance.use(
            (err: ErrorRequestHandler, req: Request,
                res: Response, next: () => void) => {
                // console.log("req", req);

                // set locals, only providing error in development
                res.locals.error = req.app.get('env') === 'development' ? err : {};

                // render the error status code
                res.status(500);
                console.log(req.method, '\t', req.originalUrl);
                const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
                // console.log(fullUrl);
                next()
            });
    }
}