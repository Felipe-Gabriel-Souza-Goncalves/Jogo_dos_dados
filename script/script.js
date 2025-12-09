// Array de imagens disponíveis 
var imagensDado = ["img/dado-face1.png","img/dado-face2.png","img/dado-face3.png","img/dado-face4.png","img/dado-face5.png","img/dado-face6.png"]

// Declaração da ordem em que os números serão sorteados
const randomNums = [];

// Comecar o jogo
function beginGame(num){
    while (document.querySelector("img") != null) {
        document.querySelector("img").remove()
    }
    if(document.getElementById('input') != null){
        document.getElementById('input').remove()
        document.getElementById('button').remove()
    }
    document.getElementById("modosDeCombinar").innerHTML = 6**num + " maneiras"

    for (let index = 0; index < num; index++) {
        var e = Math.ceil(Math.random()*6)
        randomNums[index] = e

        const img = document.createElement("img")
        img.style.width = "200px"
        img.src = "img/cartaInterrogacao.png"
        img.classList.add(`escolha`)
        img.setAttribute(`id`, `escolha${index+1}`)
        img.setAttribute("onclick", `addFocus(${index+1})`)
        document.getElementById("escolhasImg").appendChild(img)
    }
    var input = document.createElement("input")
    input.placeholder = 'Digite seu palpite'
    input.setAttribute('id', 'input')
    var button = document.createElement("button")
    button.innerHTML = "Enviar"
    button.setAttribute("id", "button")
    button.setAttribute("onclick", "sendGuess(itemEmFoco)")

    document.getElementById("area").appendChild(input)
    document.getElementById("area").appendChild(button)

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
        img.src = `img/dado-face${input.value}.png`
        img.setAttribute("onclick", ``)
        img.classList.remove("foco")

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