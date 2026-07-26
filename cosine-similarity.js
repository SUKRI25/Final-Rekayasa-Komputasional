/**
 * Cosine Similarity Implementation
 * Menghitung kemiripan antara dua vektor menggunakan cosine similarity formula
 */

class CosineSimilarity {
    /**
     * Menghitung cosine similarity antara dua vektor
     * @param {Array<number>} vectorA - Vektor pertama
     * @param {Array<number>} vectorB - Vektor kedua
     * @returns {number} Nilai similarity (0-1)
     */
    static calculate(vectorA, vectorB) {
        if (vectorA.length !== vectorB.length) {
            throw new Error('Vektor harus memiliki dimensi yang sama');
        }

        // Hitung dot product (A · B)
        const dotProduct = vectorA.reduce((sum, a, i) => sum + (a * vectorB[i]), 0);

        // Hitung magnitude (||A|| dan ||B||)
        const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + (a * a), 0));
        const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + (b * b), 0));

        // Hindari pembagian dengan nol
        if (magnitudeA === 0 || magnitudeB === 0) {
            return 0;
        }

        // Hitung cosine similarity
        return dotProduct / (magnitudeA * magnitudeB);
    }

    /**
     * Menghitung cosine similarity antara film referensi dan film lainnya
     * @param {Object} referenceMovie - Film referensi
     * @param {Object} targetMovie - Film target
     * @param {Array<number>} weights - Bobot untuk setiap genre
     * @param {Array<string>} allGenres - Daftar semua genre
     * @returns {number} Nilai similarity (0-1)
     */
    static calculateMovieSimilarity(referenceMovie, targetMovie, weights, allGenres) {
        // Konversi genre film ke vektor dengan bobot
        const refVector = this.movieToVector(referenceMovie, weights, allGenres);
        const targetVector = this.movieToVector(targetMovie, weights, allGenres);

        return this.calculate(refVector, targetVector);
    }

    /**
     * Konversi film ke vektor genre dengan bobot
     * @param {Object} movie - Objek film dengan properti 'genres'
     * @param {Array<number>} weights - Bobot untuk setiap genre
     * @param {Array<string>} allGenres - Daftar semua genre
     * @returns {Array<number>} Vektor film
     */
    static movieToVector(movie, weights, allGenres) {
        const movieGenres = new Set(movie.genres || []);
        
        return allGenres.map((genre, index) => {
            return movieGenres.has(genre) ? weights[index] : 0;
        });
    }

    /**
     * Mendapatkan rekomendasi film
     * @param {Object} referenceMovie - Film referensi
     * @param {Array<Object>} candidateMovies - Film-film kandidat
     * @param {Array<number>} weights - Bobot optimal
     * @param {Array<string>} allGenres - Daftar semua genre
     * @param {number} topK - Jumlah rekomendasi yang diinginkan
     * @returns {Array<Object>} Array film dengan similarity score
     */
    static getRecommendations(referenceMovie, candidateMovies, weights, allGenres, topK = 10) {
        const similarities = candidateMovies
            .filter(movie => movie.movieId !== referenceMovie.movieId)
            .map(movie => ({
                ...movie,
                similarity: this.calculateMovieSimilarity(referenceMovie, movie, weights, allGenres)
            }))
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, topK);

        return similarities;
    }

    /**
     * Menghitung rata-rata similarity untuk sebuah set film
     * @param {Array<Object>} movies - Array film dengan properti similarity
     * @returns {number} Rata-rata similarity
     */
    static calculateAverageSimilarity(movies) {
        if (movies.length === 0) return 0;
        const total = movies.reduce((sum, movie) => sum + movie.similarity, 0);
        return total / movies.length;
    }
}

// Export untuk digunakan di module lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CosineSimilarity;
}
