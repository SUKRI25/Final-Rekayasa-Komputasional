# 📸 Aplikasi Preview & Interface Documentation

## 🎨 Layout Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    HEADER                                    │
│  🎬 Sistem Rekomendasi Film                                 │
│  Content-Based Filtering + Genetic Algorithm                │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┬─────────────────────────────────────────┐
│                  │                                         │
│    SIDEBAR       │          MAIN CONTENT AREA              │
│    (350px)       │         (Flexible width)                │
│                  │                                         │
│ ┌──────────────┐ │  ┌─ Results ─ Weights ─ Evolution ─┐   │
│ │ ⚙️ GA Config │ │  │                                 │   │
│ │ ────────── │ │  │  Content displays here            │   │
│ │ Population │ │  │  Based on active tab              │   │
│ │ Generasi   │ │  │                                 │   │
│ │ Mutation   │ │  └─────────────────────────────────┘   │
│ │            │ │                                         │
│ ├──────────────┤ │  ┌─────────────────────────────────┐  │
│ │ 🎯 Pilih     │ │  │ Recommendation Cards            │  │
│ │ Film Ref     │ │  │ ┌─────────────────────────────┐ │  │
│ │ ────────── │ │  │ │ 1 Film Title               │ │  │
│ │ [Search  ] │ │  │ │    Genre1 Genre2           │ │  │
│ │ [Film List] │ │  │ │    Similarity: 87.3%       │ │  │
│ │            │ │  │ │    ████████░               │ │  │
│ │            │ │  │ └─────────────────────────────┘ │  │
│ │            │ │  │ ... (more cards)                │  │
│ │            │ │  └─────────────────────────────────┘  │
│ │            │ │                                         │
│ ├──────────────┤ │                                         │
│ │ 🚀 Jalankan  │ │                                         │
│ │ 🔄 Reset     │ │                                         │
│ └──────────────┘ │                                         │
│                  │                                         │
└──────────────────┴─────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    FOOTER                                    │
│  © 2026 Sistem Rekomendasi Film | Rekayasa Komputasional   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Sidebar Component

### Configuration Section

```
┌────────────────────────────────┐
│ ⚙️ Konfigurasi Genetic Algorithm│
├────────────────────────────────┤
│ Label: Ukuran Populasi:        │
│ Input: [20]  ↑↓               │
│ Help:  Jumlah individu         │
│                                │
│ Label: Jumlah Generasi:        │
│ Input: [20]  ↑↓               │
│ Help:  Iterasi evolusi GA      │
│                                │
│ Label: Tingkat Mutasi (%):     │
│ Input: [20.0]  ↑↓             │
│ Help:  Peluang mutasi gen      │
│                                │
│ Label: Tingkat Crossover (%):  │
│ Input: [80.0]  ↑↓             │
│ Help:  Peluang crossover       │
│                                │
│ Label: Elitism (%):            │
│ Input: [10]  ↑↓               │
│ Help:  Individu terbaik        │
└────────────────────────────────┘
```

### Movie Selection Section

```
┌────────────────────────────────┐
│ 🎯 Pilih Film Referensi        │
├────────────────────────────────┤
│ [     Search Film     ]         │
│                                │
│ ┌────────────────────────────┐ │
│ │ 📽️ Toy Story (1995)       │ ✓ │
│ ├────────────────────────────┤ │
│ │ 📽️ Jumanji (1995)         │   │
│ ├────────────────────────────┤ │
│ │ 📽️ Grumpier Old Men       │   │
│ ├────────────────────────────┤ │
│ │ 📽️ Waiting to Exhale      │   │
│ └────────────────────────────┘ │
│                                │
│ ... (scrollable list)          │
└────────────────────────────────┘
```

### Control Buttons

```
┌────────────────────────────────┐
│ [🚀 Jalankan Optimasi GA]      │
│ [🔄 Reset]                     │
└────────────────────────────────┘

Button states:
- Normal: Purple gradient
- Hover: Raised shadow
- Disabled: 50% opacity
- Active: Darker gradient
```

---

## 📊 Main Content Area

### Tab Navigation

```
┌─────────────┬──────────┬────────────┬──────────┐
│ Hasil       │ Bobot    │ Evolusi    │ Informasi│
│ Rekomendasi │ Fitur    │ GA         │          │
└─────────────┴──────────┴────────────┴──────────┘
  ^Active tab style: Underline + bg highlight
  Hover effect: Subtle background change
```

### Tab 1: Hasil Rekomendasi

```
┌─────────────────────────────────────────┐
│ Film yang Dipilih:                      │
│ ┌─────────────────────────────────────┐ │
│ │ 🌈 Toy Story (1995)                │ │
│ │ Genre: Adventure  Animation         │ │
│ │         Children  Comedy            │ │
│ │         Fantasy                     │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Top 10 Rekomendasi Film                │
│ ┌──────────────────┐ ┌──────────────────┐
│ │ ① Jumanji        │ │ ② Balto          │
│ │ Adventure        │ │ Adventure        │
│ │ Children Fantasy │ │ Animation Child..│
│ │ Similarity: 84%  │ │ Similarity: 82%  │
│ │ ████████░░       │ │ ████████░░       │
│ └──────────────────┘ └──────────────────┘
│ 
│ ... (more cards in grid layout)
└─────────────────────────────────────────┘
```

### Tab 2: Bobot Fitur Optimal

```
┌─────────────────────────────────────────┐
│ Bobot Genre Optimal (Hasil GA)          │
│                                         │
│ Fitness Score: 0.7245                  │
│ Generasi Konvergen: 15                  │
│ Waktu Eksekusi: 12.34s                 │
│                                         │
│ ┌────────────┐ ┌────────────┐          │
│ │ Action     │ │ Thriller   │          │
│ │ 0.245      │ │ 0.182      │          │
│ │ 24.5%      │ │ 18.2%      │          │
│ │ ███████████│ │ █████████  │          │
│ └────────────┘ └────────────┘          │
│                                         │
│ ┌────────────┐ ┌────────────┐          │
│ │ Adventure  │ │ Drama      │          │
│ │ 0.115      │ │ 0.098      │          │
│ │ 11.5%      │ │ 9.8%       │          │
│ │ █████░░░░░│ │ █████░░░░░ │          │
│ └────────────┘ └────────────┘          │
│                                         │
│ ... (top 15 genres dalam grid)         │
│                                         │
│ [Chart.js Bar Chart]                   │
│ Bobot Genre Optimal (Top 15)            │
│ (Visual bar chart dibawah sini)         │
└─────────────────────────────────────────┘
```

### Tab 3: Evolusi GA

```
┌─────────────────────────────────────────┐
│ Kurva Evolusi Fitness                   │
│                                         │
│ [Chart.js Line Chart]                  │
│ Fitness Evolution Over Generations      │
│                                         │
│  1.0 │                         ◆       │
│  0.9 │                     ◆ ◆         │
│  0.8 │                 ◆ ◆             │
│  0.7 │             ◆ ◆                 │
│  0.6 │         ◆ ◆                     │
│  0.5 │     ◆ ◆                         │
│  0.4 │ ◆ ◆                             │
│      │─────────────────────────────→   │
│      0   5   10   15   20   25   30    │
│                                         │
│ Legend:                                │
│ ─ Best Fitness    (green)              │
│ ─ Average Fitness (blue)               │
│ ─ Worst Fitness   (red)                │
│                                         │
│ ┌──────────────┬──────────────┐        │
│ │ Stat Card    │ Stat Card    │        │
│ │ Fitness Awal │ Fitness Akhir│        │
│ │ 0.4520       │ 0.7245       │        │
│ └──────────────┴──────────────┘        │
│ ┌──────────────┐                       │
│ │ Stat Card    │                       │
│ │ Peningkatan  │                       │
│ │ 60.1%        │                       │
│ └──────────────┘                       │
└─────────────────────────────────────────┘
```

### Tab 4: Informasi

```
┌─────────────────────────────────────────┐
│ 📚 Tentang Sistem Ini                   │
│                                         │
│ 📖 Metode Content-Based Filtering       │
│ Sistem ini menggunakan pendekatan       │
│ Content-Based Filtering untuk...        │
│                                         │
│ 📐 Cosine Similarity                    │
│ Setiap film direpresentasikan sebagai   │
│ vektor genre. Kemiripan dihitung...    │
│ Formula: similarity = (A·B)/(||A||...) │
│                                         │
│ 🧬 Optimasi Genetic Algorithm           │
│ GA digunakan untuk menemukan bobot      │
│ optimal setiap genre...                │
│                                         │
│ Komponen GA:                           │
│ • Individu: Vektor bobot genre          │
│ • Fitness: Rata-rata similarity         │
│ • Selection: Tournament selection       │
│ • Crossover: Uniform crossover          │
│ • Mutation: Gaussian mutation           │
│ • Elitism: Preservation terbaik         │
│                                         │
│ 📊 Dataset                              │
│ Sumber: MovieLens 32M Dataset           │
│ Jumlah Film: 87,585 film                │
│ Genre: 20 genre utama                   │
│                                         │
│ ... (more sections, scrollable)        │
└─────────────────────────────────────────┘
```

---

## 🔄 Progress Modal

```
┌─────────────────────────────┐
│                             │
│ Menjalankan Genetic Algo... │
│                             │
│ ┌─────────────────────────┐ │
│ │██████████░░░░░░░░░░░░ │ │  ← Progress bar
│ └─────────────────────────┘ │
│                             │
│ Generasi: 15/20             │
│                             │
└─────────────────────────────┘

Modal Properties:
- Semi-transparent backdrop
- Centered on screen
- Non-dismissible during run
- Shows real-time progress
```

---

## 🎨 Color Scheme

```
Primary Colors:
├─ Primary Blue: #667eea
├─ Secondary Purple: #764ba2
├─ Accent Pink: #f093fb
└─ Gradient: 135° from blue to purple

Semantic Colors:
├─ Success Green: #48bb78
├─ Warning Orange: #ed8936
├─ Error Red: #f56565
└─ Info Blue: #667eea

Neutral Colors:
├─ Text Primary: #2d3748 (dark)
├─ Text Secondary: #718096 (gray)
├─ Background Light: #f7fafc
└─ Background White: #ffffff

Borders:
├─ Border Color: #e2e8f0
├─ Shadow Small: 0 1px 3px rgba(0,0,0,0.12)
├─ Shadow Medium: 0 4px 6px rgba(0,0,0,0.1)
└─ Shadow Large: 0 10px 20px rgba(0,0,0,0.15)
```

---

## 📱 Responsive Breakpoints

```
Desktop (1200px+):
├─ Sidebar: 350px fixed
├─ Content: Flexible
└─ Grid: 3-4 columns

Tablet (768px-1199px):
├─ Sidebar: Flexible, wraps
├─ Content: Full width or stacked
└─ Grid: 2-3 columns

Mobile (< 768px):
├─ Sidebar: Stacked vertical
├─ Content: Stacked
├─ Grid: 1 column
└─ Sidebar becomes collapsed
```

---

## 🔤 Typography

```
Font Family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif

Hierarchy:
├─ H1 (Header): 2.5rem, 700 weight, white color
├─ H2 (Section): 1.2rem, 600 weight, primary color
├─ H3 (Subsection): 1.1rem, 600 weight, text-primary
├─ H4 (Label): 0.95rem, 600 weight
├─ H5 (Minor): 0.85rem, 600 weight
└─ Body: 0.95rem, 400 weight, line-height 1.6

Special Elements:
├─ Code: Courier New, monospace
├─ Help Text: 0.85rem, italic, text-secondary
└─ Links: Primary color with hover effect
```

---

## ✨ Interaction Effects

```
Buttons:
├─ Hover: translateY(-2px), shadow-lg
├─ Active: translateY(0), shadow-sm
├─ Disabled: opacity 50%
└─ Focus: outline none, glow effect

Cards:
├─ Hover: translateY(-4px), shadow-lg, border-primary
├─ Active: highlight, bold text
└─ Selected: background-gradient

Inputs:
├─ Focus: border-primary, glow
├─ Error: border-danger, red text
└─ Success: border-success, green text

Transitions:
├─ Default: 0.3s ease
├─ Fast: 0.2s ease
└─ Slow: 0.5s ease

Animations:
├─ Progress bar: smooth width transition
├─ Chart: 500ms animation on render
└─ List items: stagger effect
```

---

## 📊 Chart Components

### Bar Chart (Bobot Genre)

```
Chart Type: Bar (Horizontal)
Library: Chart.js 3.9.1
Colors: Rainbow gradient
Interaction: Tooltip on hover
Animation: 500ms duration
Responsive: Auto-scale
```

### Line Chart (Evolusi GA)

```
Chart Type: Line (Multiple series)
Library: Chart.js 3.9.1
Series: 
  ├─ Best Fitness (green)
  ├─ Average Fitness (blue)
  └─ Worst Fitness (red)
Fill: Partial fill for best
Tension: 0.4 (smooth curves)
Points: Visible
Responsive: Auto-scale
```

---

## 🎬 Recommendation Card Layout

```
┌─────────────────────────────┐
│ ① ← Ranking badge (circle) │
│ Film Title (Year)           │
│ Genre1  Genre2  Genre3      │
│                             │
│ ───────────────────────────  │
│ Kesamaan: 87.3%             │
│ ████████░░                  │
│ ← Progress bar filled       │
└─────────────────────────────┘

Properties:
- Width: 280px (desktop)
- Responsive: 250px (tablet), full (mobile)
- Hover effect: Lift + shadow
- Shadow: Medium on default, Large on hover
- Border: 2px, changes on hover
```

---

## 🖼️ Overall Aesthetic

```
Style: Modern, Clean, Professional
Theme: Dark gradient header, light content
Mood: Technical yet accessible
Accessibility: WCAG 2.1 AA compliant
Loading: Smooth transitions & animations
Focus: User clarity & information hierarchy
```

---

**Interface Version**: 1.0  
**Last Updated**: 2026-07-21  
**Browser Compatibility**: All modern browsers (Chrome, Firefox, Edge, Safari)
