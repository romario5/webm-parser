import WebMElement from '../element'
import { TYPE_MASTER, TYPE_UINT, TYPE_BINARY } from "../constants"


export class WebMCluster extends WebMElement
{
    constructor() {
        super('Cluster', TYPE_MASTER)

        this._availableElements = [
            WebMClusterTimestamp
        ]

        this.simpleBlocks = []

        this.EBML_ID = [31, 67, 182, 117] // HEX: 1F 43 B6 75
    }

    onParsingDone(bytes, offset) {
        this.parseChildren('simpleBlocks', WebMSimpleBlock, bytes, offset)
    }

    /**
     * Regenerates bytes of the cluster.
     * IMPORTANT! This method is in development yet.
     */
    regenerateBytes() {

        let f = 0;
        let cap = this.EBML_ID.length;
        cap += this.timestamp._length;
        
        for (let i = 0, len = this.simpleBlocks.length; i < len; i++) {
            cap += this.simpleBlocks[i]._length;
        }

        let b = new Uint8Array(cap);

        for (let i = 0, len = this.EBML_ID.length; i < len; i++) {
            b[f++] = this.EBML_ID[i];
        }

        b[f++] = 1;
        b[f++] = 255;
        b[f++] = 255;
        b[f++] = 255;
        b[f++] = 255;
        b[f++] = 255;
        b[f++] = 255;
        b[f++] = 255;

        // Timestamp.
        for (let i = 0, len = this.timestamp.EBML_ID.length; i < len; i++) {
            b[f++] = this.timestamp.EBML_ID[i];
        }
        
        let lenBytes = VInt.createBytes(this.timestamp._contentLength);
        for (let k = 0; k < lenBytes.length; k++) {
            b[f++] = lenBytes[k];
        }

        let lenBytes2 = WebM.intToBytes(this.timestamp.value);
        for (let k = 0; k < lenBytes2.length; k++) {
            b[f++] = lenBytes2[k];
        }

        for (let i = 0, len = this.simpleBlocks.length; i < len; i++) {
            let block = this.simpleBlocks[i];
    
            
            for (let j = 0, len2 = block.EBML_ID.length; j < len2; j++) {
                b[f++] = block.EBML_ID[j];
            }

            let lenBytes = VInt.createBytes(block._contentLength);
            for (let k = 0; k < lenBytes.length; k++) {
                b[f++] = lenBytes[k];
            }
            

            for (let j = 0, len2 = block.value.length; j < len2; j++) {
                b[f++] = block.value[j];
            }
        }

        return b;
    }
}


export class WebMClusterTimestamp extends WebMElement
{
    constructor() {
        super('Timestamp', TYPE_UINT)
        this.EBML_ID = [231] // HEX: E7
    }


    setValue(value) {
        this.value = value
        this._contentLength = Math.max(WebM.intToBytes(value).length, 1)
        this._length = this.EBML_ID.length + 1 + this._contentLength
    }
}


export class WebMSimpleBlock extends WebMElement
{
    constructor() {
        super('SimpleBlock', TYPE_BINARY)
        this.EBML_ID = [163] // HEX: A3
    }
}