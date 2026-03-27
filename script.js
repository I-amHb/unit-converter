const qty = document.getElementById('quantity');
const qtyFromUnits = document.querySelector('.from-units');
const qtyToUnits = document.querySelector('.to-units');

const fromInput = document.getElementById('from-input');
const toInput = document.getElementById('to-input');

const buttons = document.querySelectorAll('.key-grid button');

const quantities = [
    {
        name: 'Temperature',
        units: ['Fahrenheit', 'Celsius', 'Kelvin']
    },
    {
        name: 'Length',
        units: ['Angstrom', 'Nanometer', 'Micrometer', 'Millimeter', 'Centimeter', 'Meter', 'Kilometer', 'Inch', 'Foot', 'Yard', 'Mile']
    },
    {
        name: 'Time',
        units: ['Second', 'Minute', 'Hour', 'Day', 'Week', 'Month', 'Year']
    },
    {
        name: 'Weight and Mass',
        units: ['Gram', 'Kilogram', 'Pound', 'Ounce', 'Ton']
    },
    {
        name: 'Energy',
        units: ['Joule', 'Calorie', 'Kilowatt-hour', 'BTU']
    },
    {
        name: 'Speed',
        units: ['Meter per second', 'Kilometer per hour', 'Mile per hour', 'Knot']
    },
    {
        name: 'Pressure',
        units: ['Pascal', 'Bar', 'Atmosphere', 'PSI']
    },
    {
        name: 'Volume',
        units: ['Liter', 'Milliliter', 'Cubic meter', 'Gallon', 'Cubic inch']
    }
]

quantities.forEach(quantity => {
    const option = document.createElement('option');
    option.value = quantity.name;
    option.textContent = quantity.name;
    qty.appendChild(option);
});

qty.addEventListener('change', (e) => {
    const selectedQuantity = quantities.find(quantity => quantity.name === e.target.value);
    // Clear existing unit options

    qtyFromUnits.innerHTML = '';
    qtyToUnits.innerHTML = '';


    // Populate unit options for the selected quantity
    selectedQuantity.units.forEach(unit => {
        const optionFrom = document.createElement('option');
        optionFrom.value = unit;
        optionFrom.textContent = unit;
        qtyFromUnits.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = unit;
        optionTo.textContent = unit;
        qtyToUnits.appendChild(optionTo);
    });
});

let activeInput = fromInput;


fromInput.addEventListener('focus', () => activeInput = fromInput);
toInput.addEventListener('focus', () => activeInput = toInput);

document.querySelector('.from').addEventListener('click', (e) => {
    if (e.target.tagName !== 'SELECT') fromInput.focus();
});
document.querySelector('.to').addEventListener('click', (e) => {
    if (e.target.tagName !== 'SELECT') toInput.focus();
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent.trim();

        switch(value) {
            case 'C':
                activeInput.value = '0';
                break;
            case '←':
                if (activeInput.value.lenght <= 1) {
                    activeInput.value = '0';
                } else {
                    activeInput.value = activeInput.value.slice(0, -1);
                }
                break;
                
            case '.':           // Decimal point
                if (!activeInput.value.includes('.')) {
                    if(activeInput.value === '' || activeInput.value === '0') {
                        activeInput.value = '0.';
                    } else {
                        activeInput.value += '.';
                    }
                }
                break;

            default:
                if (activeInput.value === '0' && value !== '0') {
                    activeInput.value = value;
                } else {
                    activeInput.value += value;
                }
            }
    })
})

