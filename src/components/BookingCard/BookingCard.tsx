import { useState, useRef, useEffect } from 'react';
import { FlagIcon } from '../UI/Icons';
import { GuestSelector } from '../GuestSelector/GuestSelector';
import styles from './BookingCard.module.css';

interface Props {
  priceTotal: number;
  nights: number;
  currency: string;
  checkIn: string;
  checkOut: string;
  cancellationNote: string;
  maxGuests: number;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

export function BookingCard({
  priceTotal,
  nights,
  currency,
  checkIn,
  checkOut,
  cancellationNote,
  maxGuests,
}: Props) {
  const [guestOpen, setGuestOpen] = useState(false);
  const [guests, setGuests] = useState({ adults: 2, children: 0, infants: 0, pets: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  const totalGuests = guests.adults + guests.children;

  useEffect(() => {
    if (!guestOpen) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setGuestOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [guestOpen]);

  return (
    <aside className={styles.card} aria-label="Booking">
      <div className={styles.promo}>
        <div className={styles.promoLeft}>
          <span className={styles.promoIcon} aria-hidden="true">
            💎
          </span>
          <div className={styles.promoText}>
            <div>Get 10% off your next stay.</div>
            <a href="#terms">Terms apply</a>
          </div>
        </div>
        <button type="button" className={styles.claimBtn}>
          Claim
        </button>
      </div>

      <div className={styles.priceRow}>
        <span className={styles.price}>
          {currency}
          {priceTotal.toLocaleString('en-IN')}{' '}
          <span>for {nights} nights</span>
        </span>
      </div>

      <div className={styles.dates}>
        <button type="button" className={styles.dateCell} aria-label="Check-in date">
          <span className={styles.dateLabel}>Check-in</span>
          <span className={styles.dateValue}>{formatDate(checkIn)}</span>
        </button>
        <button type="button" className={styles.dateCell} aria-label="Checkout date">
          <span className={styles.dateLabel}>Checkout</span>
          <span className={styles.dateValue}>{formatDate(checkOut)}</span>
        </button>
      </div>

      <div style={{ position: 'relative' }} ref={panelRef}>
        <button
          type="button"
          className={styles.guests}
          aria-haspopup="dialog"
          aria-expanded={guestOpen}
          onClick={() => setGuestOpen((o) => !o)}
        >
          <div>
            <span className={styles.guestsLabel}>Guests</span>
            <span>
              {totalGuests} guest{totalGuests !== 1 ? 's' : ''}
              {guests.infants > 0 ? `, ${guests.infants} infant${guests.infants !== 1 ? 's' : ''}` : ''}
              {guests.pets > 0 ? `, ${guests.pets} pet${guests.pets !== 1 ? 's' : ''}` : ''}
            </span>
          </div>
          <span aria-hidden="true">{guestOpen ? '▴' : '▾'}</span>
        </button>
        {guestOpen && (
          <GuestSelector
            guests={guests}
            maxGuests={maxGuests}
            onChange={setGuests}
            onClose={() => setGuestOpen(false)}
          />
        )}
      </div>

      <div className={styles.cancelNote}>{cancellationNote}</div>

      <button type="button" className={styles.reserve}>
        Reserve
      </button>

      <p className={styles.noCharge}>You won't be charged yet</p>

      <button type="button" className={styles.report}>
        <FlagIcon size={12} />
        Report this listing
      </button>
    </aside>
  );
}
