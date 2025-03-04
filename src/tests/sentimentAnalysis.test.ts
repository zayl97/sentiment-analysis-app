import { beforeEach, describe, expect, it } from "vitest";
import SentimentAnalysis from "../scripts/sentimentAnalysis";

describe("SentimentAnalysis", () => {
  let sentimentAnalyzer: SentimentAnalysis;

  beforeEach(() => {
    sentimentAnalyzer = new SentimentAnalysis("FAKE_API_KEY");
  });

  it("should analyze positive sentiment correctly", async () => {
    const result = await sentimentAnalyzer.analyzeText("Some positive text.");
    expect(result).toBe("positive");
  });

  it("should analyze negative sentiment correctly", async () => {
    const result = await sentimentAnalyzer.analyzeText(
      "Some negative text"
    );
    expect(result).toBe("negative");
  });
});
