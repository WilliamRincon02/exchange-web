const api = "https://v6.exchangerate-api.com/v6/21ac3596254f014c21a8cb07"

const baseAmount = document.querySelector("#base-amount")
const baseCode = document.querySelector("#base-code")
const targetCode = document.querySelector("#target-code")
const convertButton = document.querySelector("#convert-button")
const result = document.querySelector("#result")

// Obtener los codigos de moneda
fetch(`${api}/latest/USD`)
    .then((response) => response.json())
    .then((data) => {
        for (let code in data.conversion_rates){
            const option = document.createElement("option")
            option.value = code
            option.textContent = code
            baseCode.appendChild(option)
            targetCode.appendChild(option.cloneNode(true))
        }
    })




convertButton.addEventListener("click", () => {
    if (!baseCode.value || !targetCode.value || !baseAmount.value) {
        result.textContent = 'Por favor completa todos los campos.';
        return;
    }else if (baseAmount.value < 0 || isNaN(baseAmount.value)) {
        result.textContent = 'Por favor ingresa un monto válido.';
        return;
    }else {

        // Conversion de una moneda a otra
        fetch (`${api}/pair/${baseCode.value}/${targetCode.value}/${baseAmount.value}`)
        .then((response) => response.json())
        .then((data) => {
            if(data.result === "success"){
                const resultAmount = data.conversion_result
                console.log(resultAmount)
                result.textContent = `${baseAmount.value} ${baseCode.value} = ${resultAmount} ${targetCode.value}`
                
            }else{
                result.textContent = 'Error en la conversión. Por favor verifica los datos.'
            }
        })
        .catch((error) => {
            console.error("Error fetching exchange rates:", error)
        })
        
    }
})

