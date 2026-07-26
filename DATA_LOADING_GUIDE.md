# 📂 Panduan Load Data Asli MovieLens

## 🎯 Tujuan

Panduan ini menjelaskan cara menggunakan data asli MovieLens 32M (87,585 film) untuk mendapatkan hasil yang lebih akurat dan menyeluruh.

---

## 📥 Step 1: Download Data MovieLens

### Opsi A: Dari GroupLens Official

1. **Buka website**: https://grouplens.org/datasets/movielens/
2. **Pilih versi**:
   - **ml-latest-small.zip** (1 MB) - Recommended untuk testing
     - 100,000 ratings
     - 9,125 films
     - Cepat dan cocok untuk development

   - **ml-latest.zip** (30 MB) - Standard production
     - 27 juta ratings
     - 58,000+ films
     - Balance antara size dan coverage

   - **ml-32m.zip** (860 MB) - Full dataset (sudah ada di Download folder Anda)
     - 32 juta ratings
     - 87,585 films
     - Paling lengkap

3. **Download** sesuai pilihan

### Opsi B: File Sudah Ada

✅ **Anda sudah memiliki data!**

Lokasi: `c:\Users\ASUS\Downloads\`

File yang ada:
```
movies.csv       (87,585 films) ← GUNAKAN INI
ratings.csv      (32M ratings)
tags.csv         (2M tags)
links.csv        (IMDB/TMDB links)
README.txt       (Dokumentasi)
```

---

## 🔄 Step 2: Setup Data

### Opsi A: Copy File ke Project (Paling Mudah)

```bash
# Lokasi target:
c:\Users\ASUS\Documents\tugas web rekayasa komputasional\

# Copy file:
1. Buka: c:\Users\ASUS\Downloads
2. Cari: movies.csv
3. Copy (Ctrl+C)
4. Buka: c:\Users\ASUS\Documents\tugas web rekayasa komputasional
5. Paste (Ctrl+V)
```

**Selesai!** Aplikasi otomatis akan load file ini.

### Opsi B: Setup Local Server (Untuk Security)

**Alasan**: Browser security policy tidak allow load file local langsung

```bash
# Terminal/PowerShell:
cd "c:\Users\ASUS\Documents\tugas web rekayasa komputasional"

# Jalankan Python server:
python -m http.server 8000

# Buka browser:
http://localhost:8000
```

### Opsi C: Modify Path di Code

Edit file `data-loader.js`:

```javascript
// Line ~16, ubah:
const response = await fetch('./movies.csv');

// Menjadi:
const response = await fetch('c:/Users/ASUS/Downloads/movies.csv');
```

⚠️ **Catatan**: Ini tidak akan bekerja di browser karena security! Gunakan opsi A atau B.

---

## 🧹 Step 3: Format Data

### Format CSV yang Didukung

```
movieId,title,genres
1,Toy Story (1995),Adventure|Animation|Children|Comedy|Fantasy
2,Jumanji (1995),Adventure|Children|Fantasy
3,Grumpier Old Men (1995),Comedy|Romance
```

### Verifikasi Data

**Buka movies.csv dengan Text Editor:**

1. Klik kanan movies.csv → "Buka dengan" → Notepad/VSCode
2. Cek baris pertama: `movieId,title,genres`
3. Cek ada ~87,585 baris data
4. Cek format: ID|Title|Genre1|Genre2|...

**File asli dari GroupLens sudah benar format**, tidak perlu modifikasi!

---

## 🔧 Step 4: Konfigurasi Aplikasi

### Modifikasi Batas Film (Opsional)

Saat ini aplikasi limit 5000 film untuk performa. Untuk use all 87,585:

**Edit data-loader.js, line ~78:**

```javascript
// SEBELUM:
this.movies = movies.slice(0, 5000);

// SESUDAH (gunakan semua):
this.movies = movies.slice(0, movies.length);
// atau cukup:
this.movies = movies;
```

⚠️ **Performa**: Dengan 87,585 film, GA akan lebih lambat (~2x)

### Performa vs Kualitas

| Setting | Films | GA Speed | Quality | Recommended |
|---------|-------|----------|---------|------------|
| Kecil | 1,000 | ⚡ 3-5s | ⭐⭐ | Testing cepat |
| Default | 5,000 | ⚡⚡ 10-15s | ⭐⭐⭐⭐ | **Default** |
| Besar | 20,000 | ⚡⚡⚡ 30-40s | ⭐⭐⭐⭐ | Powerful PC |
| Full | 87,585 | ⚡⚡⚡⚡ 1-2m | ⭐⭐⭐⭐⭐ | Server |

**Rekomendasi**: Gunakan 5,000 (default) untuk balanced experience

---

## 🧬 Step 5: Testkan Aplikasi

### Verifikasi Data Loaded

1. **Buka aplikasi**: http://localhost:5500 (atau index.html)
2. **Buka Console**: F12 → Console tab
3. **Cari log**: Harus ada message:
   ```
   Data loaded: 5000 movies, XX genres
   ```
   atau
   ```
   Data loaded: 87585 movies, 20 genres
   ```

4. **Jika error**: Cek messages di console

### Test Search

1. **Search box**, ketik: `Avatar` atau `Inception`
2. **Harusnya muncul** film-film dari dataset asli
3. Jika muncul only sample data, berarti CSV tidak loaded (cek step 2)

### Test GA

1. Pilih salah satu film dari search
2. Jalankan GA dengan parameter kecil:
   - Populasi: 10
   - Generasi: 10
3. Harusnya berjalan dan tunjukkan hasil

---

## 🎬 Genre Reference

Daftar genre di MovieLens dataset:

```
1. Action
2. Adventure
3. Animation
4. Children
5. Comedy
6. Crime
7. Documentary
8. Drama
9. Fantasy
10. Film-Noir
11. Horror
12. IMAX
13. Musical
14. Mystery
15. Romance
16. Sci-Fi
17. Thriller
18. War
19. Western
20. (no genres listed)
```

Total: **20 genre utama**

Aplikasi otomatis extract semua unique genre dari CSV.

---

## 🔍 Format Import Custom

Jika ingin import data dari source lain:

### Minimal Format CSV

```csv
movieId,title,genres
1,Film Title (YYYY),Genre1|Genre2|Genre3
```

### Example Custom Data

```csv
movieId,title,genres
100,My Custom Movie (2020),Action|Drama|Thriller
101,Another Film (2021),Comedy|Romance
```

### Implementasi

Edit `data-loader.js`, modifikasi fungsi `parseCSV()`:

```javascript
parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const movies = [];
    
    // Skip header (line 0)
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        
        // Parse logic untuk format Anda
        // ... 
    }
    
    return movies;
}
```

---

## 🚀 Optimization Tips

### Untuk 87,585 Films

1. **Preprocessing**: Filter films dengan rating minimal

   ```javascript
   // Di data-loader.js, tambah filter:
   this.movies = movies
     .filter(movie => movie.ratingCount > 10) // Min 10 ratings
     .slice(0, 20000);
   ```

2. **Indexing**: Pre-compute genre index

   ```javascript
   this.genreIndex = {};
   this.allGenres.forEach((genre, idx) => {
     this.genreIndex[genre] = idx;
   });
   ```

3. **Caching**: Cache similarity results

   ```javascript
   this.similarityCache = new Map();
   ```

### Untuk Performa Web

1. **Lazy Loading**: Load data on demand
2. **Web Workers**: Jalankan GA di background thread
3. **Compression**: Compress CSV dengan gzip
4. **Pagination**: Show 100 films per page

---

## 🐛 Troubleshooting Data

### Problem: "Data loaded: 0 movies"

```
❌ Masalah: CSV tidak ter-load
✅ Solusi:
  1. Verifikasi movies.csv ada di folder project
  2. Buka Console (F12) cek error
  3. Cek CORS policy jika fetch dari URL
  4. Gunakan live server bukan file:// protocol
```

### Problem: "Cannot read genres" Error

```
❌ Masalah: Format CSV salah
✅ Solusi:
  1. Buka movies.csv di Notepad
  2. Verifikasi format: movieId,title,genres
  3. Verifikasi ada koma dan pipe separator
  4. Jangan ada line breaks di tengah row
```

### Problem: "Search tidak return hasil"

```
❌ Masalah: Data tidak ter-load atau search case-sensitive
✅ Solusi:
  1. Reload page (F5)
  2. Tunggu "Data loaded" message di console
  3. Coba search dengan different keywords
  4. Check apakah film ada di dataset
```

### Problem: "GA sangat lambat dengan full dataset"

```
❌ Masalah: 87,585 films = banyak komputasi
✅ Solusi:
  1. Gunakan default 5,000 films
  2. Kurangi population & generasi
  3. Gunakan komputer lebih powerful
  4. Jalankan di server backend (Node.js)
```

---

## 📊 Data Statistics

### MovieLens 32M Statistics

```
Total Movies: 87,585
Total Ratings: 32,000,204
Total Users: 200,948
Total Tags: 2,000,072
Date Range: 1995-2023

Genres Distribution:
Drama      - 21,951 films (25%)
Comedy     - 16,042 films (18%)
Thriller   - 8,654 films (10%)
Action     - 7,348 films (8%)
Romance    - 6,947 films (8%)
Horror     - 5,831 films (7%)
... (other genres)
```

### Average Statistics

```
Films per Genre: ~4,379
Genres per Film: 2.2 (average)
Ratings per Film: 366 (average)
```

---

## 🔄 Data Update

### Cara Update Dengan Versi Terbaru

1. **Download terbaru dari**: https://grouplens.org/datasets/
2. **Extract ZIP file**
3. **Replace movies.csv** di project folder
4. **Refresh aplikasi** (Ctrl+Shift+R hard refresh)
5. **Check console**: Harus show jumlah films baru

### Automation Script (Python)

```python
import urllib.request
import zipfile
import os

# Download
url = "http://files.grouplens.org/datasets/movielens/ml-latest-small.zip"
urllib.request.urlretrieve(url, "ml-latest.zip")

# Extract
with zipfile.ZipFile("ml-latest.zip", 'r') as zip_ref:
    zip_ref.extractall()

# Copy
import shutil
src = "ml-latest/movies.csv"
dst = "c:/Users/ASUS/Documents/tugas web rekayasa komputasional/movies.csv"
shutil.copy(src, dst)

print("Data updated successfully!")
```

---

## 🎓 Learning Resources

### Tentang MovieLens Dataset

1. **Official Page**: https://grouplens.org/datasets/movielens/
2. **Paper**: Harper & Konstan (2015) - The MovieLens Datasets
3. **Citation**:
   ```
   F. Maxwell Harper and Joseph A. Konstan. 2015. 
   The MovieLens Datasets: History and Context. 
   ACM Transactions on Interactive Intelligent Systems (TiiS) 5, 4, Article 19.
   ```

### Tentang CSV Format

- RFC 4180: https://tools.ietf.org/html/rfc4180
- CSV vs JSON: https://en.wikipedia.org/wiki/Comma-separated_values
- CSV Parsing: Complex due to quotes, commas, newlines

---

## ✅ Checklist Setup

```
☐ Download data (atau gunakan dari Downloads folder)
☐ Copy movies.csv ke project folder
☐ Verify file ada di folder
☐ Buka aplikasi (index.html)
☐ Check console: "Data loaded: X movies"
☐ Test search dengan film name
☐ Select film
☐ Run GA
☐ Verify recommendations muncul
☐ Check Console untuk error
```

---

## 📞 Support

**Problem dengan data loading?**

1. Check console (F12 → Console)
2. Verify movies.csv format
3. Try hard refresh (Ctrl+Shift+R)
4. Try different browser
5. Check internet connection (untuk CDN)

---

**Version**: 1.0  
**Last Updated**: 2026-07-21  
**Data Source**: MovieLens 32M Dataset by GroupLens Research
