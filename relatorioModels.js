const db = require('../conexao/db');


const Produtos = {

    getAllProdutos: (callback) => {
        const sql = 'SELECT * FROM produtos';
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results);
        });
    },


    getAllProdutostoPDF: () => {
        const sql = 'SELECT * FROM produtos';
        return new Promise((resolve, reject) =>{
            db.query(sql, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },
};
module.exports = Produtos;