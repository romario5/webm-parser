import WebMElement from '../element'
import { TYPE_MASTER, TYPE_BINARY } from "../constants"
import { WebMSeekHead } from "./seek-head"
import { WebMTracks } from "./tracks"
import { WebMCues } from "./cues"
import { WebMCluster } from './cluster'


export class WebMSegment extends WebMElement
{
    constructor() {
        super('Segment', TYPE_MASTER)

        this._availableElements = [
            WebMSeekHead,
            WebMSegmentInfo,
            WebMTracks,
            WebMCues
        ]

        this.clusters = []

        this.EBML_ID = [24, 83, 128, 103] // HEX: 18 53 80 67
    }

    onParsingDone(bytes, offset) {
        this.parseChildren('clusters', WebMCluster, bytes, offset)
    }


    getLastCluster() {
        return this.clusters[this.clusters.length - 1]
    }
}


export class WebMSegmentInfo extends WebMElement
{
    constructor() {
        super('SegmentInfo', TYPE_MASTER)

        this._availableElements = [
            WebMSegmentUID
        ]

        this.EBML_ID = [21, 73, 169, 102] // HEX: 15 49 A9 66
    }
}

export class WebMSegmentUID extends WebMElement
{
    constructor() {
        super('SegmentUID', TYPE_BINARY)
        this.EBML_ID = [115, 164] // HEX: 73 A4
    }
}
