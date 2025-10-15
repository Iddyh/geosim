import React from 'react';

interface VideoDisplayProps {
  videoUrl: string;
  prompt: string;
}

const VideoDisplay = ({ videoUrl, prompt }: VideoDisplayProps) => {
  return (
    <div className="mt-8 bg-gray-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
      <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
        <p className="text-sm font-medium text-slate-300">Generated Video Simulation</p>
        <p className="text-xs text-slate-400 mt-1 italic max-w-full truncate">Prompt: "{prompt}"</p>
      </div>
      <div className="p-4 bg-black">
        <video
          src={videoUrl}
          controls
          autoPlay
          loop
          className="w-full rounded-lg aspect-video"
          aria-label="Generated simulation video"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoDisplay;
