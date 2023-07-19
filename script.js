document.getElementById('bmiForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const gender = document.getElementById('gender').value;

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        alert('Masukkan  tinggi dan berat yang valid.');
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
document.getElementById('resetButton').addEventListener('click', function () {
    // fungsi reset
    document.getElementById('bmiValue').textContent = '';
    document.getElementById('bmiCategory').textContent = '';
    document.getElementById('bmiDescription').textContent = '';
    document.getElementById('result').classList.add('hidden');
    document.getElementById('downloadLink').classList.add('hidden');
    document.getElementById('bmiForm').reset();
});

// Funfsiuntuk menghitung BMI
function calculateBMI(height, weight) {
    const heightInMeter = height / 100;
    return weight / (heightInMeter * heightInMeter);
}

// Fungsi kategori jenis kelamin
function getBMIkategori(bmi, gender) {
    if (gender === 'laki_laki') {
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

// Fungsi untuk keterangan
function getDescription(bmiketerangan) {
    switch (bmiketerangan) {
        case 'Kurus':
            return 'Anda termasuk dalam kategori berat badan kurang. Pertahankan pola makan yang sehat dan berimbang terutama jangan sampai telat makan, serta konsultasikan dengan ahli gizi atau dokter jika diperlukan.';
        case 'Normal':
            return 'Selamat! Anda memiliki berat badan yang sehat. Pertahankan pola makan dan gaya hidup yang sehat untuk tetap dalam kategori ini.';
        case 'Kelebihan Berat Badan':
            return 'Anda memiliki kelebihan berat badan. Cobalah untuk mengurangi konsumsi kalori dan tingkatkan aktivitas fisik untuk mencapai berat badan yang sehat.';
        case 'Obesitas':
            return 'Anda mengalami obesitas. Segera konsultasikan dengan dokter atau ahli gizi untuk mendapatkan rekomendasi pengelolaan berat badan yang tepat.olahraga yang teratur dan tepat agar sehat';
        default:
            return '';
    }
}

// Mengunduh hasil BMI dalam format teks
document.getElementById('download').addEventListener('click', function () {
    const bmiValue = document.getElementById('bmiValue').textContent;
    const bmikategori = document.getElementById('bmikategori').textContent;
    const bmiketerangan = document.getElementById('bmiketerangan').textContent;

    const resultText = `Hasil BMI:\nBMI Anda: ${bmiValue}\nKategori: ${bmikategori}\nKeterangan: ${bmiketerangan}`;
    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.getElementById('download');
    link.href = url;
});



