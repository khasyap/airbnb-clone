import { useState, useCallback, useEffect } from 'react';
import { listing } from '../data/listing';
import { Header } from '../components/Header/Header';
import { PropertyHeader } from '../components/PropertyHeader/PropertyHeader';
import { PhotoGallery } from '../components/PhotoGallery/PhotoGallery';
import { BookingCard } from '../components/BookingCard/BookingCard';
import { Calendar } from '../components/Calendar/Calendar';
import { PhotoTour } from '../components/PhotoTour/PhotoTour';
import { Lightbox } from '../components/Lightbox/Lightbox';
import { AmenitiesModal } from '../components/AmenitiesModal/AmenitiesModal';
import { StarIcon, LaurelLeft, LaurelRight } from '../components/UI/Icons';
import styles from './ListingPage.module.css';

export function ListingPage() {
  const [favorite, setFavorite] = useState(false);
  const [photoTourOpen, setPhotoTourOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [descExpanded, setDescExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('Photos');
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);

  const openTour = useCallback(() => setPhotoTourOpen(true), []);
  const closeTour = useCallback(() => setPhotoTourOpen(false), []);

  const openLightbox = useCallback((index: number) => {
    setPhotoIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const prevPhoto = useCallback(() => {
    setPhotoIndex((i) => Math.max(0, i - 1));
  }, []);

  const nextPhoto = useCallback(() => {
    setPhotoIndex((i) => Math.min(listing.images.length - 1, i + 1));
  }, []);

  const handleGalleryClick = (index: number) => {
    openLightbox(index);
  };

  const handleTourSelect = (index: number) => {
    openLightbox(index);
  };

  const tabSectionMap: Record<string, string> = {
    Photos: 'photos',
    Amenities: 'amenities',
    Reviews: 'reviews',
    Location: 'location',
  };

  const scrollToSection = useCallback((tab: string) => {
    setActiveTab(tab);
    const id = tabSectionMap[tab];
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const scrollToBooking = useCallback(() => {
    const el = document.getElementById('booking-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  // Scroll-spy: highlight tab based on which section is in view
  useEffect(() => {
    const ids = ['photos', 'amenities', 'reviews', 'location'];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most visible intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          const entry = Object.entries(tabSectionMap).find(
            ([, sid]) => sid === visible[0].target.id
          );
          if (entry) setActiveTab(entry[0]);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <PropertyHeader
          title={listing.title}
          isFavorite={favorite}
          onToggleFavorite={() => setFavorite((f) => !f)}
          onShare={() => {}}
        />

        <div id="photos" className={styles.photosAnchor}>
          <PhotoGallery
            images={listing.images}
            onShowAll={openTour}
            onImageClick={handleGalleryClick}
          />
        </div>

        <div className={styles.tabsBar}>
          <div className={styles.tabs} role="tablist">
            {['Photos', 'Amenities', 'Reviews', 'Location'].map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                onClick={() => scrollToSection(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className={styles.tabsReserve}>
            <div className={styles.tabsPrice}>
              ₹{listing.priceTotal.toLocaleString('en-IN')} for {listing.nights} nights
              <span>★ {listing.rating} · {listing.reviewCount} reviews</span>
            </div>
            <button type="button" className={styles.tabsReserveBtn} onClick={scrollToBooking}>
              Reserve
            </button>
          </div>
        </div>

        <div className={styles.layout}>
          <div className={styles.left}>
            {/* Type + capacity */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle} style={{ fontSize: 22 }}>
                {listing.type} in {listing.location}
              </h2>
              <p className={styles.capacity}>
                {listing.guests} guests · {listing.bedrooms} bedroom · {listing.beds} bed ·{' '}
                {listing.bathrooms} bathroom
              </p>

              {listing.isGuestFavourite && (
                <div className={styles.badge}>
                  <div className={styles.badgeLeft}>
                    <span aria-hidden="true">🏆</span>
                    Guest favourite
                  </div>
                  <div className={styles.badgeText}>
                    One of the most loved homes on Airbnb, according to guests
                  </div>
                  <div>
                    <div className={styles.badgeRating}>{listing.rating}</div>
                    <div style={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} size={10} />
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    className={styles.badgeReviews}
                    onClick={() => scrollToSection('Reviews')}
                    style={{ cursor: 'pointer', background: 'none', border: 'none', textAlign: 'inherit' }}
                  >
                    <div style={{ fontWeight: 600 }}>{listing.reviewCount}</div>
                    <div>Reviews</div>
                  </button>
                </div>
              )}

              <div className={styles.hostRow}>
                <div className={styles.hostAvatar}>MIRASHYA</div>
                <div>
                  <div className={styles.hostName}>Hosted by {listing.host.name}</div>
                  <div className={styles.hostMeta}>{listing.host.yearsHosting} years hosting</div>
                </div>
              </div>
            </section>

            {/* Highlights */}
            <section className={styles.section}>
              <div className={styles.highlights}>
                {listing.highlights.map((h) => (
                  <div key={h.id} className={styles.highlight}>
                    <div className={styles.highlightIcon} aria-hidden="true">
                      {h.icon === 'tent' ? '⛺' : h.icon === 'fan' ? '🌀' : '🔑'}
                    </div>
                    <div>
                      <div className={styles.highlightTitle}>{h.title}</div>
                      <div className={styles.highlightDesc}>{h.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Description */}
            <section className={styles.section}>
              <p className={styles.description}>
                {descExpanded
                  ? listing.description
                  : listing.description.slice(0, 220) + (listing.description.length > 220 ? '…' : '')}
              </p>
              {listing.description.length > 220 && (
                <button
                  type="button"
                  className={styles.showMore}
                  onClick={() => setDescExpanded((e) => !e)}
                >
                  {descExpanded ? 'Show less' : 'Show more'} ›
                </button>
              )}
            </section>

            {/* Where you'll sleep */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Where you'll sleep</h2>
              <div className={styles.sleepGrid}>
                {listing.sleepingArrangements.map((s) => (
                  <div key={s.name} className={styles.sleepCard}>
                    <img src={s.image} alt={s.name} />
                    <div className={styles.sleepName}>{s.name}</div>
                    <div className={styles.sleepDetail}>{s.detail}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Amenities */}
            <section className={styles.section} id="amenities">
              <h2 className={styles.sectionTitle}>What this place offers</h2>
              <div className={styles.amenitiesGrid}>
                {listing.amenities.map((a) => (
                  <div
                    key={a.id}
                    className={`${styles.amenity} ${!a.available ? styles.amenityUnavailable : ''}`}
                  >
                    <span aria-hidden="true">
                      {a.icon === 'utensils'
                        ? '🍳'
                        : a.icon === 'wifi'
                          ? '📶'
                          : a.icon === 'monitor'
                            ? '💻'
                            : a.icon === 'car'
                              ? '🅿️'
                              : a.icon === 'waves'
                                ? '🏊'
                                : a.icon === 'bath'
                                  ? '🛁'
                                  : a.icon === 'paw'
                                    ? '🐾'
                                    : a.icon === 'cctv'
                                      ? '📹'
                                      : '⚠️'}
                    </span>
                    {a.label}
                  </div>
                ))}
              </div>
              <button type="button" className={styles.showAllAmenities} onClick={() => setAmenitiesOpen(true)}>
                Show all {listing.totalAmenities} amenities
              </button>
            </section>

            {/* Calendar */}
            <section className={styles.section}>
              <Calendar
                checkIn={listing.checkIn}
                checkOut={listing.checkOut}
              />
            </section>
          </div>

          <div className={styles.rightCol} id="booking-card">
            <BookingCard
              priceTotal={listing.priceTotal}
              nights={listing.nights}
              currency={listing.currency}
              checkIn={listing.checkIn}
              checkOut={listing.checkOut}
              cancellationNote={listing.cancellationNote}
              maxGuests={listing.guests}
            />
          </div>
        </div>

        <div className={styles.fullWidth}>
            {/* Reviews */}
            <section className={styles.section} id="reviews">
              <div className={styles.ratingHero}>
                <div className={styles.ratingBig}>
                  <LaurelLeft size={48} />
                  {listing.rating}
                  <LaurelRight size={48} />
                </div>
                <div className={styles.ratingLabel}>Guest favourite</div>
                <p className={styles.ratingSub}>
                  This home is a guest favourite based on ratings, reviews and reliability
                </p>
              </div>

              <div className={styles.categoryGrid}>
                {(
                  [
                    ['Cleanliness', listing.categoryRatings.cleanliness],
                    ['Accuracy', listing.categoryRatings.accuracy],
                    ['Check-in', listing.categoryRatings.checkin],
                    ['Communication', listing.categoryRatings.communication],
                    ['Location', listing.categoryRatings.location],
                    ['Value', listing.categoryRatings.value],
                  ] as const
                ).map(([label, score]) => (
                  <div key={label}>
                    <div className={styles.catScore}>{score.toFixed(1)}</div>
                    <div className={styles.catLabel}>{label}</div>
                  </div>
                ))}
              </div>

              <div className={styles.reviewsGrid}>
                {listing.reviews.slice(0, 6).map((r) => (
                  <div key={r.id}>
                    <div className={styles.reviewAuthor}>
                      <div className={styles.reviewAvatar}>{r.author[0]}</div>
                      <div>
                        <div className={styles.reviewName}>{r.author}</div>
                        <div className={styles.reviewMeta}>
                          {r.yearsOnAirbnb} · {r.date}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 2, marginBottom: 4 }}>
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <StarIcon key={i} size={10} />
                      ))}
                    </div>
                    <p className={styles.reviewText}>{r.text}</p>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className={styles.showAllReviews}
                onClick={() => scrollToSection('Reviews')}
              >
                Show all {listing.reviewCount} reviews
              </button>
            </section>

            {/* Location */}
            <section className={styles.section} id="location">
              <h2 className={styles.sectionTitle}>Where you'll be</h2>
              <p style={{ marginBottom: 12 }}>{listing.fullLocation}</p>
              <div className={styles.mapPlaceholder}>
                <div className={styles.mapPin} aria-hidden="true">
                  🏠
                </div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--color-text-muted)', marginBottom: 16 }}>
                Exact location will be provided after booking.
              </p>
              <h3 style={{ fontWeight: 600, marginBottom: 8 }}>Neighbourhood highlights</h3>
              <p style={{ fontSize: 14, lineHeight: 1.5 }}>{listing.neighbourhood}</p>
            </section>

            {/* Host */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Meet your host</h2>
              <div className={styles.hostSection}>
                <div>
                  <div className={styles.hostCard}>
                    <div className={styles.hostCardMain}>
                      <div className={styles.hostCardAvatar}>
                        MIRASHYA
                        <span className={styles.hostBadge} aria-hidden="true">✓</span>
                      </div>
                      <div className={styles.hostCardName}>{listing.host.name}</div>
                      <div className={styles.hostCardRole}>Host</div>
                    </div>
                    <div className={styles.hostCardStats}>
                      <div>
                        <strong>{listing.host.reviews.toLocaleString()}</strong>
                        <span>Reviews</span>
                      </div>
                      <div>
                        <strong>{listing.host.rating} ★</strong>
                        <span>Rating</span>
                      </div>
                      <div>
                        <strong>{listing.host.yearsHosting}</strong>
                        <span>Years hosting</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.hostBio}>
                    {(listing.host.bio || []).map((b) => (
                      <div key={b} className={styles.hostBioItem}>
                        <span aria-hidden="true">{b.startsWith('Born') ? '🎈' : '🎓'}</span>
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className={styles.coHostsTitle}>Co-Hosts</h3>
                  <div className={styles.coHostsGrid}>
                    {listing.host.coHosts.map((c) => (
                      <div key={c.name} className={styles.coHost}>
                        {c.avatar ? (
                          <img
                            src={c.avatar}
                            alt=""
                            className={styles.coHostAvatar}
                          />
                        ) : (
                          <div
                            className={styles.coHostAvatar}
                            style={{
                              background: c.avatarColor || '#e2e8f0',
                              color: c.textColor || '#1a202c',
                            }}
                            aria-hidden="true"
                          >
                            {c.initial || c.name[0]}
                          </div>
                        )}
                        <span>{c.name}</span>
                      </div>
                    ))}
                  </div>
                  <h3 className={styles.hostDetailsTitle}>Host details</h3>
                  <p className={styles.hostDetailsText}>Response rate: {listing.host.responseRate}</p>
                  <p className={styles.hostDetailsText}>{listing.host.responseTime}</p>
                  <button type="button" className={styles.messageHostBtn}>
                    Message host
                  </button>
                  <p className={styles.paymentNote}>
                    <span aria-hidden="true">🛡️</span>
                    To help protect your payment, always use Airbnb to send money and communicate with hosts.
                  </p>
                </div>
              </div>
            </section>

            {/* Things to know */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Things to know</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
                <div>
                  <h3 style={{ fontWeight: 600, marginBottom: 8 }}>Cancellation policy</h3>
                  <p style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>
                    {listing.cancellationNote}. Cancel before check-in on 18 October for a partial
                    refund.
                  </p>
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, marginBottom: 8 }}>House rules</h3>
                  <p style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>
                    Check-in {listing.houseRules.checkIn}
                    <br />
                    Checkout {listing.houseRules.checkOut}
                    <br />
                    {listing.houseRules.maxGuests} guests maximum
                  </p>
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, marginBottom: 8 }}>Safety & property</h3>
                  <ul style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>
                    {listing.safety.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Nearby */}
            <section className={styles.section}>
              <div className={styles.nearbyHeader}>
                <h2 className={styles.sectionTitle} style={{ marginBottom: 0 }}>More stays nearby</h2>
                <div className={styles.nearbyArrows}>
                  <button
                    type="button"
                    className={styles.nearbyArrow}
                    aria-label="Scroll left"
                    onClick={() => {
                      const el = document.getElementById('nearby-track');
                      if (!el) return;
                      const card = el.querySelector('[class*="nearbyCard"]') as HTMLElement | null;
                      const step = card ? card.offsetWidth + 16 : 236;
                      el.scrollBy({ left: -step * 2, behavior: 'smooth' });
                    }}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className={styles.nearbyArrow}
                    aria-label="Scroll right"
                    onClick={() => {
                      const el = document.getElementById('nearby-track');
                      if (!el) return;
                      const card = el.querySelector('[class*="nearbyCard"]') as HTMLElement | null;
                      const step = card ? card.offsetWidth + 16 : 236;
                      el.scrollBy({ left: step * 2, behavior: 'smooth' });
                    }}
                  >
                    ›
                  </button>
                </div>
              </div>
              <div id="nearby-track" className={styles.nearbyTrack}>
                {listing.nearbyStays.map((n) => (
                  <div key={n.id} className={styles.nearbyCard}>
                    <img src={n.image} alt={n.title} />
                    <div className={styles.nearbyTitle}>{n.title}</div>
                    <div className={styles.nearbyMeta}>
                      ₹{n.price.toLocaleString('en-IN')} · ★ {n.rating}
                    </div>
                  </div>
                ))}
              </div>
            </section>
        </div>
      </main>

      {amenitiesOpen && (
        <AmenitiesModal onClose={() => setAmenitiesOpen(false)} />
      )}

      {photoTourOpen && (
        <PhotoTour
          images={listing.images}
          onClose={closeTour}
          onSelect={handleTourSelect}
        />
      )}

      {lightboxOpen && (
        <Lightbox
          images={listing.images}
          index={photoIndex}
          onClose={() => {
            closeLightbox();
            closeTour();
          }}
          onBackToTour={() => {
            closeLightbox();
            setPhotoTourOpen(true);
          }}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </div>
  );
}
