const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const supabaseUrl = 'https://kbylaysxbafpbojdywtj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtieWxheXN4YmFmcGJvamR5d3RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM4NTE1MTgsImV4cCI6MTk5OTQyNzUxOH0.Q_fS53HILFzs08uplWRnVz2VDVw_sOcuh3bp5le2lyg';
app.use(bodyParser.json());

// Consultar todos os produtos
app.get('/produtos', (req, res) => {
  res.json(produtos);
});

// Consultar um produto pelo ID
app.get('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find((p) => p.id === id);
  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ error: 'Produto não encontrado' });
  }
});

// Cadastrar um produto
app.post('/produtos', (req, res) => {
  const produto = req.body;
  produto.id = produtos.length + 1;
  produtos.push(produto);
  res.status(201).json(produto);
});

// Alterar um produto
app.put('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produtoIndex = produtos.findIndex((p) => p.id === id);
  if (produtoIndex !== -1) {
    produtos[produtoIndex] = { id, ...req.body };
    res.json(produtos[produtoIndex]);
  } else {
    res.status(404).json({ error: 'Produto não encontrado' });
  }
});

// Deletar um produto
app.delete('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produtoIndex = produtos.findIndex((p) => p.id === id);
  if (produtoIndex !== -1) {
    const produtoRemovido = produtos.splice(produtoIndex, 1);
    res.json(produtoRemovido[0]);
  } else {
    res.status(404).json({ error: 'Produto não encontrado' });
  }
});

// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
