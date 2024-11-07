import express from 'express';
import ProdutoRoute from './src/route/ProdutoRoute.js';
import cors from 'cors';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use('/produtos/', ProdutoRoute);
  }
}

export default new App().app;
