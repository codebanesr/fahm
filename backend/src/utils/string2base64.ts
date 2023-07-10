export function stringToBase64(input: string): string {
  const buffer = Buffer.from(input, 'utf8');
  return buffer.toString('base64');
}
