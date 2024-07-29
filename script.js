const veiculos = {
  "NENHUM":2,
    "Caminhão 2 eixos grande (toco)": 2190,
    "Caminhão 2 eixos médio (3/4)": 2150,
    "Caminhão 3 eixos (truck)": 2290,
    "Caminhão 4 eixos (bi-truck)": 2450,
    "Caminhão pequeno": 1990,
    "Cavalo mecânico 2 eixos": 2190,
    "Cavalo mecânico 3 eixos": 2390,
    "Cavalo mecânico 4 eixos (bi-truck)": 2590,
    "Caminhonete 4x4": 1590,
    "Ducato/Master/Jumper": 1990,
    "Fiat Strada ou similar": 1290,
    "Fiorino ou furgão pequeno": 1490,
    "Ford Transit ou similar": 2070,
    "Sprinter 16 passageiros": 2190,
    "Sprinter 20 passageiros": 2260,
    "Sprinter Chassis": 2160,
    "Sprinter Furgão Extra Longa": 2290,
    "Sprinter Furgão normal": 2190,
    "Sprinter Furgão teto alto": 2260
};

const implementos = {
  "NENHUM":(2),
    "Baú fechado (grande)": 250,
    "Baú fechado (médio)": 200,
    "Baú fechado (pequeno)": 150,
    "Betoneira": 690,
    "Caçamba basculante": 370,
    "Carreta 2 eixos": 650,
    "Carreta 3 eixos": 850,
    "Empilhadeira": 690,
    "Gaiola": 350,
    "Guindaste grande (mais de 50t)": 2290,
    "Guindaste médio (10 a 50t)": 1390,
    "Lança hidráulica": 1380,
    "Manipulador Telescópico": 2250,
    "Mini Bomba": 790,
    "Mini carregadeira": 1150,
    "Motoniveladora": 2390,
    "Munck grande (mais de 15t)": 1380,
    "Munck médio (5 a 15t)": 850,
    "Plataforma elevatória": 1280,
    "Reboque médio": 350,
    "Reboque pequeno": 180,
    "Retroescavadeira": 2290,
    "Roll on/Roll off": 750,
    "Tanque de combustível ou água": 450,
    "Thermoking (refrigerador)": 370,
    "Trator de Esteira": 2280
};

const localizacoes = {
  
    "Duque de Caxias, Belford Roxo": 20,
    "Magé": 40,
    "Nova Iguaçu": 40,
    "Seropédica, Queimados, Japeri": 50,
    "Rio de Janeiro": 20,
    "Campo Grande, Itaguai": 50,
    "São Gonçalo, Niterói, Itaboraí": 60,
    "Região dos Lagos": 100,
    "Interior do Rio": 90,
  "100":100,
  "150":150,
  "200":200,
  "250":250,
  "300":300,
  "350":350,
  "400":400,
  "500":500,
  "600":600,
  "800":800,
  "1000":1000,
 
};

let veiculosAdicionados = [];
let desconto = 0;
let cliente = {};

function mostrarTela(telaId) {
    document.querySelectorAll('.tela').forEach(tela => {
        tela.classList.remove('active');
    });
    document.getElementById(telaId).classList.add('active');
}

function cadastrarCliente() {
    const nome = document.getElementById('nome-cliente').value;
    const telefone = document.getElementById('telefone-cliente').value;
    const email = document.getElementById('email-cliente').value;
    const cpfCnpj = document.getElementById('cpf-cnpj-cliente').value;

    if (nome && telefone && email && cpfCnpj) {
        cliente = { nome, telefone, email, cpfCnpj };
        mostrarTela('tela-inicial');
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function enviarVeiculo() {
    const tipoVeiculo = document.getElementById('tipo-veiculo').value;
    const tipoImplemento = document.getElementById('tipo-implemento').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const localizacao = document.getElementById('localizacao').value;

    if (tipoVeiculo && tipoImplemento && quantidade > 0 && localizacao) {
        veiculosAdicionados.push({
            tipoVeiculo,
            tipoImplemento,
            quantidade,
            localizacao
        });
        mostrarTela('tela-enviado');
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function aplicarDesconto() {
    const quantidadeDesconto = parseInt(document.getElementById('quantidade-desconto').value);
    if (quantidadeDesconto > 0) {
        desconto = quantidadeDesconto;
        mostrarTela('tela-enviado');
    } else {
        alert('Por favor, insira uma quantidade válida.');
    }
}

function gerarOrcamento() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const dataEmissao = new Date();
    const dataVencimento = new Date();
    dataVencimento.setMonth(dataVencimento.getMonth() + 1);

    const numeroOrcamento = 150 + veiculosAdicionados.length;

    // Título do orçamento
    doc.setFontSize(22);
  doc.text(`ORÇAMENTO Nº ${numeroOrcamento} / ${dataEmissao.getFullYear()}`, 10, 16);
 
    // Dados da empresa emissora
    doc.setFontSize(13);
    doc.text('VCR VACINA CONTRA ROUBO LTDA', 10, 30);

  doc.setFontSize(10);
     doc.text('luisfelipe@vacinacontraroubo.com.br', 10, 36); doc.setFontSize(9);
    doc.text('(21) 97907-1371', 10, 40);
   doc.setFontSize(8);
    doc.text(`Data de Emissão: ${dataEmissao.toLocaleDateString()}`, 160, 14);
    doc.text(`Data de Vencimento: ${dataVencimento.toLocaleDateString()}`, 10, 290);   
  doc.setFontSize(9);
  doc.text('www.vacinacontraroubo.com', 90, 290);

    // Dados do cliente

    doc.setFontSize(13);
    doc.text(` ${cliente.nome}`, 10, 51);
   doc.setFontSize(10);
    doc.text(` ${cliente.email}`, 10,61);
     doc.setFontSize(9);
     doc.text(` CNPJ/CPF: ${cliente.cpfCnpj}`, 10, 56);
    doc.text(`${cliente.telefone}`, 11, 66);
  

    // Tabela de veículos
    let valorTotal = 0;
    const rows = veiculosAdicionados.map((item, index) => {
        const valorVeiculo = veiculos[item.tipoVeiculo];
        const valorImplemento = implementos[item.tipoImplemento];
        const valorLocalizacao = localizacoes[item.localizacao];
        const valorUnitario = valorVeiculo + valorImplemento + valorLocalizacao;
        const valorQuantidade = valorUnitario * item.quantidade;

        valorTotal += valorQuantidade;

        return [
            item.tipoVeiculo,
            item.tipoImplemento,
            item.quantidade,
            `R$ ${valorUnitario.toFixed(2)}`,
            `R$ ${valorQuantidade.toFixed(2)}`
        ];
    });

    doc.autoTable({
        head: [['Veículo', 'Implemento', 'Quantidade', 'Valor Unitário', 'Valor Total']],
        body: rows,
        startY: 75,
        theme: 'grid'
    });

    // Valor total e desconto
    let y = doc.previousAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Valor Total: R$ ${valorTotal.toFixed(2)}`, 10, y);
    y += 10;

    if (desconto > 0) {
        const valorDesconto = desconto * 100; // Exemplo de cálculo de desconto
        doc.text(`Desconto: R$ ${valorDesconto.toFixed(2)}`, 10, y);
        y += 10;
        valorTotal -= valorDesconto;
    }

    doc.text(`Valor Final: R$ ${valorTotal.toFixed(2)}`, 10, y);

   
    doc.save(`orcamento_${numeroOrcamento}.pdf`);
}

function resetarOrcamento() {
    veiculosAdicionados = [];
    desconto = 0;
    cliente = {};
    document.getElementById('form-cadastrar-cliente').reset();
    document.getElementById('form-adicionar').reset();
    document.getElementById('quantidade-desconto').value = '';
    mostrarTela('tela-inicial');
}

document.addEventListener('DOMContentLoaded', () => {
    const tipoVeiculoSelect = document.getElementById('tipo-veiculo');
    const tipoImplementoSelect = document.getElementById('tipo-implemento');
    const localizacaoSelect = document.getElementById('localizacao');

    for (const veiculo in veiculos) {
        const option = document.createElement('option');
        option.value = veiculo;
        option.textContent = veiculo;
        tipoVeiculoSelect.appendChild(option);
    }

    for (const implemento in implementos) {
        const option = document.createElement('option');
        option.value = implemento;
        option.textContent = implemento;
        tipoImplementoSelect.appendChild(option);
    }

    for (const localizacao in localizacoes) {
        const option = document.createElement('option');
        option.value = localizacao;
        option.textContent = localizacao;
        localizacaoSelect.appendChild(option);
    }
});