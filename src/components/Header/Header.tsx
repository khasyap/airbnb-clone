import { AirbnbLogo, SearchIcon, GlobeIcon, MenuIcon } from '../UI/Icons';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo} aria-label="Airbnb home">
          <AirbnbLogo size={32} />
          <span>airbnb</span>
        </a>

        <div className={styles.search} role="search">
          <button type="button" className={styles.searchSegment}>
            Anywhere
          </button>
          <span className={styles.searchDivider} aria-hidden="true" />
          <button type="button" className={styles.searchSegment}>
            Anytime
          </button>
          <span className={styles.searchDivider} aria-hidden="true" />
          <button type="button" className={styles.searchSegment} style={{ color: 'var(--color-text-muted)' }}>
            Add guests
          </button>
          <button type="button" className={styles.searchBtn} aria-label="Search">
            <SearchIcon size={14} />
          </button>
        </div>

        <div className={styles.right}>
          <a href="#host" className={styles.hostLink}>
            Become a host
          </a>
          <button type="button" className={styles.iconBtn} aria-label="Choose a language">
            <GlobeIcon size={16} />
          </button>
          <button type="button" className={styles.menuBtn} aria-label="Main navigation menu">
            <MenuIcon size={16} />
            <span className={styles.avatar} aria-hidden="true">
              U
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
