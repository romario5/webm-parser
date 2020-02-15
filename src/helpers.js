/**
 * Prints array of unsigned integers as hex
 * @param {Uint8Array} bytes 
 * @param {string} prefix 
 */
export function printInHex(bytes, prefix) {
    if (prefix === undefined) prefix = '';
    let str = '';
    for (let i = 0, len = bytes.length; i < len; i++) {
        str += bytes[i].toString(16).padStart(2, '0').toUpperCase() + ' ';
    }
    WebM.log(prefix, str);
}


/**
 * Converts integer to array of bytes
 * @param {integer} int 
 */
export function intToBytes(int) {
    let arr = new Uint8Array([
            (int & 0xff000000) >> 24,
            (int & 0x00ff0000) >> 16,
            (int & 0x0000ff00) >> 8,
            (int & 0x000000ff)
    ]);

    let res = [];

    for (let i = 0; i < 4; i++) {
        if (arr[i] !== 0 || res.length) {
            res.push(arr[i]);
        }
    }

    return res;
}