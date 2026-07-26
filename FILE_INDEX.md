# 📑 File Index & Documentation Map

## 📂 Project Structure

```
c:\Users\ASUS\Documents\tugas web rekayasa komputasional\
│
├── 🌐 Web Application Files
│   ├── index.html                    [12 KB] Main HTML file - Aplikasi utama
│   ├── styles.css                    [17 KB] CSS styling - UI & responsiveness
│   └── config.json                   [6.6 KB] Configuration - Settings & presets
│
├── 🧠 Algorithm & Core Logic
│   ├── app.js                        [18 KB] Main controller - UI & coordination
│   ├── cosine-similarity.js          [4 KB]  Similarity algorithm
│   ├── genetic-algorithm.js          [10 KB] GA implementation
│   └── data-loader.js                [9 KB]  Data management & loading
│
├── 📖 Documentation Files
│   ├── README.md                     [14 KB] Complete documentation - Teori & referensi
│   ├── QUICKSTART.md                 [8 KB]  Quick start - Buka & jalankan dalam 2 menit
│   ├── USAGE_GUIDE.md                [10 KB] Detailed usage - Tutorial & best practices
│   ├── DATA_LOADING_GUIDE.md         [10 KB] Data setup - Load dataset MovieLens
│   ├── INTERFACE_GUIDE.md            [14 KB] UI documentation - Layout & components
│   └── FILE_INDEX.md                 [This file] Map dokumentasi
│
└── 📊 Optional Data File (Not included, download separately)
    └── movies.csv                    [?? MB] MovieLens dataset (87,585 films)
```

---

## 🚀 Mulai di Sini!

### Opsi 1: Ingin Langsung Pakai? (5 menit)
👉 **Baca**: `QUICKSTART.md`
- Buka aplikasi dalam 30 detik
- Jalankan GA dalam 1 menit
- Lihat hasil dalam 30 detik
- Total: 2 menit!

### Opsi 2: Ingin Pahami Sistemnya? (30 menit)
👉 **Baca**: `README.md`
- Penjelasan teori lengkap
- Metodologi Cosine Similarity
- Genetic Algorithm details
- Referensi akademis

### Opsi 3: Ingin Pelajari Penggunaannya? (1 jam)
👉 **Baca**: `USAGE_GUIDE.md`
- Step-by-step tutorial
- Interpretasi hasil
- Tips & tricks
- Troubleshooting

### Opsi 4: Ingin Setup Data Asli? (30 menit)
👉 **Baca**: `DATA_LOADING_GUIDE.md`
- Download MovieLens dataset
- Setup & konfigurasi
- Load data asli 87,585 films
- Troubleshooting data issues

### Opsi 5: Ingin Pelajari Interface? (15 menit)
👉 **Baca**: `INTERFACE_GUIDE.md`
- Visual preview & layout
- Component documentation
- Color scheme & styling
- Responsive design

---

## 📄 Deskripsi Setiap File

### 1️⃣ index.html (12 KB)
**Tujuan**: File HTML utama aplikasi

**Isi**:
- Header dengan judul & subtitle
- Sidebar untuk GA configuration
- Search & movie selection panel
- Tab navigation (Results, Weights, Evolution, Info)
- Content area dengan berbagai tab
- Modal untuk progress tracking
- Footer

**Kapan dibuka**: Pertama kali jalankan aplikasi

**Dependent on**:
- styles.css (styling)
- app.js, cosine-similarity.js, genetic-algorithm.js, data-loader.js (scripts)
- Chart.js CDN (untuk chart)

---

### 2️⃣ styles.css (17 KB)
**Tujuan**: Styling keseluruhan aplikasi

**Fitur**:
- CSS Variables untuk theme
- Gradient backgrounds
- Responsive design (desktop/tablet/mobile)
- Component styling (buttons, cards, inputs)
- Animation & transitions
- Dark theme dengan accent colors

**Struktur**:
```
├─ Global Styles (reset, variables)
├─ Header
├─ Sidebar
├─ Main Content & Tabs
├─ Cards & Components
├─ Modals
├─ Footer
├─ Scrollbar styling
└─ Media queries (responsive)
```

**Customization**:
- Change primary color di `:root { --primary-color: ... }`
- Adjust breakpoints di `@media` sections
- Modify shadows, borders, radius

---

### 3️⃣ config.json (6.6 KB)
**Tujuan**: Konfigurasi & preset GA parameters

**Isi**:
```json
{
  "application": {...},        // App metadata
  "defaultParameters": {...},  // Default GA settings
  "presetConfigurations": {
    "quickTest": {...},        // Fast testing
    "balanced": {...},         // Default
    "optimized": {...},        // Best quality
    "exploration": {...},      // High mutation
    "convergence": {...}       // Fast convergence
  },
  "methods": {...},            // Dokumentasi metode
  "performance": {...},        // Performance metrics
  "references": {...}          // Academic references
}
```

**Cara Pakai**:
- JavaScript bisa load dengan `fetch('config.json')`
- Atau gunakan sebagai dokumentasi/reference

---

### 4️⃣ app.js (18 KB)
**Tujuan**: Main application controller

**Kelas Utama**: `MovieRecommendationApp`

**Method Penting**:
- `init()` - Initialize aplikasi
- `setupEventListeners()` - Setup semua event
- `switchTab()` - Switch antar tab
- `selectMovie()` - Pilih film referensi
- `runGA()` - Jalankan Genetic Algorithm
- `displayResults()` - Tampilkan hasil
- `renderWeightsChart()` - Chart bobot
- `renderEvolutionChart()` - Chart evolusi

**Workflow**:
```
1. Init → Load data dari DataLoader
2. Render movies list
3. User select film → selectMovie()
4. User click Run GA → runGA()
5. GA berjalan (async)
6. Display results di tab
7. Chart render otomatis
```

**Dependencies**:
- data-loader.js (DataLoader class)
- cosine-similarity.js (CosineSimilarity class)
- genetic-algorithm.js (GeneticAlgorithm class)
- Chart.js library (untuk chart)

---

### 5️⃣ cosine-similarity.js (4 KB)
**Tujuan**: Implementasi Cosine Similarity

**Kelas Utama**: `CosineSimilarity`

**Method Penting**:
- `calculate(vectorA, vectorB)` - Hitung similarity
- `calculateMovieSimilarity(ref, target, weights, genres)` - Untuk films
- `movieToVector(movie, weights, allGenres)` - Convert film ke vector
- `getRecommendations(ref, candidates, weights, genres, topK)` - Get top-K
- `calculateAverageSimilarity(movies)` - Average similarity

**Formula**:
```
similarity = (A · B) / (||A|| × ||B||)

Dimana:
- A · B = sum(a[i] * b[i])
- ||A|| = sqrt(sum(a[i]²))
- ||B|| = sqrt(sum(b[i]²))
```

**Contoh Penggunaan**:
```javascript
const sim = CosineSimilarity.calculate(vector1, vector2);
const recs = CosineSimilarity.getRecommendations(
  referenceMovie, 
  candidateMovies, 
  weights, 
  allGenres, 
  10
);
```

---

### 6️⃣ genetic-algorithm.js (10 KB)
**Tujuan**: Implementasi Genetic Algorithm

**Kelas Utama**: `GeneticAlgorithm`

**Constructor Parameters**:
```javascript
{
  populationSize: 20,
  generations: 20,
  mutationRate: 0.20,
  crossoverRate: 0.80,
  elitismRate: 0.10,
  numGenes: 20,                  // Jumlah genre
  referenceMovie: {...},         // Film referensi
  candidateMovies: [...],        // Kandidat films
  allGenres: [...],              // Genre list
  onGenerationCallback: fn       // Progress callback
}
```

**Method Penting**:
- `initializePopulation()` - Create random population
- `evaluateFitness(genes)` - Evaluate individual
- `selection()` - Tournament selection
- `crossover(parent1, parent2)` - Uniform crossover
- `mutate(genes)` - Gaussian mutation
- `evolveGeneration()` - Satu generasi GA
- `run()` - Jalankan GA lengkap (async)

**Operasi GA**:
```
1. Initialize random population
2. For each generation:
   a. Evaluate fitness setiap individual
   b. Selection - pilih 2 parents
   c. Crossover - buat offspring
   d. Mutation - mutasi offspring
   e. Elitism - pertahankan top individuals
3. Return best solution
```

---

### 7️⃣ data-loader.js (9 KB)
**Tujuan**: Load & manage movie data

**Kelas Utama**: `DataLoader`

**Method Penting**:
- `initialize()` - Load data (async)
- `loadMovies()` - Load CSV
- `parseCSV()` - Parse CSV text
- `searchMovies(keyword)` - Search films
- `getMovieById(id)` - Get film by ID
- `getSampleMovieData()` - Default sample data

**Data Structure**:
```javascript
{
  movieId: 1,
  title: "Toy Story (1995)",
  genres: ["Adventure", "Animation", "Comedy"],
  year: 1995
}
```

**Features**:
- Fallback ke sample data jika CSV tidak load
- Extract year dari title
- Quick lookup dengan Map
- Search dengan case-insensitive filter

---

### 8️⃣ README.md (14 KB)
**Tujuan**: Dokumentasi lengkap

**Isi**:
- Project overview & tujuan
- Arsitektur sistem
- Metodologi (Content-Based, Cosine Similarity, GA)
- File structure
- Cara penggunaan
- Parameter GA & pengaruhnya
- Interpretasi hasil
- Teori lanjutan
- Development & improvement ideas
- Troubleshooting
- Referensi akademis

**Target Reader**: Developer, pelajar, peneliti

---

### 9️⃣ QUICKSTART.md (8 KB)
**Tujuan**: Mulai dalam 2 menit

**Isi**:
- Langkah 1: Buka aplikasi (30 sec)
- Langkah 2: Pilih film (1 min)
- Langkah 3: Jalankan GA (1 min)
- Langkah 4: Lihat hasil (30 sec)
- Cheat sheet konfigurasi
- Demo scenario (3 pilihan)
- FAQ cepat
- Workflow tipis

**Target Reader**: User pemula, ingin langsung pakai

---

### 🔟 USAGE_GUIDE.md (10 KB)
**Tujuan**: Panduan penggunaan detil

**Isi**:
- Setup awal (3 opsi)
- Tutorial step-by-step (3 scenario)
- Interpretasi hasil detil
- Tips pro (3 konfigurasi)
- Checklist troubleshooting
- Video tutorial deskripsi
- FAQ
- Performance metrics
- Kolaborasi & development

**Target Reader**: User yang ingin explore lebih dalam

---

### 1️⃣1️⃣ DATA_LOADING_GUIDE.md (10 KB)
**Tujuan**: Setup data MovieLens asli

**Isi**:
- Download MovieLens (3 opsi)
- Setup data (3 opsi)
- Format data
- Konfigurasi aplikasi
- Testkan aplikasi
- Genre reference
- Custom data import
- Optimization tips
- Troubleshooting data

**Target Reader**: User yang ingin gunakan data 87,585 films

---

### 1️⃣2️⃣ INTERFACE_GUIDE.md (14 KB)
**Tujuan**: Dokumentasi UI & components

**Isi**:
- Layout ASCII overview
- Sidebar component
- Tab navigation
- Tab content (4 tabs)
- Progress modal
- Color scheme
- Responsive breakpoints
- Typography hierarchy
- Interaction effects
- Chart documentation
- Card layouts
- Overall aesthetic

**Target Reader**: Designer, UI developer, user ingin pelajari UI

---

## 🎯 Panduan Pembacaan

### Untuk Pemula Total
```
1. Baca: QUICKSTART.md (5 min)
   → Jalankan aplikasi
   → Paham basic flow

2. Baca: USAGE_GUIDE.md (30 min)
   → Pelajari tutorial
   → Pahami hasil
   → Coba scenarios
```

### Untuk Developer
```
1. Baca: README.md (30 min)
   → Pahami teori
   → Arsitektur sistem

2. Baca file code (app.js, genetic-algorithm.js, dll)
   → Pahami implementasi
   → Modify jika diperlukan

3. Baca: INTERFACE_GUIDE.md (15 min)
   → Pahami styling
   → Customize UI
```

### Untuk Data Analyst
```
1. Baca: QUICKSTART.md (5 min)
   → Jalankan aplikasi

2. Baca: USAGE_GUIDE.md (30 min)
   → Pahami interpretasi hasil
   → Tips pro

3. Baca: DATA_LOADING_GUIDE.md (30 min)
   → Load data asli
   → Explore dataset
```

### Untuk Akademis
```
1. Baca: README.md (30 min)
   → Teori lengkap
   → Referensi

2. Baca: config.json
   → Default parameters
   → Preset configs

3. Baca code (cosine-similarity.js, genetic-algorithm.js)
   → Implementasi detail
   → Academic background
```

---

## 📊 File Dependencies

```
index.html
├── styles.css
├── app.js
│   ├── data-loader.js
│   ├── cosine-similarity.js
│   └── genetic-algorithm.js
│       └── cosine-similarity.js (used internally)
└── Chart.js (CDN)

config.json (optional, for reference)

Documentation:
├── README.md
├── QUICKSTART.md
├── USAGE_GUIDE.md
├── DATA_LOADING_GUIDE.md
├── INTERFACE_GUIDE.md
└── FILE_INDEX.md (this file)
```

---

## 🔄 Typical User Journey

```
First Time User:
1. Open QUICKSTART.md
2. Follow step-by-step
3. Open index.html
4. Search & select film
5. Click Run GA
6. View results

Experienced User:
1. Open index.html
2. Select film
3. Adjust parameters
4. Run GA
5. Analyze results
6. Export/share results

Developer:
1. Read README.md
2. Review code (app.js, etc)
3. Modify as needed
4. Test changes
5. Extend functionality

Researcher:
1. Read README.md
2. Understand methodology
3. Load dataset (DATA_LOADING_GUIDE.md)
4. Run experiments
5. Analyze results
6. Write paper
```

---

## 💡 Tips untuk Maksimalkan

```
✓ Baca QUICKSTART.md duluan - cepat & langsung pakai
✓ Jika ada error, lihat section troubleshooting
✓ Kalau ingin data lebih banyak, follow DATA_LOADING_GUIDE.md
✓ Untuk extend code, pahami architecture di README.md
✓ Customize UI? Lihat INTERFACE_GUIDE.md + styles.css
✓ Stuck? Check FAQ di USAGE_GUIDE.md
```

---

## 📞 Support & Help

**Jika ada masalah:**

| Issue | Solusi |
|-------|--------|
| Aplikasi tidak buka | Cek QUICKSTART.md step 1 |
| Film tidak ditemukan | Cek DATA_LOADING_GUIDE.md |
| GA lambat | Cek USAGE_GUIDE.md → tips |
| UI jelek | Cek INTERFACE_GUIDE.md |
| Ingin extend | Cek README.md → architecture |
| Error di console | Buka F12 → check error detail |

---

## ✨ Project Summary

```
Proyek: Sistem Rekomendasi Film
Metode: Content-Based Filtering + Cosine Similarity + GA
Bahasa: HTML, CSS, JavaScript (Frontend only)
Dataset: MovieLens (50-87K films)
Algorithm: Cosine Similarity + Genetic Algorithm
UI: Modern, responsive, interactive
Documentation: 6 files lengkap
Code: ~40 KB, ~1000 lines
Target: Learning + experimentation
```

---

**File Index Version**: 1.0  
**Last Updated**: 2026-07-21  
**Total Files**: 12 (7 code + 5 documentation)  
**Total Size**: ~100-150 KB (excluding CSV data)
