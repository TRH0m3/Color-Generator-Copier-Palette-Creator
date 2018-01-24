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

const colorPalleteArray = []

const genRanColor = event => {
  const R = rand(0,255);
  const G = rand(0,255);
  const B = rand(0,255);
  const randomColor = `rgb(${R},${G},${B})`

  event.target.style.backgroundColor = randomColor;

  if (R < 125 || G < 125 || B < 125) {
      event.target.style.color = "white";
  }
  else {
      event.target.style.color = "black";
  }

  event.target.innerHTML = randomColor;

  if (event.target.matches('.js-color-pallete1')) {
      colorPalleteArray[0] = randomColor
  }
 else  if (event.target.matches('.js-color-pallete2')) {
      colorPalleteArray[1] = randomColor
  }
 else  if (event.target.matches('.js-color-pallete3')) {
      colorPalleteArray[2] = randomColor
  }
  else if (event.target.matches('.js-color-pallete4')) {
      colorPalleteArray[3] = randomColor
  }
  console.log(colorPalleteArray)

}

const copyValue = (event) => {
    const rgbPalleteToString = colorPalleteArray.join(', ')
    console.log(rgbPalleteToString)
    const copyPalleteColors = (str) => {
        copyPallete.value = str
        copyPallete.select()
        document.execCommand('Copy')
    }
    copyPalleteColors(rgbPalleteToString)
    copyPallete.value = ''
}

const copyValueEnter = (event) => {
    if ( event.keyCode === 13) {
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

const clearColors = (event) => {
    console.log("clicked!")
    palleteHolder1.innerHTML = ''
    palleteHolder1.style.backgroundColor = 'black'
    palleteHolder1.innerHTML = 'Color 1'
    palleteHolder1.style.color = "white";

    palleteHolder2.innerHTML = ''
    palleteHolder2.style.backgroundColor = 'black'
    palleteHolder2.innerHTML = 'Color 2'
    palleteHolder2.style.color = "white";

    palleteHolder3.innerHTML = ''
    palleteHolder3.style.backgroundColor = 'black'
    palleteHolder3.innerHTML = 'Color 3'
    palleteHolder3.style.color = "white";

    palleteHolder4.innerHTML = ''
    palleteHolder4.style.backgroundColor = 'black'
    palleteHolder4.innerHTML = 'Color 4'
    palleteHolder4.style.color = "white";
}

const palleteHolder1 = document.querySelector('.js-color-pallete1');
const palleteHolder2 = document.querySelector('.js-color-pallete2');
const palleteHolder3 = document.querySelector('.js-color-pallete3');
const palleteHolder4 = document.querySelector('.js-color-pallete4');
const squareHolder = document.querySelector('.js-square-holder');
const copyPallete = document.querySelector('.js-copy-pallete');
const copyButton = document.querySelector('.js-copy-button')
const clearPalleteButton = document.querySelector('.js-clear-button')

palleteHolder1.addEventListener('click', genRanColor);
palleteHolder2.addEventListener('click', genRanColor);
palleteHolder3.addEventListener('click', genRanColor);
palleteHolder4.addEventListener('click', genRanColor);
copyButton.addEventListener('click', copyValue)
clearPalleteButton.addEventListener('click', clearColors)
