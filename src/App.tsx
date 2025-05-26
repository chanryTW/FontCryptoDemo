import React from 'react';
import FontDemo from './components/FontDemo';

function App() {
  return (
    <div className="w-screen min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Font Encrypt 字型加密演示</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <FontDemo />
        </div>
      </div>
    </div>
  );
}

export default App;
