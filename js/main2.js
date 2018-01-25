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

const colorpaletteArray = []

const genRanColor = evt => {
  const R = rand(0,255);
  const G = rand(0,255);
  const B = rand(0,255);
  const randomColor = `rgb(${R},${G},${B})`

  evt.target.style.backgroundColor = randomColor;

  if (R < 125 || G < 125 || B < 125) {
      evt.target.style.color = "white";
  }
  else {
      evt.target.style.color = "black";
  }

  evt.target.innerHTML = randomColor;

  if (evt.target.matches('.js-color-palette1-a')) {
      colorpaletteArray[0] = randomColor
  }
 else  if (evt.target.matches('.js-color-palette2-a')) {
      colorpaletteArray[1] = randomColor
  }
 else  if (evt.target.matches('.js-color-palette3-a')) {
      colorpaletteArray[2] = randomColor
  }
  else if (evt.target.matches('.js-color-palette4-a')) {
      colorpaletteArray[3] = randomColor
  }
  console.log(colorpaletteArray)

}

const copyValue = (evt) => {
    const rgbpaletteToString = colorpaletteArray.join(', ')
    console.log(rgbpaletteToString)
    const copypaletteColors = (str) => {
        copypalette.value = str
        copypalette.select()
        document.execCommand('Copy')
    }
    copypaletteColors(rgbpaletteToString)
    copypalette.value = ''
}

const copyValueEnter = (evt) => {
    if ( evt.keyCode === 13) {
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
        copyNumberValue.value = ''
        }
    }
}

const clearColors = (evt) => {
    if (evt.target.matches('.js-clear-button-a')) {
        console.log("clicked!")
        paletteHolder1a.innerHTML = ''
        paletteHolder1a.style.backgroundColor = 'black'
        paletteHolder1a.innerHTML = 'Color 1'
        paletteHolder1a.style.color = "white";

        paletteHolder2a.innerHTML = ''
        paletteHolder2a.style.backgroundColor = 'black'
        paletteHolder2a.innerHTML = 'Color 2'
        paletteHolder2a.style.color = "white";

        paletteHolder3a.innerHTML = ''
        paletteHolder3a.style.backgroundColor = 'black'
        paletteHolder3a.innerHTML = 'Color 3'
        paletteHolder3a.style.color = "white";

        paletteHolder4a.innerHTML = ''
        paletteHolder4a.style.backgroundColor = 'black'
        paletteHolder4a.innerHTML = 'Color 4'
        paletteHolder4a.style.color = "white";
    };
}

const paletteHolder1a = document.querySelector('.js-color-palette1-a');
const paletteHolder2a = document.querySelector('.js-color-palette2-a');
const paletteHolder3a = document.querySelector('.js-color-palette3-a');
const paletteHolder4a = document.querySelector('.js-color-palette4-a');
const squareHolder = document.querySelector('.js-square-holder');
const copypalette = document.querySelector('.js-copy-palette');
const copyButtona = document.querySelector('.js-copy-button-a')
const clearpaletteButtona = document.querySelector('.js-clear-button-a')

paletteHolder1a.addEventListener('click', genRanColor);
paletteHolder2a.addEventListener('click', genRanColor);
paletteHolder3a.addEventListener('click', genRanColor);
paletteHolder4a.addEventListener('click', genRanColor);
copyButtona.addEventListener('click', copyValue)
clearpaletteButtona.addEventListener('click', clearColors)
