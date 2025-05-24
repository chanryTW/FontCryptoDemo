interface GlyphMapping {
  [key: string]: string;
}

// 實際的映射表
const glyphMapping: GlyphMapping = {
  "4": "0", "8": "8", "2": "7", "0": "5", "9": "9",
  "1": "3", "6": "2", "5": "1", "7": "6", "3": "4",
  "U": "V", "M": "L", "C": "O", "I": "T", "P": "U",
  "J": "R", "X": "I", "B": "Z", "O": "C", "N": "K",
  "W": "S", "A": "B", "E": "J", "H": "N", "G": "A",
  "K": "G", "Z": "E", "F": "M", "Y": "W", "D": "D",
  "L": "Y", "T": "Q", "V": "P", "S": "H", "Q": "F",
  "R": "X", "q": "h", "u": "r", "w": "k", "d": "y",
  "b": "p", "z": "t", "e": "s", "t": "b", "c": "w",
  "a": "q", "k": "m", "y": "a", "f": "e", "s": "j",
  "g": "v", "h": "n", "i": "z", "o": "d", "x": "g",
  "p": "x", "j": "f", "v": "u", "m": "l", "l": "i",
  "r": "o", "n": "c",
  "台": "扣", "保": "熱", "折": "免", "質": "費", "證": "限",
  "全": "保", "賣": "幣", "熱": "元", "薦": "薦", "間": "證",
  "量": "價", "元": "購", "退": "買", "店": "新", "格": "品",
  "天": "低", "推": "固", "幣": "量", "新": "台", "扣": "全",
  "固": "運", "限": "店", "低": "折", "換": "時", "最": "賣",
  "價": "天", "優": "惠", "免": "質", "買": "特", "惠": "間",
  "時": "換", "品": "商", "費": "退", "特": "最", "運": "館",
  "館": "格", "商": "推", "購": "優"
};

export const encryptText = (text: string): string => {
  return text.split('').map(char => glyphMapping[char] || char).join('');
};

export const decryptText = (text: string): string => {
  const reverseMapping = Object.fromEntries(
    Object.entries(glyphMapping).map(([k, v]) => [v, k])
  );
  return text.split('').map(char => reverseMapping[char] || char).join('');
}; 