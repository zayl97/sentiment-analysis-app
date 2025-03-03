import SentimentAnalysis from "./sentimentAnalysis";

const apiKey = "";
const sentimentAnalyzer = new SentimentAnalysis(apiKey);

const textInput = document.getElementById("text-input") as HTMLInputElement;
const analyzeButton = document.getElementById(
  "analyze-button"
) as HTMLButtonElement;
const resultModal = document.getElementById("result-modal") as HTMLDivElement;
const resultText = document.getElementById(
  "result-text"
) as HTMLParagraphElement;
const closeModal = document.getElementById("close-modal") as HTMLButtonElement;

analyzeButton.addEventListener("click", async () => {
  const text = textInput.value.trim();

  try {
    const sentiment = await sentimentAnalyzer.analyzeText(text);
    resultText.innerText = `Analysis result: ${sentiment}`;
    resultModal.style.display = "block";
  } catch (error: any) {
    alert(error.message);
  }
});

closeModal.addEventListener("click", () => {
  resultModal.style.display = "none";
});
