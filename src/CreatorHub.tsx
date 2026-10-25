import { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./CreatorHub.css";

const ExperienceScene = lazy(() => import("./ExperienceScene"));

const links = [
  {
    label: "YouTube",
    note: "Main channel",
    href: "https://www.youtube.com/@stevewilldoit",
  },
  {
    label: "YouTube Extra",
    note: "More Steve",
    href: "https://www.youtube.com/@SteveWillDoItExtra",
  },
  {
    label: "Instagram",
    note: "Behind the scenes",
    href: "https://www.instagram.com/stevewilldoit/",
  },
  { label: "X", note: "Latest updates", href: "https://x.com/stevewilldoit" },
  { label: "Kick", note: "Live", href: "https://kick.com/stevewilldoit" },
  {
    label: "TikTok",
    note: "Shorts & clips",
    href: "https://www.tiktok.com/@stevewilldoit",
  },
];

const referralCode = "steve";
const gamdomLink = `https://gamdom.com/?r=${referralCode}`;

const videos = [
  {
    title: "Paying off 6ix9ine’s IRS",
    id: "JAYOBkmt03o",
    label: "The latest big swing",
  },
  {
    title: "Betting $1,000,000 per hand",
    id: "Ysqogv_xZ54",
    label: "High stakes",
  },
  { title: "I’m back on YouTube", id: "QoWcyYk2occ", label: "The return" },
  {
    title: "Welcome to Steve’s Island",
    id: "tc3AHGsroqQ",
    label: "The big vision",
  },
];

const brands = [
  { name: "GAMDOM", tag: "High-stakes era", href: "/gamdom", internal: true },
  {
    name: "HAPPY DAD",
    tag: "Built with the crew",
    href: "https://happydad.com/",
  },
  {
    name: "MOTION",
    tag: "Everyday carry",
    href: "https://www.motionpouches.com/",
  },
];

function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function ScenePanel({
  mode = "hero",
  interactive = false,
  className = "",
}: {
  mode?: "hero" | "colosseum" | "giveaways";
  interactive?: boolean;
  className?: string;
}) {
  return (
    <div className={`scene-panel ${className}`}>
      <div className="arena-fallback" aria-hidden="true">
        {[0, 1, 2].map((tier) => (
          <div className={`arena-tier arena-tier-${tier + 1}`} key={tier}>
            {Array.from({ length: 12 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
        ))}
        <div className="arena-platform" />
      </div>
      <Suspense fallback={<div className="scene-fallback" />}>
        <ExperienceScene mode={mode} interactive={interactive} />
      </Suspense>
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <Link className="site-logo" to="/" aria-label="Steve Will Do It home">
        <span className="gamdom-mark" aria-hidden="true">
          <span />
        </span>
        <span className="logo-name">
          GAMDOM<span className="logo-subname"> × STEVE</span>
        </span>
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        <NavLink to="/gamdom">Gamdom</NavLink>
        <NavLink to="/story">The legend</NavLink>
        <NavLink to="/giveaways">Giveaways</NavLink>
        <NavLink to="/colosseum">Colosseum</NavLink>
      </nav>
      <ExternalLink className="header-follow header-join" href={gamdomLink}>
        <span className="join-code-label">Join with code </span>STEVE{" "}
        <span>↗</span>
      </ExternalLink>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <Link className="site-logo" to="/">
          <span className="gamdom-mark" aria-hidden="true">
            <span />
          </span>
          <span className="logo-name">
            GAMDOM<span className="logo-subname"> × STEVE</span>
          </span>
        </Link>
        <p>Big swings. Your game. Your call.</p>
        <div className="footer-socials">
          {links.map((link) => (
            <ExternalLink key={link.label} href={link.href}>
              {link.label}
            </ExternalLink>
          ))}
          <ExternalLink href="https://www.motionpouches.com/">
            Motion Pouches
          </ExternalLink>
        </div>
      </div>
      <div className="footer-legal">
        <span>
          Fan-made site. Not officially affiliated with Steve Will Do It or the
          brands mentioned.
        </span>
        <ExternalLink href="mailto:business@stevewilldoit.com">
          Business inquiries ↗
        </ExternalLink>
      </div>
    </footer>
  );
}

function PageFrame({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [showJoinPopup, setShowJoinPopup] = useState(false);

  useEffect(
    () => window.scrollTo({ top: 0, behavior: "smooth" }),
    [location.pathname],
  );

  useEffect(() => {
    if (sessionStorage.getItem("gamdom-join-popup-dismissed")) return;
    const timer = window.setTimeout(() => setShowJoinPopup(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showJoinPopup) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowJoinPopup(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [showJoinPopup]);

  const dismissJoinPopup = () => {
    sessionStorage.setItem("gamdom-join-popup-dismissed", "true");
    setShowJoinPopup(false);
  };

  return (
    <div className="hub-shell">
      <Header />
      {children}
      <Footer />
      {showJoinPopup && (
        <div
          className="join-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) dismissJoinPopup();
          }}
        >
          <section
            className="join-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="join-dialog-title"
          >
            <button
              className="join-close"
              onClick={dismissJoinPopup}
              aria-label="Close join invitation"
            >
              ×
            </button>
            <span className="dialog-mark" aria-hidden="true">
              <span />
            </span>
            <p className="eyebrow">
              <span />
              THE GAMDOMAFIA
            </p>
            <h2 id="join-dialog-title">Join the mob.</h2>
            <p className="join-dialog-copy">
              Ready to play? Head to Gamdom and enter code{" "}
              <strong>STEVE</strong>.
            </p>
            <ExternalLink
              className="button button-gold join-dialog-cta"
              href={gamdomLink}
            >
              Join Gamdom <span>↗</span>
            </ExternalLink>
            <p className="join-dialog-note">
              18+ only. Gamble responsibly. Set limits and never play with money
              you can’t afford to lose.
            </p>
          </section>
        </div>
      )}
    </div>
  );
}

function SectionTitle({
  kicker,
  children,
  text,
}: {
  kicker: string;
  children: React.ReactNode;
  text?: string;
}) {
  return (
    <div className="section-title">
      <p className="eyebrow">
        <span />
        {kicker}
      </p>
      <h2>{children}</h2>
      {text && <p className="section-intro">{text}</p>}
    </div>
  );
}

function VideoGrid({ limit }: { limit?: number }) {
  const shownVideos = limit ? videos.slice(0, limit) : videos;
  return (
    <div className="video-grid">
      {shownVideos.map((video, index) => (
        <ExternalLink
          className={`video-tile video-tile-${index + 1}`}
          key={video.id}
          href={`https://www.youtube.com/watch?v=${video.id}`}
        >
          <img
            src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
          />
          <span className="play-mark" aria-hidden="true">
            ▶
          </span>
          <span className="video-meta">
            <small>{video.label}</small>
            <strong>{video.title}</strong>
          </span>
        </ExternalLink>
      ))}
    </div>
  );
}

function HomePage() {
  return (
    <main>
      <GamdomLanding />
    </main>
  );
}

function VideoDropzone() {
  return (
    <div className="video-upload-section" id="add-video">
      <video
        className="hosted-video"
        src="/videos/jointhemob.mp4"
        controls
        playsInline
        preload="metadata"
      >
        Your browser does not support embedded video.
      </video>
    </div>
  );
}

function GamdomLanding() {
  return (
    <>
      <section className="hero-section gamdom-hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span />
            STEVE WILL DO IT × GAMDOM
          </p>
          <h1>
            PLAY BIG.
            <br />
            <em>STAY SHARP.</em>
          </h1>
          <p className="hero-subtitle">The GAMDOMafia is calling.</p>
          <p className="hero-description">
            Casino, sports, and live action. Bring your crew, find your game,
            and keep it fun. Join through Steve’s link with code{" "}
            <strong>STEVE</strong>.
          </p>
          <div className="hero-actions">
            <ExternalLink className="button button-gold" href={gamdomLink}>
              Join Gamdom <span>↗</span>
            </ExternalLink>
          </div>
          <div className="hero-signoff">
            <span className="live-dot" /> YOUR CREW{" "}
            <span className="signoff-rule" /> YOUR GAME
          </div>
        </div>
        <div
          className="hero-art gamdom-hero-art"
          aria-label="Animated Gamdom-inspired metallic scene"
        >
          <ScenePanel className="hero-scene" />
          <span className="art-coordinate">GAMDOMAFIA · EST. FULL SEND</span>
          <span className="art-caption">
            THE GAME STARTS
            <br />
            <b>WHEN YOU JOIN THE MOB</b>
          </span>
        </div>
        <div className="hero-scroll">
          SCROLL TO EXPLORE <span>↓</span>
        </div>
      </section>

      <section className="gamdom-benefits content-section">
        <SectionTitle
          kicker="Inside Gamdom"
          text="A quick look at what’s in the mix. Check the current terms and availability on Gamdom."
        >
          Pick your lane.
        </SectionTitle>
        <div className="benefit-grid">
          <article>
            <span>01 / CASINO</span>
            <h3>Tables & games</h3>
            <p>Explore the casino lobby and choose what fits your session.</p>
          </article>
          <article>
            <span>02 / SPORTS</span>
            <h3>Live action</h3>
            <p>Follow the matchups and markets you care about.</p>
          </article>
          <article>
            <span>03 / COMMUNITY</span>
            <h3>Bring your crew</h3>
            <p>Make it social, keep it fun, and set your own limits.</p>
          </article>
        </div>
      </section>

      <section className="gamdom-video content-section" id="join-mob">
        <div className="gamdom-video-heading">
          <SectionTitle kicker="GAMDOMafia">Join the mob.</SectionTitle>
          <ExternalLink className="text-link" href="https://x.com/sirGamby">
            @sirGamby on X <span>↗</span>
          </ExternalLink>
        </div>
        <p className="gamdom-video-caption">One crew. One code. All gas.</p>
        <VideoDropzone />
      </section>

      <section className="brands-section content-section gamdom-brands">
        <SectionTitle kicker="Steve’s world">More from the crew.</SectionTitle>
        <BrandStrip />
      </section>

      <section className="gamdom-bottom-cta content-section">
        <span className="gamdom-mark gamdom-mark-large" aria-hidden="true">
          <span />
        </span>
        <p className="eyebrow">
          <span />
          REFERRAL CODE: STEVE
        </p>
        <h2>Join the mob.</h2>
        <ExternalLink className="button button-gold" href={gamdomLink}>
          Go to Gamdom <span>↗</span>
        </ExternalLink>
        <small>
          18+ only. Gambling involves risk. Please play responsibly.
        </small>
      </section>
    </>
  );
}

function BrandStrip() {
  return (
    <div className="brand-strip">
      {brands.map((brand) =>
        brand.internal ? (
          <Link className="brand-item" key={brand.name} to={brand.href}>
            <strong>{brand.name}</strong>
            <small>{brand.tag}</small>
            <span>↗</span>
          </Link>
        ) : (
          <ExternalLink
            className="brand-item"
            key={brand.name}
            href={brand.href}
          >
            <strong>{brand.name}</strong>
            <small>{brand.tag}</small>
            <span>↗</span>
          </ExternalLink>
        ),
      )}
    </div>
  );
}

function StoryPage() {
  const chapters = [
    [
      "01",
      "Instagram days",
      "The stunts were raw, ridiculous, and impossible to scroll past. The energy was there from the jump.",
    ],
    [
      "02",
      "The NELK chapter",
      "A bigger crew, bigger ideas, and a platform for doing things at full volume.",
    ],
    [
      "03",
      "No half measures",
      "Extreme challenges and big moments made the name. The generosity behind them made them matter.",
    ],
    [
      "04",
      "Give it away",
      "Cash, cars, watches, and moments people remember. The best part is getting to share the win.",
    ],
  ];
  return (
    <main className="inner-page story-page">
      <PageMasthead
        label="The legend"
        title={
          <>
            Never did
            <br />
            <em>small.</em>
          </>
        }
        intro="A camera, a wild idea, and the nerve to go all in. The rest is history still being written."
      />
      <section className="story-timeline content-section">
        {chapters.map(([number, title, body]) => (
          <article className="timeline-row" key={number}>
            <span>{number}</span>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>
      <section className="story-media content-section">
        <SectionTitle kicker="The archive">
          The moments that made the legend.
        </SectionTitle>
        <VideoGrid />
      </section>
      <section className="page-cta content-section">
        <p className="eyebrow">
          <span />
          Still going
        </p>
        <h2>The next chapter is always the biggest.</h2>
        <Link className="button button-gold" to="/colosseum">
          See what’s next <span>↗</span>
        </Link>
      </section>
    </main>
  );
}

function PageMasthead({
  label,
  title,
  intro,
}: {
  label: string;
  title: React.ReactNode;
  intro: string;
}) {
  return (
    <section className="page-masthead">
      <p className="eyebrow">
        <span />
        {label}
      </p>
      <h1>{title}</h1>
      <p>{intro}</p>
    </section>
  );
}

function GiveawaysPage() {
  return (
    <main className="inner-page giveaways-page">
      <PageMasthead
        label="Giveaways & generosity"
        title={
          <>
            Make it big.
            <br />
            <em>Give it bigger.</em>
          </>
        }
        intro="The stunts get the clip. The generosity is what stays with people."
      />
      <section className="giveaways-feature content-section">
        <ScenePanel mode="giveaways" className="giveaway-scene" />
        <div className="giveaways-copy">
          <p className="eyebrow">
            <span />
            The point is to share it
          </p>
          <h2>
            Cash. Cars. Watches.
            <br />
            Real reactions.
          </h2>
          <p>
            Over-the-top prizes, unexpected moments, and the kind of generosity
            that turns a wild video into somebody’s life story. No fake tally.
            Just the spirit of giving big.
          </p>
          <ExternalLink
            className="button button-gold"
            href="https://www.youtube.com/@stevewilldoit"
          >
            Watch the giveaways <span>↗</span>
          </ExternalLink>
        </div>
      </section>
      <section className="giveaway-types content-section">
        <div>
          <span>01</span>
          <h3>Cash drops</h3>
          <p>Life-changing money, handed over with the full-send energy.</p>
        </div>
        <div>
          <span>02</span>
          <h3>Dream rides</h3>
          <p>Cars that make the reveal worth rewinding.</p>
        </div>
        <div>
          <span>03</span>
          <h3>Wrist pieces</h3>
          <p>Big watches for moments that deserve to be remembered.</p>
        </div>
      </section>
      <section className="giveaway-video content-section">
        <SectionTitle kicker="Watch the moments">
          It hits different when you see it.
        </SectionTitle>
        <VideoGrid limit={3} />
      </section>
    </main>
  );
}

function ColosseumPage() {
  const projects = [
    "House renovation",
    "Dog foundation",
    "Bat cave",
    "Padel court",
  ];
  return (
    <main className="inner-page colosseum-page">
      <PageMasthead
        label="Road to Colosseum · Nicaragua"
        title={
          <>
            A wild idea.
            <br />
            <em>A real place.</em>
          </>
        }
        intro="The land is his. The vision is bigger than a build. And, in Steve’s words, the Colosseum is 100000% happening."
      />
      <section className="colosseum-model-section content-section">
        <div className="colosseum-model-copy">
          <p className="eyebrow">
            <span />
            The long game
          </p>
          <h2>
            Not a render.
            <br />A real ambition.
          </h2>
          <p>
            A destination built from the ground up: part spectacle, part
            community, part proof that an absurd idea can become a real place.
          </p>
        </div>
        <ScenePanel
          mode="colosseum"
          interactive
          className="colosseum-main-scene"
        />
        <div className="model-index">NICARAGUA / PROJECT 01</div>
      </section>
      <section className="project-list content-section">
        <SectionTitle
          kicker="Parallel builds"
          text="The Colosseum is the headline, but there are other pieces moving at the same time."
        >
          A whole world in progress.
        </SectionTitle>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article key={project}>
              <span>0{index + 1}</span>
              <h3>{project}</h3>
              <p>
                {index === 0
                  ? "Getting the home base ready."
                  : index === 1
                    ? "A foundation for the dogs, built alongside the bigger vision."
                    : index === 2
                      ? "An underground project with its own production story."
                      : "A place for competition and community."}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="update-panel content-section">
        <div className="update-date">
          <span className="live-dot" />
          LATEST CONTEXT <strong>LATE OCTOBER 2026</strong>
        </div>
        <div className="update-copy">
          <p className="eyebrow">A quick status check</p>
          <h2>
            First, finish the next pieces.
            <br />
            <em>Then head to Nicaragua.</em>
          </h2>
          <p>
            In a late-October update, Steve said the house renovation and dog
            foundation were expected to wrap in about two weeks, then he planned
            to head to Nicaragua. That was his stated estimate at the time, not
            a confirmed completion date.
          </p>
          <blockquote>“100000% happening.”</blockquote>
          <div className="update-links">
            <ExternalLink href="https://x.com/stevewilldoit/status/2107528560013377742">
              Bat cave production ↗
            </ExternalLink>
            <ExternalLink href="https://x.com/stevewilldoit/status/2112188274349592721">
              Colosseum lifestyle post ↗
            </ExternalLink>
          </div>
        </div>
      </section>
      <section className="colosseum-video content-section">
        <SectionTitle kicker="Project updates">
          See the vision in motion.
        </SectionTitle>
        <VideoGrid limit={1} />
      </section>
    </main>
  );
}

function GamdomPage() {
  return <HomePage />;
}

export default function CreatorHub() {
  return (
    <BrowserRouter>
      <PageFrame>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/giveaways" element={<GiveawaysPage />} />
          <Route path="/colosseum" element={<ColosseumPage />} />
          <Route path="/gamdom" element={<GamdomPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </PageFrame>
    </BrowserRouter>
  );
}
