/**
 * src/engines/storage/checksum.ts
 * Pure TypeScript CRC16-CCITT implementation for Emergency Quick Sync Code.
 * Zero external dependencies (< 35 lines).
 */

const POLYNOMIAL = 0x1021;

/**
 * Calculates a 16-bit CRC (CRC-CCITT) checksum of a string.
 * Returns a 4-character uppercase hexadecimal string, e.g., "C9A2".
 */
export function calculateCrc16(data: string): string {
  let crc = 0xffff;

  for (let i = 0; i < data.length; i++) {
    const charCode = data.charCodeAt(i);
    // Process upper byte
    crc ^= (charCode & 0xff) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ POLYNOMIAL) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Verifies if the data matches the expected CRC16 checksum
 */
export function verifyCrc16(data: string, expectedCrc: string): boolean {
  return calculateCrc16(data) === expectedCrc.toUpperCase().trim();
}
