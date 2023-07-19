// JavaScript BMI
document.getElementById('bmiForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const gender = document.getElementById('gender').value;

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        alert('Masukkan nilai tinggi dan berat yang valid.');
        return;
    }

    const bmi = calculateBMI(height, weight);
    const bmiCategory = getBMICategory(bmi, gender);

    document.getElementById('bmiValue').textContent = bmi.toFixed(2);
    document.getElementById('bmiCategory').textContent = 'Kategori: ' + bmiCategory;
    document.getElementById('bmiDescription').textContent = getDescription(bmiCategory);
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('downloadLink').classList.remove('hidden');
});

// Untuk menghitung BMI
function calculateBMI(height, weight) {
    const heightInMeter = height / 100;
    return weight / (heightInMeter * heightInMeter);
}

// Untuk mendapatkan kategori BMI berdasarkan jenis kelamin
function getBMICategory(bmi, gender) {
    if (gender === 'male') {
        if (bmi < 18.5) return 'Kurus';
        if (bmi >= 18.5 && bmi < 24.9) return 'Normal';
        if (bmi >= 25 && bmi < 29.9) return 'Kelebihan Berat Badan';
        if (bmi >= 30) return 'Obesitas';
    } else {
        if (bmi < 17.5) return 'Kurus';
        if (bmi >= 17.5 && bmi < 23.9) return 'Normal';
        if (bmi >= 24 && bmi < 28.9) return 'Kelebihan Berat Badan';
        if (bmi >= 29) return 'Obesitas';
    }
}

// Untuk mendapatkan keterangan berdasarkan kategori BMI
function getDescription(bmiCategory) {
    switch (bmiCategory) {
        case 'Kurus':
            return 'Anda termasuk dalam kategori berat badan kurang. Pertahankan pola makan yang sehat dan berimbang, serta konsultasikan dengan ahli gizi atau dokter jika diperlukan.';
        case 'Normal':
            return 'Selamat! Anda memiliki berat badan yang sehat. Pertahankan pola makan dan gaya hidup yang sehat untuk tetap dalam kategori ini.';
        case 'Kelebihan Berat Badan':
            return 'Anda memiliki kelebihan berat badan. Cobalah untuk mengurangi konsumsi kalori dan tingkatkan aktivitas fisik untuk mencapai berat badan yang sehat.';
        case 'Obesitas':
            return 'Anda mengalami obesitas. Segera konsultasikan dengan dokter atau ahli gizi untuk mendapatkan rekomendasi pengelolaan berat badan yang tepat.';
        default:
            return '';
    }
}

// Mengunduh hasil BMI 
document.getElementById('downloadButton').addEventListener('click', function () {
    const bmiValue = document.getElementById('bmiValue').textContent;
    const bmiCategory = document.getElementById('bmiCategory').textContent;
    const bmiDescription = document.getElementById('bmiDescription').textContent;

    const resultText = `Hasil BMI:\nBMI Anda: ${bmiValue}\nKategori: ${bmiCategory}\nKeterangan: ${bmiDescription}`;
    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.getElementById('downloadLink');
    link.href = url;
});

document.getElementById('resetButton').addEventListener('click', function () {
    // Mengosongkan hasil dan form input
    document.getElementById('bmiValue').textContent = '';
    document.getElementById('bmiCategory').textContent = '';
    document.getElementById('bmiDescription').textContent = '';
    document.getElementById('result').classList.add('hidden');
    document.getElementById('downloadLink').classList.add('hidden');
    document.getElementById('bmiForm').reset();
});
