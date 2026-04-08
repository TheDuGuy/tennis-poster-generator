'use client';

import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { useState, useEffect } from 'react';
import './print.css';

type MatchResult = {
  player1: string;
  player2: string;
  player1Score: string[];
  player2Score: string[];
  date: string;
  winner: 1 | 2;
};

type GroupData = {
  players: string[];
  results: MatchResult[];
};

type BoxLeagueData = {
  group1: GroupData;
  group2: GroupData;
  group3: GroupData;
  ltaUrl: string;
  round: string;
  dateRange: string;
};

type ComputedStanding = {
  name: string;
  played: number;
  wins: number;
  losses: number;
  points: number;
  history: string[];
  gamesWon: number;
  gamesLost: number;
};

// Derive standings from results — no manual entry needed
function computeStandings(players: string[], results: MatchResult[]): ComputedStanding[] {
  const map: Record<string, ComputedStanding> = {};
  for (const p of players) {
    map[p] = { name: p, played: 0, wins: 0, losses: 0, points: 0, history: [], gamesWon: 0, gamesLost: 0 };
  }

  for (const r of results) {
    const p1 = r.player1.trim();
    const p2 = r.player2.trim();

    let p1Games = 0, p2Games = 0;
    for (let i = 0; i < Math.max(r.player1Score.length, r.player2Score.length); i++) {
      const s1 = r.player1Score[i] !== '' ? parseInt(r.player1Score[i]) || 0 : 0;
      const s2 = r.player2Score[i] !== '' ? parseInt(r.player2Score[i]) || 0 : 0;
      if (r.player1Score[i] !== '' || r.player2Score[i] !== '') {
        p1Games += s1;
        p2Games += s2;
      }
    }

    if (map[p1] !== undefined) {
      map[p1].played++;
      map[p1].gamesWon += p1Games;
      map[p1].gamesLost += p2Games;
      if (r.winner === 1) { map[p1].wins++; map[p1].points++; map[p1].history.push('W'); }
      else { map[p1].losses++; map[p1].history.push('L'); }
    }
    if (map[p2] !== undefined) {
      map[p2].played++;
      map[p2].gamesWon += p2Games;
      map[p2].gamesLost += p1Games;
      if (r.winner === 2) { map[p2].wins++; map[p2].points++; map[p2].history.push('W'); }
      else { map[p2].losses++; map[p2].history.push('L'); }
    }
  }

  return players.map(p => map[p] ?? { name: p, played: 0, wins: 0, losses: 0, points: 0, history: [], gamesWon: 0, gamesLost: 0 });
}

// Sort: points desc → losses asc → wins desc → net games desc
function sortStandings(standings: ComputedStanding[]): ComputedStanding[] {
  return [...standings].sort((a, b) =>
    b.points - a.points ||
    a.losses - b.losses ||
    b.wins - a.wins ||
    (b.gamesWon - b.gamesLost) - (a.gamesWon - a.gamesLost)
  );
}

function getPositions(sorted: ComputedStanding[]): number[] {
  const positions: number[] = [];
  let pos = 1;
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0) {
      const prev = sorted[i - 1];
      const curr = sorted[i];
      const same =
        prev.points === curr.points &&
        prev.losses === curr.losses &&
        prev.wins === curr.wins &&
        (prev.gamesWon - prev.gamesLost) === (curr.gamesWon - curr.gamesLost);
      positions.push(same ? positions[i - 1] : pos);
    } else {
      positions.push(pos);
    }
    pos++;
  }
  return positions;
}

const defaultData: BoxLeagueData = {
  group1: {
    players: ['Edou Mota', 'Will Alkin', 'Alex Goodworth', 'AA AA', 'Adam Hughes', 'Pete Snow'],
    results: [
      { player1: 'Edou Mota', player2: 'Will Alkin', player1Score: ['7', '6'], player2Score: ['6', '4'], date: 'Wed 08/04/2026', winner: 1 },
      { player1: 'Will Alkin', player2: 'Alex Goodworth', player1Score: ['6', '2', '10'], player2Score: ['4', '6', '8'], date: 'Tue 07/04/2026', winner: 1 },
      { player1: 'Edou Mota', player2: 'Adam Hughes', player1Score: ['6', '6'], player2Score: ['1', '3'], date: 'Mon 06/04/2026', winner: 1 },
      { player1: 'Alex Goodworth', player2: 'Pete Snow', player1Score: ['6', '6'], player2Score: ['3', '3'], date: 'Fri 03/04/2026', winner: 1 },
      { player1: 'Alex Goodworth', player2: 'Edou Mota', player1Score: ['3', '3'], player2Score: ['6', '6'], date: 'Wed 01/04/2026', winner: 2 },
      { player1: 'Pete Snow', player2: 'Adam Hughes', player1Score: ['6', '7'], player2Score: ['4', '6'], date: 'Tue 24/03/2026', winner: 1 },
      { player1: 'Pete Snow', player2: 'Edou Mota', player1Score: ['0', '6', '3'], player2Score: ['6', '3', '10'], date: 'Sat 21/03/2026', winner: 2 },
      { player1: 'Will Alkin', player2: 'Pete Snow', player1Score: ['7', '5', '10'], player2Score: ['6', '7', '6'], date: 'Tue 10/03/2026', winner: 1 },
    ],
  },
  group2: {
    players: ['Rob Fox', 'Steven Mooney', 'Ian Lloyd', 'Max De Lucia', 'Amanda Payne-Cook', 'Philip Bishop'],
    results: [
      { player1: 'Steven Mooney', player2: 'Philip Bishop', player1Score: ['6', '6'], player2Score: ['3', '0'], date: 'Tue 07/04/2026', winner: 1 },
      { player1: 'Amanda Payne-Cook', player2: 'Rob Fox', player1Score: ['3', '4'], player2Score: ['6', '6'], date: 'Fri 27/03/2026', winner: 2 },
      { player1: 'Rob Fox', player2: 'Max De Lucia', player1Score: ['6', '5', '9'], player2Score: ['1', '7', '11'], date: 'Mon 23/03/2026', winner: 2 },
      { player1: 'Rob Fox', player2: 'Philip Bishop', player1Score: ['3', '6', '10'], player2Score: ['6', '3', '4'], date: 'Tue 10/03/2026', winner: 1 },
    ],
  },
  group3: {
    players: ['Ben Irving', 'Russell Wheldon', 'Paul Lyons', 'Jane Crane', 'Lucy Harford', 'mark gallagher', 'Dave Cale', 'Tracey CRAMPTON'],
    results: [
      { player1: 'Jane Crane', player2: 'Tracey CRAMPTON', player1Score: ['6', '5', '5'], player2Score: ['4', '7', '10'], date: 'Wed 08/04/2026', winner: 2 },
      { player1: 'mark gallagher', player2: 'Tracey CRAMPTON', player1Score: ['6', '6'], player2Score: ['1', '3'], date: 'Wed 08/04/2026', winner: 1 },
      { player1: 'Dave Cale', player2: 'mark gallagher', player1Score: ['6', '6'], player2Score: ['0', '1'], date: 'Sat 04/04/2026', winner: 1 },
      { player1: 'Russell Wheldon', player2: 'Lucy Harford', player1Score: ['6', '6'], player2Score: ['0', '1'], date: 'Tue 31/03/2026', winner: 1 },
      { player1: 'Lucy Harford', player2: 'Jane Crane', player1Score: ['6', '6'], player2Score: ['1', '0'], date: 'Tue 24/03/2026', winner: 1 },
      { player1: 'Ben Irving', player2: 'Dave Cale', player1Score: ['6', '6'], player2Score: ['4', '4'], date: 'Sat 07/03/2026', winner: 1 },
    ],
  },
  ltaUrl: 'https://competitions.lta.org.uk/box-ladder/07fa2622-1b67-4e5e-a4a8-a7a626b4e090/event/1/round/25',
  round: 'Round 25',
  dateRange: '2 Mar – 26 Apr',
};

export default function BoxLeaguePage() {
  const [data, setData] = useState<BoxLeagueData>(defaultData);
  const [selectedGroup, setSelectedGroup] = useState<'group1' | 'group2' | 'group3'>('group1');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('tennis-poster-box-league-v4');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.group1 && parsed.group2 && parsed.group3) {
          setData({ ...defaultData, ...parsed });
        }
      } catch (e) {
        console.error('Failed to load saved data', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('tennis-poster-box-league-v4', JSON.stringify(data));
    }
  }, [data, isLoaded]);

  const updateGroup = (group: 'group1' | 'group2' | 'group3', updated: GroupData) => {
    setData({ ...data, [group]: updated });
  };

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center"><div className="text-lg">Loading...</div></div>;
  }

  const currentGroup = data[selectedGroup];

  // ── Edit helpers ──────────────────────────────────────────────────────────
  const updatePlayerName = (idx: number, value: string) => {
    const next = [...currentGroup.players];
    next[idx] = value;
    updateGroup(selectedGroup, { ...currentGroup, players: next });
  };

  const addPlayer = () => {
    updateGroup(selectedGroup, { ...currentGroup, players: [...currentGroup.players, ''] });
  };

  const removePlayer = (idx: number) => {
    updateGroup(selectedGroup, { ...currentGroup, players: currentGroup.players.filter((_, i) => i !== idx) });
  };

  const updateResult = (idx: number, field: keyof MatchResult, value: any) => {
    const next = [...currentGroup.results];
    next[idx] = { ...next[idx], [field]: value };
    updateGroup(selectedGroup, { ...currentGroup, results: next });
  };

  const addResult = () => {
    updateGroup(selectedGroup, {
      ...currentGroup,
      results: [...currentGroup.results, { player1: '', player2: '', player1Score: ['', '', ''], player2Score: ['', '', ''], date: '', winner: 1 }],
    });
  };

  const removeResult = (idx: number) => {
    updateGroup(selectedGroup, { ...currentGroup, results: currentGroup.results.filter((_, i) => i !== idx) });
  };

  // ── Poster group card ─────────────────────────────────────────────────────
  const GroupCard = ({ groupKey, groupIdx }: { groupKey: 'group1' | 'group2' | 'group3'; groupIdx: number }) => {
    const group = data[groupKey];
    const standings = computeStandings(group.players, group.results);
    const sorted = sortStandings(standings);
    const positions = getPositions(sorted);

    return (
      <div className="bg-white rounded-lg p-2.5" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
        <h2 className="text-sm font-black uppercase mb-1.5 text-center" style={{ color: '#2D4A3E', fontFamily: 'var(--font-montserrat)' }}>
          Group {groupIdx + 1}
        </h2>

        {/* League Table */}
        <div className="mb-2">
          <div className="grid text-center mb-0.5" style={{ gridTemplateColumns: '14px 1fr 20px 20px 20px 24px' }}>
            <span className="text-[8px] font-bold text-gray-500">#</span>
            <span className="text-[8px] font-bold text-gray-500 text-left pl-1">PLAYER</span>
            <span className="text-[8px] font-bold text-gray-500">P</span>
            <span className="text-[8px] font-bold text-gray-500">W</span>
            <span className="text-[8px] font-bold text-gray-500">L</span>
            <span className="text-[8px] font-bold text-gray-500">PTS</span>
          </div>
          {sorted.map((s, idx) => {
            const pos = positions[idx];
            const isTop = pos === 1;
            return (
              <div
                key={idx}
                className="grid items-center py-0.5 rounded-sm"
                style={{
                  gridTemplateColumns: '14px 1fr 20px 20px 20px 24px',
                  backgroundColor: isTop ? '#2D7DD2' : idx % 2 === 0 ? '#F5F5F5' : 'white',
                }}
              >
                <span className="text-[9px] font-bold text-center" style={{ color: isTop ? 'white' : '#666' }}>{pos}</span>
                <span className="text-[9px] font-semibold pl-1 truncate" style={{ color: isTop ? 'white' : '#2D4A3E' }}>{s.name || '—'}</span>
                <span className="text-[9px] text-center" style={{ color: isTop ? 'white' : '#444' }}>{s.played}</span>
                <span className="text-[9px] text-center" style={{ color: isTop ? 'white' : '#444' }}>{s.wins}</span>
                <span className="text-[9px] text-center" style={{ color: isTop ? 'white' : '#444' }}>{s.losses}</span>
                <span className="text-[9px] font-bold text-center" style={{ color: isTop ? 'white' : '#2D4A3E' }}>{s.points}</span>
              </div>
            );
          })}
        </div>

        {/* Latest Results */}
        {group.results.length > 0 && (
          <div>
            <p className="text-[8px] font-bold uppercase mb-1" style={{ color: '#2D4A3E', borderTop: '1px solid #e5e7eb', paddingTop: '4px' }}>
              Latest Results
            </p>
            <div className="space-y-0.5">
              {group.results.slice(0, 5).map((r, idx) => (
                <div key={idx} className="rounded" style={{ border: '1px solid #e5e7eb', fontSize: '8px' }}>
                  <div className="flex items-center justify-between px-1.5" style={{ paddingTop: '2px', paddingBottom: '1px' }}>
                    <span className={r.winner === 1 ? 'font-bold' : ''} style={{ color: '#2D4A3E' }}>{r.player1 || '—'}</span>
                    <div className="flex gap-0.5 ml-1">
                      {r.player1Score.filter(s => s !== '').map((s, i) => (
                        <span key={i} className={`text-[9px] ${r.winner === 1 && i === r.player1Score.filter(s => s !== '').length - 1 ? 'font-black' : ''}`} style={{ color: '#2D4A3E', minWidth: '10px', textAlign: 'center' }}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ height: '1px', backgroundColor: '#f0f0f0', margin: '0 4px' }} />
                  <div className="flex items-center justify-between px-1.5" style={{ paddingTop: '1px', paddingBottom: '1px' }}>
                    <span className={r.winner === 2 ? 'font-bold' : ''} style={{ color: '#2D4A3E' }}>{r.player2 || '—'}</span>
                    <div className="flex gap-0.5 ml-1">
                      {r.player2Score.filter(s => s !== '').map((s, i) => (
                        <span key={i} className={`text-[9px] ${r.winner === 2 && i === r.player2Score.filter(s => s !== '').length - 1 ? 'font-black' : ''}`} style={{ color: '#2D4A3E', minWidth: '10px', textAlign: 'center' }}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="px-1.5" style={{ backgroundColor: '#f9f9f9', borderTop: '1px solid #f0f0f0', paddingTop: '1px', paddingBottom: '1px' }}>
                    <span style={{ color: '#888', fontSize: '7px' }}>{r.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Preview standings in the edit form
  const previewStandings = sortStandings(computeStandings(currentGroup.players, currentGroup.results));

  return (
    <>
      {/* Control Bar */}
      <div className="no-print bg-primary-deep-green text-white p-4 shadow-lg mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold font-montserrat">Box League Poster</h1>
            <p className="text-sm text-gray-200">Add results — table updates automatically. Print when ready.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setIsEditing(!isEditing)} className="px-6 py-2 bg-white text-primary-deep-green font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              {isEditing ? 'Preview Poster' : 'Edit Data'}
            </button>
            <button onClick={() => window.print()} className="px-6 py-2 bg-semantic-tournament text-gray-900 font-semibold rounded-lg hover:bg-yellow-300 transition-colors">
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
                  className={`px-6 py-3 font-semibold transition-colors ${selectedGroup === group ? 'border-b-2 border-primary-deep-green text-primary-deep-green' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Group {idx + 1}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Left: Players + Results */}
              <div>
                {/* Players */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold">Players — Group {selectedGroup.slice(-1)}</h3>
                    <button onClick={addPlayer} className="px-4 py-2 bg-primary-deep-green text-white rounded-lg text-sm hover:bg-primary-forest transition-colors">
                      + Add Player
                    </button>
                  </div>
                  <div className="space-y-2">
                    {currentGroup.players.map((name, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => updatePlayerName(idx, e.target.value)}
                          className="flex-1 px-3 py-2 border rounded-lg text-sm"
                          placeholder={`Player ${idx + 1} name`}
                        />
                        <button onClick={() => removePlayer(idx)} className="px-3 py-2 text-red-600 hover:text-red-800 font-semibold">✕</button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold">Results — Group {selectedGroup.slice(-1)}</h3>
                    <button onClick={addResult} className="px-4 py-2 bg-primary-deep-green text-white rounded-lg text-sm hover:bg-primary-forest transition-colors">
                      + Add Result
                    </button>
                  </div>
                  <div className="space-y-4">
                    {currentGroup.results.map((r, idx) => (
                      <div key={idx} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                          <span className="font-semibold text-sm text-gray-700">Result {idx + 1}</span>
                          <button onClick={() => removeResult(idx)} className="text-red-600 hover:text-red-800 text-sm font-semibold">Remove</button>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div>
                            <label className="block text-xs font-semibold mb-1">Player 1</label>
                            <input type="text" value={r.player1} onChange={(e) => updateResult(idx, 'player1', e.target.value)} className="w-full px-2 py-1 border rounded text-sm" placeholder="Must match player name exactly" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold mb-1">Player 2</label>
                            <input type="text" value={r.player2} onChange={(e) => updateResult(idx, 'player2', e.target.value)} className="w-full px-2 py-1 border rounded text-sm" placeholder="Must match player name exactly" />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          {[0, 1, 2].map(setIdx => (
                            <div key={setIdx}>
                              <label className="block text-xs font-semibold mb-1">Set {setIdx + 1}</label>
                              <div className="flex gap-1 items-center">
                                <input type="text" value={r.player1Score[setIdx] ?? ''} onChange={(e) => { const s = [...r.player1Score]; s[setIdx] = e.target.value; updateResult(idx, 'player1Score', s); }} className="w-10 px-1 py-1 border rounded text-sm text-center" placeholder="P1" />
                                <span className="text-gray-400 text-xs">–</span>
                                <input type="text" value={r.player2Score[setIdx] ?? ''} onChange={(e) => { const s = [...r.player2Score]; s[setIdx] = e.target.value; updateResult(idx, 'player2Score', s); }} className="w-10 px-1 py-1 border rounded text-sm text-center" placeholder="P2" />
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold mb-1">Date</label>
                            <input type="text" value={r.date} onChange={(e) => updateResult(idx, 'date', e.target.value)} className="w-full px-2 py-1 border rounded text-sm" placeholder="Sat 21/03/2026" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold mb-1">Winner</label>
                            <select value={r.winner} onChange={(e) => updateResult(idx, 'winner', parseInt(e.target.value) as 1 | 2)} className="w-full px-2 py-1 border rounded text-sm">
                              <option value={1}>P1 — {r.player1 || 'Player 1'}</option>
                              <option value={2}>P2 — {r.player2 || 'Player 2'}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                    {currentGroup.results.length === 0 && (
                      <p className="text-sm text-gray-500 italic">No results yet.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Live table preview */}
              <div>
                <h3 className="text-lg font-bold mb-3">Live Table Preview</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left w-6">#</th>
                        <th className="px-3 py-2 text-left">Player</th>
                        <th className="px-3 py-2 text-center">P</th>
                        <th className="px-3 py-2 text-center">W</th>
                        <th className="px-3 py-2 text-center">L</th>
                        <th className="px-3 py-2 text-center font-bold">PTS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewStandings.map((s, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-3 py-2 text-gray-500 text-xs">{idx + 1}</td>
                          <td className="px-3 py-2 font-medium">{s.name}</td>
                          <td className="px-3 py-2 text-center text-gray-600">{s.played}</td>
                          <td className="px-3 py-2 text-center text-gray-600">{s.wins}</td>
                          <td className="px-3 py-2 text-center text-gray-600">{s.losses}</td>
                          <td className="px-3 py-2 text-center font-bold">{s.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-2">Updates automatically as you add results above.</p>

                {/* Round + LTA */}
                <div className="mt-6 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold mb-1">Round</label>
                      <input type="text" value={data.round} onChange={(e) => setData({ ...data, round: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Round 25" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">Date Range</label>
                      <input type="text" value={data.dateRange} onChange={(e) => setData({ ...data, dateRange: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="2 Mar – 26 Apr" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">LTA URL (QR code)</label>
                    <input type="text" value={data.ltaUrl} onChange={(e) => setData({ ...data, ltaUrl: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="https://competitions.lta.org.uk/..." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Poster */}
      <div className={isEditing ? 'no-print' : 'print:block poster-container'}>
        <div className="w-[297mm] h-[210mm] mx-auto relative overflow-hidden bg-white">
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
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }} />

          <div className="relative z-10 h-full flex flex-col p-[12mm]">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="relative flex items-center justify-center">
                <div className="absolute rounded-full" style={{ width: '68px', height: '68px', backgroundColor: 'white', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }} />
                <Image src="/assets/marden-logo.png" alt="Marden Tennis Club" width={62} height={62} className="relative z-10 rounded-full" style={{ background: 'transparent' }} />
              </div>
              <div className="flex-1 text-center px-6 relative">
                <h1 className="text-5xl font-black uppercase tracking-tight leading-none" style={{ color: 'white', fontFamily: 'var(--font-montserrat)', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                  Box League
                </h1>
                <p className="text-base mt-1 font-semibold" style={{ color: '#D0E04D', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  League Tables & Latest Results
                </p>
                <p className="text-sm mt-1 font-semibold" style={{ color: 'white' }}>
                  {data.round} · {data.dateRange}
                </p>
                <svg className="absolute left-[calc(50%+180px)] top-0 w-28 h-20" viewBox="0 0 110 80" style={{ opacity: 0.9 }}>
                  <path d="M 5 12 Q 22 24, 35 58" stroke="white" strokeWidth="3.5" strokeDasharray="5,7" fill="none" opacity="0.85" />
                  <ellipse cx="35" cy="60" rx="8" ry="2.5" fill="rgba(255,255,255,0.4)" />
                  <path d="M 35 58 Q 52 42, 72 26" stroke="white" strokeWidth="3.5" strokeDasharray="5,7" fill="none" opacity="0.85" />
                  <g transform="translate(72, 26)">
                    <circle cx="1.5" cy="1.5" r="14" fill="rgba(0,0,0,0.3)" />
                    <circle cx="0" cy="0" r="14" fill="#D0E04D" />
                    <circle cx="-3" cy="-3" r="5" fill="rgba(255,255,255,0.4)" />
                    <path d="M -10 -5 Q -7 0, -10 5" stroke="white" strokeWidth="2" fill="none" opacity="0.9" />
                    <path d="M 10 -5 Q 7 0, 10 5" stroke="white" strokeWidth="2" fill="none" opacity="0.9" />
                  </g>
                </svg>
              </div>
              <div className="w-[62px]" />
            </div>

            {/* Groups */}
            <div className="grid grid-cols-3 gap-3 flex-1 min-h-0 mb-2">
              <GroupCard groupKey="group1" groupIdx={0} />
              <GroupCard groupKey="group2" groupIdx={1} />
              <GroupCard groupKey="group3" groupIdx={2} />
            </div>

            {/* Combined Bottom Strip */}
            <div className="flex items-stretch gap-2">
              {/* QR Code */}
              <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-1.5" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.2)', flexShrink: 0 }}>
                <QRCodeSVG value={data.ltaUrl} size={38} level="H" />
                <div>
                  <p className="text-[9px] font-bold" style={{ color: '#2D4A3E' }}>Scan to view the</p>
                  <p className="text-[9px] font-bold" style={{ color: '#2D4A3E' }}>latest tables & fixtures</p>
                </div>
              </div>

              {/* Info Panel */}
              <div className="flex-1 bg-white bg-opacity-95 rounded-lg px-3 py-1.5" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                <p className="text-center text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: '#2D4A3E', fontFamily: 'var(--font-montserrat)' }}>All Levels Welcome</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <h3 className="text-[9px] font-black uppercase mb-0.5" style={{ color: '#2D4A3E', fontFamily: 'var(--font-montserrat)' }}>What is the Box League?</h3>
                    <p className="text-[8px] leading-tight" style={{ color: '#2D4A3E' }}>A flexible singles league where you play others at a similar level. Arrange matches at times that suit you and move up or down boxes based on results.</p>
                  </div>
                  <div>
                    <h3 className="text-[9px] font-black uppercase mb-0.5" style={{ color: '#2D4A3E', fontFamily: 'var(--font-montserrat)' }}>Why Join?</h3>
                    <div className="space-y-0 text-[8px]" style={{ color: '#2D4A3E' }}>
                      <div className="flex items-center gap-1"><span>🎾</span><span>Competitive but friendly</span></div>
                      <div className="flex items-center gap-1"><span>🤝</span><span>Meet club members</span></div>
                      <div className="flex items-center gap-1"><span>📅</span><span>Play at your times</span></div>
                      <div className="flex items-center gap-1"><span>📈</span><span>Move up based on results</span></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[9px] font-black uppercase mb-0.5" style={{ color: '#2D4A3E', fontFamily: 'var(--font-montserrat)' }}>Who Can Join?</h3>
                    <div className="text-[8px] space-y-0" style={{ color: '#2D4A3E' }}>
                      <div className="flex items-center gap-1"><span style={{ color: '#D0E04D' }}>●</span><span>Men&apos;s Singles</span></div>
                      <div className="flex items-center gap-1"><span style={{ color: '#D0E04D' }}>●</span><span>Women&apos;s Singles</span></div>
                      <div className="flex items-center gap-1"><span style={{ color: '#D0E04D' }}>●</span><span>Mixed/Combi (coming soon)</span></div>
                      <p className="text-[7px] italic mt-0.5" style={{ opacity: 0.8 }}>New players welcome — boxes are based on level</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center px-3 py-1.5 rounded-lg bg-white" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.2)', flexShrink: 0 }}>
                <div>
                  <p className="text-[9px] font-bold" style={{ color: '#2D4A3E' }}>To join, email:</p>
                  <p className="text-[9px] font-bold" style={{ color: '#2D4A3E' }}>tennis@mardensportsclub.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
