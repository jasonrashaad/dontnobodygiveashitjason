// /src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function getRandomChar() {
  return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
}

function generateGrid(rows: number, cols: number): string[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => getRandomChar())
  );
}

function createMessageMask(rows: number, cols: number, message: string): [number, number][] {
  const midRow = Math.floor(rows / 2);
  const startCol = Math.floor((cols - message.length) / 2);
  return message.split('').map((_, i) => [midRow, startCol + i]);
}

export default function PlaceholderPage() {
  const rows = 20;
  const cols = 50;

  const [grid, setGrid] = useState<string[][]>([]);
  const [message, setMessage] = useState<string>('');
  const [mask, setMask] = useState<[number, number][]>([]);
  const [revealed, setRevealed] = useState<boolean[][]>([]);

  useEffect(() => {
    const initialGrid = generateGrid(rows, cols);
    setGrid(initialGrid);
    setRevealed(Array.from({ length: rows }, () => Array(cols).fill(false)));

    fetch('/message.txt')
      .then((res) => res.text())
      .then((text) => {
        const msg = text.trim().toUpperCase();
        setMessage(msg);
        setMask(createMessageMask(rows, cols, msg));
      })
      .catch(() => {
        const fallback = 'TRUST NO ONE';
        setMessage(fallback);
        setMask(createMessageMask(rows, cols, fallback));
      });
  }, []);

  useEffect(() => {
    const revealInterval = setInterval(() => {
      setRevealed((prev) => {
        return prev.map((row, r) =>
          row.map((rev, c) => {
            const isMsgChar = mask.some(([mr, mc]) => mr === r && mc === c);
            if (isMsgChar) return true;
            return rev || Math.random() < 0.05;
          })
        );
      });
    }, 100);

    return () => clearInterval(revealInterval);
  }, [mask]);

  const displayGrid = grid.map((row, r) =>
    row.map((char, c) => {
      const isMsgChar = mask.some(([mr, mc]) => mr === r && mc === c);
      if (isMsgChar) {
        const msgIndex = mask.findIndex(([mr, mc]) => mr === r && mc === c);
        return message[msgIndex];
      }
      return revealed[r]?.[c] ? '' : char;
    })
  );

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col items-center justify-center p-4">
      <div className="grid grid-cols-[repeat(50,minmax(0,1fr))] gap-0.5">
        {displayGrid.flat().map((char, i) => (
          <span key={i} className="text-xs opacity-80">
            {char || ' '}
          </span>
        ))}
      </div>
      <div className="mt-10 text-center">
        <h1 className="text-lg text-white font-semibold mb-2">
          dontnobodygiveashitjason.org
        </h1>
        <p className="text-sm text-gray-400 italic">Idle System. Awaiting Signal…</p>
      </div>
    </div>
  );
}