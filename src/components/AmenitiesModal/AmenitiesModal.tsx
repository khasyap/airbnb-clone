import { useEffect, useRef } from 'react';
import { CloseIcon } from '../UI/Icons';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { allAmenitiesGrouped } from '../../data/listing';
import styles from './AmenitiesModal.module.css';

interface Props {
  onClose: () => void;
}

export function AmenitiesModal({ onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useLockBodyScroll(true);
  useKeyboardNavigation({ enabled: true, onEscape: onClose });

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <div className={styles.backdrop} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label="What this place offers"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <button
            ref={closeRef}
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon size={14} />
          </button>
          <h2 className={styles.title}>What this place offers</h2>
        </div>
        <div className={styles.body}>
          {allAmenitiesGrouped.map((group) => (
            <div key={group.category} className={styles.category}>
              <h3 className={styles.categoryTitle}>{group.category}</h3>
              {group.items.map((item) => {
                const label = typeof item === 'string' ? item : item.label;
                const available = typeof item === 'string' ? true : item.available;
                return (
                  <div
                    key={label}
                    className={`${styles.item} ${!available ? styles.itemUnavailable : ''}`}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
