import * as utils from './utils.js';

const rangeInputs = document.querySelectorAll('input[type="range"]');
const currencyInputs = document.querySelectorAll("input[data-type='currency']");

const slideshowContainer = document.querySelector('#slideshow');
const btn_prev = document.querySelector('#btn_prev');
const btn_next = document.querySelector('#btn_next');
const thumbnailsContainer = document.querySelector('.thumbnails');

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

/** Index du diaporama */
let currentIndex = 1;
/** Chemin des images */
const path = './assets/car/';
/** Nom des images */
const imageNames = ['0.jpg', '1.png', '2.png', '3.jpg', '4.jpg', '5.jpeg', '6.jpg', '7.jpeg'];
const nbThumbnail = 5;

createSlideshow();
const slideshow = slideshowContainer.querySelectorAll('.mySlide');
showSlides(0);
createThumbnails();
const thumbnails = thumbnailsContainer.querySelectorAll('.img');

/**
 * Génère le diaporama à partir d'imageNames
 */
function createSlideshow() {
    let url = '';
    imageNames.forEach((imageName) => {
        url = path + imageName;
        slideshowContainer.insertAdjacentElement('beforeend', utils.createDivImage(url, 'mySlide'));
        utils.preloadImage(url);
    });
}

/**
 * Génère les vignettes
 */
function createThumbnails() {
    const thumbnailNames = imageNames.slice(1, nbThumbnail + 1);
    let url = '';
    let divToAdd = null;
    thumbnailNames.forEach((imageName, i) => {
        url = path + imageName;
        divToAdd = utils.createDivImage(url, 'img');
        thumbnailsContainer.insertAdjacentElement('beforeend', divToAdd);
        // Ajoute un evenement pour afficher l'image en cliquant sur la vignette
        divToAdd.addEventListener('click', () => plusSlides(i + 1));
    });
}

/**
 * Met à jour les vignettes
 * @param {Number} startIndex
 */
function updateThumbnails(startIndex) {
    // Génère un double tableau pour avoir un systeme de tableau infini
    // Il faut juste que le nouveau tableau ait plus d'éléments que le nombre de vignettes
    const thumbnailNames = [...imageNames, ...imageNames].slice(startIndex, nbThumbnail + startIndex);
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.style.backgroundImage = `url('${path}${thumbnailNames[index]}')`;
    });
}

/**
 * Décale les photos du diaporama
 * @param {Number} n Nombre de photos à décaler
 */
function plusSlides(n) {
    showSlides(currentIndex + n);
    updateThumbnails(utils.getIndex(currentIndex + 1, slideshow.length));
}

/**
 * Modifie la photo affichée
 * @param {Number} n Photo à afficher
 */
function showSlides(n) {
    currentIndex = utils.getIndex(n, slideshow.length);
    slideshow.forEach((image) => (image.style.display = 'none'));
    slideshow[currentIndex].style.display = 'block';
}
