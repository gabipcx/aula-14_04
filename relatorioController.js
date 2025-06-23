const Produto = require('../models/relatorioModels');
const PdfPrinter = require('pdfmake');

exports.getAllProdutos = (req, res) => {
    Produto.getAllProdutos((produtos) => {
        if (!Array.isArray(produtos)) {
            console.error("Erro no retorno de getAllUsers há um erro.");
            return res.status(500).send("Erro ao buscar usuários.");
        }
        res.render("relatorio", { produtos });
    });
};


async function gerarPDF(produtos) {

    const fonts = {
        Roboto: {
            normal: 'node_modules/pdfmake/fonts/Roboto-Regular.ttf',
            bold: 'node_modules/pdfmake/fonts/Roboto-Bold.ttf',
            italics: 'node_modules/pdfmake/fonts/Roboto-Italic.ttf',
            bolditalics: 'node_modules/pdfmake/fonts/Roboto-BoldItalic.ttf',
        }
    };

    const printer = new PdfPrinter(fonts);

    const docDefinition = {
        content: [
            { text: 'Relatório de Clientes', style: 'header' },
            {
                table: {
                    headerRows: 1,
                    widths: ['auto', '*', '*',  '*', '*', '*', '*', '*'],
                    body: [
                        ['ID', 'Name', 'Descricao', 'Fornecedor', 'Marca', 'Compra', 'Venda', 'Estoque'],
                        ...produtos.map(produto => [
                            produto.id, 
                            produto.name, 
                            produto.descricao,
                            produto.fornecedor,
                            produto.marca,
                            produto.compra,
                            produto.venda,
                            produto.estoque
                           ]),
                        
                    ],
                }
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10],
            }
        }
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const chunks = [];

    return new Promise((resolve, reject) => {
        pdfDoc.on('data', (chunk) => chunks.push(chunk));
        pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
        pdfDoc.on('error', reject);
        pdfDoc.end();
    });
}




exports.generatePDF = async (req, res) => {

    const produtos = await Produto.getAllProdutostoPDF();
    const pdfBuffer = await gerarPDF(produtos);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; finalename=relatorio.pdf');
    res.send(pdfBuffer);

};