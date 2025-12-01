import { GoogleGenerativeAI } from "@google/generative-ai";
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
    const apiKey = (import.meta.env as any).VITE_API_KEY;
    if (!apiKey) {
      console.warn("No API Key found");
      return [];
    }

    const client = new GoogleGenerativeAI(apiKey);
    const model = client.getGenerativeModel({ model: "gemini-2.0-flash" });
    
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
    Return ONLY a JSON array with this structure: [{"text": "task in Chinese", "type": "REWARD" or "PUNISHMENT"}, ...]`;

    const result = await model.generateContent(prompt);

    const jsonStr = result.response.text();
    if (!jsonStr) throw new Error("Empty response");

    // Parse JSON response - try to extract JSON from response
    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch {
      // Try to extract JSON array from response
      const jsonMatch = jsonStr.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse JSON from response");
      }
    }

    const colors = getColorsForLevel(level);
    const items = Array.isArray(parsed) ? parsed : parsed.items || [];

    if (items && Array.isArray(items)) {
      return items.map((item: any, index: number) => 
        createItem(item.text, item.type === "REWARD" ? ItemType.Reward : ItemType.Punishment, colors[index % colors.length])
      );
    }

    return [];
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return [];
  }
};