const palavras = [
    "javascript",
    "html",
    "css",
    "internet",
    "navegador",
    "programacao",
    "computador",
    "algoritmo",
    "servidor",
    "variavel",
    "tecnologia",
    "desenvolvedor"
];

let palavraSecreta;
let letrasCorretas = [];
let letrasUsadas = [];
let tentativas = 12;
let jogoEncerrado = false;

const elementoPalavra = document.getElementById("palavra");
const elementoTentativas = document.getElementById("tentativas");
const inputLetra = document.getElementById("letra");
const mensagem = document.getElementById("mensagem");
const elementoLetrasUsadas = document.getElementById("letras-usadas");
const botaoTentar = document.getElementById("btn-tentar");
const botaoReiniciar = document.getElementById("btn-reiniciar");

function iniciarJogo() {
    const indice = Math.floor(Math.random() * palavras.length);
    palavraSecreta = palavras[indice];
    tentativas = 12;
    letrasCorretas = [];
    letrasUsadas = [];
    jogoEncerrado = false;

    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = "";
    mensagem.textContent = "Bem-vindo ao jogo! Digite uma letra.";
    inputLetra.value = "";
    inputLetra.disabled = false;
    botaoTentar.disabled = false;
    inputLetra.focus();

    atualizarPalavra();
}

function atualizarPalavra() {
    let exibicao = "";
    for (let i = 0; i < palavraSecreta.length; i++) {
        const letra = palavraSecreta[i];
        if (letrasCorretas.includes(letra)) {
            exibicao += letra + " ";
        } else {
            exibicao += "_ ";
        }
    }
    elementoPalavra.textContent = exibicao.trim();
}

function venceu() {
    for (let i = 0; i < palavraSecreta.length; i++) {
        const letra = palavraSecreta[i];
        if (!letrasCorretas.includes(letra)) {
            return false;
        }
    }
    return true;
}

function verificarLetra() {
    if (jogoEncerrado) return;

    const letra = inputLetra.value.toLowerCase().trim();
    inputLetra.value = "";
    inputLetra.focus();

    if (letra === "" || !/^[a-z]$/.test(letra)) {
        mensagem.textContent = "Digite uma letra válida (de A a Z).";
        return;
    }

    if (letrasUsadas.includes(letra)) {
        mensagem.textContent = "Letra já utilizada.";
        return;
    }

    letrasUsadas.push(letra);

    if (palavraSecreta.includes(letra)) {
        letrasCorretas.push(letra);
        mensagem.textContent = "Você acertou!";
    } else {
        tentativas--;
        mensagem.textContent = "Você errou!";
    }

    atualizarPalavra();
    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = letrasUsadas.join(", ");

    if (venceu()) {
        mensagem.textContent = "Parabéns! Você venceu!";
        encerrarJogo();
    } else if (tentativas === 0) {
        mensagem.textContent = "Você perdeu! A palavra era: " + palavraSecreta;
        encerrarJogo();
    }
}

function encerrarJogo() {
    jogoEncerrado = true;
    inputLetra.disabled = true;
    botaoTentar.disabled = true;
}

botaoTentar.addEventListener("click", verificarLetra);
botaoReiniciar.addEventListener("click", iniciarJogo);

inputLetra.addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
        verificarLetra();
    }
});

iniciarJogo();
