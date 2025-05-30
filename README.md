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

## 應用場景 | Application Scenarios

- 資料防爬蟲（電商價格、商品名稱、評論等） | Data anti-crawling (e.g., e-commerce prices, product names, reviews)
- 客戶端資料保密顯示（如票據、加密身份資訊） | Client-side data privacy display (e.g., tickets, encrypted identity information)
- 動態字型混淆（每日或每次啟動動態刷新字型與映射） | Dynamic font obfuscation (dynamic refresh of font and mapping daily or each time the application is started)


## 注意事項 | Notes

- **SEO 無效**：被加密的字不會被搜尋引擎讀取 | SEO ineffective: Encrypted characters are not read by search engines
- **無障礙性差**：螢幕閱讀器無法識別字形 | Accessibility issues: Screen readers cannot identify character shapes
- **需搭配前後端同步更新映射表** | Requires synchronization of mapping tables between front and back ends
- **效能需考慮**：若字型過大，需透過 `subset` 精簡使用字碼 | Performance considerations: If the font is too large, it needs to be subsetted using `subset`