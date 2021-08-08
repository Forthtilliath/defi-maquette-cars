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