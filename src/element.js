import { log, warn } from "./logging"
import { printInHex } from './helpers';


export default class WebMElement
{
    constructor(name, type) {

        Object.defineProperty(this, '_name', {
            enumerable: false,
            value: name.slice(0, 1).toLowerCase() + name.slice(1)
        })

        Object.defineProperty(this, '_type', {
            enumerable: false,
            value: type || WebM.TYPE_UINT
        })

        Object.defineProperty(this, '_position', {
            enumerable: false,
            value: undefined
        })

        Object.defineProperty(this, '_length', {
            enumerable: false,
            value: undefined
        })

        Object.defineProperty(this, '_contentLength', {
            enumerable: false,
            value: undefined
        })

        Object.defineProperty(this, '_availableElements', {
            enumerable: false,
            value: []
        })

        Object.defineProperty(this, 'is' + name, {
            enumerable: false,
            value: true
        })

        Object.defineProperty(this, 'EBML_ID', {
            enumerable: false,
            value: []
        })
    }

    /**
     * 
     * @param {Uint8Array} bytes 
     * @param {int} offset 
     * @param {bool} onlyTry If true no logging will be done on fail.
     * @return {bool} Returns true on if EBML ID is presented. Please make data check by yourself.
     */
    parse(bytes, offset, onlyTry) {
        log("Parsing " + this._name + " ...")

        // Set default values
        if (offset === undefined) offset = 0
        if (onlyTry === undefined) onlyTry = false

        // Check for EBML ID
        let len = Math.min(this.EBML_ID.length, bytes.length - offset)
        try {
            if (len < this.EBML_ID.length) {
                throw 'Unable to parse ' + this._name + ': Too few bytes'
            }

            for (let i = 0, len = this.EBML_ID.length; i < len; i++) {
                if (bytes[offset + i] !== this.EBML_ID[i]) {
                    throw 'Unable to parse ' + this._name + ': ID doesn\'t match'
                }
            }
        } catch(e) {
            if (!onlyTry) {
                printInHex(bytes.slice(offset - 10, offset + 10))
                let given = []
                let id = []
                for (let i = 0; i < len; i++) {
                    given.push(bytes[offset + i].toString(16).toUpperCase())
                }
                for (let i = 0; i < this.EBML_ID.length; i++) {
                    id.push(this.EBML_ID[i].toString(16).toUpperCase())
                }
                warn(e, 'Given: [' + given.join(' '), ']   ID: [', id.join(' ') + ']')
            }
            return false;
        }
        
        
        // Set meta-data of the element.
        this._position = offset - 1
        offset += this.EBML_ID.length
        let contentSize = VInt.parse(bytes.slice(offset, offset + 8))
        offset += contentSize.bytesCount
        this._contentLength = contentSize.value
        this._length = this.EBML_ID.length + contentSize.bytesCount + (contentSize.value >= 0 ? contentSize.value : 0)

        // Parse content depending on element type.
        let sliceLen = contentSize.value >= 0 ? contentSize.value : bytes.length - offset
        switch(this._type)
        {
            case WebM.TYPE_STRING:
                this.value = new TextDecoder("utf-8")
                .decode(bytes.slice(offset, offset + sliceLen))
                break
                
            case WebM.TYPE_INT:
                this.value = VInt.parse(bytes.slice(offset, offset + sliceLen)).value
                break

            case WebM.TYPE_UINT:
                this.value = VInt.parse(bytes.slice(offset, offset + sliceLen)).value
                break

            case WebM.TYPE_BINARY:
                this.value = bytes.slice(offset, offset + sliceLen)
                break

            case WebM.TYPE_MASTER:
                let maxTries = 1000
                let elements = this._availableElements.slice(0)
                let totalParsed = 0
                do {
                    totalParsed = 0
                    
                    for (let i = 0, len = elements.length; i < len; i++) {
                        let el = new elements[i]()
                        if (el.parse(bytes, offset, false)) {
                            elements.splice(i, 1).slice(0)
                            this[el._name] = el
                            offset += el._length
                            if (this._contentLength < 0 && el._length > 0) {
                                this._length += el._length
                            }
                            totalParsed++
                            break;
                        }
                    }
                } while(maxTries > 0 && totalParsed > 0 && elements.length > 0)
        }
        this.onParsingDone(bytes, offset)
        return true
    }

    onParsingDone(bytes, offset) {
        // This method may be overridden in sub-class
    }

    /**
     * Parses data sequence of elements in the given property.
     * @param {string} propName 
     * @param {function} constructor 
     * @param {Uint8Array} bytes 
     * @param {int} offset 
     */
    parseChildren(propName, constructor, bytes, offset) {
        log('Parsing children (' + constructor.name + ')')
        do {
            let el = new constructor()
            if (el.parse(bytes, offset, true)) {
                offset += el._length
                this._length += el._length
                this[propName].push(el)
                continue;
            }
            break
        } while(true)
    }
}