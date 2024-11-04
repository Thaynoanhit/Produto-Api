import dotenv from 'dotenv';
dotenv.config();
import pkg from 'pg';

const { Pool } = pkg;
const pool = new Pool({
  user: process.env.DATABASE_USERNAME,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

class ProdutoModel {
  constructor() {
    this.pool = pool;
  }

  async create(produtoData) {
    try {
      const { nome, descricao, preco, estoque, data } = produtoData;
      const result = await this.pool.query(
        `INSERT INTO produtos (nome, descricao, preco, estoque, data) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [nome, descricao, preco, estoque, data]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erro ao inserir o produto: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const result = await this.pool.query(`SELECT * FROM produtos ORDER BY id ASC`);
      return result.rows;
    } catch (error) {
      throw new Error(`Erro ao buscar produtos: ${error.message}`);
    }
  }

  async findByPk(id) {
    try {
      const result = await this.pool.query(`SELECT * FROM produtos WHERE id = $1`, [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Erro ao buscar produto com ID ${id}: ${error.message}`);
    }
  }

  async update(id, dadosAtualizados) {
    const { nome, descricao, preco, estoque, data } = dadosAtualizados;
    try {
      const result = await this.pool.query(
        `UPDATE produtos SET nome = $1, descricao = $2, preco = $3, estoque = $4, data = $5 WHERE id = $6 RETURNING *`,
        [nome, descricao, preco, estoque, data, id]
      );
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Erro ao atualizar produto com ID ${id}: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const result = await this.pool.query(
        `DELETE FROM produtos WHERE id = $1 RETURNING *`,
        [id]
      );
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Erro ao deletar produto com ID ${id}: ${error.message}`);
    }
  }
}

export default new ProdutoModel();
