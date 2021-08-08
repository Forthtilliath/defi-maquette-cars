import * as utils from './utils.js';

const rangeInputs = document.querySelectorAll('input[type="range"]');
const currencyInputs = document.querySelectorAll("input[data-type='currency']");

const slideshow = document.querySelectorAll('.mySlide');
const btn_prev = document.querySelector('#btn_prev');
const btn_next = document.querySelector('#btn_next');

// Création des evenements
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

btn_prev.addEventListener('click', () => plusSlides(-1));
btn_next.addEventListener('click', () => plusSlides(1));

/****************************************
 * Paiement                             *
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

    // met à jour la valeur dans le champ dans le format souhaité
    input.value = utils.formatNumber(utils.formatInputToNumber(input.value).toString());

    // repositionne le curseur
    let updated_len = input.value.length;
    caret_pos = updated_len - original_len + caret_pos;

    input.setSelectionRange(caret_pos, caret_pos);
}

/**
 * Met à jour la valeur du champ range à partir du champ input
 * @param {HTMLInputElement} inputCurrency
 */
function setRange(inputCurrency) {
    const inputRange = getClosestRange(inputCurrency);
    inputRange.value = utils.formatInputToNumber(inputCurrency.value);
    handleInputChange(inputRange);
}

/**
 * Retourne le champ Range correspondant au champ currency
 * @param {HTMLInputElement} input Range
 * @returns {HTMLInputElement}
 */
function getClosestRange(input) {
    return input.closest('#paiement > div').querySelector('input[type="range"]');
}

/**
 * Retourne le champ Range correspondant au champ currency
 * @param {HTMLInputElement} input Input currency
 * @returns {HTMLInputElement}
 */
function getClosestInput(input) {
    return (
        input.closest('#paiement > div').querySelector("input[data-type='currency']") ||
        input.closest('#paiement > div').querySelector('select')
    );
}

/****************************************
 * Slideshow                            *
 ****************************************/

let currentIndex = 1;
showSlides(0);

function plusSlides(n) {
    showSlides((currentIndex + n));
}

/**
 * 
 * @param {Number} n Photo à afficher
 */
function showSlides(n) {
    // x représente les photos du slideshow
    currentIndex = (n + slideshow.length) % slideshow.length;

    slideshow.forEach((image) => (image.style.display = 'none'));
    slideshow[currentIndex].style.display = 'block';
}
