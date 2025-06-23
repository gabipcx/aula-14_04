const express = require('express');
const bodyParser = require('body-parser');
const produtoController = require('./controlles/relatorioController');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', produtoController.getAllProdutos);

app.get('/relatorio/pdf', produtoController.generatePDF);

app.listen(2000, () => {
    console.log('servidor rodando na porta 2000');
});