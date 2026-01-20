/**
 * Design System Color Palette for Tennis Club Posters
 * Single source of truth for all color values
 */

export const colors = {
  primary: {
    deepGreen: '#2E8B57',    // Events Calendar (Gate)
    forest: '#1E6F4F'
  },
  secondary: {
    navy: '#1B4965',         // Box League posters (Courtside)
    royal: '#2B5D7E'
  },
  neutral: {
    warmWhite: '#F8F6F1',    // Results Grid (minimal ink)
    cream: '#FAF8F3',
    lightGray: '#E8E6E1'
  },
  semantic: {
    social: '#4A90A4',       // Event type colors
    match: '#E67E22',
    league: '#9B59B6',
    tournament: '#27AE60'
  }
} as const;

export type EventType = keyof typeof colors.semantic;

export const eventTypeColors: Record<EventType, string> = {
  social: colors.semantic.social,
  match: colors.semantic.match,
  league: colors.semantic.league,
  tournament: colors.semantic.tournament,
};
