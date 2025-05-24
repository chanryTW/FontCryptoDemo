# Font Crypto Demo

使用字體映射實現文字加密效果。通過將文字轉換為特定的映射字符，可以在視覺上達到加密效果，使爬蟲或複製時無法辨識，同時保持文字的可讀性。

## 效果展示

### 原始文字
![原始文字](/public/origin.png)

### 加密後文字
![加密後文字](/public/crypto.png)

## 實現原理

本專案通過修改字體文件實現加密效果。主要步驟如下：

1. **準備原始字體**
   - 選擇一個支援中文的字體文件（例如：思源黑體、蘋方等）
   - 確保字體授權允許修改和再分發

2. **生成加密字體**
   使用 Python 腳本修改字體文件：
   ```python
   from fontTools.ttLib import TTFont

   # 載入原始字體
   font = TTFont('原始字體.ttf')
   
   # 定義字符映射關係
   char_mapping = {
       '4': '0', '8': '8', '2': '7',
       'U': 'V', 'M': 'L', 'C': 'O',
       '台': '扣', '保': '熱', '折': '免',
       # ... 更多映射關係
   }
   
   # 修改字體的 cmap 表
   for table in font['cmap'].tables:
       for code, name in table.cmap.items():
           if chr(code) in char_mapping:
               # 將原字符映射到新字符的 glyph
               new_char = char_mapping[chr(code)]
               table.cmap[code] = font.getBestCmap()[ord(new_char)]
   
   # 儲存加密後的字體
   font.save('encrypted-font.ttf')
   ```

3. **應用到網站**
   ```css
   /* 定義加密字體 */
   @font-face {
     font-family: 'EncryptedFont';
     src: url('/fonts/encrypted-font.ttf') format('truetype');
   }
   
   /* 應用到需要加密的元素 */
   .encrypted-text {
     font-family: 'EncryptedFont', sans-serif;
   }
   ```