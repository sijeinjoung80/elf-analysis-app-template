const selfForm = document.getElementById("selfForm");
const progressForm = document.getElementById("progressForm");
const recommendationBox = document.getElementById("recommendationBox");
const ctx = document.getElementById("progressChart").getContext("2d");

let progressData = JSON.parse(localStorage.getItem("progressData")) || [];

// Handle Self Data
selfForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userData = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    personality: document.getElementById("personality").value,
    goals: document.getElementById("goals").value,
  };
  localStorage.setItem("userData", JSON.stringify(userData));
  alert("Data diri disimpan!");
});

// Handle Progress Input
progressForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newProgress = {
    date: document.getElementById("date").value,
    learningHours: parseFloat(document.getElementById("learningHours").value),
    habitScore: parseInt(document.getElementById("habitScore").value),
  };
  progressData.push(newProgress);
  localStorage.setItem("progressData", JSON.stringify(progressData));
  updateChart();
  showRecommendation(newProgress);
  alert("Perkembangan disimpan!");
});

// Chart.js setup
let chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Jam Belajar",
        data: [],
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Skor Kebiasaan",
        data: [],
        borderColor: "green",
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  },
});

function updateChart() {
  chart.data.labels = progressData.map(p => p.date);
  chart.data.datasets[0].data = progressData.map(p => p.learningHours);
  chart.data.datasets[1].data = progressData.map(p => p.habitScore);
  chart.update();
}

function showRecommendation({ learningHours, habitScore }) {
  let rec = "";
  if (learningHours < 1) {
    rec += "⚠️ Tambah waktu belajar Anda. <br/>";
  }
  if (habitScore < 50) {
    rec += "⚠️ Perbaiki rutinitas dan kebiasaan Anda. <br/>";
  }
  if (!rec) rec = "✅ Kamu berada di jalur yang baik! Teruskan!";
  recommendationBox.innerHTML = rec;
}

// Load chart on load
updateChart();
