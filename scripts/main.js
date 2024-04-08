"use strict";
// Part 1: Hidden image
const hiddenImage = document.querySelector("#hidden-image img");

hiddenImage.addEventListener("click", function() {
    hiddenImage.classList.add("hidden");
});

// Part 2: Changing colors
const changingColorsParagraph = document.querySelector("#changing-colors p");
let clickCount = 1;

changingColorsParagraph.addEventListener("click", function() {
    if (clickCount % 2 !== 0) {
        changingColorsParagraph.classList.add("pink-background");
    } else {
        changingColorsParagraph.classList.remove("pink-background");
    }
    clickCount++;
});

changingColorsParagraph.addEventListener("dblclick", function() {
    changingColorsParagraph.style.color = "purple";
});

// Part 3: Text cloning
const input = document.querySelector("#text-cloning input");
const paragraph = document.querySelector("#text-cloning p");
const clear = document.querySelector("#text-cloning button:nth-of-type(1)");
const bold = document.querySelector("#text-cloning button:nth-of-type(2)");

input.addEventListener("input", (event)=>{
    if (event.inputType == "deleteContentBackward") {
        paragraph.textContent = paragraph.textContent.slice(0,-1);
    }else{
        paragraph.textContent += input.value.charAt(input.value.length - 1);
    }
});

clear.addEventListener("click", function() {
    input.value = "";
    paragraph.textContent = "";
    input.focus();
    bold.classList.remove("hidden");
});

bold.addEventListener("click", function() {
    
    const halfLength = Math.round(paragraph.textContent.length/2);
    const firstHalf = paragraph.textContent.substring(0, halfLength);
    const secondHalf = paragraph.textContent.substring(halfLength, paragraph.textContent.length);
    paragraph.innerHTML = `<strong>${firstHalf}</strong>${secondHalf}`
    bold.classList.add("hidden");
});

// Part 4: Complicated list things
const items = document.querySelectorAll('#complicated-list-things li');
const item1 = document.querySelector("li:nth-of-type(1)");
const item5 = document.querySelector("li:nth-of-type(5)");

item1.addEventListener("mouseover", function() {
    this.style.backgroundColor = "pink";
});
item1.addEventListener("mouseout", function() {
    this.style.backgroundColor = "";
});

item5.addEventListener("mouseover", function() {
    this.style.backgroundColor = "pink";
});
item5.addEventListener("mouseout", function() {
    this.style.backgroundColor = "";
});

items.forEach(function(items) {
    items.addEventListener("click", function() {
        const newItem = document.createElement("li");
        newItem.textContent = "New Item";
        this.parentNode.insertBefore(newItem, this.nextSibling);
    });
});


// Part 5: Simple fetch
const articleTitle = document.querySelector("#simple-fetch h3");
articleTitle.addEventListener("click", function() {
    fetch("index2.html")
        .then(response => response.text())
        .then(data => {
            const divContent = document.querySelector("#simple-fetch div");
            divContent.innerHTML = data;
        })
        .catch(error => console.error("Error fetching data:", error));
});

// Part 6: Working with an API
const convertButton = document.querySelector("#working-with-api button");
const conversionResult = document.querySelector("#working-with-api div");
convertButton.addEventListener("click", async function() {
    const currencyValue = parseFloat(document.querySelector("#working-with-api input").value);
    const baseCurrency = document.querySelector("#working-with-api select:nth-of-type(1)").value;
    const targetCurrency = document.querySelector("#working-with-api select:nth-of-type(2)").value;

    if (!isNaN(currencyValue) && baseCurrency && targetCurrency) {
        try {
            const response = await fetch(`https://freecurrencyapi.net/api/v1/rates?base=${baseCurrency}&symbols=${targetCurrency}`);
            const data = await response.json();
            if (data.success) {
                const rate = data.rates[targetCurrency];
                const convertedValue = currencyValue * rate;
                conversionResult.textContent = `${currencyValue.toFixed(2)} ${baseCurrency} equals ${convertedValue.toFixed(2)} ${targetCurrency}`;
            } else {
                conversionResult.textContent = "Error: " + data.error.info;
            }
        } catch (error) {
            conversionResult.textContent = "Error fetching data: " + error;
        }
    } else {
        conversionResult.textContent = "Please enter valid currency value and choose base/target currencies.";
    }
});
;