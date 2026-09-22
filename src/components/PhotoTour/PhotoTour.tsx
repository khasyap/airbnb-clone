import { useEffect, useRef, useMemo } from 'react';
import { ShareIcon, HeartIcon, ChevronLeft } from '../UI/Icons';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { photoCategories } from '../../data/listing';
import styles from './PhotoTour.module.css';

interface Image {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  category?: string;
}

interface Props {
  images: Image[];
  onClose: () => void;
  onSelect: (index: number) => void;
}

export function PhotoTour({ images, onClose, onSelect }: Props) {
  const backRef = useRef<HTMLButtonElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useLockBodyScroll(true);
  useKeyboardNavigation({ enabled: true, onEscape: onClose });

  useEffect(() => {
    backRef.current?.focus();
  }, []);

  const categories = useMemo(() => {
    return photoCategories.map((cat) => ({
      ...cat,
      images: cat.imageIds
        .map((id) => images.find((img) => img.id === id))
        .filter(Boolean) as Image[],
    })).filter((c) => c.images.length > 0);
  }, [images]);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const globalIndex = (img: Image) => images.findIndex((i) => i.id === img.id);

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Photo tour">
      <div className={styles.header}>
        <button
          ref={backRef}
          type="button"
          className={styles.backBtn}
          onClick={onClose}
          aria-label="Close photo tour"
        >
          <ChevronLeft size={18} />
        </button>
        <span className={styles.title}>Photo tour</span>
        <div className={styles.headerRight}>
          <button type="button" className={styles.iconBtn} aria-label="Share">
            <ShareIcon size={16} />
          </button>
          <button type="button" className={styles.iconBtn} aria-label="Save">
            <HeartIcon size={16} />
          </button>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.categoryNav} role="navigation" aria-label="Photo categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={styles.catThumb}
              onClick={() => scrollTo(cat.id)}
            >
              <img src={cat.images[0]?.src} alt="" />
              <div className={styles.catLabel}>{cat.label}</div>
            </button>
          ))}
        </div>

        {categories.map((cat) => (
          <section
            key={cat.id}
            id={cat.id}
            className={styles.section}
            ref={(el) => {
              sectionRefs.current[cat.id] = el;
            }}
          >
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>{cat.label}</h2>
                {cat.tags && <p className={styles.sectionTags}>{cat.tags}</p>}
              </div>
              <div className={styles.sectionGrid}>
                {cat.images.map((img) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => onSelect(globalIndex(img))}
                    aria-label={img.alt}
                  >
                    <img src={img.src} alt={img.alt} loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
