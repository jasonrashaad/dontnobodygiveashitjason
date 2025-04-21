// /src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThreadsEmbed from './components/ThreadsEmbed';

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

export default function Home() {
  const rows = 20;
  const cols = 50;

  const [grid, setGrid] = useState<string[][]>([]);
  const [message, setMessage] = useState<string>('');
  const [mask, setMask] = useState<[number, number][]>([]);
  const [revealed, setRevealed] = useState<boolean[][]>([]);
  const [hitCount, setHitCount] = useState<number | null>(null);

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

    fetch('/api/counter')
      .then((res) => res.json())
      .then((data) => setHitCount(data.count));
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
    <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <AnimatePresence>
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      <div className="grid grid-cols-[repeat(50,minmax(0,1fr))] gap-0.5">
        {displayGrid.flat().map((char, i) => (
          <motion.span
            key={i}
            className="text-xs opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.001, duration: 0.3 }}
          >
            {char || ' '}
          </motion.span>
        ))}
      </div>

      <div className="mt-10 text-center">
        <h1 className="text-lg text-white font-semibold mb-2">
          dontnobodygiveashitjason.org
        </h1>
        <p className="text-sm text-gray-400 italic mb-2">Idle System. Awaiting Signal…</p>
        {hitCount !== null && (
          <p className="text-base text-green-400">
            {hitCount.toLocaleString()} humans have glimpsed the void
          </p>
        )}
      </div>

      <ThreadsEmbed />
    </div>
  );
}