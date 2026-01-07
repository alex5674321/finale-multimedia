import React, { useEffect, useRef } from "react";

function App() {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  /* VIDEO: play when visible */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play();
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  /* FADE IN AUDIO */
  const fadeInAudio = () => {
    if (!audioRef.current) return;

    clearInterval(fadeIntervalRef.current);
    audioRef.current.volume = 0;
    audioRef.current.play();

    fadeIntervalRef.current = setInterval(() => {
      if (audioRef.current.volume < 1) {
        audioRef.current.volume = Math.min(audioRef.current.volume + 0.05, 1);
      } else {
        clearInterval(fadeIntervalRef.current);
      }
    }, 50);
  };

  /* FADE OUT AUDIO */
  const fadeOutAudio = () => {
    if (!audioRef.current) return;

    clearInterval(fadeIntervalRef.current);
    fadeIntervalRef.current = setInterval(() => {
      if (audioRef.current.volume > 0) {
        audioRef.current.volume = Math.max(audioRef.current.volume - 0.05, 0);
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        clearInterval(fadeIntervalRef.current);
      }
    }, 50);
  };

  return (
    <div className="app-background">
      {/* AUDIO */}
      <audio ref={audioRef} src="/media/background1.mp3" loop />

      {/* HEADER */}
      <header
        className="header"
        onMouseEnter={fadeInAudio}
        onMouseLeave={fadeOutAudio}
      >
        <img src="/media/image1.png" alt="City" className="header-img" />
      </header>

      {/* NAV */}
      <nav className="nav">
        <a href="#activities">Activities</a>
        <a href="#places">Places to Visit</a>
        <a href="#traditions">Traditions & Celebrations</a>
        <a href="#gastronomy">Gastronomy & Restaurants</a>
      </nav>

      {/* ACTIVITIES */}
      <section id="activities" className="section">
        <h2>Activities</h2>
        <div className="activities">
          <div className="activity-card">
            <h3>Sailing, Kayak & Paddle Surf</h3>
            <img src="/media/activity1.png" alt="Activity" />
            <p>Guided nautical activities in small groups, organized by local experts.</p>
          </div>

          <div className="activity-card">
            <h3>Excursion to Tossa de Mar</h3>
            <img src="/media/activity2.png" alt="Activity" />
            <p>Visit the medieval castle with a guide and discover its history.</p>
          </div>

          <div className="activity-card">
            <h3>Santa Clotilde's Gardens</h3>
            <img src="/media/activity3.png" alt="Activity" />
            <p>Peaceful gardens overlooking the sea, a paradise for nature lovers.</p>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* PLACES */}
      <section id="places" className="section">
        <h2>Places to Visit</h2>
        <div className="places">
          <div className="place-card">
            <h3>Castell d'en Plaja</h3>
            <img src="/media/place1.png" alt="Place" />
            <p>Historic castle with panoramic views, tours offered with VR.</p>
          </div>

          <div className="place-card">
            <h3>Dona Marinera</h3>
            <img src="/media/place2.png" alt="Place" />
            <p>Iconic maritime statue of cultural significance.</p>
          </div>

          <div className="place-card">
            <h3>Museu del Mar</h3>
            <img src="/media/place3.png" alt="Place" />
            <p>Interactive maritime museum, which unravels the history of the sea.</p>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* TRADITIONS */}
      <section id="traditions" className="section">
        <h2>Traditions & Celebrations</h2>
        <div className="traditions">
          <div className="tradition-card">
            <h3>Festa Major de Santa Cristina</h3>
            <img src="/media/tradition1.png" alt="Tradition" />
            <p>Local festival with rowing competitions, along with dinners, songs and more.</p>
          </div>

          <div className="tradition-card">
            <h3>Ball de Plaça</h3>
            <img src="/media/tradition2.png" alt="Tradition" />
            <p>Traditional catalan dancing, in which the whole town participates.</p>
          </div>

          <div className="tradition-card">
            <h3>Fira Medieval</h3>
            <img src="/media/tradition3.png" alt="Tradition" />
            <p>Medieval fair with crafts and food.</p>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* GASTRONOMY */}
      <section id="gastronomy" className="section">
        <h2>Gastronomy & Restaurants</h2>
        <div className="gastronomy">
          <a
            href="https://www.instagram.com/sybius/?hl=es"
            target="_blank"
            rel="noopener noreferrer"
            className="card-link"
          >
            <div className="gastronomy-card">
              <h3>Sybius – Cala Canyelles</h3>
              <img src="/media/gastronomy1.png" alt="Restaurant" />
              <p>Specialized Mediterranean cuisine with seafood, with magnificent views of the sea.</p>
            </div>
          </a>

          <a
            href="https://cansabata.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="card-link"
          >
            <div className="gastronomy-card">
              <h3>Can Sabata</h3>
              <img src="/media/gastronomy2.png" alt="Restaurant" />
              <p>High-quality local meats, more oriented to tradicional Spanish dishes.</p>
            </div>
          </a>

          <a
            href="https://www.casamarles.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="card-link"
          >
            <div className="gastronomy-card">
              <h3>Casa Marlés</h3>
              <img src="/media/gastronomy3.png" alt="Restaurant" />
              <p>Cozy place famous for desserts. A great social space to hangout. </p>
            </div>
          </a>
        </div>
      </section>

      {/* VIDEO */}
      <section className="video-section">
        <video ref={videoRef} src="/media/promo.mp4" controls muted width="70%" />
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>Àlex Flores García, Finale for Multimedia</p>
      </footer>
    </div>
  );
}

export default App;
