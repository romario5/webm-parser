import WebMElement from '../element'
import { TYPE_MASTER, TYPE_UINT } from "../constants"


export class WebMTracks extends WebMElement
{
    constructor() {
        super('Tracks', TYPE_MASTER)

        this.entries = []

        this.EBML_ID = [22, 84, 174, 107] // HEX: 16 54 AE 6B
    }

    onParsingDone(bytes, offset) {
        this.parseChildren('entries', WebMTrackEntry, bytes, offset)
    }
}


export class WebMTrackEntry extends WebMElement
{
    constructor() {
        super('TrackEntry', TYPE_MASTER)

        this._availableElements = [
            WebMTrackNumber,
            WebMTrackUID,
            WebMVideo,
            WebMAudio
        ]
        
        this.EBML_ID = [174] // HEX: AE
    }
}


export class WebMTrackUID extends WebMElement
{
    constructor() {
        super('TrackUID', TYPE_UINT)
        this.EBML_ID = [115, 197] // HEX: 73 C5
    }
}


export class WebMTrackNumber extends WebMElement
{
    constructor() {
        super('TrackNumber', TYPE_UINT)
        this.EBML_ID = [215] // HEX: D7
    }
}



export class WebMVideo extends WebMElement
{
    constructor() {
        super('Video', TYPE_MASTER)
        this.EBML_ID = [224] // HEX: E0
    }
}


export class WebMAudio extends WebMElement
{
    constructor() {
        super('Audio', TYPE_MASTER)
        this.EBML_ID = [225] // HEX: E1
    }
}