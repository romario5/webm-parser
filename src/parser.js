import { log } from "./logging"
import { WebMHeader } from "./elements/header"
import { WebMSegment } from "./elements/segment"

export default class WebM
{
    constructor() {
        this.header = new WebMHeader()   // EMBL info
        this.segment = new WebMSegment() // Segment info
    }

    /**
     * Array buffer that contains video data.
     * @param {Uint8Array} buffer 
     */
    parse(bytes) {
        log("Started...")

        // Parse header (EMBL element)
        this.header.parse(bytes)
        
        // Parse segment element
        if (this.header._length) {
            this.segment.parse(bytes, this.header._length)
        }
    }
}