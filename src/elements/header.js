import WebMElement from '../element'
import { TYPE_MASTER, TYPE_UINT } from "../constants"


// Represents first EBML element with meta-information
export class WebMHeader extends WebMElement
{
    constructor() {
        super('Header', TYPE_MASTER)

        this._availableElements = [
            WebMVersion, 
            WebMReadVersion,
            WebMMaxIDLength
        ]
    
        this.EBML_ID = [26, 69, 223, 163] // HEX: 1A 45 DF A3
    }
}


export class WebMVersion extends WebMElement
{
    constructor() {
        super('Version', TYPE_UINT)
        this.value = undefined
        this.EBML_ID = [66, 134] // HEX: 42 86
    }
}


export class WebMReadVersion extends WebMElement
{
    constructor() {
        super('ReadVersion', TYPE_UINT)
        this.value = undefined
        this.EBML_ID = [66, 247] // HEX: 42 F7
    }
}



export class WebMMaxIDLength extends WebMElement
{
    constructor() {
        super('MaxIDLength', TYPE_UINT)
        this.value = undefined
        this.EBML_ID = [66, 242] // HEX: 42 F2
    }
}