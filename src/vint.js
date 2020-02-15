import { warn } from "./logging"

export default class VInt
{
    constructor(value, bytesCount) {
        this.value = value
        this.bytesCount = bytesCount
        this.bytes = []
    }

    /**
    * Parses data size (variable integer)
    * @param {Uint8Array} bytes 
    * @return {int}
    */
   static parse(bytes) {
       let len = Math.min(bytes.length, 8)
       let binary = ''
       for (let i = 0; i < len; i++) {
           binary += bytes[i].toString(2).padStart(8, '0')
       }

       // Check for undefined value.
       if (binary === '0000000111111111111111111111111111111111111111111111111111111111') {
            return new VInt(-1, 8)
       }

       // For one byte
       if (binary.length === 8 || binary[0] === '1') {
           return new VInt(parseInt('0' + binary.slice(1, 8), 2), 1)

       // For two bytes   
       } else if (binary.length === 16 || binary[1] === '1') {
           return new VInt(parseInt('00' + binary.slice(2, 16), 2), 2)

       // For three bytes    
       } else if (binary.length === 24 || binary[2] === '1') {
           return new VInt(parseInt('000' + binary.slice(3, 24), 2), 3)

       // For four bytes
       } else if (binary.length === 32 || binary[3] === '1') {
           return new VInt(parseInt('0000' + binary.slice(4, 32), 2), 4)

       // For five bytes
       } else if (binary[4] === '1') {
           return new VInt(parseInt('00000' + binary.slice(5, 40), 2), 5)
       }

       warn('Unable to parse VInt (' + binary + ')')
       return new VInt(parseInt(binary, 2), bytes.length)
   }


   static createBytes(value) {
        if (value < 0 || value > Math.pow(2, 53)) {
            throw new Error("Unrepresentable value: " + value)
        }
        for (var length = 1; length <= 8; length++) {
            if (value < Math.pow(2, 7 * length) - 1) {
                break
            }
        }
        var buffer = new Uint8Array(length)
        for (var i = 1; i <= length; i++) {
            var b = value & 0xFF
            buffer[length - i] = b
            value -= b
            value /= Math.pow(2, 8)
        }
        buffer[0] = buffer[0] | (1 << (8 - length))
        return buffer
    }
}
