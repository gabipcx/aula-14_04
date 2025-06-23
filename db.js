
const mysql = require ('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:  'crud_mvc'
});

conexao.connect((erro) => {
    if (erro) {
        console.error('erro ao conectar ao banco de dados:', erro);
        return;
    }
    console.log('conexao com o banco de dados estabelecida!');
});

module.exports = conexao;