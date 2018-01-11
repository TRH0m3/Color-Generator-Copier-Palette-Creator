/*
Click to generate random color.
It will copy color rgb value and display the color, changing color of text based on color value.
It will display up to 20 previous colors that were generated.
Using the input field you can specify a color number previously generated
to copy and then click copy color and it will copy the color rgb value you chose.

USEFUL FOR CREATING A RANDOM COLOR AND COPYING COLOR RGB VALUE.
*/

const rand = ( s, e ) => {
    const random = s + Math.floor( Math.random() * (e-s+1) );
    return random;
}

const colorHolder = document.querySelector('.js-color-holder');
const squareHolder = document.querySelector('.js-square-holder');
const colorName = document.querySelector('.js-copy-color');
const button = document.querySelector('.js-copy-button')
const copyNumberValue = document.querySelector('.js-color-number-input')
const MAX_ALLOWED_COLORS = 20;
let colorHistory = []

const genRanColor = event => {
  const R = rand(0,255);
  const G = rand(0,255);
  const B = rand(0,255);
  const randomColor = `rgb(${R},${G},${B})`

  colorHolder.style.backgroundColor = randomColor;
  squareHolder.innerHTML += `<div class="square" style="background-color: ${randomColor}"></div>`

  if (R < 125 || G < 125 || B < 125) {
      colorHolder.style.color = "white";
  }
  else {
      colorHolder.style.color = "black";
  }

  colorHolder.innerHTML = randomColor;
  colorHistory.push(randomColor);


  if (colorHistory.length > MAX_ALLOWED_COLORS) {
      squareHolder.innerHTML = ''
      colorHolder.style.backgroundColor = 'black'
      colorHolder.innerHTML = 'Click to Generate Color'
      colorHolder.style.color = "white";
      colorHistory = []
  }

}
const copyRgbColor = (event) => {
    colorName.value = colorHolder.style.backgroundColor
    colorName.select();
    document.execCommand("Copy");
}

const copyValue = () => {
    if (copyNumberValue.value > colorHistory.length) {
        alert("No color at the position to copy")
    }
    else {
    const num = copyNumberValue.value
    const copyHistoryValue = (num) => {
        colorName.value = colorHistory[num-1]
        colorName.select()
        document.execCommand('Copy')
    }
    copyHistoryValue(num)
    }
}

colorHolder.addEventListener('click', genRanColor);
colorHolder.addEventListener('click', copyRgbColor);
button.addEventListener('click', copyValue)
