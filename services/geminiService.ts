import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const CODE_MODEL = 'gemini-2.5-pro';
const VIDEO_MODEL = 'veo-2.0-generate-001';

export const generateSimulationCode = async (userInput: string): Promise<string> => {
    const systemInstruction = `You are a world-class AI assistant specializing in generating Python code for geography simulations.
Your task is to generate a complete, single-file, runnable Python script based on the user's request.
You must return the code in a JSON object with a single key "code".

**Instructions:**
1.  Use modern Python 3.
2.  Utilize popular and appropriate libraries for scientific simulation and visualization, such as \`matplotlib\`, \`numpy\`, \`pandas\`, or \`scipy\`. Ensure these are standard libraries that can be installed via pip.
3.  The code must be well-commented to explain the core logic, especially the simulation parameters and steps.
4.  Include all necessary imports at the top of the script.
5.  If the simulation produces a visual output (like a plot or map), the code must display it (e.g., using \`plt.show()\`).
`;

    try {
        const response = await ai.models.generateContent({
            model: CODE_MODEL,
            contents: `**User's Request:**\n"${userInput}"`,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        code: {
                            type: Type.STRING,
                            description: "The complete, runnable Python script for the simulation."
                        }
                    },
                    required: ["code"]
                }
            }
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);

        if (result && result.code) {
            return result.code;
        } else {
            throw new Error("The model did not return valid Python code in the expected format. Please try rephrasing your request.");
        }

    } catch (e) {
        console.error("Error generating simulation code:", e);
        throw new Error("Failed to communicate with the AI model. Please check your API key and network connection.");
    }
};

export const generateSimulationVideo = async (userInput: string): Promise<string> => {
    try {
        let operation = await ai.models.generateVideos({
            model: VIDEO_MODEL,
            prompt: `cinematic, high detail, professional quality, aerial view of: ${userInput}`,
            config: {
                numberOfVideos: 1
            }
        });

        while (!operation.done) {
            // Wait for 10 seconds before checking the status again.
            await new Promise(resolve => setTimeout(resolve, 10000));
            operation = await ai.operations.getVideosOperation({ operation });
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

        if (downloadLink) {
            const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
            if (!videoResponse.ok) {
                throw new Error(`Failed to download video file: ${videoResponse.statusText}`);
            }
            const videoBlob = await videoResponse.blob();
            return URL.createObjectURL(videoBlob);
        } else {
            throw new Error("Video generation completed, but no download link was found.");
        }
    } catch (e) {
        console.error("Error generating simulation video:", e);
        throw new Error("Failed to generate video. The model may be unavailable or the prompt could not be processed.");
    }
};
