<form id="selfForm">
  <label for="name">Nama:</label>
  <input type="text" id="name" name="name" required />

  <label for="age">Usia:</label>
  <input type="number" id="age" name="age" required />

  <label for="personality">Tipe Kepribadian (MBTI):</label>
  <input type="text" id="personality" name="personality" />

  <label for="goals">Tujuan Hidup:</label>
  <input type="text" id="goals" name="goals" />

  <label for="gender">Jenis Kelamin:</label>
  <select id="gender" name="gender">
    <option value="">Pilih Jenis Kelamin</option>
    <option value="laki-laki">Laki-laki</option>
    <option value="perempuan">Perempuan</option>
  </select>

  <label for="birthdate">Tanggal Lahir:</label>
  <input type="date" id="birthdate" name="birthdate" />

  <button type="submit">Simpan Data Diri</button>
</form>

<h2>Hasil Analisis Diri</h2>
<div id="analysisResult"></div>
<button onclick="saveAnalysis()">💾 Simpan Analisis</button>

<script>
function getWeton(dateStr) {
  const pasaran = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
  const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  const baseDate = new Date('1900-01-01');
  const birthDate = new Date(dateStr);
  const daysDiff = Math.floor((birthDate - baseDate) / (1000 * 60 * 60 * 24));

  const dayIndex = birthDate.getDay();
  const pasaranIndex = daysDiff % 5;

  return hari[dayIndex] + ' ' + pasaran[pasaranIndex];
}

function getPsychologyByAge(age) {
  if (age < 13) return '🧒 Fase kanak-kanak: masa bermain dan belajar dasar.';
  if (age < 20) return '👦 Fase remaja: pencarian identitas dan emosi belum stabil.';
  if (age < 36) return '🧑 Fase dewasa awal: kemandirian, karier, dan hubungan serius.';
  if (age < 60) return '🧔 Fase dewasa madya: evaluasi hidup, kontribusi sosial, dan stabilitas.';
  return '👴 Fase lanjut usia: refleksi, kebijaksanaan, dan makna hidup.';
}

function generateExtendedAnalysis(userData) {
  let output = "";

  if (userData.birthdate) {
    const weton = getWeton(userData.birthdate);
    output += `<b>Weton Jawa:</b> ${weton}<br/>`;

    if (weton.includes("Kliwon")) {
      output += "🔮 Kliwon dikenal dengan karakter spiritual, misterius dan bijak.<br/>";
    } else if (weton.includes("Legi")) {
      output += "😊 Legi melambangkan sifat manis, disukai banyak orang dan tenang.<br/>";
    }
  }

  if (userData.age) {
    const age = parseInt(userData.age);
    output += `<b>Fase Psikologi Usia:</b> ${getPsychologyByAge(age)}<br/>`;
  }

  return output;
}

function generatePersonalityAnalysis(userData) {
  let result = "";
  if (!userData) return result;

  const type = userData.personality?.toUpperCase();

  switch (type) {
    case "INTJ":
      result += "<b>INTJ:</b> Strategis, logis, dan perencana jangka panjang.<br/>";
      result += "📌 Cocok untuk bidang: teknologi, penelitian, analisis data.<br/>";
      break;
    case "ENFP":
      result += "<b>ENFP:</b> Kreatif, antusias, dan komunikatif.<br/>";
      result += "📌 Cocok untuk bidang: komunikasi, seni, pendidikan.<br/>";
      break;
    case "ISTJ":
      result += "<b>ISTJ:</b> Teliti, tanggung jawab tinggi, terorganisir.<br/>";
      result += "📌 Cocok untuk bidang: administrasi, hukum, akuntansi.<br/>";
      break;
    default:
      result += `Tipe kepribadian ${type || "(belum diisi)"} tidak dikenali atau belum dianalisis.<br/>`;
  }

  if (userData.goals?.toLowerCase().includes("public speaking")) {
    result += "📈 Rekomendasi: Latih skill komunikasi, ikut pelatihan berbicara di depan umum.<br/>";
  }

  if (userData.gender) {
    result += `<b>Jenis Kelamin:</b> ${userData.gender}<br/>`;
    if (userData.gender.toLowerCase() === "perempuan") {
      result += "🌸 Kemampuan empati dan komunikasi interpersonal biasanya kuat.<br/>";
    } else if (userData.gender.toLowerCase() === "laki-laki") {
      result += "💪 Cenderung kuat dalam ketegasan dan pengambilan keputusan cepat.<br/>";
    }
  }

  if (userData.birthdate) {
    const birthDate = new Date(userData.birthdate);
    const now = new Date();
    const age = now.getFullYear() - birthDate.getFullYear();
    const month = birthDate.getMonth() + 1;
    result += `<b>Tanggal Lahir:</b> ${userData.birthdate} (Usia: ${age})<br/>`;

    const zodiac = getZodiac(birthDate.getDate(), month);
    result += `<b>Zodiak:</b> ${zodiac}<br/>`;
  }

  result += generateExtendedAnalysis(userData);

  return result;
}

function getZodiac(day, month) {
  const zodiacs = [
    ["Capricorn", 19], ["Aquarius", 18], ["Pisces", 20], ["Aries", 19],
    ["Taurus", 20], ["Gemini", 20], ["Cancer", 22], ["Leo", 22],
    ["Virgo", 22], ["Libra", 22], ["Scorpio", 21], ["Sagittarius", 21], ["Capricorn", 31]
  ];
  return day <= zodiacs[month - 1][1] ? zodiacs[month - 1][0] : zodiacs[month][0];
}
</script>
