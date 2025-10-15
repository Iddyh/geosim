import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon } from './Icon';

interface CodeDisplayProps {
  code: string;
}

// FIX: Removed React.FC and added explicit prop typing for a more standard function component definition.
const CodeDisplay = ({ code }: CodeDisplayProps) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy code to clipboard.');
    }
  };

  return (
    <div className="mt-8 bg-gray-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 bg-slate-800 border-b border-slate-700">
        <p className="text-sm font-medium text-slate-300">Generated Python Code</p>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-sm bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold py-1 px-3 rounded-md transition-all duration-200"
        >
          {isCopied ? (
            <>
              <CheckIcon className="w-4 h-4 text-emerald-400" />
              Copied!
            </>
          ) : (
            <>
              <CopyIcon className="w-4 h-4" />
              Copy Code
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm">
          <code className="language-python font-mono text-slate-200">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeDisplay;
