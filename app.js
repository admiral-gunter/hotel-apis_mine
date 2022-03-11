import bodyParser from 'body-parser';
import express from 'express';
import authRouter from './modules/auth/routes.js';
import path from 'path';
import DBConnection from './db/connection.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import roomRouter from './modules/room/routes.js';
import bookingRouter from './modules/booking/routes.js';

const __dirname = path.resolve();
DBConnection.connect();
const app=express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, CompanyID");
    next();
});

app.use(cors());

app.use(cookieParser())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.urlencoded({ extended: true }));
// plantRouter(app);

app.use(express.static(__dirname + "/resources"));
app.use(authRouter);
app.use(roomRouter)
app.use(bookingRouter)

app.listen(process.env.PORT,"0.0.0.0",()=>console.log("Listening on PORT "+process.env.PORT))