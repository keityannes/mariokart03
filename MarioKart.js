// Simulador de Corrida Mario Kart no Terminal - Node.js

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Competidor {
  constructor(nome) {
    this.nome = nome;
    this.posicao = 0;
    this.velocidade = 1;
    this.itens = [];
  }

  usarItem(alvos) {
    if (this.itens.length === 0) return;
    const item = this.itens.shift();
    console.log(`\n${this.nome} usou ${item}!`);

    switch (item) {
      case "casco verde":
        let alvo = alvos[Math.floor(Math.random() * alvos.length)];
        alvo.posicao = Math.max(0, alvo.posicao - 2);
        console.log(`${alvo.nome} foi atingido e perdeu posições!`);
        break;
      case "cogumelo":
        this.posicao += 3;
        console.log(`${this.nome} ganhou um turbo!`);
        break;
      case "banana":
        // Banana impede ultrapassagem no próximo turno
        this.banana = true;
        console.log(`${this.nome} deixou uma banana na pista.`);
        break;
    }
  }

  mover() {
    this.posicao += this.velocidade;
  }
}

class JogoCorrida {
  constructor(jogadorNome, voltas = 5) {
    this.voltas = voltas;
    this.jogador = new Competidor(jogadorNome);
    this.bots = [
      new Competidor("Luigi"),
      new Competidor("Peach"),
      new Competidor("Bowser")
    ];
    this.competidores = [this.jogador, ...this.bots];
    this.rodadaAtual = 1;
  }

  sortearItem() {
    const itens = ["casco verde", "cogumelo", "banana"];
    return itens[Math.floor(Math.random() * itens.length)];
  }

  exibirPosicoes() {
    console.log("\n--- Classificação ---");
    this.competidores.sort((a, b) => b.posicao - a.posicao)
      .forEach((c, i) => {
        console.log(`${i + 1}º - ${c.nome} (posição: ${c.posicao})`);
      });
  }

  async turnoJogador() {
    return new Promise(resolve => {
      rl.question("\nDigite uma ação ([M]over / [I]tem): ", (resposta) => {
        const acao = resposta.trim().toUpperCase();
        if (acao === "I") {
          this.jogador.usarItem(this.bots);
        } else {
          this.jogador.mover();
          if (Math.random() < 0.5) {
            const novoItem = this.sortearItem();
            this.jogador.itens.push(novoItem);
            console.log(`${this.jogador.nome} pegou um ${novoItem}`);
          }
        }
        resolve();
      });
    });
  }

  turnoBots() {
    this.bots.forEach(bot => {
      if (Math.random() < 0.3 && bot.itens.length > 0) {
        bot.usarItem(this.competidores.filter(c => c !== bot));
      } else {
        bot.mover();
        if (Math.random() < 0.3) {
          bot.itens.push(this.sortearItem());
        }
      }
    });
  }

  async iniciarCorrida() {
    console.log("\n🏁 Corrida iniciada! 🏁");
    while (this.rodadaAtual <= this.voltas) {
      console.log(`\nVolta ${this.rodadaAtual} de ${this.voltas}`);
      await this.turnoJogador();
      this.turnoBots();
      this.exibirPosicoes();
      this.rodadaAtual++;
    }
    rl.close();
    console.log("\n🏆 Corrida Finalizada! Resultado final:");
    this.exibirPosicoes();
  }
}

// Execução principal
rl.question("Digite o nome do seu personagem: ", (nome) => {
  const jogo = new JogoCorrida(nome);
  jogo.iniciarCorrida();
});
