import SentimentAnalysis from "./sentimentAnalysis";

const apiKey = "";
const sentimentAnalyzer = new SentimentAnalysis(apiKey);

const textInput = document.getElementById("inputText") as HTMLTextAreaElement;
const analyzeButton = document.getElementById("analyzeBtn") as HTMLButtonElement;
const sentimentModal = document.getElementById("sentimentModal") as any;

analyzeButton.addEventListener("click", async () => {
  sentimentModal.showModal(); // temporary
  const text = textInput.value.trim();
  if (!text) return;

  try {
    const sentiment = await sentimentAnalyzer.analyzeText(text);
    sentimentModal.setAttribute("label", sentiment);
    sentimentModal.showModal();
  } catch (error: any) {
    alert(error.message);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  sentimentModal.hideModal();
});
