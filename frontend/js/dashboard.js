// Dashboard JavaScript - TrueLineKing Analytics
// Handles form inputs, analysis calculations, and predictions

class TrueLineKingAnalyzer {
    constructor() {
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const analyzeBtn = document.getElementById('analyzeBtn');
        const resetBtn = document.getElementById('resetBtn');

        if (analyzeBtn) analyzeBtn.addEventListener('click', () => this.analyzeOdds());
        if (resetBtn) resetBtn.addEventListener('click', () => this.resetForm());
    }

    // Get all form data
    getFormData() {
        return {
            league: document.getElementById('leagueSelect').value,
            homeTeam: document.getElementById('homeTeam').value,
            awayTeam: document.getElementById('awayTeam').value,
            scores: {
                homeQ1: parseInt(document.getElementById('homeQ1').value) || 0,
                awayQ1: parseInt(document.getElementById('awayQ1').value) || 0,
                homeQ2: parseInt(document.getElementById('homeQ2').value) || 0,
                awayQ2: parseInt(document.getElementById('awayQ2').value) || 0
            },
            shooting: {
                home3pt: parseInt(document.getElementById('home3pt').value) || 0,
                home2pt: parseInt(document.getElementById('home2pt').value) || 0,
                homeFt: parseInt(document.getElementById('homeFt').value) || 0,
                away3pt: parseInt(document.getElementById('away3pt').value) || 0,
                away2pt: parseInt(document.getElementById('away2pt').value) || 0,
                awayFt: parseInt(document.getElementById('awayFt').value) || 0
            },
            odds: {
                line1: parseFloat(document.getElementById('line1').value) || null,
                over1: parseFloat(document.getElementById('over1').value) || null,
                under1: parseFloat(document.getElementById('under1').value) || null,
                line2: parseFloat(document.getElementById('line2').value) || null,
                over2: parseFloat(document.getElementById('over2').value) || null,
                under2: parseFloat(document.getElementById('under2').value) || null,
                shLine: parseFloat(document.getElementById('sh_line').value) || null,
                shOver: parseFloat(document.getElementById('sh_over').value) || null,
                shUnder: parseFloat(document.getElementById('sh_under').value) || null
            }
        };
    }

    // Calculate gap between over/under odds
    calculateOddsGap(over, under) {
        if (!over || !under) return null;
        return Math.abs(over - under);
    }

    // Analyze the odds and generate prediction
    analyzeOdds() {
        const data = this.getFormData();

        // Validation
        if (!data.league) {
            alert('Please select a league');
            return;
        }

        if (!data.homeTeam || !data.awayTeam) {
            alert('Please enter both home and away team names');
            return;
        }

        if (!data.odds.line1 || !data.odds.over1 || !data.odds.under1) {
            alert('Please enter at least one complete odds line');
            return;
        }

        // Calculate analysis
        const results = this.performAnalysis(data);

        // Display results
        this.displayResults(results);
    }

    // Core analysis algorithm
    performAnalysis(data) {
        const results = {
            timestamp: new Date().toLocaleString(),
            game: `${data.homeTeam} vs ${data.awayTeam}`,
            league: data.league,
            halftime: {
                home: data.scores.homeQ1 + data.scores.homeQ2,
                away: data.scores.awayQ1 + data.scores.awayQ2
            },
            odds: [],
            signals: [],
            prediction: null
        };

        // Analyze each odds line
        if (data.odds.line1 && data.odds.over1 && data.odds.under1) {
            const gap1 = this.calculateOddsGap(data.odds.over1, data.odds.under1);
            results.odds.push({
                line: data.odds.line1,
                over: data.odds.over1,
                under: data.odds.under1,
                gap: gap1,
                signal: this.getSignal(gap1)
            });
        }

        if (data.odds.line2 && data.odds.over2 && data.odds.under2) {
            const gap2 = this.calculateOddsGap(data.odds.over2, data.odds.under2);
            results.odds.push({
                line: data.odds.line2,
                over: data.odds.over2,
                under: data.odds.under2,
                gap: gap2,
                signal: this.getSignal(gap2)
            });
        }

        if (data.odds.shLine && data.odds.shOver && data.odds.shUnder) {
            const gapSH = this.calculateOddsGap(data.odds.shOver, data.odds.shUnder);
            results.odds.push({
                line: `2H: ${data.odds.shLine}`,
                over: data.odds.shOver,
                under: data.odds.shUnder,
                gap: gapSH,
                signal: this.getSignal(gapSH),
                strongest: true
            });
        }

        // Generate signals
        results.signals = this.generateSignals(data, results);

        // Make prediction
        results.prediction = this.makePrediction(results);

        return results;
    }

    // Determine signal strength based on gap
    getSignal(gap) {
        if (!gap) return 'N/A';
        if (gap <= 0.05) return 'STRONG - Minimal Gap';
        if (gap <= 0.10) return 'GOOD - Small Gap';
        if (gap <= 0.15) return 'MODERATE - Medium Gap';
        return 'WEAK - Large Gap';
    }

    // Generate analysis signals
    generateSignals(data, results) {
        const signals = [];

        // Scoring trend signal
        const halfH = data.scores.homeQ1 + data.scores.homeQ2;
        const halfA = data.scores.awayQ1 + data.scores.awayQ2;
        const totalHalf = halfH + halfA;
        signals.push(`Halftime Total: ${totalHalf} points`);

        // Shooting efficiency signal
        const homeShootingAvg = (data.shooting.home3pt + data.shooting.home2pt + data.shooting.homeFt) / 3;
        const awayShootingAvg = (data.shooting.away3pt + data.shooting.away2pt + data.shooting.awayFt) / 3;
        if (homeShootingAvg > awayShootingAvg) {
            signals.push(`Home Team Shooting Advantage: ${homeShootingAvg.toFixed(1)}%`);
        } else {
            signals.push(`Away Team Shooting Advantage: ${awayShootingAvg.toFixed(1)}%`);
        }

        // Odds gap signal (true line)
        const bestGap = Math.min(...results.odds.map(o => o.gap || 999));
        signals.push(`Best Odds Gap (True Line): ${bestGap.toFixed(4)}`);

        return signals;
    }

    // Generate final prediction
    makePrediction(results) {
        const avgGap = results.odds.length > 0
            ? results.odds.reduce((sum, o) => sum + (o.gap || 0), 0) / results.odds.length
            : 0;

        let confidence = 'MODERATE';
        let recommendation = 'ANALYZE MORE DATA';

        if (avgGap <= 0.05) {
            confidence = 'HIGH';
            recommendation = 'STRONG TRUE LINE IDENTIFIED';
        } else if (avgGap <= 0.10) {
            confidence = 'HIGH';
            recommendation = 'GOOD OPPORTUNITY';
        } else if (avgGap <= 0.15) {
            confidence = 'MODERATE';
            recommendation = 'ACCEPTABLE SIGNAL';
        }

        return {
            confidence,
            recommendation,
            avgGap: avgGap.toFixed(4)
        };
    }

    // Display results
    displayResults(results) {
        const resultsSection = document.getElementById('resultsSection');
        const resultsContent = document.getElementById('resultsContent');

        let html = `
            <div class="results-summary">
                <div class="result-item">
                    <strong>Game:</strong> ${results.game}
                </div>
                <div class="result-item">
                    <strong>League:</strong> ${results.league.toUpperCase()}
                </div>
                <div class="result-item">
                    <strong>Halftime Score:</strong> ${results.halftime.home} - ${results.halftime.away}
                </div>
            </div>

            <div class="odds-analysis">
                <h4>Odds Analysis (True Line Detection)</h4>
                <table class="odds-table">
                    <thead>
                        <tr>
                            <th>LINE</th>
                            <th>OVER</th>
                            <th>UNDER</th>
                            <th>GAP</th>
                            <th>SIGNAL</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        results.odds.forEach(odd => {
            html += `
                <tr ${odd.strongest ? 'class="strongest"' : ''}>
                    <td>${odd.line}</td>
                    <td><span class="over-badge">${odd.over.toFixed(2)}</span></td>
                    <td><span class="under-badge">${odd.under.toFixed(2)}</span></td>
                    <td><strong>${odd.gap.toFixed(4)}</strong></td>
                    <td>${odd.signal}</td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>

            <div class="signals-section">
                <h4>Analysis Signals</h4>
                <ul class="signals-list">
        `;

        results.signals.forEach(signal => {
            html += `<li>✓ ${signal}</li>`;
        });

        html += `
                </ul>
            </div>

            <div class="prediction-section">
                <h4>Prediction</h4>
                <div class="prediction-box">
                    <div class="pred-item">
                        <span class="pred-label">Confidence:</span>
                        <span class="pred-value ${results.prediction.confidence.toLowerCase()}">${results.prediction.confidence}</span>
                    </div>
                    <div class="pred-item">
                        <span class="pred-label">Recommendation:</span>
                        <span class="pred-value strong">${results.prediction.recommendation}</span>
                    </div>
                    <div class="pred-item">
                        <span class="pred-label">Average Gap (True Line Quality):</span>
                        <span class="pred-value strong">${results.prediction.avgGap}</span>
                    </div>
                </div>
            </div>
        `;

        resultsContent.innerHTML = html;
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Reset form
    resetForm() {
        document.getElementById('leagueSelect').value = '';
        document.getElementById('homeTeam').value = '';
        document.getElementById('awayTeam').value = '';

        // Reset scores
        ['homeQ1', 'awayQ1', 'homeQ2', 'awayQ2'].forEach(id => {
            document.getElementById(id).value = '0';
        });

        // Reset shooting stats to defaults
        document.getElementById('home3pt').value = '35';
        document.getElementById('home2pt').value = '50';
        document.getElementById('homeFt').value = '75';
        document.getElementById('away3pt').value = '35';
        document.getElementById('away2pt').value = '50';
        document.getElementById('awayFt').value = '75';

        // Reset odds
        ['line1', 'over1', 'under1', 'line2', 'over2', 'under2', 'sh_line', 'sh_over', 'sh_under']
            .forEach(id => document.getElementById(id).value = '');

        document.getElementById('over1').value = '1.85';
        document.getElementById('under1').value = '1.90';
        document.getElementById('sh_over').value = '1.85';
        document.getElementById('sh_under').value = '1.90';

        // Hide results
        document.getElementById('resultsSection').style.display = 'none';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    new TrueLineKingAnalyzer();
    console.log('TrueLineKing Dashboard Initialized');
});
