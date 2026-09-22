import { useEffect, useRef } from 'react';
import { CloseIcon, ChevronLeft, ChevronRight, GridIcon } from '../UI/Icons';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import styles from './Lightbox.module.css';

interface Image {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  category?: string;
}

interface Props {
  images: Image[];
  index: number;
  onClose: () => void;
  onBackToTour: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({ images, index, onClose, onBackToTour, onPrev, onNext }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const current = images[index];
  const title = current?.caption || current?.category || current?.alt || 'Photo';

  useLockBodyScroll(true);
  useKeyboardNavigation({
    enabled: true,
    onEscape: onClose,
    onArrowLeft: onPrev,
    onArrowRight: onNext,
  });

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Photo viewer">
      <div className={styles.topBar}>
        <div className={styles.left}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={onBackToTour}
            aria-label="Back to photo tour"
          >
            <GridIcon size={16} />
          </button>
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.right}>
          <span className={styles.counter}>
            {index + 1} of {images.length}
          </span>
          <button
            ref={closeRef}
            type="button"
            className={styles.iconBtn}
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon size={14} />
          </button>
        </div>
      </div>

      <div className={styles.stage}>
        <button
          type="button"
          className={`${styles.navBtn} ${styles.prev}`}
          onClick={onPrev}
          disabled={index === 0}
          aria-label="Previous photo"
        >
          <ChevronLeft size={18} />
        </button>

        <div className={styles.imageWrap}>
          <img src={current?.src} alt={current?.alt} />
        </div>

        <button
          type="button"
          className={`${styles.navBtn} ${styles.next}`}
          onClick={onNext}
          disabled={index === images.length - 1}
          aria-label="Next photo"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
