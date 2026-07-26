# 🚀 Quick Start Guide - Mulai Dalam 2 Menit!

## ⚡ Langkah 1: Buka Aplikasi (30 detik)

**Opsi A: Double-click langsung**
```
1. Buka folder: c:\Users\ASUS\Documents\tugas web rekayasa komputasional
2. Double-click: index.html
3. Browser otomatis terbuka
```

**Opsi B: Gunakan Live Server**
```
1. Buka folder dengan VS Code
2. Right-click index.html → "Open with Live Server"
3. Atau Ctrl+Shift+P → type "Live Server"
```

---

## 🎬 Langkah 2: Pilih Film (1 menit)

```
1. Lihat sidebar kiri:
   ├─ "🎯 Pilih Film Referensi" section
   └─ Search box di atasnya

2. Ketik di search box:
   ✓ "Toy Story"
   ✓ "Avatar"
   ✓ "Action" (untuk cari action films)
   ✓ Atau sembarang judul film

3. Klik film dari list yang muncul
   - Film akan highlight dan tampil di atas

4. Ready!
```

---

## 🧬 Langkah 3: Jalankan GA (1 menit)

```
1. Lihat bagian "⚙️ Konfigurasi Genetic Algorithm"
   - Parameter sudah punya default bagus
   - Boleh tidak diubah untuk quick test

2. Atau sesuaikan (opsional):
   - Populasi: 20 (bagus)
   - Generasi: 20 (bagus)
   - Mutation: 20% (bagus)

3. Klik tombol: 🚀 Jalankan Optimasi GA

4. Tunggu... progress modal akan muncul
   - Lihat percentage bar naik ke 100%
   - Biasanya 10-15 detik

5. Done! Hasil otomatis tampil
```

---

## 📊 Langkah 4: Lihat Hasil (30 detik)

### A. Tab "Hasil Rekomendasi" (Active by default)
```
Menampilkan TOP 10 FILM paling mirip dengan film pilihan

Setiap kartu menunjukkan:
┌──────────────────────────────┐
│ 1  Judul Film (Tahun)         │ ← Ranking
│    Genre1  Genre2  Genre3     │ ← Genre
│    Similarity: 87.3%          │ ← Kesamaan %
│    ████████░                  │ ← Progress bar
└──────────────────────────────┘

💡 Semakin tinggi ranking, semakin mirip!
```

### B. Tab "Bobot Fitur Optimal"
```
Klik: Bobot Fitur Optimal

Menampilkan bobot setiap genre hasil GA

Contoh output:
├─ Action        0.25  (25%)  ████████████
├─ Thriller      0.18  (18%)  █████████
├─ Adventure     0.12  (12%)  ██████
├─ Drama         0.10  (10%)  █████
├─ Romance       0.08  (8%)   ████
└─ ...

Plus:
- Fitness Score: 0.7245 (nilai hasil)
- Generasi Konvergen: 15 (saat stable)
- Waktu Eksekusi: 12.34s (seberapa lama)
```

### C. Tab "Evolusi GA"
```
Klik: Evolusi GA

Grafik 3 garis:
- Garis Hijau (Best):    Fitness terbaik per generasi → Naik!
- Garis Biru (Average):  Rata-rata fitness → Naik!
- Garis Merah (Worst):   Fitness terburuk → Turun atau flat

Plus Statistik:
├─ Initial Fitness: 0.45
├─ Final Fitness: 0.72
└─ Improvement: 60%

💡 Semakin naik curve, semakin baik GA belajar!
```

---

## 📋 Cheat Sheet - Konfigurasi Cepat

### Untuk Testing Tercepat
```
Populasi: 10
Generasi: 10
Mutation: 20%

⏱️ Waktu: 3-5 detik
⭐ Kualitas: ⭐⭐☆☆☆
```

### Untuk Hasil Standar (RECOMMENDED)
```
Populasi: 20
Generasi: 20
Mutation: 20%

⏱️ Waktu: 10-15 detik
⭐ Kualitas: ⭐⭐⭐⭐☆
```

### Untuk Hasil Terbaik
```
Populasi: 50
Generasi: 50
Mutation: 20%

⏱️ Waktu: 40-60 detik
⭐ Kualitas: ⭐⭐⭐⭐⭐
```

---

## 🧪 Demo Scenario

### Scenario A: Action Lover
```
1. Search: "GoldenEye"
2. Select: GoldenEye (1995)
3. Keep default parameters
4. Run GA
5. Lihat hasil → harusnya action/thriller films
6. Klik "Bobot Fitur" → genre Action & Thriller akan top
```

### Scenario B: Comedy Fan
```
1. Search: "Toy Story"
2. Select: Toy Story (1995)
3. Run GA
4. Lihat hasil → harusnya adventure/comedy/children
5. Bandingkan bobot genre → Adventure & Comedy top
```

### Scenario C: Compare 2 Genres
```
1. Run GA dengan Action film → catat bobot
2. Reset (🔄 tombol)
3. Run GA dengan Drama film → bandingkan bobot
4. Perhatikan perbedaan genre importance!
```

---

## ❓ FAQ Cepat

**Q: Kenapa hasilnya berubah setiap kali?**  
A: GA menggunakan random, tapi range hasil mirip (normal!)

**Q: Apakah perlu download file tambahan?**  
A: Tidak! Sudah built-in sample data, bisa langsung pakai

**Q: Bagaimana kalau mau use data asli MovieLens?**  
A: Lihat: DATA_LOADING_GUIDE.md

**Q: Berapa banyak film yang di-recommend?**  
A: Top 10 (bisa modify di code)

**Q: Kenapa similarity nilainya 0.xyz?**  
A: Range 0-1, ditampilkan juga dalam %

**Q: Aplikasi hang/tidak responsive?**  
A: Reduce populasi & generasi parameter

---

## 🎮 Interactive Features

### Search Film
```
✓ Real-time filtering
✓ Case-insensitive
✓ Search by title atau year
✓ Show first 100 results
```

### Visualizations
```
✓ Recommendation cards dengan similarity bars
✓ Genre weight bars (horizontal bar charts)
✓ Fitness evolution chart (line graph)
✓ All interactive dengan Chart.js
```

### Responsive Design
```
✓ Desktop: Full featured
✓ Tablet: Adjusted layout
✓ Mobile: Simplified view
```

---

## 🔄 Typical Workflow

```
┌─────────────────────────────────┐
│ 1. Open Application             │
└────────────────┬────────────────┘
                 ↓
┌─────────────────────────────────┐
│ 2. Search & Select Film         │
│    (Quick, < 30 detik)          │
└────────────────┬────────────────┘
                 ↓
┌─────────────────────────────────┐
│ 3. Adjust Parameters (Optional) │
│    (Keep default untuk test)    │
└────────────────┬────────────────┘
                 ↓
┌─────────────────────────────────┐
│ 4. Click "🚀 Jalankan GA"       │
│    (Wait 10-15 sec)             │
└────────────────┬────────────────┘
                 ↓
┌─────────────────────────────────┐
│ 5. View Results                 │
│    - Recommendations             │
│    - Optimal Weights             │
│    - Evolution Stats             │
└────────────────┬────────────────┘
                 ↓
┌─────────────────────────────────┐
│ 6. Analyze & Iterate            │
│    - Try different films        │
│    - Adjust parameters          │
│    - Compare results            │
└─────────────────────────────────┘
```

---

## 🌐 URLs & File Locations

```
Project Folder:
c:\Users\ASUS\Documents\tugas web rekayasa komputasional\

Important Files:
├─ index.html           ← Main application
├─ styles.css           ← Styling
├─ app.js              ← Main logic
├─ cosine-similarity.js ← Algorithm
├─ genetic-algorithm.js ← GA implementation
├─ data-loader.js      ← Data loading
├─ config.json         ← Configuration
├─ README.md           ← Full documentation
├─ USAGE_GUIDE.md      ← Detailed guide
└─ DATA_LOADING_GUIDE.md ← Data setup

Live Server URL:
http://localhost:5500

Python Server URL:
http://localhost:8000
```

---

## ✨ Highlights

### Metode Content-Based Filtering
```
✓ Recommend based on genre similarity
✓ Tidak butuh user ratings
✓ Tangible dan interpretable
```

### Cosine Similarity
```
✓ Mathematical formula: (A·B)/(||A||×||B||)
✓ Result: 0 (different) to 1 (identical)
✓ Fast O(n) computation
```

### Genetic Algorithm Optimization
```
✓ Find optimal genre weights
✓ Selection, Crossover, Mutation
✓ Elitism untuk preserve best
✓ Convergence tracking
```

---

## 🎓 Learning Outcomes

Setelah pakai aplikasi ini, Anda akan understand:

```
✓ Content-Based Filtering basics
✓ Cosine Similarity calculation
✓ Genetic Algorithm evolution
✓ Optimization concepts
✓ Recommender systems
✓ Interactive web applications
✓ Data visualization
✓ Algorithm implementation
```

---

## 📞 Perlu Bantuan?

1. **Console Error?** → F12 → Console → Lihat pesan
2. **Aplikasi Slow?** → Reduce population & generations
3. **No Results?** → Select film dulu sebelum Run GA
4. **Data Issues?** → Lihat DATA_LOADING_GUIDE.md
5. **Detailed Info?** → Buka tab "Informasi" di app

---

## 🎉 You're Ready!

Sekarang Anda siap untuk:
1. ✅ Memahami sistem rekomendasi
2. ✅ Menggunakan aplikasi web
3. ✅ Menganalisis GA optimization
4. ✅ Interpret hasil rekomendasi

**Enjoy exploring the application!** 🚀

---

**Quick Start Version: 1.0**  
**Estimated Time to Start: 2 minutes**  
**Estimated Time to Get Results: 5 minutes total**
