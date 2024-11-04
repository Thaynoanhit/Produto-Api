import express from 'express';
import ProdutoRoute from './src/route/ProdutoRoute.js';

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/produtos/', ProdutoRoute);
    }
}

export default new App().app;