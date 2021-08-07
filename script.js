const rangeInputs = document.querySelectorAll('input[type="range"]');
const currencyInputs = document.querySelectorAll("input[data-type='currency']");

window.onload = () => {
    rangeInputs.forEach((input) => {
        handleInputChange(input);
        setCurrency(input);
    });
};

rangeInputs.forEach((input) => {
    input.addEventListener('input', (e) => {
        handleInputChange(e.target);
        setCurrency(e.target);
    });
});

currencyInputs.forEach((input) => {
    input.addEventListener('input', (e) => {
        formatCurrency(e.target);
        setRange(e.target);
    });
});

/****************************************
 * Input range                          *
 ****************************************/

/**
 * Adapte la longueur du background en fonction de la valeur du champ
 * @param {HTMLInputElement} target Input de type range
 */
function handleInputChange(target) {
    const min = target.min;
    const max = target.max;
    const val = target.value;

    target.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%';
}

/**
 * Retourne le champ Range correspondant au champ currency
 * @param {HTMLInputElement} input
 * @returns {HTMLInputElement}
 */
function getClosestRange(input) {
    return input.closest('#paiement > div').querySelector('input[type="range"]');
}

/**
 * Met à jour la valeur du champ range à partir du champ input
 * @param {HTMLInputElement} inputCurrency
 */
function setRange(inputCurrency) {
    const inputRange = getClosestRange(inputCurrency);
    inputRange.value = formatInputToNumber(inputCurrency.value);
    handleInputChange(inputRange);
}

function getClosestInput(input) {
    return (
        input.closest('#paiement > div').querySelector('input[type="text"]') ||
        input.closest('#paiement > div').querySelector('select')
    );
}

/**
 * Met à jour la valeur du champ input à partir du champ range
 * @param {HTMLInputElement} inputRange
 */
function setCurrency(inputRange) {
    const input = getClosestInput(inputRange);
    input.value = inputRange.value;

    if (input.getAttribute('data-type') === 'currency') {
        formatCurrency(input);
    }
}

/****************************************
 * Input currency                       *
 ****************************************/

/**
 * Ajoute des points pour les milliers
 * @param {String} n
 * @returns {String}
 */
function formatNumber(n) {
    // format number 1000000 to 1.234.567
    return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Convertit la valeur du champ en nombre (retire les points et les 0 inutiles)
 * @param {String} n
 * @returns {Number}
 */
function formatInputToNumber(n) {
    // format number 1.000.000 to 1234567
    let nWithoutPoint = n.replace('.', '');
    let nNumber = parseInt(nWithoutPoint, 10);
    return nNumber;
}

/**
 * Met à jour l'affichage du prix
 * @param {HTMLInputElement} input Input de type text
 * @returns
 */
function formatCurrency(input) {
    if (input.value === '') return;

    let original_len = input.value.length;

    // position du curseur
    let caret_pos = input.selectionStart;

    // met à jour la valeur dans le champ
    input.value = formatNumber(formatInputToNumber(input.value).toString());

    // repositionne le curseur
    let updated_len = input.value.length;
    caret_pos = updated_len - original_len + caret_pos;

    input.setSelectionRange(caret_pos, caret_pos);
}
