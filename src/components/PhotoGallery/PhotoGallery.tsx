import { GridIcon } from '../UI/Icons';
import styles from './PhotoGallery.module.css';

interface Image {
  id: string;
  src: string;
  alt: string;
}

interface Props {
  images: Image[];
  onShowAll: () => void;
  onImageClick: (index: number) => void;
}

export function PhotoGallery({ images, onShowAll, onImageClick }: Props) {
  const hero = images[0];
  const thumbs = images.slice(1, 5);

  return (
    <div className={styles.gallery} role="region" aria-label="Photo gallery">
      <button
        type="button"
        className={styles.hero}
        onClick={() => onImageClick(0)}
        aria-label={`View photo 1 of ${images.length}: ${hero?.alt}`}
      >
        <img src={hero?.src} alt={hero?.alt} />
      </button>

      <div className={styles.grid}>
        {thumbs.map((img, i) => (
          <button
            key={img.id}
            type="button"
            className={styles.thumb}
            onClick={() => onImageClick(i + 1)}
            aria-label={`View photo ${i + 2} of ${images.length}: ${img.alt}`}
          >
            <img src={img.src} alt={img.alt} />
          </button>
        ))}
      </div>

      <button type="button" className={styles.showAll} onClick={onShowAll}>
        <GridIcon size={14} />
        Show all photos
      </button>
    </div>
  );
}
