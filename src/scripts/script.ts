import SentimentAnalysis from "./sentimentAnalysis";

const sentimentAnalyzer = new SentimentAnalysis();

const textInput = document.getElementById("inputText") as HTMLTextAreaElement;
const analyzeButton = document.getElementById("analyzeBtn") as HTMLButtonElement;
const sentimentModal = document.getElementById("sentimentModal") as any;

analyzeButton.addEventListener("click", async () => {
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
