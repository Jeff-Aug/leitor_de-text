const main = document.querySelector('main')
const buttoInsereText = document.querySelector('.btn-toggle')
const divTextBox = document.querySelector('.text-box')

const buttoReadText = document.querySelector('#read')
const closeDivTextBox = document.querySelector('.close')
const selectElement = document.querySelector('select')

const textArea = document.querySelector('textarea')


const humanExpressions = [
    { img: './img/drink.jpg', text: 'Estou com sede' },
    { img: './img/food.jpg', text: 'Estou com fome' },
    { img: './img/tired.jpg', text: 'Estou cansado' },
    { img: './img/hurt.jpg', text: 'Estou machucado' },
    { img: './img/happy.jpg', text: 'Estou feliz' },
    { img: './img/angry.jpg', text: 'Estou com raiva' },
    { img: './img/sad.jpg', text: 'Estou triste' },
    { img: './img/scared.jpg', text: 'Estou assustado' },
    { img: './img/outside.jpg', text: 'Quero ir la fora' },
    { img: './img/home.jpg', text: 'Quero ir para casa' },
    { img: './img/school.jpg', text: 'Quero ir para escola' },
    { img: './img/grandma.jpg', text: 'Quero ver a vovó' }
]

const utterance = new SpeechSynthesisUtterance()

const setTextMessage = text => {
    utterance.text = text
}

const speakText = () => {
    speechSynthesis.speak(utterance)
}

const setVoice = event => {
    const selectedvoice = voices.find(voice => voice.name === event.target.value)
    utterance.voice = selectedvoice
}

const addExpressionBoxesIntoDOM = () => {
    main.innerHTML = humanExpressions.map(({ img, text }) => `
        <div class="expression-box"  data-js="${text}">
        <img src="${img}" alt="${text}" data-js="${text}" >
        <p class="info" data-js="${text}" >${text}</p>
        </div>
    `).join('')
}


let voices = []//onde sera colocado as vozes vindo da api


addExpressionBoxesIntoDOM()

const setStyleOfClickedDiv = dataValue => {
    const div = document.querySelector(`[data-js ="${dataValue}"]`)
    
    div.classList.add('active')//adiciona o ao clicar
    setTimeout(() => {
        div.classList.remove('active')//responsavel por remover o sobreamento depois de 1000 / 1s
    }, 1000)
    
}
main.addEventListener('click', event => {
    
    const clickedElement = event.target
    const clickedElementText = clickedElement.dataset.js
    //const clickedElementTextMustBeSpoken = clickedElement.tagName === 'IMG' || clickedElement.tagName === 'P'
    const clickedElementTextMustBeSpoken =['IMG','P'].some(elementName =>clickedElement.tagName.toLowerCase() === elementName.toLowerCase())
    
    
    if (clickedElementTextMustBeSpoken) {
        setTextMessage(clickedElementText)//cuida da fala do texto
        speakText()
        setStyleOfClickedDiv(clickedElementText)
    }
    
})

speechSynthesis.addEventListener('voiceschanged', () => {
    voices = speechSynthesis.getVoices()
    //nao tive a necessidaade de implementar pt-br como padrão,pois o browser já definia como padrão
    const googleVoice = voices.find(voice => voice.voiceURI === 'Microsoft Maria Desktop - Portuguese(Brazil)')
    
    
    
    
    voices.forEach(({ name, lang }) => {
        const option = document.createElement('option')
        
        option.value = name
        option.textContent = ` ${lang} | ${name}`
        selectElement.appendChild(option)
    })
    
})


buttoInsereText.addEventListener('click', () => {
    divTextBox.classList.add('show')
})


closeDivTextBox.addEventListener('click', () => {
    divTextBox.classList.remove('show')
})



selectElement.addEventListener('change', setVoice)


buttoReadText.addEventListener('click', () => {
    setTextMessage(textArea.value)
    speakText()
})



// const createExpressionBox = ({ img , text })=>{//Destructuring - resposavel por separa o que é necessario 
//     const div = document.createElement('div')//cria a div

//     div.classList.add('expression-box')
//     //responsavel por adicionar div que no html
//     div.innerHTML  = `
//     <img src="${img}" alt="${text}" >
//     <p class="info">${text}</p>

//     `

//     div.addEventListener('click',()=>{//evento de click nas div
//         setTextMessage(text)//cuida da fala do texto
//         speakText()


//         div.classList.add('active')//adiciona o ao clicar
//         setTimeout(()=>{
//             div.classList.remove('active')//responsavel por remover o sobreamento depois de 1000 / 1s
//         },1000)

//     })

//     main.appendChild(div)//adiciona div ao final do main

// }

// humanExpressions.forEach(createExpressionBox)//cria um box para cada div