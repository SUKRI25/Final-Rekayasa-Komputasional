# 🎬 Sistem Rekomendasi Film dengan Optimasi Genetic Algorithm

## 📋 Deskripsi Proyek

Aplikasi web yang mengimplementasikan sistem rekomendasi film berbasis **Content-Based Filtering** menggunakan **Cosine Similarity** untuk mengukur kesamaan film, dengan optimasi bobot genre menggunakan **Genetic Algorithm (GA)**.

### Judul Lengkap
**Optimasi Sistem Rekomendasi Film Berbasis Content-Based Filtering (Cosine Similarity) Menggunakan Genetic Algorithm untuk Pembobotan Fitur Genre**

---

## 🎯 Tujuan Sistem

1. **Content-Based Filtering**: Merekomendasikan film berdasarkan kemiripan konten (genre) dengan film referensi
2. **Cosine Similarity**: Mengukur tingkat kesamaan antara dua film menggunakan vektor genre
3. **Genetic Algorithm**: Menemukan bobot optimal untuk setiap genre sehingga rekomendasi lebih akurat

---

## 🏗️ Arsitektur Sistem

### Komponen Utama

```
┌─────────────────────────────────────────────────────────┐
│          Frontend - HTML/CSS/JavaScript                 │
├─────────────────────────────────────────────────────────┤
│  • UI untuk input film referensi                       │
│  • Kontrol parameter GA                                │
│  • Visualisasi hasil dengan Chart.js                   │
└─────────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────────┐
│          Application Controller (app.js)                │
├─────────────────────────────────────────────────────────┤
│  • Koordinasi antar module                             │
│  • Event handling                                       │
│  • UI rendering                                        │
└─────────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────────┐
│          Core Algorithms                                │
├─────────────────────────────────────────────────────────┤
│  1. CosineSimilarity (cosine-similarity.js)            │
│     - Calculate similarity antara dua vektor          │
│     - Movie to vector conversion                       │
│     - Get recommendations                              │
│                                                        │
│  2. GeneticAlgorithm (genetic-algorithm.js)           │
│     - Population initialization                        │
│     - Selection (Tournament)                           │
│     - Crossover (Uniform)                             │
│     - Mutation (Gaussian)                             │
│     - Fitness evaluation                              │
│     - Elitism preservation                            │
└─────────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────────┐
│          Data Layer (data-loader.js)                    │
├─────────────────────────────────────────────────────────┤
│  • Load data film dari CSV                            │
│  • Parse dan filter data                              │
│  • Quick lookup dengan Map                            │
│  • Sample data untuk testing                          │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Metodologi

### 1. Content-Based Filtering

**Konsep**: Merekomendasikan item berdasarkan kesamaan fitur dengan item referensi.

**Vektor Representasi**: Setiap film direpresentasikan sebagai vektor binary dalam ruang genre.

```
Film A = [1, 0, 1, 1, 0, 0, 1, ...]  (Adventure, Comedy, Action, ...)
Film B = [1, 0, 1, 0, 0, 1, 1, ...]
```

### 2. Cosine Similarity

**Formula**:
```
similarity(A, B) = (A · B) / (||A|| × ||B||)

Dimana:
- A · B = dot product (jumlah perkalian elemen)
- ||A|| = magnitude vektor A (√(sum of squares))
- ||B|| = magnitude vektor B
- Hasil: 0 (tidak sama) hingga 1 (identik)
```

**Implementasi**:
- Setiap genre diberi bobot (awalnya 1, dioptimalkan dengan GA)
- Film dikonversi ke vektor dengan bobot
- Similarity dihitung menggunakan formula di atas

### 3. Genetic Algorithm

**Tujuan**: Menemukan bobot optimal untuk setiap genre

**Komponen GA**:

#### Individu (Individual)
- **Genotipe**: Vektor bobot genre (0-1), panjang = jumlah genre
- **Phenotipe**: Bobot yang dinormalisasi (sum = 1)

#### Fitness Function
```javascript
fitness = rata-rata cosine similarity dari top-10 rekomendasi
```

Semakin tinggi fitness, semakin baik bobot tersebut.

#### Selection: Tournament Selection
```
1. Pilih k individu random dari populasi
2. Seleksi yang paling baik (fitness tertinggi)
3. Ulangi untuk mendapatkan parent lainnya
```

#### Crossover: Uniform Crossover
```
Untuk setiap gen:
  - 50% probabilitas ambil dari parent 1
  - 50% probabilitas ambil dari parent 2
```

#### Mutation: Gaussian Mutation
```
Untuk setiap gen dengan probabilitas mutation_rate:
  new_value = old_value + N(0, σ²)
  Bounded: [0, 1]
```

#### Elitism
```
- Pertahankan top k% individu terbaik ke generasi berikutnya
- Memastikan solusi terbaik tidak hilang
```

---

## 📁 Struktur File

```
tugas web rekayasa komputasional/
├── index.html                    # File HTML utama
├── styles.css                    # Styling CSS
├── app.js                        # Main application controller
├── cosine-similarity.js          # Implementasi Cosine Similarity
├── genetic-algorithm.js          # Implementasi Genetic Algorithm
├── data-loader.js                # Data loading dan processing
├── README.md                     # Dokumentasi ini
└── movies.csv (optional)         # Data film (jika menggunakan external file)
```

---

## 🚀 Cara Menggunakan

### 1. Membuka Aplikasi
- Buka file `index.html` dengan browser modern (Chrome, Firefox, Edge)
- Atau gunakan Live Server: `http://localhost:5500`

### 2. Langkah-Langkah Penggunaan

#### A. Sesuaikan Parameter GA (Opsional)
Di sidebar kiri, sesuaikan:
- **Ukuran Populasi**: 5-100 (default: 20)
  - Lebih besar = lebih teliti tapi lebih lambat
- **Jumlah Generasi**: 1-100 (default: 20)
  - Lebih banyak = solusi lebih optimal
- **Tingkat Mutasi**: 0.1-100% (default: 20%)
  - Lebih tinggi = lebih explore, kurang exploit
- **Tingkat Crossover**: 0.1-100% (default: 80%)
  - Peluang crossover dibanding mutation
- **Elitism**: 1-50% (default: 10%)
  - Persentase individu terbaik yang dipertahankan

#### B. Pilih Film Referensi
1. Gunakan search box untuk mencari film
2. Klik film dari daftar
3. Film terpilih akan ditampilkan dengan highlight

#### C. Jalankan Optimasi GA
1. Klik tombol **"🚀 Jalankan Optimasi GA"**
2. Tunggu progress bar hingga selesai (biasanya 5-30 detik)
3. Hasil akan ditampilkan otomatis

### 3. Interpretasi Hasil

#### Tab "Hasil Rekomendasi"
- Menampilkan top-10 film yang paling mirip dengan film referensi
- Setiap kartu menunjukkan:
  - Ranking (1-10)
  - Judul film
  - Genre
  - Persentase kesamaan

#### Tab "Bobot Fitur Optimal"
- Menampilkan bobot optimal setiap genre hasil GA
- Diurutkan dari bobot tertinggi ke terendah
- Bar chart memvisualisasikan distribusi bobot
- **Fitness Score**: Rata-rata similarity dari top-10 rekomendasi
- **Generasi Konvergen**: Pada generasi ke berapa GA dianggap konvergen

#### Tab "Evolusi GA"
- **Kurva Evolusi**: Grafik fitness sepanjang generasi
  - Garis hijau: Best fitness (tertinggi)
  - Garis biru: Average fitness
  - Garis merah: Worst fitness (terendah)
- **Statistik**: Fitness awal, akhir, dan peningkatan

#### Tab "Informasi"
- Penjelasan metode yang digunakan
- Referensi akademis
- Panduan lengkap

---

## 🔧 Parameter GA dan Pengaruhnya

### Ukuran Populasi
| Nilai | Efek | Rekomendasi |
|-------|------|------------|
| Kecil (5-10) | Cepat tapi tidak teliti | Untuk testing cepat |
| Normal (15-30) | Keseimbangan baik | Default |
| Besar (50-100) | Teliti tapi lambat | Untuk hasil production |

### Jumlah Generasi
| Nilai | Efek | Rekomendasi |
|-------|------|------------|
| Sedikit (5-10) | Cepat tapi tidak optimal | Untuk testing |
| Normal (20-50) | Balance | Default |
| Banyak (100+) | Sangat optimal tapi lambat | Untuk hasil terbaik |

### Tingkat Mutasi
| Nilai | Efek | Rekomendasi |
|-------|------|------------|
| Rendah (5-10%) | Exploitative | Convergence cepat |
| Normal (20-30%) | Balanced | Default |
| Tinggi (50-100%) | Explorative | Hindari local optima |

### Elitism
| Nilai | Efek | Rekomendasi |
|-------|------|------------|
| Rendah (1-5%) | Fleksibel tapi berisiko | Untuk populasi besar |
| Normal (10-20%) | Aman | Default |
| Tinggi (30-50%) | Converge cepat | Populasi kecil |

---

## 📊 Interpretasi Hasil

### Fitness Score
- **Range**: 0-1
- **Meaning**: 
  - 1.0 = rekomendasi sempurna match dengan film referensi
  - 0.5 = rekomendasi moderate
  - 0.0 = tidak ada kesamaan

### Generasi Konvergen
- Generasi saat GA mencapai convergence
- Jika sama dengan jumlah generasi, GA belum fully converged
- Coba tambah generations untuk hasil lebih baik

### Genre Weights
- Bobot menunjukkan pentingnya genre dalam rekomendasi
- Genre dengan bobot tinggi = prioritas dalam matching
- Bobot berbeda untuk setiap film referensi yang berbeda

---

## 💡 Tips & Trik

### Untuk Hasil Optimal
1. Gunakan populasi 30-50 untuk keseimbangan
2. Generasi 30-50 cukup untuk convergence
3. Mutation rate 15-25% bagus untuk balance
4. Jika hasil stagnan, naikkan mutation rate

### Untuk Eksperimen
1. Coba film yang berbeda-beda
2. Bandingkan bobot untuk film action vs drama
3. Perhatikan genre mana yang dominan
4. Gunakan parameter berbeda untuk dibandingkan

### Performance Tips
1. Gunakan populasi lebih kecil untuk response cepat
2. Kurangi jumlah generasi untuk testing
3. Browser Firefox/Chrome lebih cepat dari Edge
4. Close tab lain untuk performa maksimal

---

## 🧮 Contoh Perhitungan

### Cosine Similarity Contoh

```
Film Referensi: Toy Story
- Genre: [Adventure=1, Animation=1, Children=1, Comedy=1, Fantasy=1, ...]
- Dengan bobot: [0.15, 0.12, 0.11, 0.10, 0.09, ...]
- Vektor A: [0.15, 0.12, 0.11, 0.10, 0.09, 0, 0, 0, ...]

Film Kandidat: Jumanji  
- Genre: [Adventure=1, Children=1, Fantasy=1, ...]
- Dengan bobot sama
- Vektor B: [0.15, 0, 0.11, 0, 0.09, 0, 0, 0, ...]

Cosine Similarity = (0.15×0.15 + 0.12×0 + 0.11×0.11 + ...) / (||A|| × ||B||)
                  = 0.8234  (82.34% similar)
```

### GA Evolution Contoh

```
Generasi 0: Best Fitness = 0.45
Generasi 1: Best Fitness = 0.48
Generasi 5: Best Fitness = 0.62
Generasi 10: Best Fitness = 0.71
Generasi 15: Best Fitness = 0.74
Generasi 20: Best Fitness = 0.745  (converged)

Improvement: (0.745 - 0.45) / 0.45 × 100% = 65.6%
```

---

## 🔬 Teori Lanjutan

### Mengapa Cosine Similarity?
1. **Invariant terhadap magnitude**: Hanya perhatikan sudut, bukan panjang
2. **Interpretable**: Hasil 0-1 mudah dipahami
3. **Efficient**: Perhitungan O(n) cepat
4. **Cocok untuk sparse data**: Genre data jarang

### Mengapa Genetic Algorithm?
1. **Non-konvex optimization**: Fitness landscape complex
2. **Multiple local optima**: GA mencari global optima
3. **Flexible**: Mudah di-customize
4. **Parallelizable**: Populasi bisa dievaluasi parallel

### Teori Genetic Algorithm
- **Inspired by**: Evolusi biologi (Darwin)
- **Population-based**: Tidak seperti gradient descent
- **Stochastic**: Menggunakan randomness
- **Exploration vs Exploitation**: Mutation vs Crossover
- **No derivative needed**: Bisa untuk non-smooth function

---

## 📈 Pengembangan Lebih Lanjut

### Possible Improvements
1. **Hybrid approach**: Combine GA dengan simulated annealing
2. **Multi-objective GA**: Optimize untuk multiple criteria (similarity + diversity)
3. **Collaborative filtering**: Combine dengan user ratings
4. **Deep learning**: Use embeddings instead of genre vectors
5. **Real-time data**: Connect dengan API film (TMDB, IMDb)

### Optimization Techniques
1. **Particle Swarm Optimization (PSO)**
2. **Differential Evolution (DE)**
3. **Ant Colony Optimization (ACO)**
4. **Simulated Annealing (SA)**

---

## 🐛 Troubleshooting

### Masalah: Aplikasi Tidak Dimulai
**Solusi**:
- Gunakan browser modern (Chrome, Firefox, Edge)
- Check console (F12) untuk error
- Ensure Chart.js CDN accessible

### Masalah: GA Sangat Lambat
**Solusi**:
- Kurangi ukuran populasi (15-20)
- Kurangi jumlah generasi (10-15)
- Kurangi jumlah film (sekarang default 5000)

### Masalah: Hasil GA Tidak Berubah
**Solusi**:
- Naikkan mutation rate (30-40%)
- Naikkan jumlah generasi
- Gunakan populasi lebih besar

### Masalah: Cannot find movies.csv
**Solusi**:
- App menggunakan sample data sebagai fallback
- Untuk real data, copy movies.csv ke folder yang sama
- Atau modify data-loader.js untuk custom path

---

## 📚 Referensi

### Paper Akademis
1. Harper, F. M., & Konstan, J. A. (2015). The MovieLens Datasets: History and Context. ACM Transactions on Interactive Intelligent Systems.

2. Pang-Ning, T., Steinbach, M., & Kumar, V. (2005). Introduction to Data Mining. Pearson.

3. Goldberg, D. E. (1989). Genetic Algorithms in Search, Optimization, and Machine Learning. Addison-Wesley.

### Referensi Lain
- MovieLens Dataset: https://grouplens.org/datasets/
- Content-Based Filtering: https://en.wikipedia.org/wiki/Recommender_system#Content-based_filtering
- Genetic Algorithm: https://en.wikipedia.org/wiki/Genetic_algorithm

---

## 📝 Lisensi

Proyek ini dibuat untuk keperluan akademis. Data menggunakan MovieLens 32M Dataset yang tersedia di bawah lisensi non-komersial.

---

## 👨‍💻 Penulis

**Kampus**: Universitas Muhammadiyah Makassar  
**Program**: Rekayasa Komputasional  
**Tahun**: 2026  

---

## 📞 Support

Untuk pertanyaan atau isu teknis, silakan:
1. Check console browser (F12)
2. Review documentation di tab "Informasi"
3. Adjust parameters dan coba lagi
4. Check file data-loader.js jika ingin custom data

---

**Last Updated**: 2026-07-21  
**Version**: 1.0
