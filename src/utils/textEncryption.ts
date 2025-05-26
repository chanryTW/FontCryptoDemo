import data from '../../scripts/glyph_mapping.json';

interface GlyphMapping {
  [key: string]: string;
}

const glyphMapping = data as GlyphMapping;

export const encryptText = (text: string): string => {
  return text.split('').map(char => glyphMapping[char] || char).join('');
};

export const decryptText = (text: string): string => {
  const reverseMapping = Object.fromEntries(
    Object.entries(glyphMapping).map(([k, v]) => [v, k])
  );
  return text.split('').map(char => reverseMapping[char] || char).join('');
}; 