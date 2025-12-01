import { GoogleGenAI, Type } from "@google/genai";
import { IntimacyLevel, ItemType, WheelItem } from "../types";

const createItem = (text: string, type: ItemType, color: string): WheelItem => ({
  id: Math.random().toString(36).substr(2, 9),
  text,
  type,
  color
});

const getColorsForLevel = (level: IntimacyLevel) => {
  // Expanded palettes
  switch (level) {
    case IntimacyLevel.Hot:
      return [
        '#ff0844', '#ffb199', '#f43b47', '#453a94', 
        '#c79081', '#dfa579', '#f09819', '#edde5d',
        '#e96443', '#904e95', '#ff9a9e', '#fecfef'
      ];
    case IntimacyLevel.Flirty:
      return [
        '#a18cd1', '#fbc2eb', '#8fd3f4', '#84fab0', 
        '#fccb90', '#d57eeb', '#e0c3fc', '#8ec5fc',
        '#96deda', '#50c9c3', '#d299c2', '#fef9d7'
      ];
    default: // Sweet
      return [
        '#FF9A9E', '#FECFEF', '#FFB7B2', '#FFDAC1', 
        '#E2F0CB', '#B5EAD7', '#C7CEEA', '#F6EAC2',
        '#ff9a9e', '#fad0c4', '#a18cd1', '#fad0c4'
      ];
  }
};

export const generateNewItems = async (level: IntimacyLevel): Promise<WheelItem[]> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("No API Key found");
      return [];
    }

    const ai = new GoogleGenAI({ apiKey });
    
    let levelPrompt = "";
    switch(level) {
      case IntimacyLevel.Sweet:
        levelPrompt = "Cute, mild, innocent couple activities (hugs, compliments, small favors). PG rating.";
        break;
      case IntimacyLevel.Flirty:
        levelPrompt = "Romantic, sensual, flirty activities (kissing, massage, whispers). PG-13 rating.";
        break;
      case IntimacyLevel.Hot:
        levelPrompt = "Spicy, passionate, intense activities (blindfolds, sensation play, dominance). Rated R but safe for general audience descriptions (no explicit words).";
        break;
    }

    const prompt = `Generate 12 unique, fun, and interactive tasks for a couple's wheel game. 
    The intimacy level is: ${levelPrompt}.
    Mix rewards (fun/pleasurable) and mild punishments (dares/chores).
    Keep descriptions short (under 10 Chinese characters if possible).
    Return ONLY JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING, description: "The task text in Chinese" },
                  type: { type: Type.STRING, enum: ["REWARD", "PUNISHMENT"] }
                },
                required: ["text", "type"]
              }
            }
          }
        }
      }
    });

    const jsonStr = response.text;
    if (!jsonStr) throw new Error("Empty response");

    const parsed = JSON.parse(jsonStr);
    const colors = getColorsForLevel(level);

    if (parsed.items && Array.isArray(parsed.items)) {
      return parsed.items.map((item: any, index: number) => 
        createItem(item.text, item.type === "REWARD" ? ItemType.Reward : ItemType.Punishment, colors[index % colors.length])
      );
    }

    return [];
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return [];
  }
};