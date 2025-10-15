
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import SimulationForm from './components/SimulationForm';
import CodeDisplay from './components/CodeDisplay';
import VideoDisplay from './components/VideoDisplay';
import Loader from './components/Loader';
import { generateSimulationCode, generateSimulationVideo } from './services/geminiService';

const App = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [submittedPrompt, setSubmittedPrompt] = useState<string>('');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [outputType, setOutputType] = useState<'code' | 'video'>('code');

  const handleGenerate = useCallback(async (userPrompt: string) => {
    if (!userPrompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedCode('');
    setGeneratedVideoUrl('');
    setSubmittedPrompt(userPrompt);

    try {
      if (outputType === 'code') {
        const code = await generateSimulationCode(userPrompt);
        setGeneratedCode(code);
      } else {
        const videoUrl = await generateSimulationVideo(userPrompt);
        setGeneratedVideoUrl(videoUrl);
      }
// FIX: Added a missing opening curly brace for the catch block.
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      // Add a more user-friendly message for video generation timeouts or errors
      if (outputType === 'video' && errorMessage.includes('Failed to generate video')) {
        setError("Sorry, the video simulation could not be created. This can happen with complex prompts or high demand. Please try a different prompt.");
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, outputType]);
  
  // Clean up blob URL when component unmounts or URL changes to prevent memory leaks
  useEffect(() => {
    const currentUrl = generatedVideoUrl;
    return () => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
    };
  }, [generatedVideoUrl]);


  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <main className="mt-8">
          <SimulationForm
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerate}
            isLoading={isLoading}
            outputType={outputType}
            setOutputType={setOutputType}
          />
          {error && (
            <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">
              <p className="font-semibold">Error:</p>
              <p>{error}</p>
            </div>
          )}
          {isLoading && <Loader isGeneratingVideo={outputType === 'video'} />}
          {generatedCode && !isLoading && outputType === 'code' && (
            <CodeDisplay code={generatedCode} />
          )}
           {generatedVideoUrl && !isLoading && outputType === 'video' && (
            <VideoDisplay videoUrl={generatedVideoUrl} prompt={submittedPrompt} />
          )}
        </main>
      </div>
       <footer className="w-full max-w-4xl mx-auto mt-12 text-center text-slate-500 text-sm">
        <p>Powered by Gemini 2.5 Pro & Veo. Generated simulations are for educational purposes.</p>
      </footer>
    </div>
  );
};

export default App;