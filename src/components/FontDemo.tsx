import React, { useState } from 'react';
import { encryptText } from '../utils/textEncryption';

const FontDemo: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isEncrypted, setIsEncrypted] = useState(false);

  const displayText = isEncrypted ? encryptText(inputText) : inputText;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="input-text" className="block text-sm font-medium text-gray-700">
          請輸入要加密的文字
        </label>
        <textarea
          id="input-text"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          rows={4}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="在此輸入文字..."
        />
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsEncrypted(!isEncrypted)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isEncrypted ? '顯示原文' : '加密顯示'}
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {isEncrypted ? '加密後的文字' : '原始文字'}
        </h3>
        <div
          className={`p-4 bg-gray-50 rounded-md ${
            isEncrypted ? 'font-encrypted' : 'font-normal'
          }`}
        >
          {displayText || '文字將顯示在這裡'}
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>提示：</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>加密後的文字在網頁原始碼中會顯示為不同的字符</li>
          <li>爬蟲只能獲取到加密後的字符，無法直接獲得原始文字</li>
          <li>使用自定義字體來顯示正確的文字內容</li>
        </ul>
      </div>
    </div>
  );
};

export default FontDemo; 