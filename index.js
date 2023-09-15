const schemeDiv = document.getElementById('scheme-div')
const getSchemeBtn = document.getElementById('get-scheme-btn')
const colorNameCheckbox = document.getElementById('color-name-checkbox')

fetch(`https://www.thecolorapi.com/scheme?hex=0000FF&mode=analogic`)
    .then(res => res.json())
    .then(schemeObj => renderSchemeColors(schemeObj))

const selectedColor = () => {
    return document.getElementById('color-picker').value.slice(1)
}

const selectedMode = () => {
    return document.getElementById('mode').value
}

let showName = false
const handleColorNameCheckbox = () => {
    showName = !showName
}

colorNameCheckbox.addEventListener('change', handleColorNameCheckbox)

getSchemeBtn.addEventListener('click', function() {
    fetch(`https://www.thecolorapi.com/scheme?hex=${selectedColor()}&mode=${selectedMode()}`)
    .then(res => res.json())
    .then(schemeObj => renderSchemeColors(schemeObj))
})

document.addEventListener('click', function(e) {
    handleHexToCopy(e)
})

function renderSchemeColors(schemeObj) {
    schemeDiv.innerHTML = getSchemeColorsHtml(schemeObj)
}

function getSchemeColorsHtml(schemeObj) {
    
        const colorsArr = schemeObj.colors
        let schemeColorsHtml = ``
        
        colorsArr.forEach(function(color) {
            const colorName = showName ? color.name.value : ''
          
            const hexValue = color.hex.value
       
            schemeColorsHtml += `
            <div class="color-info">
                <img src="${color.image.bare}" class="color pointer" data-copy="${hexValue}">
                <div class="color-info-text">
                    <p data-copy="${hexValue}" class="pointer">${hexValue}</p>
                    <p data-copy="${hexValue}" class="pointer">${colorName}</p>
                </div>
            </div>`
        })
        
        return schemeColorsHtml
}

function handleHexToCopy(e) {
    const hexToCopy = e.target.dataset.copy
    
    if(hexToCopy) {
        navigator.clipboard.writeText(hexToCopy);
        alert(`Copied: ${hexToCopy}`)
    }
}