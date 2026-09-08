import { describe, expect, it } from 'vitest';
import { periods, sites } from './data';

describe('исторически атлас', () => {
  it('има подредени периоди и разширяем корпус от обекти', () => {
    expect(periods.length).toBe(6);
    expect(sites.length).toBeGreaterThanOrEqual(8);
    expect(sites.every(site => site.sources.length > 0)).toBe(true);
  });

  it('разграничава приблизителните зони', () => {
    expect(sites.filter(site => site.area).length).toBeGreaterThan(0);
    expect(sites.filter(site => site.area).every(site => site.confidence !== 'Доказано' || site.id === 'chungovitsa' || site.id === 'lozen-gradishte')).toBe(true);
  });
});
