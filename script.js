let currentChapter = 1;
let voices = [];

async function loadChapter(num) {
  try {
    const res = await fetch(`chapters/chapter${num}.json`);
    if (!res.ok) throw new Error("No more chapters");
    const data = await res.json();
    document.getElementById("chapterContainer").innerHTML = `
      <h2>${data.title}</h2>
      <img src="${data.image}" alt="${data.title}" style="width:100%; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.2); margin-bottom:1rem;">
      <p>${data.content}</p>
    `;
  } catch (err) {
    alert("Hết chương!");
    currentChapter--;
  }
}

function nextChapter() {
  currentChapter++;
  loadChapter(currentChapter);
}

function prevChapter() {
  if (currentChapter > 1) {
    currentChapter--;
    loadChapter(currentChapter);
  }
}

function readChapter() {
  const text = document.getElementById("chapterContainer").innerText;
  const msg = new SpeechSynthesisUtterance(text);
  const selected = document.getElementById("voiceSelect").value;
  msg.voice = voices.find(v => v.name === selected);
  speechSynthesis.cancel(); // dừng trước đó
  speechSynthesis.speak(msg);
}

function populateVoices() {
  voices = speechSynthesis.getVoices();
  const voiceSelect = document.getElementById("voiceSelect");
  voiceSelect.innerHTML = "";
  voices.forEach(v => {
    const opt = document.createElement("option");
    opt.value = v.name;
    opt.textContent = `${v.lang} - ${v.name}`;
    voiceSelect.appendChild(opt);
  });
}

speechSynthesis.onvoiceschanged = populateVoices;

document.addEventListener("DOMContentLoaded", () => {
  populateVoices();
  loadChapter(currentChapter);
});
