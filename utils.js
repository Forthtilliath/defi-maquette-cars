/**
 * Ajoute des points pour les milliers
 * @param {String} nomber
 * @returns {String}
 */
export function formatNumber(nomber) {
    // format number 1000000 to 1.234.567
    return nomber.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Convertit la valeur du champ en nombre (retire les points et les 0 inutiles)
 * @param {String} n
 * @returns {Number}
 */
export function formatInputToNumber(n) {
    // format number 1.000.000 to 1234567
    let nWithoutPoint = n.replace('.', '');
    let nNumber = parseInt(nWithoutPoint, 10);
    return nNumber;
}

/**
 * Retourne une div contenant l'image en background
 * @param {String} url Url de l'image
 * @param  {...String} classes Classes à ajouter à la div générée
 * @returns {HTMLDivElement}
 */
export function createDivImage(url, ...classes) {
    const div = document.createElement('div');
    [...classes].forEach(classe => div.classList.add(classe));
    div.style.backgroundImage = `url('${url}')`;

    return div;
}

/**
 * Retourne l'index souhaité par rapport au numéro maximale possible
 * @param {Number} value Index souhaité
 * @param {Number} max Maximum d'éléments
 * @returns {Number}
 */
export function getIndex(value, max) {
    return (value + max) % max;
}

/**
 * Précharge une image
 * @param {String} url
 */
export function preloadImage(url) {
    const img = new Image();
    img.src = url;
}