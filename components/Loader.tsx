import React, { useState, useEffect } from 'react';

interface LoaderProps {
  isGeneratingVideo?: boolean;
}

const codeMessages = [
  "Consulting digital tectonic plates...",
  "Calibrating the geological model...",
  "Simulating atmospheric pressure...",
  "Plotting geographical data points...",
  "Compiling Python cartography...",
];

const videoMessages = [
  "Sending prompt to the video model...",
  "Initializing video synthesis process...",
  "Rendering high-resolution frames...",
  "This can take a few minutes, please wait...",
  "Stitching frames into a simulation...",
  "Finalizing video output...",
];

const Loader = ({ isGeneratingVideo = false }: LoaderProps) => {
  const messages = isGeneratingVideo ? videoMessages : codeMessages;
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    // Reset message to the first in the list when the type of generation changes
    setMessage(messages[0]);

    const interval = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = messages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % messages.length;
        return messages[nextIndex];
      });
    }, isGeneratingVideo ? 3500 : 2500);

    return () => clearInterval(interval);
  }, [messages, isGeneratingVideo]);

  return (
    <div className="mt-8 flex flex-col items-center justify-center p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
      <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-300 text-lg transition-opacity duration-500">{message}</p>
      {isGeneratingVideo && <p className="text-sm text-slate-400 mt-2 text-center">Video generation is a complex process and may take several minutes.</p>}
    </div>
  );
};

export default Loader;
