import React, { useState, useEffect } from 'react';
import Square from './Square';
import './Grid.css';

const ROWS = 15;
const COLS = 20;

const Grid = () => {
  const [grid, setGrid] = useState([]);
  const [waveIndex, setWaveIndex] = useState(0);
  const [isMovingForward, setIsMovingForward] = useState(true);
  const [waveColor, setWaveColor] = useState('rgb(0, 255, 0)'); // main wave color

  // Initialize the grid once when the component mounts
  useEffect(() => {
    const initialGrid = Array(ROWS)
      .fill(null)
      .map(() => Array(COLS).fill('gray'));
    setGrid(initialGrid);
  }, []);

  // Effect to change the color every 5 seconds
  useEffect(() => {
    const changeColorInterval = setInterval(() => {
      const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setWaveColor(randomColor);
    }, 5000);

    return () => clearInterval(changeColorInterval);
  }, []);

  // Effect to handle the bouncing wave animation
  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      const newGrid = Array(ROWS)
        .fill(null)
        .map(() => Array(COLS).fill('gray'));

      for (let i = 0; i < ROWS; i++) {
        // center column (strong)
        newGrid[i][waveIndex] = waveColor;

        // faded neighbors (lighter color)
        if (waveIndex - 1 >= 0) {
          newGrid[i][waveIndex - 1] = 'rgba(0,0,0,0.3)'; // faded shade
        }
        if (waveIndex + 1 < COLS) {
          newGrid[i][waveIndex + 1] = 'rgba(0,0,0,0.3)'; // faded shade
        }
      }

      setGrid(newGrid);

      // bouncing logic
      if (isMovingForward) {
        if (waveIndex < COLS - 1) {
          setWaveIndex((prev) => prev + 1);
        } else {
          setIsMovingForward(false);
          setWaveIndex((prev) => prev - 1);
        }
      } else {
        if (waveIndex > 0) {
          setWaveIndex((prev) => prev - 1);
        } else {
          setIsMovingForward(true);
          setWaveIndex((prev) => prev + 1);
        }
      }
    }, 100);

    return () => clearTimeout(animationTimeout);
  }, [waveIndex, isMovingForward, waveColor]);

  return (
    <div className="grid-container">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((color, colIndex) => (
            <Square key={`${rowIndex}-${colIndex}`} color={color} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
