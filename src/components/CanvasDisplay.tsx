import React, { useRef, useEffect, useState } from 'react';

interface CanvasDisplayProps {
    numbers: number[];
}

const CanvasDisplay: React.FC<CanvasDisplayProps> = ({ numbers }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const blockSize = 50;
    const padding = 20;
    const [totalWater, setTotalWater] = useState(0);
    const gap = 5;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const canvasWidth = numbers.length * blockSize + 2 * padding;
        const maxNumber = Math.max(...numbers, 0);
        const canvasHeight = maxNumber * (blockSize + gap) + 2 * padding;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        const calculateWater = (heights: number[]): number[] => {
            const n = heights.length;
            const waterLevels = new Array(n).fill(0);
            if (n === 0) return waterLevels;

            let leftMax = new Array(n).fill(0);
            let rightMax = new Array(n).fill(0);

            leftMax[0] = heights[0];
            for (let i = 1; i < n; i++) {
                leftMax[i] = Math.max(heights[i], leftMax[i - 1]);
            }

            rightMax[n - 1] = heights[n - 1];
            for (let i = n - 2; i >= 0; i--) {
                rightMax[i] = Math.max(heights[i], rightMax[i + 1]);
            }

            for (let i = 0; i < n; i++) {
                const minBoundary = Math.min(leftMax[i], rightMax[i]);
                waterLevels[i] = Math.max(0, minBoundary - heights[i]);
            }

            return waterLevels;
        };

        for (let i = 0; i < numbers.length; i++) {
            const height = numbers[i];
            const x = i * blockSize + padding;

            for (let j = 0; j < height; j++) {
                const y = canvasHeight - (j + 1) * (blockSize + gap) - padding;

                ctx.fillStyle = '#ffffff';
                ctx.fillRect(x, y, blockSize, blockSize);

                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1;
                ctx.strokeRect(x, y, blockSize, blockSize);
            }
        }

        let water = calculateWater(numbers);
        let calculatedTotalWater = 0;
        for (let i = 0; i < numbers.length; i++) {
            const waterHeight = water[i];
            calculatedTotalWater += waterHeight;
            if (waterHeight > 0) {
                const x = i * blockSize + padding;
                const y = canvasHeight - (numbers[i] + waterHeight) * blockSize - padding - gap;

                ctx.fillStyle = '#4682B4';
                ctx.fillRect(x, y, blockSize, waterHeight * blockSize);
            }
        }
        setTotalWater(calculatedTotalWater);

        ctx.strokeStyle = 'black';
        ctx.strokeRect(0, 0, canvasWidth, canvasHeight);

    }, [numbers, blockSize, padding]);

    return (
        <div>
            <canvas ref={canvasRef} style={{ border: '1px solid black' }} />
            <p>Tổng lượng nước: {totalWater}m³</p>
        </div>
    );
};

export default CanvasDisplay;