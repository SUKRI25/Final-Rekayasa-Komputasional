/**
 * Data Loader Module
 * Memuat dan memproses data film dari CSV
 */

class DataLoader {
    constructor() {
        this.movies = [];
        this.allGenres = [];
        this.moviesMap = new Map();
    }

    /**
     * Load movie data dari CSV
     * @returns {Promise<Array>} Array data film
     */
    async loadMovies() {
        try {
            // Data film akan dimuat dari embedded data atau fetch
            const response = await fetch('./movies.csv');
            const csvText = await response.text();
            return this.parseCSV(csvText);
        } catch (error) {
            console.warn('Tidak dapat load file eksternal, menggunakan sample data');
            return this.getSampleMovieData();
        }
    }

    /**
     * Parse CSV data
     * @param {string} csvText - Teks CSV
     * @returns {Array} Array objek film
     */
    parseCSV(csvText) {
        const lines = csvText.trim().split('\n');
        const movies = [];
        
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (!line.trim()) continue;

            // Parse CSV dengan hati-hati terhadap koma dalam quotes
            const match = line.match(/^(\d+),(.+),(.+)$/);
            if (!match) continue;

            const movieId = parseInt(match[1]);
            const title = match[2].replace(/^"|"$/g, '').trim();
            const genresStr = match[3].replace(/^"|"$/g, '').trim();
            const genres = genresStr ? genresStr.split('|') : [];

            movies.push({
                movieId,
                title,
                genres,
                year: this.extractYear(title)
            });
        }

        return movies;
    }

    /**
     * Extract tahun dari title
     * @param {string} title - Judul film
     * @returns {number} Tahun
     */
    extractYear(title) {
        const match = title.match(/\((\d{4})\)$/);
        return match ? parseInt(match[1]) : null;
    }

    /**
     * Inisialisasi data
     * @returns {Promise<void>}
     */
    async initialize() {
        let movies = await this.loadMovies();
        
        // Filter dan limit untuk performance
        this.movies = movies.slice(0, 5000); // Limit ke 5000 film untuk demo
        
        // Extract semua unique genres
        const genresSet = new Set();
        this.movies.forEach(movie => {
            movie.genres.forEach(genre => genresSet.add(genre));
        });
        this.allGenres = Array.from(genresSet).sort();

        // Buat map untuk quick lookup
        this.movies.forEach(movie => {
            this.moviesMap.set(movie.movieId, movie);
        });

        console.log(`Data loaded: ${this.movies.length} movies, ${this.allGenres.length} genres`);
    }

    /**
     * Dapatkan film berdasarkan ID
     * @param {number} movieId - ID film
     * @returns {Object} Objek film
     */
    getMovieById(movieId) {
        return this.moviesMap.get(movieId);
    }

    /**
     * Cari film berdasarkan keyword
     * @param {string} keyword - Keyword pencarian
     * @returns {Array} Array film yang cocok
     */
    searchMovies(keyword) {
        const lowerKeyword = keyword.trim().toLowerCase();
        if (!lowerKeyword) {
            return this.movies.slice(0, 100);
        }

        const keywordTerms = lowerKeyword.split(/\s+/).filter(Boolean);

        return this.movies
            .filter(movie => {
                const title = movie.title.toLowerCase();
                const genres = (movie.genres || []).map(g => g.toLowerCase());
                const genreMatch = genres.some(genre => genre.includes(lowerKeyword));
                const titleMatch = title.includes(lowerKeyword);
                const titleTermMatch = keywordTerms.every(term => title.includes(term));
                const genreTermMatch = keywordTerms.every(term => genres.some(genre => genre.includes(term)));

                return genreMatch || titleMatch || titleTermMatch || genreTermMatch;
            })
            .sort((a, b) => {
                const aTitle = a.title.toLowerCase();
                const bTitle = b.title.toLowerCase();
                const aGenres = (a.genres || []).map(g => g.toLowerCase());
                const bGenres = (b.genres || []).map(g => g.toLowerCase());

                const aExactGenre = aGenres.some(genre => genre === lowerKeyword);
                const bExactGenre = bGenres.some(genre => genre === lowerKeyword);
                if (aExactGenre !== bExactGenre) return aExactGenre ? -1 : 1;

                const aStartsTitle = aTitle.startsWith(lowerKeyword);
                const bStartsTitle = bTitle.startsWith(lowerKeyword);
                if (aStartsTitle !== bStartsTitle) return aStartsTitle ? -1 : 1;

                const aGenreContains = aGenres.some(genre => genre.includes(lowerKeyword));
                const bGenreContains = bGenres.some(genre => genre.includes(lowerKeyword));
                if (aGenreContains !== bGenreContains) return aGenreContains ? -1 : 1;

                return aTitle.localeCompare(bTitle);
            })
            .slice(0, 100);
    }

    /**
     * Dapatkan sample movie data (untuk testing tanpa file eksternal)
     * @returns {Array} Sample data
     */
    getSampleMovieData() {
        return [
            { movieId: 1, title: "Toy Story (1995)", genres: ["Adventure", "Animation", "Children", "Comedy", "Fantasy"], year: 1995 },
            { movieId: 2, title: "Jumanji (1995)", genres: ["Adventure", "Children", "Fantasy"], year: 1995 },
            { movieId: 3, title: "Grumpier Old Men (1995)", genres: ["Comedy", "Romance"], year: 1995 },
            { movieId: 4, title: "Waiting to Exhale (1995)", genres: ["Comedy", "Drama", "Romance"], year: 1995 },
            { movieId: 5, title: "Father of the Bride Part II (1995)", genres: ["Comedy"], year: 1995 },
            { movieId: 6, title: "Heat (1995)", genres: ["Action", "Crime", "Thriller"], year: 1995 },
            { movieId: 7, title: "Sabrina (1995)", genres: ["Comedy", "Romance"], year: 1995 },
            { movieId: 8, title: "Tom and Huck (1995)", genres: ["Adventure", "Children"], year: 1995 },
            { movieId: 9, title: "Sudden Death (1995)", genres: ["Action"], year: 1995 },
            { movieId: 10, title: "GoldenEye (1995)", genres: ["Action", "Adventure", "Thriller"], year: 1995 },
            { movieId: 11, title: "American President, The (1995)", genres: ["Comedy", "Drama", "Romance"], year: 1995 },
            { movieId: 12, title: "Dracula: Dead and Loving It (1995)", genres: ["Comedy", "Horror"], year: 1995 },
            { movieId: 13, title: "Balto (1995)", genres: ["Adventure", "Animation", "Children"], year: 1995 },
            { movieId: 14, title: "Nixon (1995)", genres: ["Drama"], year: 1995 },
            { movieId: 15, title: "Cutthroat Island (1995)", genres: ["Action", "Adventure", "Romance"], year: 1995 },
            { movieId: 16, title: "Casino (1995)", genres: ["Crime", "Drama"], year: 1995 },
            { movieId: 17, title: "Sense and Sensibility (1995)", genres: ["Drama", "Romance"], year: 1995 },
            { movieId: 18, title: "Four Rooms (1995)", genres: ["Comedy"], year: 1995 },
            { movieId: 19, title: "Ace Ventura: When Nature Calls (1995)", genres: ["Comedy"], year: 1995 },
            { movieId: 20, title: "Money Train (1995)", genres: ["Action", "Comedy", "Crime", "Drama", "Thriller"], year: 1995 },
            { movieId: 21, title: "Get Shorty (1995)", genres: ["Comedy", "Crime"], year: 1995 },
            { movieId: 22, title: "Copycat (1995)", genres: ["Crime", "Drama", "Horror", "Mystery", "Thriller"], year: 1995 },
            { movieId: 23, title: "Assassins (1995)", genres: ["Thriller"], year: 1995 },
            { movieId: 24, title: "Powder (1995)", genres: ["Drama", "Sci-Fi"], year: 1995 },
            { movieId: 25, title: "Outbreak (1995)", genres: ["Action", "Drama", "Sci-Fi", "Thriller"], year: 1995 },
            { movieId: 26, title: "It Takes Two (1995)", genres: ["Comedy", "Drama"], year: 1995 },
            { movieId: 27, title: "Twelve Monkeys (1995)", genres: ["Drama", "Sci-Fi"], year: 1995 },
            { movieId: 28, title: "Wings of Desire (1987)", genres: ["Drama", "Fantasy", "Romance"], year: 1987 },
            { movieId: 29, title: "The Godfather (1972)", genres: ["Crime", "Drama"], year: 1972 },
            { movieId: 30, title: "Pulp Fiction (1994)", genres: ["Crime", "Drama"], year: 1994 },
            { movieId: 31, title: "Forrest Gump (1994)", genres: ["Comedy", "Drama", "Romance"], year: 1994 },
            { movieId: 32, title: "The Shawshank Redemption (1994)", genres: ["Drama"], year: 1994 },
            { movieId: 33, title: "Léon: The Professional (1994)", genres: ["Action", "Crime", "Drama"], year: 1994 },
            { movieId: 34, title: "Dumb and Dumber (1994)", genres: ["Comedy"], year: 1994 },
            { movieId: 35, title: "Speed (1994)", genres: ["Action", "Adventure", "Thriller"], year: 1994 },
            { movieId: 36, title: "True Lies (1994)", genres: ["Action", "Comedy", "Thriller"], year: 1994 },
            { movieId: 37, title: "The Lion King (1994)", genres: ["Animation", "Children", "Comedy", "Drama", "Musical"], year: 1994 },
            { movieId: 38, title: "Ace Ventura: Pet Detective (1994)", genres: ["Comedy"], year: 1994 },
            { movieId: 39, title: "The Mask (1994)", genres: ["Comedy", "Fantasy"], year: 1994 },
            { movieId: 40, title: "Natural Born Killers (1994)", genres: ["Crime", "Drama"], year: 1994 },
            { movieId: 41, title: "Stargate (1994)", genres: ["Action", "Adventure", "Sci-Fi"], year: 1994 },
            { movieId: 42, title: "True Romance (1993)", genres: ["Crime", "Drama", "Romance"], year: 1993 },
            { movieId: 43, title: "Jurassic Park (1993)", genres: ["Action", "Adventure", "Sci-Fi"], year: 1993 },
            { movieId: 44, title: "Terminator 2: Judgment Day (1991)", genres: ["Action", "Sci-Fi"], year: 1991 },
            { movieId: 45, title: "The Silence of the Lambs (1991)", genres: ["Crime", "Drama", "Thriller"], year: 1991 },
            { movieId: 46, title: "Robin Hood: Prince of Thieves (1991)", genres: ["Action", "Adventure"], year: 1991 },
            { movieId: 47, title: "Predator 2 (1990)", genres: ["Action", "Horror", "Sci-Fi"], year: 1990 },
            { movieId: 48, title: "Total Recall (1990)", genres: ["Action", "Sci-Fi", "Thriller"], year: 1990 },
            { movieId: 49, title: "Die Hard 2 (1990)", genres: ["Action", "Thriller"], year: 1990 },
            { movieId: 50, title: "Home Alone (1990)", genres: ["Comedy", "Family"], year: 1990 }
        ];
    }
}

// Inisialisasi global data loader
const dataLoader = new DataLoader();

// Export untuk testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataLoader;
}
