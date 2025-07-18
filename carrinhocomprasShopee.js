const readline = require('readline');

const produtos = [
  { id: 1, nome: "Camisa Polo", preco: 79.90 },
  { id: 2, nome: "Tênis Esportivo", preco: 299.90 },
  { id: 3, nome: "Fone Bluetooth", preco: 159.90 },
  { id: 4, nome: "Relógio Smart", preco: 499.90 },
  { id: 5, nome: "Mochila Executiva", preco: 239.90 }
];

const carrinho = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function menu() {
  console.log("\n==== SHOPEE TERMINAL ====");
  console.log("1. Listar produtos");
  console.log("2. Adicionar produto ao carrinho");
  console.log("3. Remover produto do carrinho");
  console.log("4. Alterar quantidade no carrinho");
  console.log("5. Visualizar carrinho");
  console.log("6. Finalizar compra");
  console.log("7. Sair\n");

  rl.question("Escolha uma opção: ", (opcao) => {
    switch (opcao) {
      case '1': listarProdutos(); break;
      case '2': adicionarProduto(); break;
      case '3': removerProduto(); break;
      case '4': alterarQuantidade(); break;
      case '5': visualizarCarrinho(); break;
      case '6': finalizarCompra(); break;
      case '7': rl.close(); break;
      default:
        console.log("Opção inválida!");
        menu();
    }
  });
}

function listarProdutos() {
  console.log("\n=== PRODUTOS DISPONÍVEIS ===");
  produtos.forEach(p => {
    console.log(`${p.id}. ${p.nome} - R$ ${p.preco.toFixed(2)}`);
  });
  menu();
}

function adicionarProduto() {
  rl.question("Digite o ID do produto: ", (id) => {
    const produto = produtos.find(p => p.id === parseInt(id));
    if (!produto) {
      console.log("Produto não encontrado.");
      return menu();
    }
    rl.question("Digite a quantidade: ", (qtd) => {
      const quantidade = parseInt(qtd);
      if (quantidade <= 0) {
        console.log("Quantidade inválida.");
        return menu();
      }
      const itemCarrinho = carrinho.find(item => item.produto.id === produto.id);
      if (itemCarrinho) {
        itemCarrinho.quantidade += quantidade;
      } else {
        carrinho.push({ produto, quantidade });
      }
      console.log(`Adicionado ${quantidade} x ${produto.nome} ao carrinho.`);
      menu();
    });
  });
}

function removerProduto() {
  rl.question("Digite o ID do produto a remover: ", (id) => {
    const index = carrinho.findIndex(item => item.produto.id === parseInt(id));
    if (index === -1) {
      console.log("Produto não está no carrinho.");
    } else {
      carrinho.splice(index, 1);
      console.log("Produto removido do carrinho.");
    }
    menu();
  });
}

function alterarQuantidade() {
  rl.question("Digite o ID do produto a alterar: ", (id) => {
    const itemCarrinho = carrinho.find(item => item.produto.id === parseInt(id));
    if (!itemCarrinho) {
      console.log("Produto não está no carrinho.");
      return menu();
    }
    rl.question("Digite a nova quantidade: ", (qtd) => {
      const quantidade = parseInt(qtd);
      if (quantidade <= 0) {
        console.log("Quantidade inválida.");
        return menu();
      }
      itemCarrinho.quantidade = quantidade;
      console.log(`Quantidade alterada para ${quantidade} x ${itemCarrinho.produto.nome}.`);
      menu();
    });
  });
}

function visualizarCarrinho() {
  if (carrinho.length === 0) {
    console.log("\nCarrinho vazio.");
    return menu();
  }

  console.log("\n=== SEU CARRINHO ===");
  let total = 0;
  let totalItens = 0;

  carrinho.forEach(item => {
    const subtotal = item.produto.preco * item.quantidade;
    total += subtotal;
    totalItens += item.quantidade;
    console.log(`${item.quantidade} x ${item.produto.nome} - R$ ${subtotal.toFixed(2)}`);
  });

  console.log(`\nTotal de itens: ${totalItens}`);
  console.log(`Total a pagar: R$ ${total.toFixed(2)}`);
  menu();
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    console.log("\nCarrinho vazio. Nada a finalizar.");
  } else {
    visualizarCarrinho();
    console.log("\nCompra finalizada! Obrigado por comprar na Shopee Terminal.\n");
    carrinho.length = 0;
  }
  menu();
}

// Início do sistema
menu();
