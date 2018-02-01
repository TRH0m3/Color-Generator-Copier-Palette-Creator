const rgbState = {
    R: 0,
    G: 0,
    B: 0,
    currentRandomColor: '',
    currentText: '',
    customColor: '',
    smallSquares: '',
    fontColor: '',
    textToCopy: '',
    generateRandomColor: () => {
        rgbState.R = rand(0,255);
        rgbState.G = rand(0,255);
        rgbState.B = rand(0,255);
        const randomColor = `rgb(${rgbState.R},${rgbState.G},${rgbState.B})`
        rgbState.currentRandomColor = randomColor
        rgbState.currentText = randomColor
        if (rgbState.R < 125 || rgbState.G < 125 || rgbState.B < 125) {
            rgbState.fontColor = "white";
        }
        else {
            rgbState.fontColor = "black";
        }
    },
    appendSmallSquares: ()=> {
        rgbState.smallSquares += `<div class="js-small-square small-square mr-1" style="background-color: ${rgbState.currentRandomColor}"></div>`
    },
    clearSmallSquares: () => {
        rgbState.smallSquares = ''
        rgbState.currentRandomColor = 'black'
        rgbState.currentText = 'Click to Generate Color'
        rgbState.fontColor = 'white'
    },
    getColorURL: (whenDataReturns) => {
        const getURL = `https://cors-anywhere.herokuapp.com/http://thecolorapi.com/id?rgb=${rgbState.R},${rgbState.G},${rgbState.B}&format=json`
        $.get(getURL)
            .then(data => {
              rgbState.currentText = data.name.value
              whenDataReturns();
          })
    },
    getColorURLSmallSquare: (whenDataReturns) => {
        const getURL = `https://cors-anywhere.herokuapp.com/http://thecolorapi.com/id?rgb=${rgbState.currentRandomColor}&format=json`
        console.log(getURL)
        $.get(getURL)
            .then(data => {
              rgbState.currentText = data.name.value
              whenDataReturns();
          })
    }
};

const render = () => {
    colorRgbText.value = rgbState.textToCopy
    colorRgbText.select();
    document.execCommand("Copy");
    rgbState.textToCopy = ''
    colorRgbText.value = rgbState.textToCopy
    customColorInput.value = ''
}

const rand = ( s, e ) => {
    const random = s + Math.floor( Math.random() * (e-s+1) );
    return random;
}

const updateAndRedraw = (callback) => {
    callback()
    render()
}

const genRanColor = evt => {
    updateAndRedraw (() => {
        rgbState.generateRandomColor()
        rgbState.appendSmallSquares()
        rgbState.textToCopy = rgbState.currentRandomColor
        rgbState.getColorURL(()=>{
            colorHolder.innerHTML = rgbState.currentText
            colorHolder.style.backgroundColor = rgbState.currentRandomColor
            colorHolder.style.color = rgbState.fontColor
            squareHolder.innerHTML = ''
            squareHolder.innerHTML = rgbState.smallSquares
        })
    })
}

const copySmallSquareColor = (evt) => {
    updateAndRedraw(()=> {
        rgbState.textToCopy = evt.target.style.backgroundColor
        rgbState.currentRandomColor = evt.target.style.backgroundColor
        rgbState.getColorURLSmallSquare(()=>{
            colorHolder.innerHTML = rgbState.currentText
            colorHolder.style.backgroundColor = rgbState.currentRandomColor
            colorHolder.style.color = rgbState.fontColor
            squareHolder.innerHTML = ''
            squareHolder.innerHTML = rgbState.smallSquares
        })
    });
}

const clearColors = (evt) => {
    updateAndRedraw(() => {
        rgbState.clearSmallSquares()
    })
}

const customColorKeyPress = (evt) => {
    if (evt.keyCode === 13) {
        updateAndRedraw(() =>{
            const customColor = customColorInput.value
            rgbState.currentRandomColor = customColor
            rgbState.appendSmallSquares()
            rgbState.currentText = customColor
            rgbState.textToCopy = customColor
            rgbState.getColorURLSmallSquare(()=>{
                colorHolder.innerHTML = rgbState.currentText
                colorHolder.style.backgroundColor = rgbState.currentRandomColor
                colorHolder.style.color = rgbState.fontColor
                squareHolder.innerHTML = ''
                squareHolder.innerHTML = rgbState.smallSquares
            })
        })
    }
}

const colorHolder = document.querySelector('.js-color-holder');
const squareHolder = document.querySelector('.js-square-holder');
const colorRgbText = document.querySelector('.js-copy-color');
const copyButton = document.querySelector('.js-copy-button')
const copyNumberValue = document.querySelector('.js-color-number-input')
const clearButton = document.querySelector('.js-clear-button')
const customColorInput = document.querySelector('.js-custom-color-input')

colorHolder.addEventListener('click', genRanColor);
clearButton.addEventListener('click', clearColors)
squareHolder.addEventListener('click', copySmallSquareColor)
customColorInput.addEventListener('keypress', customColorKeyPress)
