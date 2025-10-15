import React from 'react';
import { PythonIcon, VideoIcon } from './Icon';

interface SimulationFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
  outputType: 'code' | 'video';
  setOutputType: (type: 'code' | 'video') => void;
}

const examplePrompts = [
    "Simulate coastal erosion over time",
    "Model the formation of a river delta",
    "Visualize tectonic plate movement and subduction",
    "Create a simulation of a volcanic eruption's ash cloud",
];

const SimulationForm = ({ prompt, setPrompt, onGenerate, isLoading, outputType, setOutputType }: SimulationFormProps) => {
  
  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(prompt);
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-lg">
      <div className="flex justify-center mb-5">
        <div className="bg-slate-900 p-1 rounded-full flex items-center space-x-1" role="radiogroup">
          <button
            type="button"
            role="radio"
            aria-checked={outputType === 'code'}
            onClick={() => setOutputType('code')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
              outputType === 'code'
                ? 'bg-cyan-500 text-white shadow'
                : 'text-slate-400 hover:bg-slate-700'
            }`}
            disabled={isLoading}
          >
            <PythonIcon className="w-5 h-5" />
            Python Code
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={outputType === 'video'}
            onClick={() => setOutputType('video')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
              outputType === 'video'
                ? 'bg-cyan-500 text-white shadow'
                : 'text-slate-400 hover:bg-slate-700'
            }`}
            disabled={isLoading}
          >
            <VideoIcon className="w-5 h-5" />
            Video Simulation
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="simulation-prompt" className="block text-lg font-medium text-slate-300 mb-2">
           {outputType === 'code' 
            ? 'Describe the simulation you want to generate:'
            : 'Describe the video simulation you want to see:'
          }
        </label>
        <textarea
          id="simulation-prompt"
          rows={4}
          className="w-full bg-slate-900/70 border border-slate-600 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 resize-none placeholder-slate-500"
          placeholder={
            outputType === 'code'
              ? 'e.g., A simulation of rainfall distribution on a mountain range...'
              : 'e.g., An aerial view of a river delta forming over centuries...'
          }
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />
        <div className="mt-3 text-sm text-slate-400">
            Or try an example:
            <div className="flex flex-wrap gap-2 mt-2">
                {examplePrompts.map(ex => (
                    <button 
                        key={ex}
                        type="button" 
                        onClick={() => handleExampleClick(ex)}
                        className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-full text-xs transition-colors"
                        disabled={isLoading}
                    >
                        {ex}
                    </button>
                ))}
            </div>
        </div>
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-emerald-600 hover:from-cyan-600 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            outputType === 'code' ? 'Generate Simulation' : 'Generate Video'
          )}
        </button>
      </form>
    </div>
  );
};

export default SimulationForm;
