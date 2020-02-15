export const DEBUG_MODE = true
export const LOG_PREFIX = '%c WebM Parser:'


// EBML elements types.
export const TYPE_MASTER = 'master' // Master element
export const TYPE_INT    = 'int'    // Signed integer. Big-endian, any size (1 - 8 bytes)
export const TYPE_UINT   = 'uint'   // Unsigned integer. Big-endian, any size (1 - 8 bytes)
export const TYPE_FLOAT  = 'float'  // Float. Big-endian, defined for 4 and 8 bytes (32, 64 bits)
export const TYPE_BINARY = 'bin'    // Not interpreted by the parser
export const TYPE_UTF_8  = 'utf8'   // Unicode string, zero padded when needed (RFC 2279)
export const TYPE_STRING = 'string' // Printable ASCII (0x20 to 0x7E), zero-padded when needed
export const TYPE_DATE   = 'date'   /* Signed 8 octets integer in nanoseconds with 0 indicating 
                                    the precise beginning of the millennium 
                                    (at 2001-01-01T00:00:00,000000000 UTC) */