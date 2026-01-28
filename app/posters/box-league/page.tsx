'use client';

import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { useState, useEffect } from 'react';
import './print.css';

type Player = {
  name: string;
};

type Result = {
  player1: string;
  player2: string;
  score1Set1: string;
  score2Set1: string;
  score1Set2: string;
  score2Set2: string;
  score1Set3: string;
  score2Set3: string;
};

type Match = {
  player1: string;
  player2: string;
  date: string;
};

type GroupData = {
  players: Player[];
  results: Result[];
  matches: Match[];
};

type BoxLeagueData = {
  group1: GroupData;
  group2: GroupData;
  group3: GroupData;
  ltaUrl: string;
};

const defaultData: BoxLeagueData = {
  group1: {
    players: [
      { name: 'Will Alkin' },
      { name: 'Alex Goodworth' },
      { name: 'AA AA' },
      { name: 'Pete Snow' },
      { name: 'Edou Mota' },
    ],
    results: [
      { player1: '', player2: '', score1Set1: '', score2Set1: '', score1Set2: '', score2Set2: '', score1Set3: '', score2Set3: '' },
      { player1: '', player2: '', score1Set1: '', score2Set1: '', score1Set2: '', score2Set2: '', score1Set3: '', score2Set3: '' },
      { player1: '', player2: '', score1Set1: '', score2Set1: '', score1Set2: '', score2Set2: '', score1Set3: '', score2Set3: '' },
      { player1: '', player2: '', score1Set1: '', score2Set1: '', score1Set2: '', score2Set2: '', score1Set3: '', score2Set3: '' },
    ],
    matches: [
      { player1: '', player2: '', date: '' },
      { player1: '', player2: '', date: '' },
      { player1: '', player2: '', date: '' },
      { player1: '', player2: '', date: '' },
      { player1: '', player2: '', date: '' },
    ],
  },
  group2: {
    players: [
      { name: 'Steven Mooney' },
      { name: 'Adam Hughes' },
      { name: 'Ian Lloyd' },
      { name: 'Amanda Payne-Cook' },
      { name: 'Max De Lucia' },
    ],
    results: [
      { player1: '', player2: '', score1Set1: '', score2Set1: '', score1Set2: '', score2Set2: '', score1Set3: '', score2Set3: '' },
      { player1: '', player2: '', score1Set1: '', score2Set1: '', score1Set2: '', score2Set2: '', score1Set3: '', score2Set3: '' },
      { player1: '', player2: '', score1Set1: '', score2Set1: '', score1Set2: '', score2Set2: '', score1Set3: '', score2Set3: '' },
      { player1: '', player2: '', score1Set1: '', score2Set1: '', score1Set2: '', score2Set2: '', score1Set3: '', score2Set3: '' },
    ],
    matches: [
      { player1: '', player2: '', date: '' },
      { player1: '', player2: '', date: '' },
      { player1: '', player2: '', date: '' },
      { player1: '', player2: '', date: '' },
      { player1: '', player2: '', date: '' },
    ],
  },
  group3: {
    players: [
      { name: 'Rob Fox' },
      { name: 'Lucy Harford' },
      { name: 'Russell Wheldon' },
      { name: 'Paul Lyons' },
      { name: 'Philip Bishop' },
    ],
    results: [
      { player1: '', player2: '', score1Set1: '', score2Set1: '', score1Set2: '', score2Set2: '', score1Set3: '', score2Set3: '' },
      { player1: '', player2: '', score1Set1: '', score2Set1: '', score1Set2: '', score2Set2: '', score1Set3: '', score2Set3: '' },
      { player1: '', player2: '', score1Set1: '', score2Set1: '', score1Set2: '', score2Set2: '', score1Set3: '', score2Set3: '' },
      { player1: '', player2: '', score1Set1: '', score2Set1: '', score1Set2: '', score2Set2: '', score1Set3: '', score2Set3: '' },
    ],
    matches: [
      { player1: '', player2: '', date: '' },
      { player1: '', player2: '', date: '' },
      { player1: '', player2: '', date: '' },
      { player1: '', player2: '', date: '' },
      { player1: '', player2: '', date: '' },
    ],
  },
  ltaUrl: 'https://competitions.lta.org.uk/box-ladder/07fa2622-1b67-4e5e-a4a8-a7a626b4e090/event/1/round/24',
};

export default function BoxLeaguePage() {
  const [data, setData] = useState<BoxLeagueData>(defaultData);
  const [selectedGroup, setSelectedGroup] = useState<'group1' | 'group2' | 'group3'>('group1');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Helper function to format player name with bold surname
  const formatPlayerName = (name: string) => {
    if (!name) return null;
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return <span className="font-bold">{name}</span>;
    }
    const firstName = parts.slice(0, -1).join(' ');
    const surname = parts[parts.length - 1];
    return (
      <>
        {firstName} <span className="font-bold">{surname}</span>
      </>
    );
  };

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('tennis-poster-box-league');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Validate data structure - ensure all groups exist
        if (parsed.group1 && parsed.group2 && parsed.group3) {
          setData(parsed);
        } else {
          // Invalid data, use defaults
          console.warn('Invalid saved data structure, using defaults');
        }
      } catch (e) {
        console.error('Failed to load saved data', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('tennis-poster-box-league', JSON.stringify(data));
    }
  }, [data, isLoaded]);

  const updateGroupData = (group: 'group1' | 'group2' | 'group3', field: keyof GroupData, value: any) => {
    setData({ ...data, [group]: { ...data[group], [field]: value } });
  };

  const addPlayer = (group: 'group1' | 'group2' | 'group3') => {
    const newPlayers = [...data[group].players, { name: '' }];
    updateGroupData(group, 'players', newPlayers);
  };

  const removePlayer = (group: 'group1' | 'group2' | 'group3', index: number) => {
    const newPlayers = data[group].players.filter((_, i) => i !== index);
    updateGroupData(group, 'players', newPlayers);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const currentGroup = data[selectedGroup];

  return (
    <>
      {/* Control Bar - Hidden when printing */}
      <div className="no-print bg-primary-deep-green text-white p-4 shadow-lg mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold font-montserrat">Box League Poster</h1>
            <p className="text-sm text-gray-200">Edit player names, then print for handwritten scores</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-2 bg-white text-primary-deep-green font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isEditing ? 'Preview Poster' : 'Edit Names'}
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-2 bg-semantic-tournament text-gray-900 font-semibold rounded-lg hover:bg-yellow-300 transition-colors"
            >
              Print Poster
            </button>
          </div>
        </div>
      </div>

      {/* Editing Form */}
      {isEditing && (
        <div className="no-print container mx-auto px-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Group Tabs */}
            <div className="flex gap-2 mb-6 border-b">
              {(['group1', 'group2', 'group3'] as const).map((group, idx) => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`px-6 py-3 font-semibold transition-colors ${
                    selectedGroup === group
                      ? 'border-b-2 border-primary-deep-green text-primary-deep-green'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Group {idx + 1}
                </button>
              ))}
            </div>

            {/* Player Names */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold">Players in Group {selectedGroup.slice(-1)}</h3>
                <button
                  onClick={() => addPlayer(selectedGroup)}
                  className="px-4 py-2 bg-primary-deep-green text-white rounded-lg hover:bg-primary-forest transition-colors"
                >
                  + Add Player
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {currentGroup.players.map((player, idx) => (
                  <div key={idx} className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold mb-1">Player {idx + 1}</label>
                      <input
                        type="text"
                        value={player.name}
                        onChange={(e) => {
                          const newPlayers = [...currentGroup.players];
                          newPlayers[idx].name = e.target.value;
                          updateGroupData(selectedGroup, 'players', newPlayers);
                        }}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Enter player name"
                      />
                    </div>
                    {currentGroup.players.length > 2 && (
                      <button
                        onClick={() => removePlayer(selectedGroup, idx)}
                        className="mt-7 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* LTA URL */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">LTA Box League URL</label>
              <input
                type="text"
                value={data.ltaUrl}
                onChange={(e) => setData({ ...data, ltaUrl: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="https://competitions.lta.org.uk/..."
              />
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Tip:</strong> Enter player names for all groups, then print. Scores and dates are left blank for handwriting.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Poster - Print View */}
      <div className={isEditing ? 'no-print' : 'print:block poster-container'}>
        <div className="w-[297mm] h-[210mm] mx-auto relative overflow-hidden bg-white">
          {/* Tennis Court Background */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 297 210" preserveAspectRatio="xMidYMid slice">
            <rect x="0" y="0" width="297" height="210" fill="#2D8B5E" />
            <rect x="20" y="15" width="257" height="180" fill="none" stroke="white" strokeWidth="3" />
            <line x1="45" y1="15" x2="45" y2="195" stroke="white" strokeWidth="2.5" />
            <line x1="252" y1="15" x2="252" y2="195" stroke="white" strokeWidth="2.5" />
            <line x1="45" y1="75" x2="252" y2="75" stroke="white" strokeWidth="2.5" />
            <line x1="45" y1="135" x2="252" y2="135" stroke="white" strokeWidth="2.5" />
            <line x1="148.5" y1="75" x2="148.5" y2="135" stroke="white" strokeWidth="2.5" />
            <line x1="148.5" y1="15" x2="148.5" y2="25" stroke="white" strokeWidth="2.5" />
            <line x1="148.5" y1="185" x2="148.5" y2="195" stroke="white" strokeWidth="2.5" />
            <line x1="20" y1="105" x2="277" y2="105" stroke="white" strokeWidth="1.5" opacity="0.5" />
          </svg>

          {/* Dark Overlay */}
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }} />

          {/* Main Content */}
          <div className="relative z-10 h-full flex flex-col p-[15mm]">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="relative flex items-center justify-center">
                <div className="absolute rounded-full" style={{ width: '76px', height: '76px', backgroundColor: 'white', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }} />
                <Image src="/assets/marden-logo.png" alt="Marden Tennis Club" width={70} height={70} className="relative z-10 rounded-full" style={{ background: 'transparent' }} />
              </div>

              <div className="flex-1 text-center px-6 relative">
                <h1 className="text-5xl font-black uppercase tracking-tight leading-none" style={{ color: 'white', fontFamily: 'var(--font-montserrat)', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                  Box League
                </h1>
                <p className="text-lg mt-1 font-semibold" style={{ color: '#D0E04D', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  Results & Upcoming Matches
                </p>

                {/* Tennis Ball Bounce - Coming from "E" in Box League */}
                <svg className="absolute left-[calc(50%+180px)] top-0 w-28 h-20" viewBox="0 0 110 80" style={{ opacity: 0.9 }}>
                  {/* Trajectory line coming from text */}
                  <path
                    d="M 5 12 Q 22 24, 35 58"
                    stroke="white"
                    strokeWidth="3.5"
                    strokeDasharray="5,7"
                    fill="none"
                    opacity="0.85"
                  />

                  {/* Bounce mark at impact */}
                  <ellipse cx="35" cy="60" rx="8" ry="2.5" fill="rgba(255,255,255,0.4)" />

                  {/* Trajectory line bouncing up */}
                  <path
                    d="M 35 58 Q 52 42, 72 26"
                    stroke="white"
                    strokeWidth="3.5"
                    strokeDasharray="5,7"
                    fill="none"
                    opacity="0.85"
                  />

                  {/* Tennis Ball */}
                  <g transform="translate(72, 26)">
                    {/* Ball shadow */}
                    <circle cx="1.5" cy="1.5" r="14" fill="rgba(0,0,0,0.3)" />
                    {/* Ball base */}
                    <circle cx="0" cy="0" r="14" fill="#D0E04D" />
                    {/* Ball highlight */}
                    <circle cx="-3" cy="-3" r="5" fill="rgba(255,255,255,0.4)" />
                    {/* Tennis ball curved seam line 1 */}
                    <path
                      d="M -10 -5 Q -7 0, -10 5"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.9"
                    />
                    {/* Tennis ball curved seam line 2 */}
                    <path
                      d="M 10 -5 Q 7 0, 10 5"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.9"
                    />
                  </g>
                </svg>
              </div>

              <div className="w-[70px]" />
            </div>

            {/* Three Groups Grid */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {(['group1', 'group2', 'group3'] as const).map((groupKey, groupIdx) => {
                const group = data[groupKey];
                if (!group) return null;

                return (
                  <div key={groupKey} className="bg-white rounded-lg p-3" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
                    <h2 className="text-lg font-black uppercase mb-2 text-center" style={{ color: '#2D4A3E', fontFamily: 'var(--font-montserrat)' }}>
                      Group {groupIdx + 1}
                    </h2>

                    {/* Players */}
                    <div className="mb-2">
                      <p className="text-xs font-bold mb-1" style={{ color: '#2D4A3E' }}>Players:</p>
                      {group.players?.map((player, idx) => (
                        <div key={idx} className="text-xs py-0.5" style={{ color: '#2D4A3E' }}>
                          {player.name ? formatPlayerName(player.name) : `Player ${idx + 1}`}
                        </div>
                      ))}
                    </div>

                    {/* Results */}
                    <div className="mb-2">
                      <p className="text-xs font-bold mb-1" style={{ color: '#2D4A3E' }}>Latest Results:</p>
                      <div className="space-y-0.5">
                        {group.results?.slice(0, 3).map((_, idx) => (
                          <div key={idx} className="text-xs">
                            <div className="grid grid-cols-7 gap-0.5 items-center">
                              <div className="col-span-2 border-b border-dotted border-gray-400 h-4"></div>
                              <div className="flex gap-0.5 col-span-3 justify-center">
                                {/* Each set box divided vertically for player 1 (left) and player 2 (right) scores */}
                                <div className="w-9 h-5 border border-gray-400 rounded flex items-center justify-center relative">
                                  <div className="absolute h-3 w-px bg-gray-400" style={{ left: '50%', transform: 'translateX(-50%)' }}></div>
                                </div>
                                <div className="w-9 h-5 border border-gray-400 rounded flex items-center justify-center relative">
                                  <div className="absolute h-3 w-px bg-gray-400" style={{ left: '50%', transform: 'translateX(-50%)' }}></div>
                                </div>
                                <div className="w-9 h-5 border border-gray-400 rounded flex items-center justify-center relative">
                                  <div className="absolute h-3 w-px bg-gray-400" style={{ left: '50%', transform: 'translateX(-50%)' }}></div>
                                </div>
                              </div>
                              <div className="col-span-2 border-b border-dotted border-gray-400 h-4"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Upcoming */}
                    <div className="mb-2">
                      <p className="text-xs font-bold mb-1" style={{ color: '#2D4A3E' }}>Upcoming:</p>
                      <div className="space-y-0.5">
                        {group.matches?.slice(0, 4).map((_, idx) => (
                          <div key={idx} className="text-xs">
                            <div className="grid grid-cols-5 gap-1 items-center">
                              <div className="col-span-2 border-b border-dotted border-gray-400 h-3"></div>
                              <div className="text-center text-xs font-bold text-gray-500">vs</div>
                              <div className="col-span-2 border-b border-dotted border-gray-400 h-3"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* What is Box League + Why Join + Who Can Join - Bottom Info Panel */}
            <div className="mt-4">
              <div className="bg-white bg-opacity-95 rounded-lg p-4" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                <div className="grid grid-cols-3 gap-4">
                  {/* What is the Box League */}
                  <div>
                    <h3 className="text-xs font-black uppercase mb-1" style={{ color: '#2D4A3E', fontFamily: 'var(--font-montserrat)' }}>
                      What is the Box League?
                    </h3>
                    <p className="text-xs leading-tight" style={{ color: '#2D4A3E' }}>
                      A flexible singles league where you play others at a similar level. Arrange matches at times that suit you and move up or down boxes based on results.
                    </p>
                  </div>

                  {/* Why Join */}
                  <div>
                    <h3 className="text-xs font-black uppercase mb-1" style={{ color: '#2D4A3E', fontFamily: 'var(--font-montserrat)' }}>
                      Why Join?
                    </h3>
                    <div className="space-y-0.5 text-xs" style={{ color: '#2D4A3E' }}>
                      <div className="flex items-center gap-1">
                        <span>🎾</span>
                        <span className="text-xs">Competitive but friendly</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>🤝</span>
                        <span className="text-xs">Meet club members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>📅</span>
                        <span className="text-xs">Play at your times</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>📈</span>
                        <span className="text-xs">Move up based on results</span>
                      </div>
                    </div>
                  </div>

                  {/* Who Can Join */}
                  <div>
                    <h3 className="text-xs font-black uppercase mb-1" style={{ color: '#2D4A3E', fontFamily: 'var(--font-montserrat)' }}>
                      Who Can Join?
                    </h3>
                    <div className="text-xs space-y-0.5" style={{ color: '#2D4A3E' }}>
                      <div className="flex items-center gap-1">
                        <span style={{ color: '#D0E04D' }}>●</span>
                        <span>Men&apos;s Singles</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span style={{ color: '#D0E04D' }}>●</span>
                        <span>Women&apos;s Singles</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span style={{ color: '#D0E04D' }}>●</span>
                        <span>Mixed/Combi (coming soon)</span>
                      </div>
                      <p className="mt-1 text-xs italic" style={{ color: '#2D4A3E', opacity: 0.8 }}>
                        New players welcome — boxes are based on level
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-2" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                <QRCodeSVG value={data.ltaUrl} size={50} level="H" />
                <div>
                  <p className="text-xs font-bold" style={{ color: '#2D4A3E' }}>Scan to view the</p>
                  <p className="text-xs font-bold" style={{ color: '#2D4A3E' }}>latest tables & fixtures</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-lg font-black uppercase tracking-widest" style={{ color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  All Levels Welcome
                </p>
              </div>

              <div className="px-4 py-2 rounded-lg bg-white" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                <p className="text-xs font-bold" style={{ color: '#2D4A3E' }}>To join, email:</p>
                <p className="text-xs font-bold" style={{ color: '#2D4A3E' }}>tennis@mardensportsclub.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
