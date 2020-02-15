import WebMElement from '../element'
import { TYPE_MASTER } from "../constants"

export class WebMCues extends WebMElement
{
    constructor() {
        super('Cues', TYPE_MASTER)
        this.EBML_ID = [28, 83, 187, 107] // HEX: 1C 53 BB 6B
    }
}