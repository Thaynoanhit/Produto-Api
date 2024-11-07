import ProdutoModel from '../model/ProdutoModel.js';

class ProdutoController {
  async create(req, res) {
    try {
      const produto = await ProdutoModel.create(req.body);
      return res.status(201).json(produto); // Retorna 201 ao criar com sucesso
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const produtos = await ProdutoModel.findAll();
      return res.json(produtos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async findById(req, res) {
    try {
      const produto = await ProdutoModel.findByPk(req.params.id);
      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      return res.json(produto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const produtoAtualizado = await ProdutoModel.update(req.params.id, req.body);
      if (!produtoAtualizado) {
        return res.status(404).json({ error: 'Produto não encontrado para atualização' });
      }
      return res.json(produtoAtualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const produtoDeletado = await ProdutoModel.delete(req.params.id);
      if (!produtoDeletado) {
        return res.status(404).json({ error: 'Produto não encontrado para exclusão' });
      }
      return res.json(produtoDeletado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ProdutoController();
