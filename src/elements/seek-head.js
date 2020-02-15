import WebMElement from '../element'
import { TYPE_MASTER, TYPE_UINT, TYPE_BINARY } from "../constants"


export class WebMSeekHead extends WebMElement
{
    constructor() {
        super('SeekHead', TYPE_MASTER)

        this.seeks = []
        this.EBML_ID = [17, 77, 155, 116] // HEX: 11 4D 9B 74
    }

    onParsingDone(bytes, offset) {
        this.parseChildren('seeks', WebMSeek, bytes, offset)
    }
}


export class WebMSeek extends WebMElement
{
    constructor() {
        super('Seek', TYPE_MASTER)
        this._availableElements = [
            WebMSeekId,
            WebMSeekPosition
        ];
        this.EBML_ID = [77, 187] // HEX: 4D BB
    }
}


export class WebMSeekId extends WebMElement
{
    constructor() {
        super('SeekId', TYPE_BINARY)
        this.EBML_ID = [83, 171] // HEX: 53 AB
    }
}


export class WebMSeekPosition extends WebMElement
{
    constructor() {
        super('SeekPosition', TYPE_UINT)
        this.EBML_ID = [83, 172] // HEX: 53 AC
    }
}