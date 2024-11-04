import { Router } from 'express';
import ProdutoController from '../controller/ProdutoController.js';

const ProdutoRoute = new Router();

ProdutoRoute.post('/', ProdutoController.create);

ProdutoRoute.get('/', ProdutoController.findAll);

ProdutoRoute.get('/:id', ProdutoController.findById);

ProdutoRoute.put('/:id', ProdutoController.update);

ProdutoRoute.delete('/:id', ProdutoController.delete);

export default ProdutoRoute;