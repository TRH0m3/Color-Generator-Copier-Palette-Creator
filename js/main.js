/*
Click to generate random color.
It will copy color rgb value and display the color, changing color of text based on color value.
Using the input field you can specify a color number previously generated
to copy and then click copy color and it will copy the color rgb value you chose.

USEFUL FOR CREATING A RANDOM COLOR AND COPYING COLOR RGB VALUE.
*/

const rand = ( s, e ) => {
    const random = s + Math.floor( Math.random() * (e-s+1) );
    return random;
}

let colorHistory = []

const genRanColor = evt => {
  const R = rand(0,255);
  const G = rand(0,255);
  const B = rand(0,255);
  const randomColor = `rgb(${R},${G},${B})`

  colorHolder.style.backgroundColor = randomColor;
  squareHolder.innerHTML += `<div class="js-small-square small-square mr-1" style="background-color: ${randomColor}"></div>`

  if (R < 125 || G < 125 || B < 125) {
      colorHolder.style.color = "white";
  }
  else {
      colorHolder.style.color = "black";
  }

  colorHolder.innerHTML = randomColor;
  colorHistory.push(randomColor);

}

const copyRgbContainerColor = (evt) => {
    colorRgbText.value = evt.target.style.backgroundColor
    colorRgbText.select();
    document.execCommand("Copy");
    }

const copySmallSquareColor = (evt) => {
    const colorRgb = evt.target.style.backgroundColor
    colorRgbText.value = colorRgb
    colorRgbText.select()
    document.execCommand('Copy')
    colorRgbText.value = ''
}

const clearColors = (evt) => {
    squareHolder.innerHTML = ''
    colorHolder.style.backgroundColor = 'black'
    colorHolder.innerHTML = 'Click to Generate Color'
    colorHolder.style.color = "white";
    colorHistory = []
}

const customColorKeyPress = (evt) => {
    if (evt.keyCode === 13) {
        const customColor = customColorInput.value
        colorHolder.innerHTML = customColor
        colorHolder.style.backgroundColor = customColor
        colorRgbText.value = customColor
        colorRgbText.select()
        document.execCommand('Copy')
        colorRgbText.value = ''
        customColorInput.value = ''
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
colorHolder.addEventListener('click', copyRgbContainerColor);
clearButton.addEventListener('click', clearColors)
squareHolder.addEventListener('click', copySmallSquareColor)
customColorInput.addEventListener('keypress', customColorKeyPress)
