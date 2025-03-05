import SentimentAnalysis from "./sentimentAnalysis";

const sentimentAnalyzer = new SentimentAnalysis();

const textInput = document.getElementById("inputText") as HTMLTextAreaElement;
const analyzeButton = document.getElementById("analyzeBtn") as HTMLButtonElement;
const sentimentModal = document.getElementById("sentimentModal") as any;
const errorMessage = document.getElementById("errorMessage") as HTMLSpanElement;

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

textInput.addEventListener("input", () => {
  const textLength = textInput.value.trim().length;

  if (textLength < 1 || textLength > 500) {
    analyzeButton.disabled = true;
  } else {
    analyzeButton.disabled = false;
  }

  if (textLength > 500) {
    textInput.classList.add('error');
    errorMessage.textContent = "Text must not exceed 500 characters.";
  } else {
    textInput.classList.remove('error');
    errorMessage.textContent = "";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  sentimentModal.hideModal();
});
