import { beforeEach, describe, expect, it, vi } from "vitest";
import SentimentAnalysis from "../scripts/sentimentAnalysis";

describe("SentimentAnalysis", () => {
  let sentimentAnalyzer: SentimentAnalysis;

  beforeEach(() => {
    process.env.HF_API_KEY = "mock-api-key";
    sentimentAnalyzer = new SentimentAnalysis();

    global.fetch = vi.fn(async () => ({
      ok: true,
      json: async () => [
        [{ label: "POSITIVE", score: 0.98 }]
      ],
    })) as ReturnType<typeof vi.fn>;
  });

  it("should analyze positive sentiment correctly", async () => {
    const result = await sentimentAnalyzer.analyzeText("Some super positive text! :)");
    expect(result).toBe("POSITIVE");
  });

  it("should analyze negative sentiment correctly", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        [{ label: "NEGATIVE", score: 0.95 }]
      ],
    });

    const result = await sentimentAnalyzer.analyzeText("Some terrible and negative text!!!!!!! :(");
    expect(result).toBe("NEGATIVE");
  });

  it("should return NEUTRAL for low-confidence results", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        [{ label: "POSITIVE", score: 0.5 }]
      ],
    });

    const result = await sentimentAnalyzer.analyzeText("This is a sentence.");
    expect(result).toBe("NEUTRAL");
  });
});
