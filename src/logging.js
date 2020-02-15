import { LOG_PREFIX, DEBUG_MODE } from "./constants"


export function log() {
    if (DEBUG_MODE) {
        console.log(LOG_PREFIX, 'font-weight: bold; color: #fa066b', ...arguments)
    }
}

export function warn() {
    if (DEBUG_MODE) {
        console.warn(LOG_PREFIX, 'font-weight: bold; color: #fa066b', ...arguments)
    }
}

export function error() {
    console.error(LOG_PREFIX, 'font-weight: bold; color: #fa066b', ...arguments)
}