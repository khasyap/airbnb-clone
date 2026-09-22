import { ShareIcon, HeartIcon } from '../UI/Icons';
import styles from './PropertyHeader.module.css';

interface Props {
  title: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onShare: () => void;
}

export function PropertyHeader({ title, isFavorite, onToggleFavorite, onShare }: Props) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.actions}>
        <button type="button" className={styles.actionBtn} onClick={onShare} aria-label="Share this listing">
          <ShareIcon size={16} />
          Share
        </button>
        <button
          type="button"
          className={styles.actionBtn}
          onClick={onToggleFavorite}
          aria-label={isFavorite ? 'Remove from saved' : 'Save this listing'}
          aria-pressed={isFavorite}
        >
          <HeartIcon size={16} filled={isFavorite} />
          Save
        </button>
      </div>
    </div>
  );
}
