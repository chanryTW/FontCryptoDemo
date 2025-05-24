#!/usr/bin/env fontforge
import fontforge
import random
import os
import json

# 設定基礎字型（使用系統字體）
base_font_path = "/System/Library/Fonts/STHeiti Light.ttc"
font = fontforge.open(base_font_path)

# 定義要加密的字元範圍
common_chinese = [
    '價', '格', '元', '折', '特', '優', '惠', '限', '時', '間',
    '新', '品', '熱', '賣', '推', '薦', '購', '買', '商', '店',
    '台', '幣', '折', '扣', '免', '運', '費', '全', '館', '最',
    '低', '保', '證', '質', '量', '保', '固', '天', '退', '換'
]

chars_to_encrypt = {
    'numbers': [chr(c) for c in range(ord('0'), ord('9') + 1)],
    'uppercase': [chr(c) for c in range(ord('A'), ord('Z') + 1)],
    'lowercase': [chr(c) for c in range(ord('a'), ord('z') + 1)],
    'chinese': common_chinese
}

# 為每個類別創建映射
mapping = {}
for category, char_list in chars_to_encrypt.items():
    # 確保字符列表中沒有重複
    char_list = list(set(char_list))
    # 創建打亂後的列表
    shuffled = char_list[:]
    random.shuffle(shuffled)
    # 更新映射
    mapping.update(dict(zip(char_list, shuffled)))

# 輸出映射表到文件
with open('glyph_mapping.json', 'w', encoding='utf-8') as f:
    json.dump(mapping, f, ensure_ascii=False, indent=2)

# 創建新字體
new_font = fontforge.font()
new_font.encoding = 'UnicodeFull'
new_font.fontname = "EncryptedFont"
new_font.familyname = "EncryptedFont"
new_font.fullname = "EncryptedFont"

# 從原始字體複製所有需要的字形到新字體
all_chars = set(list(mapping.keys()) + list(mapping.values()))
for char in all_chars:
    if ord(char) in font:
        # 在新字體中創建字符
        new_font.createChar(ord(char))
        # 從原始字體複製字形
        font.selection.select(ord(char))
        font.copy()
        new_font.selection.select(ord(char))
        new_font.paste()

# 創建臨時字體用於存儲原始字形
temp_font = fontforge.font()
temp_font.encoding = 'UnicodeFull'

# 先將所有原始字形保存到臨時字體
for src, dst in mapping.items():
    if ord(src) in new_font:
        # 在臨時字體中創建字符
        temp_font.createChar(ord(src))
        # 從新字體複製原始字形
        new_font.selection.select(ord(src))
        new_font.copy()
        temp_font.selection.select(ord(src))
        temp_font.paste()

# 執行字形替換
for src, dst in mapping.items():
    if ord(src) in temp_font and ord(dst) in new_font:
        # 從臨時字體獲取原始字形
        temp_font.selection.select(ord(src))
        temp_font.copy()
        # 將原始字形貼到目標字符位置
        new_font.selection.select(ord(dst))
        new_font.paste()

# 輸出加密字體
output_path = "../public/fonts/encrypted-font.woff2"
os.makedirs(os.path.dirname(output_path), exist_ok=True)
new_font.generate(output_path)

print("✅ 加密字體已生成：", output_path)
print("✅ 映射表已保存至：glyph_mapping.json")

# 打印部分映射示例
print("\n映射示例：")
sample_chars = list(mapping.items())[:10]
for src, dst in sample_chars:
    print(f"{src} -> {dst}") 