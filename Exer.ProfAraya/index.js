// Importa o framework Express
const express = require("express");
// Importa o body-parser para tratar dados de formulários POST
const bodyParser = require("body-parser");

const path = require('path')

const app = express();
const port = 3000;

// Configura o body-parser para ler dados do corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos (como o HTML dos formulários)
app.use(express.static(path.join(__dirname, "public")));

// =========================================================================
// Rota principal (Mantenha ou altere para media.html, se preferir)
app.get("/", (req, res) => {
  // Alterei para carregar o novo formulário de média por padrão
  res.sendFile(path.join(__dirname, 'public', 'media.html')); 
});
// =========================================================================


// Rota para tratar o formulário GET (mantida)
app.get("/processar-get", (req, res) => {
  const { nome, idade } = req.query;
  res.send(`<h2>Dados recebidos via GET:</h2>
            <p>Nome: ${nome}</p>
            <p>Idade: ${idade}</p>`);
});

// Rota para tratar o formulário POST (mantida)
app.post("/processar-post", (req, res) => {
  const { nome, idade } = req.body;
  res.send(`<h2>Dados recebidos via POST:</h2>
            <p>Nome: ${nome}</p>
            <p>Idade: ${idade}</p>`);
});

// =========================================================================
// Rota para calcular a média e determinar a situação (NOVA ROTA)
app.post("/calcular-media", (req, res) => {
  // 1. Receber os dados do formulário via req.body (POST)
  const nome = req.body.nome;
  // Converte as notas para número, pois vêm como string do body-parser
  const nota1 = parseFloat(req.body.nota1); 
  const nota2 = parseFloat(req.body.nota2);
  
  // 2. Calcular a Média
  const media = (nota1 + nota2) / 2;
  
  // 3. Determinar a Situação com base nas regras de negócio
  let situacao = "";
  
  if (media >= 6) {
    situacao = "Aprovado";
  } else if (media >= 2 && media < 6) {
    situacao = "Exame Final";
  } else { // media < 2
    situacao = "Reprovado";
  }

  // 4. Construir a resposta HTML
  res.send(`
    <h2>Resultado do Cálculo de Média:</h2>
    
    <h3>Dados Recebidos:</h3>
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Nota 1:</strong> ${nota1.toFixed(1)}</p>
    <p><strong>Nota 2:</strong> ${nota2.toFixed(1)}</p>
    
    <h3>Resultado:</h3>
    <p><strong>Média Final:</strong> ${media.toFixed(2)}</p>
    <p><strong>Situação:</strong> <strong>${situacao}</strong></p>
    
    <br>
    <a href="/">Voltar ao formulário</a>
  `);
});
// =========================================================================

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});