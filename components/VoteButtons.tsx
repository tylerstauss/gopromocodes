'use client';

import { useState, useEffect } from 'react';

interface VoteButtonsProps {
  promoCodeId: number;
  initialUp?: number;
  initialDown?: number;
}

export default function VoteButtons({ promoCodeId, initialUp = 0, initialDown = 0 }: VoteButtonsProps) {
  const [upCount, setUpCount] = useState(initialUp);
  const [downCount, setDownCount] = useState(initialDown);
  const [userVote, setUserVote] = useState<1 | -1 | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`vote-${promoCodeId}`);
    if (stored === '1' || stored === '-1') {
      setUserVote(parseInt(stored, 10) as 1 | -1);
    }
  }, [promoCodeId]);

  const handleVote = async (vote: 1 | -1) => {
    if (loading) return;
    setLoading(true);

    const previousVote = userVote;
    const previousUp = upCount;
    const previousDown = downCount;

    // Optimistic update
    setUserVote(vote);
    if (previousVote === 1) setUpCount((c) => c - 1);
    if (previousVote === -1) setDownCount((c) => c - 1);
    if (vote === 1) setUpCount((c) => c + 1);
    if (vote === -1) setDownCount((c) => c + 1);

    try {
      const res = await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promoCodeId, vote }),
      });

      if (!res.ok) throw new Error('Vote failed');

      const data = await res.json();
      setUpCount(data.counts.up);
      setDownCount(data.counts.down);
      localStorage.setItem(`vote-${promoCodeId}`, String(vote));
    } catch {
      // Revert on error
      setUserVote(previousVote);
      setUpCount(previousUp);
      setDownCount(previousDown);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3 mt-2">
      <span className="text-xs text-gray-500">Did this code work?</span>
      <button
        onClick={() => handleVote(1)}
        disabled={loading}
        className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm transition-colors ${
          userVote === 1
            ? 'bg-green-100 text-green-700 border border-green-300'
            : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-green-50 hover:text-green-600'
        }`}
        aria-label="Thumbs up"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={userVote === 1 ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
        </svg>
        <span>{upCount}</span>
      </button>
      <button
        onClick={() => handleVote(-1)}
        disabled={loading}
        className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm transition-colors ${
          userVote === -1
            ? 'bg-red-100 text-red-700 border border-red-300'
            : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-red-50 hover:text-red-600'
        }`}
        aria-label="Thumbs down"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={userVote === -1 ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 2h3a2 2 0 012 2v7a2 2 0 01-2 2h-3" />
        </svg>
        <span>{downCount}</span>
      </button>
    </div>
  );
}
