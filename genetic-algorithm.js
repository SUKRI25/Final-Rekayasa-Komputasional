/**
 * Genetic Algorithm Implementation
 * Digunakan untuk optimasi bobot genre dalam content-based filtering
 */

class GeneticAlgorithm {
    constructor(config = {}) {
        this.populationSize = config.populationSize || 20;
        this.generations = config.generations || 20;
        this.mutationRate = config.mutationRate || 0.2;
        this.crossoverRate = config.crossoverRate || 0.8;
        this.elitismRate = config.elitismRate || 0.1;
        this.numGenes = config.numGenes || 20; // Jumlah genre
        this.referenceMovie = config.referenceMovie;
        this.candidateMovies = config.candidateMovies;
        this.allGenres = config.allGenres;
        this.onGenerationCallback = config.onGenerationCallback || (() => {});
        
        this.population = [];
        this.fitnessHistory = [];
        this.bestIndividual = null;
        this.convergenceGeneration = -1;
    }

    /**
     * Inisialisasi populasi awal dengan random individual
     */
    initializePopulation() {
        this.population = [];
        for (let i = 0; i < this.populationSize; i++) {
            const individual = this.createRandomIndividual();
            this.population.push({
                genes: individual,
                fitness: this.evaluateFitness(individual)
            });
        }
    }

    /**
     * Membuat individual dengan gen random
     * @returns {Array<number>} Vektor bobot random
     */
    createRandomIndividual() {
        const genes = [];
        for (let i = 0; i < this.numGenes; i++) {
            genes.push(Math.random());
        }
        return this.normalizeWeights(genes);
    }

    /**
     * Normalisasi bobot sehingga jumlahnya = 1
     * @param {Array<number>} weights - Vektor bobot
     * @returns {Array<number>} Bobot ternormalisasi
     */
    normalizeWeights(weights) {
        const sum = weights.reduce((a, b) => a + b, 0);
        if (sum === 0) return weights;
        return weights.map(w => w / sum);
    }

    /**
     * Evaluasi fitness untuk sebuah individual
     * Fitness = rata-rata cosine similarity dari top-10 rekomendasi
     * @param {Array<number>} genes - Vektor bobot
     * @returns {number} Nilai fitness (0-1)
     */
    evaluateFitness(genes) {
        try {
            const recommendations = CosineSimilarity.getRecommendations(
                this.referenceMovie,
                this.candidateMovies,
                genes,
                this.allGenres,
                10
            );

            const avgSimilarity = CosineSimilarity.calculateAverageSimilarity(recommendations);
            return avgSimilarity || 0;
        } catch (error) {
            console.warn('Error calculating fitness:', error);
            return 0;
        }
    }

    /**
     * Selection menggunakan Tournament Selection
     * @param {number} tournamentSize - Ukuran tournament
     * @returns {Object} Individual terpilih
     */
    selection(tournamentSize = 3) {
        let best = null;
        for (let i = 0; i < tournamentSize; i++) {
            const idx = Math.floor(Math.random() * this.population.length);
            if (!best || this.population[idx].fitness > best.fitness) {
                best = this.population[idx];
            }
        }
        return best;
    }

    /**
     * Crossover menggunakan Uniform Crossover
     * @param {Object} parent1 - Parent pertama
     * @param {Object} parent2 - Parent kedua
     * @returns {Array<number>} Gen offspring
     */
    crossover(parent1, parent2) {
        const offspring = [];
        for (let i = 0; i < this.numGenes; i++) {
            if (Math.random() < 0.5) {
                offspring.push(parent1.genes[i]);
            } else {
                offspring.push(parent2.genes[i]);
            }
        }
        return this.normalizeWeights(offspring);
    }

    /**
     * Mutation menggunakan Gaussian Mutation
     * @param {Array<number>} genes - Gen individual
     * @returns {Array<number>} Gen ter-mutasi
     */
    mutate(genes) {
        const mutated = [...genes];
        for (let i = 0; i < mutated.length; i++) {
            if (Math.random() < this.mutationRate) {
                // Gaussian mutation
                const sigma = 0.1;
                const mutation = (Math.random() + Math.random() + Math.random() + Math.random() - 2) * sigma;
                mutated[i] = Math.max(0, Math.min(1, mutated[i] + mutation));
            }
        }
        return this.normalizeWeights(mutated);
    }

    /**
     * Jalankan satu generasi GA
     */
    evolveGeneration() {
        // Sort populasi berdasarkan fitness
        this.population.sort((a, b) => b.fitness - a.fitness);

        // Track best individual
        if (!this.bestIndividual || this.population[0].fitness > this.bestIndividual.fitness) {
            this.bestIndividual = JSON.parse(JSON.stringify(this.population[0]));
        }

        // Track fitness history
        const avgFitness = this.population.reduce((sum, ind) => sum + ind.fitness, 0) / this.population.length;
        this.fitnessHistory.push({
            best: this.population[0].fitness,
            average: avgFitness,
            worst: this.population[this.population.length - 1].fitness
        });

        // Elitism - pertahankan individu terbaik
        const elitismCount = Math.max(1, Math.floor(this.populationSize * this.elitismRate));
        const newPopulation = this.population.slice(0, elitismCount).map(ind => 
            JSON.parse(JSON.stringify(ind))
        );

        // Generate offspring untuk menggisi sisa populasi
        while (newPopulation.length < this.populationSize) {
            let offspring;
            
            if (Math.random() < this.crossoverRate) {
                // Crossover
                const parent1 = this.selection();
                const parent2 = this.selection();
                offspring = this.crossover(parent1, parent2);
            } else {
                // Mutasi saja
                const parent = this.selection();
                offspring = this.mutate(parent.genes);
            }

            // Tambahkan mutasi
            offspring = this.mutate(offspring);

            newPopulation.push({
                genes: offspring,
                fitness: this.evaluateFitness(offspring)
            });
        }

        this.population = newPopulation;
    }

    /**
     * Jalankan GA sampai selesai
     * @returns {Promise<Object>} Hasil GA dengan best individual dan history
     */
    async run() {
        this.initializePopulation();
        const startTime = Date.now();
        let lastBestFitness = this.population[0].fitness;
        let convergenceCounter = 0;
        const convergenceThreshold = 3; // Generasi tanpa perubahan sebelum converge

        for (let gen = 0; gen < this.generations; gen++) {
            this.evolveGeneration();
            
            // Callback untuk progress tracking
            this.onGenerationCallback({
                generation: gen + 1,
                totalGenerations: this.generations,
                bestFitness: this.bestIndividual.fitness,
                avgFitness: this.fitnessHistory[gen].average
            });

            // Check convergence
            if (Math.abs(this.bestIndividual.fitness - lastBestFitness) < 0.0001) {
                convergenceCounter++;
                if (convergenceCounter >= convergenceThreshold && this.convergenceGeneration === -1) {
                    this.convergenceGeneration = gen + 1;
                }
            } else {
                convergenceCounter = 0;
            }
            lastBestFitness = this.bestIndividual.fitness;

            // Yield untuk browser responsiveness
            if (gen % 5 === 0) {
                await new Promise(resolve => setTimeout(resolve, 0));
            }
        }

        const endTime = Date.now();
        const executionTime = (endTime - startTime) / 1000; // dalam detik

        return {
            bestWeights: this.bestIndividual.genes,
            bestFitness: this.bestIndividual.fitness,
            fitnessHistory: this.fitnessHistory,
            executionTime: executionTime,
            convergenceGeneration: this.convergenceGeneration === -1 ? this.generations : this.convergenceGeneration,
            recommendations: CosineSimilarity.getRecommendations(
                this.referenceMovie,
                this.candidateMovies,
                this.bestIndividual.genes,
                this.allGenres,
                10
            )
        };
    }

    /**
     * Mendapatkan statistik populasi saat ini
     * @returns {Object} Statistik fitness
     */
    getPopulationStats() {
        const fitnesses = this.population.map(ind => ind.fitness);
        return {
            best: Math.max(...fitnesses),
            worst: Math.min(...fitnesses),
            average: fitnesses.reduce((a, b) => a + b) / fitnesses.length,
            stdDev: this.calculateStdDev(fitnesses)
        };
    }

    /**
     * Menghitung standard deviation
     * @param {Array<number>} values - Array nilai
     * @returns {number} Standard deviation
     */
    calculateStdDev(values) {
        const avg = values.reduce((a, b) => a + b) / values.length;
        const squareDiffs = values.map(value => Math.pow(value - avg, 2));
        const avgSquareDiff = squareDiffs.reduce((a, b) => a + b) / squareDiffs.length;
        return Math.sqrt(avgSquareDiff);
    }
}

// Export untuk digunakan di module lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GeneticAlgorithm;
}
