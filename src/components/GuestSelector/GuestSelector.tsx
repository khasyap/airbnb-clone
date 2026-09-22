import styles from './GuestSelector.module.css';

interface Guests {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

interface Props {
  guests: Guests;
  maxGuests: number;
  onChange: (g: Guests) => void;
  onClose: () => void;
}

export function GuestSelector({ guests, maxGuests, onChange, onClose }: Props) {
  const total = guests.adults + guests.children;

  const update = (key: keyof Guests, delta: number) => {
    const next = { ...guests, [key]: Math.max(0, guests[key] + delta) };
    if (key === 'adults' && next.adults < 1) next.adults = 1;
    if (
      (key === 'adults' || key === 'children') &&
      next.adults + next.children > maxGuests
    ) {
      return;
    }
    onChange(next);
  };

  return (
    <div className={styles.panel} role="dialog" aria-label="Guests">
      <div className={styles.row}>
        <div>
          <div className={styles.label}>Adults</div>
          <div className={styles.sub}>Ages 13+</div>
        </div>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.ctrlBtn}
            onClick={() => update('adults', -1)}
            disabled={guests.adults <= 1}
            aria-label="Decrease adults"
          >
            −
          </button>
          <span className={styles.count}>{guests.adults}</span>
          <button
            type="button"
            className={styles.ctrlBtn}
            onClick={() => update('adults', 1)}
            disabled={total >= maxGuests}
            aria-label="Increase adults"
          >
            +
          </button>
        </div>
      </div>

      <div className={styles.row}>
        <div>
          <div className={styles.label}>Children</div>
          <div className={styles.sub}>Ages 2–12</div>
        </div>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.ctrlBtn}
            onClick={() => update('children', -1)}
            disabled={guests.children <= 0}
            aria-label="Decrease children"
          >
            −
          </button>
          <span className={styles.count}>{guests.children}</span>
          <button
            type="button"
            className={styles.ctrlBtn}
            onClick={() => update('children', 1)}
            disabled={total >= maxGuests}
            aria-label="Increase children"
          >
            +
          </button>
        </div>
      </div>

      <div className={styles.row}>
        <div>
          <div className={styles.label}>Infants</div>
          <div className={styles.sub}>Under 2</div>
        </div>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.ctrlBtn}
            onClick={() => update('infants', -1)}
            disabled={guests.infants <= 0}
            aria-label="Decrease infants"
          >
            −
          </button>
          <span className={styles.count}>{guests.infants}</span>
          <button
            type="button"
            className={styles.ctrlBtn}
            onClick={() => update('infants', 1)}
            disabled={guests.infants >= 5}
            aria-label="Increase infants"
          >
            +
          </button>
        </div>
      </div>

      <div className={styles.row}>
        <div>
          <div className={styles.label}>Pets</div>
          <div className={styles.sub}>Bringing a service animal?</div>
        </div>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.ctrlBtn}
            onClick={() => update('pets', -1)}
            disabled={guests.pets <= 0}
            aria-label="Decrease pets"
          >
            −
          </button>
          <span className={styles.count}>{guests.pets}</span>
          <button
            type="button"
            className={styles.ctrlBtn}
            onClick={() => update('pets', 1)}
            disabled={guests.pets >= 5}
            aria-label="Increase pets"
          >
            +
          </button>
        </div>
      </div>

      <div className={styles.closeRow}>
        <button type="button" className={styles.closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
