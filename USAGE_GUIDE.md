# 🎯 Panduan Penggunaan Lengkap

## Memulai Aplikasi

### 1. Setup Awal

#### Opsi A: Buka Langsung (Paling Mudah)
```
1. Buka folder: c:\Users\ASUS\Documents\tugas web rekayasa komputasional
2. Double-click: index.html
3. Browser akan membuka aplikasi
```

#### Opsi B: Gunakan Live Server (Recommended)
```
1. Buka folder dengan VS Code
2. Install extension "Live Server" (Ritwick Dey)
3. Right-click index.html → "Open with Live Server"
4. Otomatis buka di http://localhost:5500
```

#### Opsi C: Buka via Python Server
```
# Python 3
cd "c:\Users\ASUS\Documents\tugas web rekayasa komputasional"
python -m http.server 8000

# Buka: http://localhost:8000 di browser
```

---

## Tutorial Step-by-Step

### Skenario 1: Rekomendasi Film Action

**Tujuan**: Mencari film action yang mirip dengan "Heat (1995)"

**Langkah**:

1. **Buka Aplikasi**
   - Aplikasi langsung siap digunakan dengan sample data
   - Sidebar kiri menampilkan kontrol GA

2. **Ubah Parameter GA (Opsional)**
   ```
   - Ukuran Populasi: 25 (dari default 20)
   - Jumlah Generasi: 30 (dari default 20)
   - Tingkat Mutasi: 25% (dari default 20%)
   - Lainnya: biarkan default
   ```
   💡 Tip: Parameter lebih besar = hasil lebih baik tapi lebih lambat

3. **Cari dan Pilih Film**
   - Di search box, ketik: `Heat`
   - Klik film "Heat (1995)" yang muncul
   - Film akan highlight dan ditampilkan di atas

4. **Jalankan GA**
   - Klik tombol **"🚀 Jalankan Optimasi GA"**
   - Modal progress akan muncul
   - Tunggu hingga 100% (±15 detik dengan parameter di atas)

5. **Lihat Hasil**
   - Otomatis switch ke tab "Hasil Rekomendasi"
   - Tampilkan top-10 film action yang mirip
   - Setiap kartu menunjukkan similarity %

6. **Analisis Lebih Lanjut**
   - Klik tab **"Bobot Fitur Optimal"**
   - Lihat genre mana yang paling penting (bobot tertinggi)
   - Untuk action, mungkin genre "Action", "Thriller", "Crime" paling tinggi
   
   - Klik tab **"Evolusi GA"**
   - Lihat kurva fitness meningkat seiring generasi
   - Check fitness improvement dan konvergensi

---

### Skenario 2: Bandingkan 2 Genre Berbeda

**Tujuan**: Lihat perbedaan bobot untuk film Drama vs Action

**Langkah**:

1. **Jalankan dengan Film Drama**
   - Cari: `The Shawshank Redemption`
   - Pilih film
   - Jalankan GA dengan default parameter
   - Catat bobot genre yang dihasilkan

2. **Screenshot/Catat Hasil**
   - Tab "Bobot Fitur Optimal" → lihat genre top 3
   - Kemungkinan Drama, Crime, dll

3. **Reset dan Jalankan dengan Film Action**
   - Klik tombol **"🔄 Reset"**
   - Cari: `GoldenEye` atau `Sudden Death`
   - Pilih film action
   - Jalankan GA

4. **Bandingkan**
   - Drama film: Drama, Crime, Romance bobot tinggi
   - Action film: Action, Thriller, Adventure bobot tinggi
   - Genre disesuaikan dengan karakteristik film referensi!

---

### Skenario 3: Eksperimen Parameter GA

**Tujuan**: Melihat pengaruh parameter terhadap hasil

**Langkah**:

1. **Pilih Film yang Sama**
   - Cari: `Toy Story`
   - Pilih film

2. **Experiment 1: Populasi Kecil**
   - Ukuran Populasi: 5
   - Generasi: 10
   - Jalankan GA → lihat hasil & waktu eksekusi
   - Catat fitness score

3. **Reset dan Experiment 2: Populasi Besar**
   - Ukuran Populasi: 50
   - Generasi: 50
   - Jalankan GA → lihat hasil & waktu eksekusi
   - Catat fitness score

4. **Bandingkan**
   - Experiment 1 lebih cepat tapi fitness mungkin lebih rendah
   - Experiment 2 lebih lambat tapi fitness biasanya lebih tinggi
   - Tradeoff antara kecepatan dan kualitas

5. **Experiment 3: High Mutation**
   - Ukuran Populasi: 20
   - Generasi: 20
   - Mutation Rate: 50% (tinggi)
   - Lihat kurva evolusi → mungkin lebih jagged/volatile

6. **Experiment 4: Low Mutation**
   - Parameter sama tapi Mutation Rate: 5%
   - Kurva evolusi → lebih smooth/konvergen cepat

---

## Interpretasi Hasil Detil

### Hasil Rekomendasi

```
┌─────────────────────────────┐
│ 1  ┌─────────────────────┐  │
│    │ Speed (1994)        │  │
│    │ Action Thriller     │  │
│    │ Similarity: 87.3%   │  │
│    │ ████████░           │  │
│    └─────────────────────┘  │
│ 2  ┌─────────────────────┐  │
│    │ True Lies (1994)    │  │ Semakin tinggi ranking
│    │ Action Comedy       │  │ Semakin mirip dengan
│    │ Similarity: 85.2%   │  │ film referensi
│    │ ████████░           │  │
│    └─────────────────────┘  │
│ ... (sampai 10)             │
└─────────────────────────────┘

Similarity % adalah hasil perhitungan:
- Cosine similarity antara vektor film
- Dengan bobot optimal hasil GA
- Range 0-100% (0 = tidak mirip, 100% = identik)
```

### Bobot Genre Optimal

```
┌──────────────┐
│ Action  0.25 │  ← Bobot tertinggi, genre paling penting
│ ████████████ │
└──────────────┘

┌──────────────┐
│ Thriller 0.18│  
│ █████████    │
└──────────────┘

┌──────────────┐
│ Adventure 0.12  ← Genre ini lebih sedikit
│ ██████       │
└──────────────┘

...

Semua bobot di-normalize sehingga:
sum(bobot) = 1.0

Artinya: untuk film action, genre Action 25% 
penting, Thriller 18% penting, dll
```

### Kurva Evolusi

```
Fitness
  1.0 │                        ◆
      │                    ◆ ◆
  0.8 │                ◆ ◆
      │          ◆ ◆ ◆
  0.6 │    ◆ ◆ ◆
      │ ◆ ◆
  0.4 │
      │
  0.2 │
      └───────────────────────── → Generasi
        0   5   10   15   20

◆ = Best Fitness per generasi

Interpretasi:
- Garis naik = GA belajar
- Garis flat = Sudah konvergen
- Steep naik awal = Banyak improvement
- Garis smooth = Parameter bagus
- Garis jagged = Mutation rate tinggi
```

---

## Tips Pro

### 1. Mendapatkan Hasil Terbaik

```javascript
// Parameter Recommended untuk hasil TERBAIK
Populasi: 50
Generasi: 50
Mutation: 20%
Crossover: 80%
Elitism: 15%

// Waktu: ~30-45 detik
// Kualitas: ★★★★★
```

### 2. Eksekusi Paling Cepat

```javascript
// Parameter untuk testing/demo cepat
Populasi: 10
Generasi: 10
Mutation: 25%
Crossover: 75%
Elitism: 5%

// Waktu: ~3-5 detik
// Kualitas: ★★☆☆☆
// Cocok untuk: Demo, testing cepat
```

### 3. Balance Waktu & Kualitas

```javascript
// Parameter DEFAULT (rekomendasi)
Populasi: 20
Generasi: 20
Mutation: 20%
Crossover: 80%
Elitism: 10%

// Waktu: ~10-15 detik
// Kualitas: ★★★★☆
// Cocok untuk: Penggunaan normal
```

---

## Checklist Troubleshooting

### Aplikasi Tidak Bisa Dibuka

```
☐ Browser sudah closed?          → Buka ulang index.html
☐ Internet connection off?       → CDN Chart.js butuh internet
☐ Browser terlalu lama?         → Refresh F5
☐ JavaScript disabled?          → Enable JavaScript di setting
☐ Error di console (F12)?       → Lihat pesan error detail
```

### GA Sangat Lambat

```
☐ Populasi > 100?               → Kurangi ke 20-50
☐ Generasi > 100?              → Kurangi ke 20-50
☐ Browser background heavy?     → Close tab lain
☐ Komputer resource low?        → Restart aplikasi
☐ Jangan jalankan 2x parallel!
```

### Hasil GA Tidak Berubah / Sama Terus

```
☐ Mutation rate terlalu rendah?  → Naikkan ke 30%
☐ Populasi terlalu kecil?       → Naikkan ke 30-50
☐ Generasi terlalu sedikit?     → Naikkan ke 50+
☐ Elitism terlalu tinggi?       → Kurangi ke 5-10%
☐ Film berbeda → hasil akan berbeda (normal!)
```

### Error saat Jalankan GA

```
☐ Belum pilih film?             → Pilih film dulu
☐ Console error (F12)?          → Screenshot dan report
☐ Browser cache bermasalah?     → Clear cache, reload
☐ Refresh full (Ctrl+Shift+R)   → Soft refresh tidak cukup
```

---

## Video Tutorial (Deskripsi)

Jika membuat video tutorial, langkah:

```
0:00-0:15 → Opening, intro sistem
0:15-0:30 → Buka aplikasi, layout overview
0:30-1:00 → Penjelasan Cosine Similarity (visual)
1:00-1:30 → Penjelasan Genetic Algorithm (visual)
1:30-3:00 → Demo: Pilih film, setting GA, jalankan
3:00-4:00 → Analisis hasil: recommendations, weights, evolution
4:00-5:00 → Demo comparison: 2 film berbeda
5:00-6:00 → Tips & tricks, best practices
6:00-6:30 → Closing, Q&A
```

---

## FAQ

**Q: Berapa maksimal film yang bisa di-recommend?**  
A: Saat ini top-10. Bisa di-modify di cosine-similarity.js line `topK = 10`

**Q: Bisa ganti data film dengan data custom?**  
A: Ya, lihat HOW_TO_LOAD_DATA.md

**Q: Berapa lama biasanya GA berjalan?**  
A: Tergantung parameter. Default (20,20): ~10-15 detik. Max (50,50): ~45 detik

**Q: Apakah hasil GA selalu berbeda setiap kali?**  
A: Ya, karena GA menggunakan randomness. Tapi range hasil mirip

**Q: Bagaimana kalau fitness score sangat rendah?**  
A: Normal jika film referensi berbeda genre. Coba genre yang lebih specific

**Q: Bisa export hasil rekomendasi?**  
A: Belum built-in. Bisa screenshot atau copy-paste ke Excel

---

## Kolaborasi & Development

### Untuk Extend Aplikasi

1. **Tambah Feature Baru**
   - Edit index.html untuk UI
   - Edit app.js untuk logic
   - Edit styles.css untuk styling

2. **Ganti Algorithm**
   - Create file baru: `alternative-algorithm.js`
   - Implement interface yang sama
   - Ganti reference di app.js

3. **Integrate Database**
   - Replace data-loader.js dengan fetch dari server
   - Modify app.js untuk handle async data

4. **Mobile Version**
   - Update styles.css responsive design
   - Simplify GA parameters untuk mobile

---

## Performance Metrics

### Contoh Timing (Machine: i5-8400, 16GB RAM)

```
Populasi 10, Gen 10  →  2-3 detik   (fastest)
Populasi 20, Gen 20  →  10-15 detik (default)
Populasi 50, Gen 50  →  45-60 detik (slowest)

Dengan 5000 film di memory
(jika 87585 film full dataset: +50% waktu)
```

### Memory Usage

```
Data loader:     ~1-2 MB
GA algorithm:    ~2-5 MB (tergantung populasi)
Chart.js:        ~0.5 MB
Total UI:        ~0.5 MB
─────────────────────────
Total:           ~5-10 MB (sangat ringan!)
```

---

**Version**: 1.0  
**Last Updated**: 2026-07-21
