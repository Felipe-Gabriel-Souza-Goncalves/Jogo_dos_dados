// Array de imagens disponíveis 
var imagensDado = ["img/dado-face1.png","img/dado-face2.png","img/dado-face3.png","img/dado-face4.png","img/dado-face5.png","img/dado-face6.png"]

// Declaração da ordem em que os números serão sorteados
const randomNums = [];

// Comecar o jogo
function beginGame(num){
    while (document.querySelector("img") != null) {
        document.querySelector("img").remove()
    }

    document.getElementById("modosDeCombinar").innerHTML = 6**num + " maneiras"

    for (let index = 0; index < num; index++) {
        var e = Math.ceil(Math.random()*6)
        randomNums[index] = e

        const img = document.createElement("img")
        img.src = "img/cartaInterrogacao.png"
        img.classList.add(`escolha`)
        img.tabIndex = "0"
        img.setAttribute(`id`, `escolha${index+1}`)
        img.setAttribute("onclick", `addFocus(${index+1})`)
        img.setAttribute("onfocus", `addFocus(${index+1})`)
        document.getElementById("escolhasImg").appendChild(img)
    }

    document.querySelector("#area").style.display = "flex"

    addFocus(1)
}

function sendGuess(nthElement){
    // Coleta e filtro do input
    let input = document.getElementById('input')
    if(parseInt(input.value) < 1 || parseInt(input.value) > 6){
        alert("Somente números de 1 a 6")
        return
    }

    // Pega o elemento em foco
    let img = document.getElementById(`escolha${nthElement}`)
    // Caso de acerto
    if(input.value == randomNums[nthElement-1]){
        alert("YEEEEEEEEY")
        img.setAttribute("onclick", ``)
        img.classList.remove("foco")
        img.classList.add("acertou")
        const number = input.value
        setTimeout(() => {img.src = `img/dado-face${number}.png`
            setTimeout(()=>{img.classList.remove("acertou")}, 500)
        }, 500)

        focoProximo()
    // Caso de erro
    } else{
        errorAnimation()
        if(randomNums[nthElement-1] > input.value){
            alert("tente um número maior")
        }else{
            alert("tente um número menor")
        }
    }
    // Limpa o input para uso 
    input.value = ""
    input.focus()
}

// Foca o primeiro elemento disponível
function focoProximo(){
    let img = document.getElementsByClassName('escolha')
    for(let i = 0; i< img.length;i++){
        if(img[i].getAttribute("src") == "img/cartaInterrogacao.png"){
            addFocus(i+1)
            return
        }
    }
}

// Posição do child em "foco" 
var itemEmFoco = 1;
// Adicionar "foco" no elemento
function addFocus(id){
    let img = document.getElementsByClassName('escolha')
    for(let i = 1; i<= img.length; i++){
        img[i-1].classList.remove('foco')
        if(id == i){
            img[i-1].classList.add("foco")
            itemEmFoco = id
        }
    }
}

function errorAnimation(){
    document.getElementById("input").classList.add("erro")
    document.getElementById("button").classList.add("erro")
    setTimeout(() =>{
        document.getElementById("input").classList.remove("erro")
        document.getElementById("button").classList.remove("erro")
    }, 1000)
}

document.querySelector("#formPalpite").addEventListener("submit", (e) => {
    e.preventDefault();
    sendGuess(itemEmFoco);
})

document.addEventListener("keydown", function(e) {
  if (e.ctrlKey && e.key === "ArrowDown") {
    document.querySelector("#input").focus();
  }
});