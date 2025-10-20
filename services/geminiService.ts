
import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API_KEY environment variable not set.");
    }
    return apiKey;
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

export const getAdhdContext = async (): Promise<string> => {
    const prompt = `
Provide a helpful and supportive summary for someone who has just taken an adult ADHD self-assessment. The tone should be informative, reassuring, and professional, similar to what might be found on the UK's National Health Service (NHS) website. Do not give medical advice.

Structure the response with the following sections, using markdown for formatting:
- A main heading like "*Understanding ADHD in Adults*".
- A brief explanation of what ADHD is.
- A section for "*Common Symptoms*" with a bulleted list of typical signs (e.g., inattention, hyperactivity, impulsivity).
- A section for "*Getting Help*" that emphasizes the importance of speaking to a healthcare professional (like a GP) for a proper diagnosis and discusses potential treatment options like therapy and medication in general terms.
- A concluding sentence that is encouraging.
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        
        return response.text;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "There was an issue fetching helpful context. Please remember that the most reliable source of information is a qualified healthcare professional. If you have any concerns about your health, please schedule an appointment with your doctor.";
    }
};
