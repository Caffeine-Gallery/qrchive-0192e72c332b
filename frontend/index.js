import { backend } from "declarations/backend";

class QRCode {
    constructor(text, width = 256, height = 256) {
        this.text = text;
        this.width = width;
        this.height = height;
    }

    // Generate QR Code data matrix
    generateMatrix() {
        // Simple QR Code generation (basic implementation)
        const size = 25; // 25x25 matrix
        const matrix = Array(size).fill().map(() => Array(size).fill(0));
        
        // Convert text to binary
        const binary = this.text.split('')
            .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
            .join('');

        // Fill matrix with data (simplified pattern)
        let idx = 0;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (idx < binary.length) {
                    matrix[i][j] = parseInt(binary[idx]);
                    idx++;
                }
            }
        }

        return matrix;
    }

    // Draw QR Code on canvas
    draw(canvas) {
        const ctx = canvas.getContext('2d');
        const matrix = this.generateMatrix();
        const cellSize = Math.floor(this.width / matrix.length);

        canvas.width = this.width;
        canvas.height = this.height;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#000000';
        matrix.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell === 1) {
                    ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
                }
            });
        });
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    const urlInput = document.getElementById('urlInput');
    const generateBtn = document.getElementById('generateBtn');
    const qrCanvas = document.getElementById('qrCanvas');
    const historyList = document.getElementById('historyList');

    // Load initial history
    await updateHistory();

    generateBtn.addEventListener('click', async () => {
        const url = urlInput.value.trim();
        if (url) {
            // Generate QR Code
            const qr = new QRCode(url);
            qr.draw(qrCanvas);

            // Save URL to backend
            await backend.addUrl(url);
            await updateHistory();

            // Clear input
            urlInput.value = '';
        }
    });

    async function updateHistory() {
        const history = await backend.getHistory();
        historyList.innerHTML = history.map(entry => `
            <div class="history-item">
                <a href="${entry.url}" class="url" target="_blank">${entry.url}</a>
                <span class="timestamp">${new Date(Number(entry.timestamp) / 1000000).toLocaleString()}</span>
            </div>
        `).join('');
    }
});
