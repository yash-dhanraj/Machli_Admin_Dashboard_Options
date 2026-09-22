import { alertsWarnings, landingCentres } from '../data/mockData';

// Best-effort conceptual map coordinates (percentage-based) for a given
// state/district, reused across option-2 location panels. Falls back to a
// state-level average position from landing centres, then a coastal
// midpoint. Purely illustrative — not geographically accurate.
export function getMapPosition(state: string, district?: string): { x: number; y: number } {
  const alertMatch = alertsWarnings.find(
    (a) => a.state === state && (!district || a.district === district),
  );
  if (alertMatch) return { x: alertMatch.x, y: alertMatch.y };

  const centreMatch = landingCentres.find(
    (c) => c.state === state && (!district || c.district === district),
  );
  if (centreMatch) return { x: centreMatch.x, y: centreMatch.y };

  const stateCentres = landingCentres.filter((c) => c.state === state);
  if (stateCentres.length > 0) {
    const x = stateCentres.reduce((sum, c) => sum + c.x, 0) / stateCentres.length;
    const y = stateCentres.reduce((sum, c) => sum + c.y, 0) / stateCentres.length;
    return { x, y };
  }

  return { x: 30, y: 55 };
}

export function getLandingCentrePosition(name: string): { x: number; y: number } {
  const match = landingCentres.find((c) => c.name === name);
  if (match) return { x: match.x, y: match.y };
  return { x: 30, y: 55 };
}

export function getPositionByLocationName(location: string): { x: number; y: number } {
  const match = landingCentres.find((c) => c.location === location);
  if (match) return { x: match.x, y: match.y };
  return { x: 30, y: 55 };
}
