
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AIResponse, AppMode } from "../types";

const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    subject: { type: Type.STRING, description: "The detected subject (Math, Physics, Urdu, Islamiat, etc.)" },
    topic: { type: Type.STRING, description: "The specific topic detected" },
    generalExplanation: { type: Type.STRING, description: "A simple explanation. If input is Urdu, this MUST be in Urdu." },
    mcqs: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          options: { type: Type.ARRAY, items: { type: Type.STRING } },
          correctAnswer: { type: Type.STRING }
        }
      }
    },
    shortQuestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          answer: { type: Type.STRING, description: "3-5 lines answer" }
        }
      }
    },
    longQuestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          answer: { type: Type.STRING, description: "Detailed conceptual answer" }
        }
      }
    },
    paperCheck: {
      type: Type.OBJECT,
      properties: {
        obtainedMarks: { type: Type.STRING },
        totalMarks: { type: Type.STRING },
        feedback: { type: Type.STRING },
        mistakes: { type: Type.ARRAY, items: { type: Type.STRING } },
        corrections: { type: Type.ARRAY, items: { type: Type.STRING } }
      }
    },
    guessPaper: {
      type: Type.OBJECT,
      properties: {
        importantTopics: { type: Type.ARRAY, items: { type: Type.STRING } },
        expectedQuestions: { type: Type.ARRAY, items: { type: Type.STRING } }
      }
    },
    mathSolution: {
      type: Type.OBJECT,
      properties: {
        steps: { type: Type.ARRAY, items: { type: Type.STRING } },
        finalAnswer: { type: Type.STRING }
      }
    },
    graphData: {
      type: Type.OBJECT,
      description: "Only if a function is detected that can be plotted.",
      properties: {
        title: { type: Type.STRING },
        xLabel: { type: Type.STRING },
        yLabel: { type: Type.STRING },
        dataPoints: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              x: { type: Type.NUMBER },
              y: { type: Type.NUMBER }
            }
          }
        }
      }
    }
  }
};

export const generateStudyContent = async (
  promptText: string,
  imageBase64: string | null,
  mimeType: string | null,
  mode: AppMode
): Promise<AIResponse> => {
  const modelId = "gemini-2.5-flash";

  let systemInstruction = `You are a world-class educational AI assistant. 
  
  **CRITICAL LANGUAGE RULE**: 
  - Detect the language of the user input (text or image). 
  - If the input is in **Urdu**, ALL generated output (Questions, Answers, MCQs, Explanations) MUST be in **Urdu**.
  - If the input is in English, output in English.
  
  **Tasks**:
  1. Detect the subject automatically (Math, Physics, Chemistry, Biology, English, Islamiat, Pakistan Studies, CS, etc.).
  2. If the input is handwritten or blurry, try your best to read it.
  3. Structure your output strictly according to the requested JSON schema.
  `;

  // Specific instructions based on Mode
  if (mode === AppMode.PAPER_CHECKER) {
    systemInstruction += ` Your primary task is to check the student's solved paper. Provide marks, point out specific mistakes, and show corrections.`;
  } 
  else if (mode === AppMode.MATH_SOLVER) {
    systemInstruction += ` Your primary task is to solve the math problem step-by-step. If a function is present, generate data points for a graph (x from -10 to 10 usually).`;
  } 
  else if (mode === AppMode.GRAPH_GEN) {
    systemInstruction += ` Your MAIN task is to identify the function and generate 'graphData' with at least 20 data points (x, y) for smooth plotting. Also provide a 'generalExplanation' of the graph's properties (domain, range, intercept). Do NOT generate MCQs or long questions.`;
  }
  else if (mode === AppMode.MCQ_GEN) {
    systemInstruction += ` Your MAIN task is to generate exactly **10 High-Quality MCQs** based on the input content. 
    - Do NOT generate Short or Long questions.
    - Ensure one option is definitely correct.
    - If input is Urdu, MCQs must be in Urdu.`;
  }
  else if (mode === AppMode.GUESS_PAPER) {
    systemInstruction += ` Your primary task is to generate a 'Guess Paper' with important expected questions and topics based on the input content context.`;
  } 
  else {
    // Default STUDY_GEN
    systemInstruction += ` Generate study materials: MCQs, Short Questions, and Long Questions based on the content.`;
  }

  const parts: any[] = [];
  
  if (imageBase64 && mimeType) {
    parts.push({
      inlineData: {
        data: imageBase64,
        mimeType: mimeType
      }
    });
  }

  parts.push({ text: promptText || "Analyze this content." });

  try {
    const response = await genAI.models.generateContent({
      model: modelId,
      contents: {
        parts: parts,
        role: 'user'
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: systemInstruction,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AIResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
