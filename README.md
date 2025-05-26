# Font Encrypt Demo

使用字體映射實現文字加密效果。通過將文字轉換為特定的映射字符，可以在視覺上達到加密效果，使爬蟲或複製時無法辨識，同時保持文字的可讀性。

Implement text encryption effects using font mapping. By converting text into specific mapped characters, it achieves a visual encryption effect that prevents crawlers or copying while maintaining text readability.

## 效果展示 | Demo

### 原始文字 | Original Text
![原始文字](/public/origin.png)

### 加密後文字 | Encrypted Text
![加密後文字](/public/encrypt.png)

## 實際應用案例 | Real-world Application

### 貓眼電影 Top100 | Maoyan Movies Top100
[貓眼電影網 | Maoyan Movie Website](https://www.maoyan.com/board/1) 使用了類似的字體加密技術來保護其票房數據和評分。

特點 | Features：
- 對數字進行加密，使得複製或爬蟲獲取到的數據與顯示不符
  Encrypts numbers so that copied or crawled data doesn't match what's displayed
- 保持了良好的可讀性，不影響用戶體驗
  Maintains good readability without affecting user experience
- 通過自定義字體實現，確保了數據的視覺保護
  Implemented through custom fonts to ensure visual protection of data

## 實現原理 | Implementation Principles

本專案通過修改字體文件實現加密效果。主要步驟如下：

This project implements encryption effects by modifying font files. The main steps are as follows:

1. **準備原始字體 | Prepare Original Font**
   - 選擇一個支援中文的字體文件（例如：思源黑體、蘋方等）
     Choose a font file that supports Chinese (e.g., Source Han Sans, PingFang)
   - 確保字體授權允許修改和再分發
     Ensure font license allows modification and redistribution

2. **生成加密字體 | Generate Encrypted Font**
   使用 Python 腳本修改字體文件：
   Use Python script to modify font file:
   ```python
   from fontTools.ttLib import TTFont

   # 載入原始字體 | Load original font
   font = TTFont('原始字體.ttf')
   
   # 定義字符映射關係 | Define character mapping
   char_mapping = {
       '4': '0', '8': '8', '2': '7',
       'U': 'V', 'M': 'L', 'C': 'O',
       '台': '扣', '保': '熱', '折': '免',
       # ... 更多映射關係 | more mappings
   }
   
   # 修改字體的 cmap 表 | Modify font cmap table
   for table in font['cmap'].tables:
       for code, name in table.cmap.items():
           if chr(code) in char_mapping:
               # 將原字符映射到新字符的 glyph | Map original character to new character's glyph
               new_char = char_mapping[chr(code)]
               table.cmap[code] = font.getBestCmap()[ord(new_char)]
   
   # 儲存加密後的字體 | Save encrypted font
   font.save('encrypted-font.ttf')
   ```

3. **應用到網站 | Apply to Website**
   ```css
   /* 定義加密字體 | Define encrypted font */
   @font-face {
     font-family: 'EncryptedFont';
     src: url('/fonts/encrypted-font.ttf') format('truetype');
   }
   
   /* 應用到需要加密的元素 | Apply to elements that need encryption */
   .encrypted-text {
     font-family: 'EncryptedFont', sans-serif;
   }
   ```

## Quick Start

1. **安裝必要套件 | Install Required Packages**
   ```bash
   pip install fonttools
   ```

2. **準備字體文件 | Prepare Font Files**
   - 下載開源字體（如思源黑體）
     Download open-source font (e.g., Source Han Sans)
   - 將字體文件放置在專案目錄中
     Place font files in the project directory

3. **運行加密腳本 | Run Encryption Script**
   ```bash
   python scripts/encrypt_font.py
   ```

4. **使用加密字體 | Use Encrypted Font**
   - 將生成的 `encrypted-font.ttf` 放入網站的 `/public/fonts/` 目錄
     Place the generated `encrypted-font.ttf` in the website's `/public/fonts/` directory
   - 在 CSS 中引入並使用該字體
     Import and use the font in CSS