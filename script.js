/****************************************
 * Input range                          *
 ****************************************/

const rangeInputs = document.querySelectorAll('input[type="range"]');
// const numberInput = document.querySelector('input[type="number"]');

function handleInputChange(target) {
    // let target = e.target;
    if (target.type !== 'range') {
        target = document.getElementById('range');
    }
    const min = target.min;
    const max = target.max;
    const val = target.value;

    target.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%';
}

rangeInputs.forEach((input) => {
    input.addEventListener('input', (e) => handleInputChange(e.target));
});

window.onload = () => {
    rangeInputs.forEach((input) => {
        handleInputChange(input);
    });
};

function formatNumber(n) {
    // format number 1000000 to 1.234.567
    return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// numberInput.addEventListener('input', handleInputChange);

/****************************************
 * Input currency                       *
 ****************************************/

const currencyInputs = document.querySelectorAll("input[data-type='currency']");
currencyInputs.forEach((input) => {
    input.addEventListener('keyup', (e) => formatCurrency(e.target));
    input.addEventListener('blur', (e) => formatCurrency(e.target));
});

function formatNumber(n) {
    // format number 1000000 to 1.234.567
    return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
function formatInput(n) {
    // format number 1.000.000 to 1234567
    let nWithoutPoint = n.replace('.', '');
    let nNumber = parseInt(nWithoutPoint, 10);
    let nString = nNumber.toString();
    return nString;
}

function formatCurrency(input) {
    let input_val = formatInput(input.value);

    if (input_val === '') {
        return;
    }

    let original_len = input.value.length;

    // position du curseur
    let caret_pos = input.selectionStart;

    input.value = formatNumber(input_val);

    // repositionne le curseur
    let updated_len = input.value.length;
    caret_pos = updated_len - original_len + caret_pos;
    input.setSelectionRange(caret_pos, caret_pos);
}
