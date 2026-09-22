import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from '../UI/Icons';
import styles from './Calendar.module.css';

interface Props {
  checkIn: string;
  checkOut: string;
  onSelect?: (checkIn: string, checkOut: string) => void;
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function startWeekday(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function toISO(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

export function Calendar({ checkIn, checkOut, onSelect }: Props) {
  const initial = new Date(checkIn || Date.now());
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());
  const [selecting, setSelecting] = useState<'in' | 'out'>('in');
  const [localIn, setLocalIn] = useState(checkIn);
  const [localOut, setLocalOut] = useState(checkOut);

  const months = useMemo(() => {
    const m1 = { year: viewYear, month: viewMonth };
    let y2 = viewYear;
    let m2 = viewMonth + 1;
    if (m2 > 11) {
      m2 = 0;
      y2 += 1;
    }
    return [m1, { year: y2, month: m2 }];
  }, [viewYear, viewMonth]);

  const prev = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const next = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleDay = (iso: string) => {
    if (selecting === 'in' || (localIn && iso < localIn)) {
      setLocalIn(iso);
      setLocalOut('');
      setSelecting('out');
    } else {
      setLocalOut(iso);
      setSelecting('in');
      onSelect?.(localIn, iso);
    }
  };

  const clear = () => {
    setLocalIn('');
    setLocalOut('');
    setSelecting('in');
  };

  const renderMonth = (year: number, month: number, showNav: 'left' | 'right' | 'none') => {
    const total = daysInMonth(year, month);
    const start = startWeekday(year, month);
    const cells: (number | null)[] = Array(start).fill(null);
    for (let d = 1; d <= total; d++) cells.push(d);

    return (
      <div key={`${year}-${month}`}>
        <div className={styles.monthHeader}>
          {showNav === 'left' ? (
            <button type="button" className={styles.navBtn} onClick={prev} aria-label="Previous month">
              <ChevronLeft size={14} />
            </button>
          ) : (
            <span style={{ width: 32 }} />
          )}
          <span className={styles.monthTitle}>
            {MONTH_NAMES[month]} {year}
          </span>
          {showNav === 'right' ? (
            <button type="button" className={styles.navBtn} onClick={next} aria-label="Next month">
              <ChevronRight size={14} />
            </button>
          ) : (
            <span style={{ width: 32 }} />
          )}
        </div>
        <div className={styles.weekdays}>
          {WEEKDAYS.map((w, i) => (
            <span key={i}>{w}</span>
          ))}
        </div>
        <div className={styles.days}>
          {cells.map((d, i) => {
            if (d === null) return <span key={`e-${i}`} />;
            const iso = toISO(year, month, d);
            const isIn = iso === localIn;
            const isOut = iso === localOut;
            const inRange =
              localIn && localOut && iso > localIn && iso < localOut;
            const disabled = iso < new Date().toISOString().slice(0, 10);

            let cls = styles.day;
            if (isIn) cls += ` ${styles.selected} ${styles.rangeStart}`;
            else if (isOut) cls += ` ${styles.selected} ${styles.rangeEnd}`;
            else if (inRange) cls += ` ${styles.inRange}`;

            return (
              <button
                key={iso}
                type="button"
                className={cls}
                disabled={disabled}
                onClick={() => handleDay(iso)}
                aria-label={iso}
                aria-pressed={isIn || isOut}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const nights =
    localIn && localOut
      ? Math.round(
          (new Date(localOut).getTime() - new Date(localIn).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>
        {nights > 0 ? `${nights} nights in Candolim` : 'Select dates'}
      </h2>
      {localIn && localOut && (
        <p className={styles.subtitle}>
          {new Date(localIn).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}{' '}
          –{' '}
          {new Date(localOut).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </p>
      )}
      <div className={styles.months}>
        {renderMonth(months[0].year, months[0].month, 'left')}
        {renderMonth(months[1].year, months[1].month, 'right')}
      </div>
      {(localIn || localOut) && (
        <button type="button" className={styles.clear} onClick={clear}>
          Clear dates
        </button>
      )}
    </div>
  );
}
