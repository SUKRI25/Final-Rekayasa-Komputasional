/**
 * Main Application Controller
 * Menangani interaksi UI dan koordinasi antar module
 */

class MovieRecommendationApp {
    constructor() {
        this.selectedMovie = null;
        this.currentGAResult = null;
        this.evolutionChart = null;
        this.weightsChart = null;
        this.weightsDistributionChart = null;
        this.convergenceTrendChart = null;
        this.init();
    }

    /**
     * Inisialisasi aplikasi
     */
    async init() {
        console.log('Initializing application...');
        
        // Load data
        await dataLoader.initialize();
        console.log('Data loaded successfully');
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Render movies list
        this.renderMoviesList();
        
        console.log('Application initialized');
    }

    /**
     * Setup semua event listeners
     */
    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Search movies
        const movieSearch = document.getElementById('movieSearch');
        if (movieSearch) {
            movieSearch.addEventListener('input', (e) => this.searchMovies(e.target.value));
        }

        // GA buttons
        document.getElementById('optimizeBtn').addEventListener('click', () => this.runGA());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
    }

    /**
     * Switch tab aktif
     * @param {string} tabName - Nama tab
     */
    switchTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });

        // Deactivate all buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected tab
        const selectedTab = document.getElementById(tabName);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }

        // Activate button
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Handle chart rendering
        if (tabName === 'weights' && this.currentGAResult) {
            setTimeout(() => {
                this.renderWeightsDistributionChart();
                this.renderWeightsChart();
            }, 100);
        } else if (tabName === 'evolution' && this.currentGAResult) {
            setTimeout(() => {
                this.renderConvergenceTrendChart();
                this.renderEvolutionChart();
            }, 100);
        } else if (tabName === 'comparison' && this.currentGAResult) {
            setTimeout(() => this.renderComparisonChart(), 100);
        }
    }

    /**
     * Render daftar film
     */
    renderMoviesList() {
        const moviesList = document.getElementById('moviesList');
        if (!moviesList) return;

        moviesList.innerHTML = '';
        const movies = dataLoader.movies.slice(0, 100);

        movies.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.className = 'movie-item';
            if (this.selectedMovie && this.selectedMovie.movieId === movie.movieId) {
                movieItem.classList.add('selected');
            }

            const yearStr = movie.year ? ` (${movie.year})` : '';
            movieItem.innerHTML = `
                <div class="movie-item-title">${movie.title}</div>
                <div class="movie-item-check"></div>
            `;

            movieItem.addEventListener('click', () => this.selectMovie(movie));
            moviesList.appendChild(movieItem);
        });
    }

    /**
     * Search dan filter films
     * @param {string} keyword - Keyword pencarian
     */
    searchMovies(keyword) {
        const moviesList = document.getElementById('moviesList');
        if (!moviesList) return;

        moviesList.innerHTML = '';
        
        if (!keyword.trim()) {
            this.renderMoviesList();
            return;
        }

        const results = dataLoader.searchMovies(keyword);
        
        if (results.length === 0) {
            moviesList.innerHTML = '<div class="search-hint">Tidak ada hasil untuk pencarian ini. Coba ketik genre seperti action, comedy, drama, atau judul film.</div><p class="loading-text">Film tidak ditemukan</p>';
            return;
        }

        const hint = document.createElement('div');
        hint.className = 'search-hint';
        hint.textContent = `Menampilkan ${results.length} hasil untuk "${keyword}"`;
        moviesList.appendChild(hint);

        results.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.className = 'movie-item';
            if (this.selectedMovie && this.selectedMovie.movieId === movie.movieId) {
                movieItem.classList.add('selected');
            }

            const genresText = (movie.genres || []).join(', ');
            movieItem.innerHTML = `
                <div class="movie-item-title">${movie.title}</div>
                <div class="movie-item-check"></div>
            `;
            movieItem.title = genresText;

            movieItem.addEventListener('click', () => this.selectMovie(movie));
            moviesList.appendChild(movieItem);
        });
    }

    /**
     * Pilih film referensi
     * @param {Object} movie - Film yang dipilih
     */
    selectMovie(movie) {
        this.selectedMovie = movie;
        this.currentGAResult = null; // Reset hasil GA saat film baru dipilih
        
        // Update UI
        this.renderMoviesList();
        this.renderSelectedMovieDisplay();
        this.clearRecommendations();
        
        console.log('Movie selected:', movie.title);
    }

    /**
     * Tampilkan film yang dipilih
     */
    renderSelectedMovieDisplay() {
        const display = document.getElementById('selectedMovieDisplay');
        if (!display) return;

        if (!this.selectedMovie) {
            display.className = 'movie-display empty';
            display.innerHTML = '<p class="empty-state">Belum ada film yang dipilih</p>';
            return;
        }

        const genresList = this.selectedMovie.genres
            .map(g => `<span class="genre-badge">${g}</span>`)
            .join('');

        display.className = 'movie-display';
        display.innerHTML = `
            <div class="movie-info-item">
                <div class="movie-info-label">Judul</div>
                <div class="movie-info-value">${this.selectedMovie.title}</div>
            </div>
            <div class="movie-info-item">
                <div class="movie-info-label">Genre</div>
                <div class="movie-genres">${genresList}</div>
            </div>
        `;
    }

    /**
     * Clear recommendations display
     */
    clearRecommendations() {
        const recList = document.getElementById('recommendationsList');
        if (recList) {
            recList.innerHTML = '<p class="empty-state">Jalankan optimasi GA untuk mendapatkan rekomendasi</p>';
        }

        const weightsList = document.getElementById('weightsList');
        if (weightsList) {
            weightsList.innerHTML = '<p class="empty-state">Jalankan optimasi GA untuk melihat bobot optimal</p>';
        }

        const comparisonContent = document.getElementById('comparisonContent');
        if (comparisonContent) {
            comparisonContent.innerHTML = '<p class="empty-state">Jalankan optimasi GA untuk melihat perbandingan</p>';
        }
        this.comparisonData = null;
        if (this.comparisonChart) {
            this.comparisonChart.destroy();
            this.comparisonChart = null;
        }
    }

    /**
     * Jalankan Genetic Algorithm
     */
    async runGA() {
        if (!this.selectedMovie) {
            alert('Silakan pilih film referensi terlebih dahulu!');
            return;
        }

        // Get GA parameters
        const populationSize = parseInt(document.getElementById('populationSize').value) || 20;
        const generations = parseInt(document.getElementById('generations').value) || 20;
        const mutationRate = (parseFloat(document.getElementById('mutationRate').value) || 20) / 100;
        const crossoverRate = (parseFloat(document.getElementById('crossoverRate').value) || 80) / 100;
        const elitismRate = (parseFloat(document.getElementById('elitismRate').value) || 10) / 100;

        // Show progress modal
        const modal = document.getElementById('progressModal');
        modal.classList.add('active');

        try {
            // Create GA instance
            const ga = new GeneticAlgorithm({
                populationSize,
                generations,
                mutationRate,
                crossoverRate,
                elitismRate,
                numGenes: dataLoader.allGenres.length,
                referenceMovie: this.selectedMovie,
                candidateMovies: dataLoader.movies,
                allGenres: dataLoader.allGenres,
                onGenerationCallback: (progress) => this.updateProgress(progress)
            });

            // Run GA
            const result = await ga.run();
            this.currentGAResult = result;

            // Display results
            this.displayResults(result);

            // Switch to results tab
            this.switchTab('results');

        } catch (error) {
            console.error('Error running GA:', error);
            alert('Error: ' + error.message);
        } finally {
            modal.classList.remove('active');
        }
    }

    /**
     * Update progress bar
     * @param {Object} progress - Progress data
     */
    updateProgress(progress) {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');

        const percent = (progress.generation / progress.totalGenerations) * 100;
        progressFill.style.width = percent + '%';
        progressText.textContent = `Generasi: ${progress.generation}/${progress.totalGenerations} | Fitness: ${progress.bestFitness.toFixed(4)}`;
    }

    /**
     * Display GA results
     * @param {Object} result - Hasil GA
     */
    displayResults(result) {
        console.log('GA Results:', result);

        // Display recommendations
        this.displayRecommendations(result.recommendations);

        // Display optimal weights
        this.displayOptimalWeights(result);

        // Display evolution stats
        this.displayEvolutionStats(result);

        // Build & display before/after comparison
        this.buildComparisonData(result);
        this.displayComparison(result);
    }

    /**
     * Tampilkan rekomendasi film
     * @param {Array} recommendations - Array rekomendasi
     */
    displayRecommendations(recommendations) {
        const recList = document.getElementById('recommendationsList');
        if (!recList) return;

        recList.innerHTML = '';

        recommendations.forEach((movie, index) => {
            const genresList = movie.genres
                .map(g => `<span class="recommendation-genre">${g}</span>`)
                .join('');

            const card = document.createElement('div');
            card.className = 'recommendation-card';
            card.innerHTML = `
                <div class="recommendation-rank">${index + 1}</div>
                <div class="recommendation-title">${movie.title}</div>
                <div class="recommendation-year">${movie.year || 'N/A'}</div>
                <div class="recommendation-genres">${genresList}</div>
                <div class="recommendation-similarity">
                    <div class="similarity-label">Kesamaan</div>
                    <div class="similarity-value">${(movie.similarity * 100).toFixed(1)}%</div>
                </div>
                <div class="similarity-bar">
                    <div class="similarity-bar-fill" style="width: ${movie.similarity * 100}%"></div>
                </div>
            `;
            recList.appendChild(card);
        });
    }

    /**
     * Tampilkan bobot optimal
     * @param {Object} result - Hasil GA
     */
    displayOptimalWeights(result) {
        const weightsList = document.getElementById('weightsList');
        if (!weightsList) return;

        weightsList.innerHTML = '';

        const weights = result.bestWeights;
        const genreWeights = dataLoader.allGenres.map((genre, idx) => ({
            genre,
            weight: weights[idx]
        })).sort((a, b) => b.weight - a.weight);

        genreWeights.forEach(gw => {
            const card = document.createElement('div');
            card.className = 'weight-card';
            card.innerHTML = `
                <div class="weight-genre">${gw.genre}</div>
                <div class="weight-value">${gw.weight.toFixed(3)}</div>
                <div class="weight-percentage">${(gw.weight * 100).toFixed(1)}%</div>
                <div class="weight-bar">
                    <div class="weight-bar-fill" style="width: ${gw.weight * 100}%"></div>
                </div>
            `;
            weightsList.appendChild(card);
        });

        // Update fitness info
        document.getElementById('fitnessScore').textContent = result.bestFitness.toFixed(4);
        document.getElementById('convergeGeneration').textContent = result.convergenceGeneration;
        document.getElementById('executionTime').textContent = result.executionTime.toFixed(2) + 's';
    }

    /**
     * Tampilkan statistik evolusi
     * @param {Object} result - Hasil GA
     */
    displayEvolutionStats(result) {
        const history = result.fitnessHistory;
        
        if (history.length > 0) {
            document.getElementById('initialFitness').textContent = history[0].best.toFixed(4);
            document.getElementById('finalFitness').textContent = history[history.length - 1].best.toFixed(4);
            const improvement = ((history[history.length - 1].best - history[0].best) / history[0].best * 100);
            document.getElementById('fitnessImprovement').textContent = improvement.toFixed(1) + '%';
        }
    }

    /**
     * Render grafik perbandingan sebelum dan sesudah
     */
    renderComparisonChart() {
        const canvas = document.getElementById('comparisonChart');
        if (!canvas || !this.comparisonData) return;

        if (this.comparisonChart) {
            this.comparisonChart.destroy();
        }

        const ctx = canvas.getContext('2d');
        this.comparisonChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Sebelum', 'Sesudah'],
                datasets: [
                    {
                        label: 'Rata-rata Similarity',
                        data: [this.comparisonData.baselineAverage, this.comparisonData.optimizedAverage],
                        backgroundColor: ['#f56565', '#48bb78'],
                        borderRadius: 8,
                        borderSkipped: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            font: { size: 12 }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Perbandingan Similarity Sebelum vs Sesudah'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        min: 0,
                        max: 1,
                        ticks: {
                            callback: function(value) {
                                return (value * 100).toFixed(0) + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    /**
     * Bangun data perbandingan sebelum (bobot genre setara) vs sesudah (bobot hasil GA)
     * @param {Object} result - Hasil GA
     * @returns {Object} Data perbandingan
     */
    buildComparisonData(result) {
        const numGenres = dataLoader.allGenres.length;

        // Baseline: bobot genre setara/rata (tanpa optimasi)
        const baselineWeights = new Array(numGenres).fill(1 / numGenres);

        const baselineRecommendations = CosineSimilarity.getRecommendations(
            this.selectedMovie,
            dataLoader.movies,
            baselineWeights,
            dataLoader.allGenres,
            10
        );
        const baselineAverage = CosineSimilarity.calculateAverageSimilarity(baselineRecommendations) || 0;

        const optimizedRecommendations = result.recommendations;
        const optimizedAverage = result.bestFitness;

        const improvement = baselineAverage > 0
            ? ((optimizedAverage - baselineAverage) / baselineAverage) * 100
            : 0;

        const baselineTopGenres = dataLoader.allGenres.map((genre, idx) => ({
            genre,
            weight: baselineWeights[idx]
        })).sort((a, b) => b.weight - a.weight).slice(0, 5);

        const optimizedTopGenres = dataLoader.allGenres.map((genre, idx) => ({
            genre,
            weight: result.bestWeights[idx]
        })).sort((a, b) => b.weight - a.weight).slice(0, 5);

        this.comparisonData = {
            baselineAverage,
            optimizedAverage,
            improvement,
            baselineTopGenres,
            optimizedTopGenres,
            baselineRecommendations,
            optimizedRecommendations
        };

        return this.comparisonData;
    }

    /**
     * Tampilkan perbandingan sebelum dan sesudah optimasi
     * @param {Object} result - Hasil GA
     */
    displayComparison(result) {
        const comparisonContent = document.getElementById('comparisonContent');
        if (!comparisonContent || !this.selectedMovie) return;

        const data = this.comparisonData || this.buildComparisonData(result);
        const baselineAveragePct = (data.baselineAverage * 100).toFixed(1);
        const optimizedAveragePct = (data.optimizedAverage * 100).toFixed(1);
        const improvementLabel = data.improvement >= 0 ? `+${data.improvement.toFixed(1)}%` : `${data.improvement.toFixed(1)}%`;

        const baselineGenres = data.baselineTopGenres.map(item => `<span class="comparison-genre-tag">${item.genre} (${(item.weight * 100).toFixed(0)}%)</span>`).join('');
        const optimizedGenres = data.optimizedTopGenres.map(item => `<span class="comparison-genre-tag">${item.genre} (${(item.weight * 100).toFixed(0)}%)</span>`).join('');

        const baselineMarkup = data.baselineRecommendations.map((movie, index) => `
            <li class="comparison-item">
                <div class="comparison-rank">#${index + 1}</div>
                <div class="comparison-title">${movie.title}</div>
                <div class="comparison-meta">${movie.year || 'N/A'}</div>
                <div class="comparison-similarity">Similarity ${(movie.similarity * 100).toFixed(1)}%</div>
            </li>
        `).join('');

        const optimizedMarkup = data.optimizedRecommendations.map((movie, index) => `
            <li class="comparison-item">
                <div class="comparison-rank">#${index + 1}</div>
                <div class="comparison-title">${movie.title}</div>
                <div class="comparison-meta">${movie.year || 'N/A'}</div>
                <div class="comparison-similarity">Similarity ${(movie.similarity * 100).toFixed(1)}%</div>
            </li>
        `).join('');

        comparisonContent.innerHTML = `
            <div class="comparison-summary">
                <div class="comparison-summary-card">
                    <h4>Ringkasan Kemiripan</h4>
                    <p><strong>Sebelum:</strong> ${baselineAveragePct}%</p>
                    <p><strong>Sesudah:</strong> ${optimizedAveragePct}%</p>
                    <p class="comparison-improvement ${data.improvement >= 0 ? 'positive' : 'negative'}">Perubahan: ${improvementLabel}</p>
                </div>
                <div class="comparison-summary-card">
                    <h4>Genre Dominan</h4>
                    <p><strong>Sebelum:</strong></p>
                    <div class="comparison-genre-list">${baselineGenres}</div>
                    <p><strong>Sesudah:</strong></p>
                    <div class="comparison-genre-list">${optimizedGenres}</div>
                </div>
            </div>

            <div class="comparison-panels">
                <div class="comparison-panel">
                    <h4><span class="comparison-label">Sebelum</span> Bobot Setara</h4>
                    <ul>${baselineMarkup}</ul>
                </div>
                <div class="comparison-panel">
                    <h4><span class="comparison-label">Sesudah</span> Bobot GA</h4>
                    <ul>${optimizedMarkup}</ul>
                </div>
            </div>
        `;
    }

    /**
     * Render grafik distribusi bobot seluruh genre (doughnut chart)
     * Melengkapi renderWeightsChart() yang hanya menampilkan top 15 genre
     */
    renderWeightsDistributionChart() {
        if (!this.currentGAResult) return;

        const canvas = document.getElementById('weightsDistributionChart');
        if (!canvas) return;

        const weights = this.currentGAResult.bestWeights;
        const genreWeights = dataLoader.allGenres.map((genre, idx) => ({
            genre,
            weight: weights[idx]
        })).sort((a, b) => b.weight - a.weight);

        if (this.weightsDistributionChart) {
            this.weightsDistributionChart.destroy();
        }

        const palette = [
            '#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe',
            '#43e97b', '#fa709a', '#fee140', '#30cfd0', '#330867',
            '#a8edea', '#fed6e3', '#ff9a56', '#97bc62', '#f6d365',
            '#fda085', '#84fab0', '#8fd3f4', '#a1c4fd', '#c2e9fb'
        ];

        const ctx = canvas.getContext('2d');
        this.weightsDistributionChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: genreWeights.map(g => g.genre),
                datasets: [{
                    label: 'Bobot Genre',
                    data: genreWeights.map(g => g.weight),
                    backgroundColor: genreWeights.map((_, idx) => palette[idx % palette.length]),
                    borderWidth: 1,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            font: { size: 11 },
                            boxWidth: 12
                        }
                    },
                    title: {
                        display: true,
                        text: 'Distribusi Bobot Genre (Semua Genre)'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed;
                                return `${context.label}: ${(value * 100).toFixed(1)}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    /**
     * Render weights chart
     */
    renderWeightsChart() {
        if (!this.currentGAResult) return;

        const canvas = document.getElementById('weightsChart');
        if (!canvas) return;

        const weights = this.currentGAResult.bestWeights;
        const genreWeights = dataLoader.allGenres.map((genre, idx) => ({
            genre,
            weight: weights[idx]
        })).sort((a, b) => b.weight - a.weight).slice(0, 15); // Top 15

        if (this.weightsChart) {
            this.weightsChart.destroy();
        }

        const ctx = canvas.getContext('2d');
        this.weightsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: genreWeights.map(g => g.genre),
                datasets: [{
                    label: 'Bobot Optimal',
                    data: genreWeights.map(g => g.weight),
                    backgroundColor: [
                        '#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe',
                        '#43e97b', '#fa709a', '#fee140', '#30cfd0', '#330867',
                        '#a8edea', '#fed6e3', '#ff9a56', '#97bc62', '#667eea'
                    ],
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            font: { size: 12 }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Bobot Genre Optimal (Top 15)'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: Math.max(...genreWeights.map(g => g.weight)) * 1.1
                    }
                }
            }
        });
    }

    /**
     * Render grafik tren konvergensi best fitness (single line + titik konvergensi)
     * Melengkapi renderEvolutionChart() yang menampilkan best/average/worst sekaligus
     */
    renderConvergenceTrendChart() {
        if (!this.currentGAResult) return;

        const canvas = document.getElementById('convergenceTrendChart');
        if (!canvas) return;

        const history = this.currentGAResult.fitnessHistory;
        const convergenceGen = this.currentGAResult.convergenceGeneration;
        const generations = history.map((_, i) => i + 1);
        const bestFitness = history.map(h => h.best);

        if (this.convergenceTrendChart) {
            this.convergenceTrendChart.destroy();
        }

        // Beri highlight warna berbeda pada titik generasi konvergen
        const pointColors = generations.map(gen =>
            gen === convergenceGen ? '#f56565' : '#48bb78'
        );
        const pointRadii = generations.map(gen =>
            gen === convergenceGen ? 6 : 3
        );

        const ctx = canvas.getContext('2d');
        this.convergenceTrendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: generations,
                datasets: [{
                    label: 'Best Fitness',
                    data: bestFitness,
                    borderColor: '#48bb78',
                    backgroundColor: 'rgba(72, 187, 120, 0.15)',
                    borderWidth: 2,
                    tension: 0.35,
                    fill: true,
                    pointBackgroundColor: pointColors,
                    pointBorderColor: pointColors,
                    pointRadius: pointRadii
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            font: { size: 12 }
                        }
                    },
                    title: {
                        display: true,
                        text: `Konvergensi tercapai pada generasi ke-${convergenceGen}`
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const gen = context.label;
                                const isConverge = parseInt(gen) === convergenceGen;
                                return `Fitness: ${context.parsed.y.toFixed(4)}${isConverge ? ' (Konvergen)' : ''}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        min: 0,
                        max: 1
                    }
                }
            }
        });
    }

    /**
     * Render evolution chart
     */
    renderEvolutionChart() {
        if (!this.currentGAResult) return;

        const canvas = document.getElementById('evolutionChart');
        if (!canvas) return;

        const history = this.currentGAResult.fitnessHistory;
        const generations = history.map((_, i) => i + 1);
        const bestFitness = history.map(h => h.best);
        const avgFitness = history.map(h => h.average);
        const worstFitness = history.map(h => h.worst);

        if (this.evolutionChart) {
            this.evolutionChart.destroy();
        }

        const ctx = canvas.getContext('2d');
        this.evolutionChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: generations,
                datasets: [
                    {
                        label: 'Best Fitness',
                        data: bestFitness,
                        borderColor: '#48bb78',
                        backgroundColor: 'rgba(72, 187, 120, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Average Fitness',
                        data: avgFitness,
                        borderColor: '#667eea',
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: false
                    },
                    {
                        label: 'Worst Fitness',
                        data: worstFitness,
                        borderColor: '#f56565',
                        backgroundColor: 'rgba(245, 101, 101, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            font: { size: 12 }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        min: 0,
                        max: 1
                    }
                }
            }
        });
    }

    /**
     * Reset aplikasi
     */
    reset() {
        this.selectedMovie = null;
        this.currentGAResult = null;
        this.comparisonData = null;
        if (this.comparisonChart) {
            this.comparisonChart.destroy();
            this.comparisonChart = null;
        }
        this.renderMoviesList();
        this.renderSelectedMovieDisplay();
        this.clearRecommendations();
        this.switchTab('results');
        console.log('Application reset');
    }
}

// Inisialisasi aplikasi saat DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MovieRecommendationApp();
});