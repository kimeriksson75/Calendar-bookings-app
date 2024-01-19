import duration from '../../utils/duration';

describe('duration', () => {
  it('should return an empty string when duration is less than 1 minute', () => {
    const result = duration({ start: '2022-01-01T10:00:00', end: '2022-01-01T10:00:59' });
    expect(result).toBe(' ');
  });

  it('should return the correct duration in minutes', () => {
    const result = duration({ start: '2022-01-01T10:00:00', end: '2022-01-01T10:05:00' });
    expect(result).toBe(' 5 minuter');
  });

  it('should return the correct duration in hours', () => {
    const result = duration({ start: '2022-01-01T10:00:00', end: '2022-01-01T12:30:00' });
    expect(result).toBe(' 2 timmar 30 minuter');
  });

  it('should return the correct duration in days', () => {
    const result = duration({ start: '2022-01-01T10:00:00', end: '2022-01-03T15:00:00' });
    expect(result).toBe(' 2 dagar 5 timmar');
  });

  it('should return the correct duration when start and end are the same', () => {
    const result = duration({ start: '2022-01-01T10:00:00', end: '2022-01-01T10:00:00' });
    expect(result).toBe(' ');
  });
});