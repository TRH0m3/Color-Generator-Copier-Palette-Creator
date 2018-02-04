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
    paletteMode: '',
    paletteToShow: [],
    paletteToCopy: [],
    paletteColorText: [],
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
        rgbState.textToCopy = ''
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
        $.get(getURL)
            .then(data => {
                rgbState.currentText = data.name.value
              whenDataReturns();
          })
    },
    getColorURLPalette: (whenDataReturns) => {
        const getURL = `https://cors-anywhere.herokuapp.com/http://thecolorapi.com/scheme?rgb=${rgbState.currentRandomColor}&format=json&mode=${rgbState.paletteMode}&count=6`
        $.get(getURL)
            .then(data => {
                if (rgbState.paletteToCopy.length > 5) {
                    rgbState.paletteToCopy = []
                }
                for (let i= 0; i< data.colors.length; i++) {
                    rgbState.paletteToShow.push(data.colors[i].rgb.value)
                    rgbState.paletteToCopy.push(` ${data.colors[i].rgb.value}`)
                    rgbState.paletteColorText.push(data.colors[i].name.value)
            }
                whenDataReturns();
          })
    }
};

const render = () => {
    colorRgbText.value = rgbState.textToCopy
    squareHolder.innerHTML = rgbState.smallSquares
    colorRgbText.select();
    document.execCommand("Copy");
    rgbState.textToCopy = ''
    colorRgbText.value = rgbState.textToCopy
    customColorInput.value = ''
}

const updateAndRedraw = callback => {
    callback()
    render()
}

const rand = ( s, e ) => {
    const random = s + Math.floor( Math.random() * (e-s+1) );
    return random;
}

const disable = () => {
    clearButton.setAttribute('disabled', 'disabled')
    createPaletteButton.setAttribute('disabled', 'disabled')
    copyPaletteButton.setAttribute('disabled', 'disabled')
    customColorInput.setAttribute('disabled', 'disabled')
    colorHolder.innerHTML = '<div class="loader">Loading...</div>'
}

const enable = () => {
    clearButton.removeAttribute('disabled')
    createPaletteButton.removeAttribute('disabled')
    copyPaletteButton.removeAttribute('disabled')
    customColorInput.removeAttribute('disabled')
    colorHolder.innerHTML = rgbState.currentText;
}

const genRanColor = evt => {
    updateAndRedraw (() => {
        rgbState.generateRandomColor()
        rgbState.textToCopy = rgbState.currentRandomColor
        disable()
        rgbState.getColorURL(()=>{
            rgbState.appendSmallSquares()
            colorHolder.innerHTML = rgbState.currentText
            colorHolder.style.backgroundColor = rgbState.currentRandomColor
            colorHolder.style.color = rgbState.fontColor
            squareHolder.innerHTML = ''
            squareHolder.innerHTML = rgbState.smallSquares
            paletteClear()
            enable()
        })
    })
}
const getColorURL = () => {
    rgbState.getColorURLSmallSquare(()=>{
        colorHolder.innerHTML = rgbState.currentText
        colorHolder.style.backgroundColor = rgbState.currentRandomColor
        colorHolder.style.color = rgbState.fontColor
        squareHolder.innerHTML = ''
        squareHolder.innerHTML = rgbState.smallSquares
        enable()
    })
}
const copySmallSquareColor = evt => {
    updateAndRedraw(()=> {
        rgbState.textToCopy = evt.target.style.backgroundColor
        rgbState.currentRandomColor = evt.target.style.backgroundColor
        rgbState.currentRandomColor = rgbState.currentRandomColor.replace(/\s/g, "")
        disable()
        getColorURL()
        // rgbState.getColorURLSmallSquare(()=>{
        //     colorHolder.innerHTML = rgbState.currentText
        //     colorHolder.style.backgroundColor = rgbState.currentRandomColor
        //     colorHolder.style.color = rgbState.fontColor
        //     squareHolder.innerHTML = ''
        //     squareHolder.innerHTML = rgbState.smallSquares
        //     enable()
    })
}

const customColorKeyPress = evt => {
    if (evt.keyCode === 13) {
        updateAndRedraw(() =>{
            const customColor = customColorInput.value
            rgbState.currentRandomColor = customColor
            rgbState.appendSmallSquares()
            rgbState.currentText = customColor
            rgbState.textToCopy = customColor
            disable()
            getColorURL()
            // rgbState.getColorURLSmallSquare(()=>{
            //     colorHolder.innerHTML = rgbState.currentText
            //     colorHolder.style.backgroundColor = rgbState.currentRandomColor
            //     colorHolder.style.color = rgbState.fontColor
            //     squareHolder.innerHTML = ''
            //     squareHolder.innerHTML = rgbState.smallSquares
            //     enable()
        })
    }
}

const paletteUpdate = () => {
    paletteHolder1.style.backgroundColor = rgbState.paletteToShow[0]
    paletteHolder2.style.backgroundColor = rgbState.paletteToShow[1]
    paletteHolder3.style.backgroundColor = rgbState.paletteToShow[2]
    paletteHolder4.style.backgroundColor = rgbState.paletteToShow[3]
    paletteHolder5.style.backgroundColor = rgbState.paletteToShow[4]
    paletteHolder6.style.backgroundColor = rgbState.paletteToShow[5]
    paletteHolder1.innerHTML = rgbState.paletteColorText[0]
    paletteHolder2.innerHTML = rgbState.paletteColorText[1]
    paletteHolder3.innerHTML = rgbState.paletteColorText[2]
    paletteHolder4.innerHTML = rgbState.paletteColorText[3]
    paletteHolder5.innerHTML = rgbState.paletteColorText[4]
    paletteHolder6.innerHTML = rgbState.paletteColorText[5]
    rgbState.paletteToShow = [];
    rgbState.paletteColorText = []
}

const paletteClear = () => {
    paletteHolder1.style.backgroundColor = null;
    paletteHolder2.style.backgroundColor = null;
    paletteHolder3.style.backgroundColor = null;
    paletteHolder4.style.backgroundColor = null;
    paletteHolder5.style.backgroundColor = null;
    paletteHolder6.style.backgroundColor = null;
    paletteHolder1.innerHTML = '';
    paletteHolder2.innerHTML = '';
    paletteHolder3.innerHTML = '';
    paletteHolder4.innerHTML = '';
    paletteHolder5.innerHTML = '';
    paletteHolder6.innerHTML = '';
    rgbState.paletteToShow = [];
    rgbState.paletteColorText = [];
    rgbState.paletteToCopy = []
    MonochromeInput.checked = true;
}

const onPaletteClick = evt => {
    updateAndRedraw(()=> {
        rgbState.textToCopy = evt.target.style.backgroundColor
        rgbState.currentRandomColor = evt.target.style.backgroundColor
        rgbState.currentRandomColor = rgbState.currentRandomColor.replace(/\s/g, "")
        rgbState.appendSmallSquares()
        disable()
        getColorURL()
        // rgbState.getColorURLSmallSquare(()=>{
        //     colorHolder.innerHTML = rgbState.currentText
        //     colorHolder.style.backgroundColor = rgbState.currentRandomColor
        //     colorHolder.style.color = rgbState.fontColor
        //     squareHolder.innerHTML = ''
        //     squareHolder.innerHTML = rgbState.smallSquares
        //     enable()
    })
}

const onCreatePaletteButtonClick = evt => {
    if (MonochromeInput.checked == true) {
        rgbState.paletteMode = "monochrome"
        disable();
        rgbState.getColorURLPalette (() => {
            paletteUpdate()
            enable();
        })
    }
    else if (AnalogicInput.checked == true) {
        rgbState.paletteMode = "analogic"
        disable();
        rgbState.getColorURLPalette (() => {
            paletteUpdate()
            enable();
        })
    }
    else if (ComplementInput.checked == true) {
        rgbState.paletteMode = "complement"
        disable();
        rgbState.getColorURLPalette (() => {
            paletteUpdate()
            enable();
        })
    }
    else if (TriadInput.checked == true) {
        rgbState.paletteMode = "triad"
        disable();
        rgbState.getColorURLPalette (() => {
            paletteUpdate()
            enable();
        })
    }
    else if (QuadInput.checked == true) {
        rgbState.paletteMode = "quad"
        disable();
        rgbState.getColorURLPalette (() => {
            paletteUpdate()
            enable();
        })
    }
}

const onCopyPaletteButtonClick = evt => {
    updateAndRedraw(() => {
        rgbState.textToCopy = rgbState.paletteToCopy
    })
}
const clearColors = evt => {
    updateAndRedraw(() => {
        rgbState.clearSmallSquares()
        colorHolder.innerHTML = rgbState.currentText
        colorHolder.style.backgroundColor = rgbState.currentRandomColor
        colorHolder.style.color = rgbState.fontColor
        paletteClear()
    })
}


const colorHolder = document.querySelector('.js-color-holder');
const squareHolder = document.querySelector('.js-square-holder');
const colorRgbText = document.querySelector('.js-copy-color');
const copyNumberValue = document.querySelector('.js-color-number-input')
const clearButton = document.querySelector('.js-clear-button')
const customColorInput = document.querySelector('.js-custom-color-input')
const MonochromeInput = document.querySelector('#Monochrome')
const AnalogicInput = document.querySelector('#Analogic')
const ComplementInput = document.querySelector('#Complement')
const TriadInput = document.querySelector('#Triad')
const QuadInput = document.querySelector('#Quad')
const createPaletteButton = document.querySelector('.js-create-palette-button')
const copyPaletteButton = document.querySelector('.js-copy-palette-button')
const paletteHolder = document.querySelector('.js-palette-holder')
const paletteHolder1 = document.querySelector('.js-color-palette1');
const paletteHolder2 = document.querySelector('.js-color-palette2');
const paletteHolder3 = document.querySelector('.js-color-palette3');
const paletteHolder4 = document.querySelector('.js-color-palette4');
const paletteHolder5 = document.querySelector('.js-color-palette5');
const paletteHolder6 = document.querySelector('.js-color-palette6');


colorHolder.addEventListener('click', genRanColor);
clearButton.addEventListener('click', clearColors)
squareHolder.addEventListener('click', copySmallSquareColor)
customColorInput.addEventListener('keypress', customColorKeyPress)
createPaletteButton.addEventListener('click', onCreatePaletteButtonClick)
paletteHolder.addEventListener('click', onPaletteClick)
copyPaletteButton.addEventListener('click', onCopyPaletteButtonClick)
