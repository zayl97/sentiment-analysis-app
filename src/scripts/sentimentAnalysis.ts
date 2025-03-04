class SentimentAnalysis {
    private apiKey: string;
    private apiUrl: string;
  
    constructor(apiKey: string) {
      this.apiKey = apiKey;
      this.apiUrl =
        "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment";
    }
  
    async analyzeText(text: string): Promise<string> {
      if (!this.validateInput(text)) {
        throw new Error("Text must be between 1 and 500 characters long");
      }
  
      try {
        const response = await fetch(this.apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: text }),
        });
  
        if (!response.ok) {
          throw new Error("Error communicating with API");
        }
  
        const result = await response.json();
        return this.parseSentiment(result);
      } catch (error) {
        throw new Error("There was a problem analyzing the text");
      }
    }
  
    private validateInput(text: string): boolean {
      return text.length > 0 && text.length <= 500;
    }
  
    private parseSentiment(response: any): string {
      if (!Array.isArray(response) || response.length === 0) {
        throw new Error("Invalid API response");
      }
  
      const labels = ["Negative", "Neutral", "Positive"];
      const scores = response[0].map((item: any) => item.score);
      const maxIndex = scores.indexOf(Math.max(...scores));
  
      return labels[maxIndex];
    }
}

export default SentimentAnalysis;
  