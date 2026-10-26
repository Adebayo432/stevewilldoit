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
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const homeHref = (section: string) =>
    location.pathname === "/" ? `#${section}` : `/#${section}`;
  const closeMenu = () => setMenuOpen(false);
  const navigateToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    section: string,
  ) => {
    closeMenu();
    if (location.pathname !== "/") return;
    event.preventDefault();
    window.history.pushState(null, "", `#${section}`);
    const target = document.getElementById(section);
    if (!target) return;
    const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  };

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
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>
      <nav
        className={`site-nav ${menuOpen ? "is-open" : ""}`}
        id="primary-navigation"
        aria-label="Main navigation"
      >
        <a href={homeHref("home")} onClick={(event) => navigateToSection(event, "home")}>Home</a>
        <a href={homeHref("offer")} onClick={(event) => navigateToSection(event, "offer")}>The offer</a>
        <a href={homeHref("giveaway-tracker")} onClick={(event) => navigateToSection(event, "giveaway-tracker")}>7% giveaways</a>
        <a href={homeHref("games")} onClick={(event) => navigateToSection(event, "games")}>Games</a>
        <a href={homeHref("community")} onClick={(event) => navigateToSection(event, "community")}>Community</a>
        <NavLink to="/story" onClick={closeMenu}>Steve’s world</NavLink>
      </nav>
      <ExternalLink className="header-follow header-join" href={gamdomLink}>
        <span className="join-code-label">PLAY ON GAMDOM · CODE </span>STEVE{" "}
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

function CopyCodeButton() {
  const [copied, setCopied] = useState(false);
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText("STEVE");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copy Steve’s Gamdom code:", "STEVE");
    }
  };

  return (
    <button className={`copy-code-button ${copied ? "is-copied" : ""}`} onClick={copyCode} type="button">
      {copied ? "Copied!" : "Copy code"}
      <span aria-hidden="true">{copied ? "✓" : "▣"}</span>
    </button>
  );
}

function GiveawayCountdown() {
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const nextDrop = new Date(now);
      const daysUntilFriday = (5 - now.getDay() + 7) % 7 || 7;
      nextDrop.setDate(now.getDate() + daysUntilFriday);
      nextDrop.setHours(18, 0, 0, 0);
      const delta = Math.max(0, nextDrop.getTime() - now.getTime());
      setRemaining({
        days: Math.floor(delta / 86400000),
        hours: Math.floor((delta / 3600000) % 24),
        minutes: Math.floor((delta / 60000) % 60),
        seconds: Math.floor((delta / 1000) % 60),
      });
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="countdown" aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes until the next estimated community drop window`}>
      {([ ["days", remaining.days], ["hrs", remaining.hours], ["min", remaining.minutes], ["sec", remaining.seconds] ] as const).map(([label, value]) => (
        <div className="countdown-unit" key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>
      ))}
    </div>
  );
}

const campaignGames = [
  { name: "Slots", code: "01", detail: "Spin into the lobby" },
  { name: "Crash", code: "02", detail: "Pick your moment" },
  { name: "Live Blackjack", code: "03", detail: "Take a seat" },
  { name: "Roulette", code: "04", detail: "Round after round" },
  { name: "High Roller", code: "05", detail: "VIP tables" },
];

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
      <section className="hero-section gamdom-hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">
            <span />
            STEVE WILL DO IT × GAMDOM
          </p>
          <h1>
            PLAY LIKE STEVE
            <br />
            <em>ON GAMDOM.</em>
          </h1>
          <p className="hero-subtitle">The GAMDOMafia is calling.</p>
          <p className="hero-description">
            Use code <strong>STEVE</strong> for the partnership offer, community
            events, and a shot at Steve’s VIP perks. Check current eligibility
            and terms on Gamdom before you play.
          </p>
          <div className="hero-actions">
            <ExternalLink className="button button-gold" href={gamdomLink}>
              Claim Gamdom offer · STEVE <span>↗</span>
            </ExternalLink>
            <ExternalLink className="button button-quiet" href="https://kick.com/stevewilldoit">
              Steve on Kick <span>↗</span>
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

      <section className="offer-section content-section" id="offer">
        <div className="offer-copy">
          <SectionTitle kicker="The Steve offer" text="Join through Steve’s referral link and enter the code during signup, where applicable.">Your code. Your crew.</SectionTitle>
          <div className="promo-card">
            <div><span className="promo-label">PROMO CODE</span><strong>STEVE</strong></div>
            <CopyCodeButton />
          </div>
          <ExternalLink className="button button-gold" href={gamdomLink}>Play on Gamdom <span>↗</span></ExternalLink>
        </div>
        <div className="offer-perks">
          <p className="eyebrow"><span />PARTNERSHIP PERKS</p>
          <article><span>01</span><div><strong>Rakeback boost</strong><small>15% instant boost* </small></div><b>↗</b></article>
          <article><span>02</span><div><strong>Weekly raffles</strong><small>Community drops*</small></div><b>↗</b></article>
          <article><span>03</span><div><strong>Exclusive tip-outs</strong><small>Eligibility and selection apply*</small></div><b>↗</b></article>
          <small className="terms-note">*Offer details, availability, and eligibility must be confirmed in Gamdom’s current terms. No outcome is guaranteed.</small>
        </div>
      </section>

      <section className="gamdom-benefits content-section" id="games">
        <SectionTitle
          kicker="Steve’s game room"
          text="Explore the categories shown on Gamdom. Availability and game terms vary by location."
        >
          Steve’s favorite games.
        </SectionTitle>
        <div className="game-grid">
          {campaignGames.map((game) => (
            <ExternalLink className="game-card" href={gamdomLink} key={game.code}>
              <span>{game.code} / GAMDOM</span><strong>{game.name}</strong><small>{game.detail}</small><b aria-hidden="true">↗</b>
            </ExternalLink>
          ))}
        </div>
      </section>

      <section className="giveaway-section content-section" id="giveaway-tracker">
        <div className="giveaway-heading">
          <SectionTitle kicker="The 7% community promise" text="A campaign promise: 7% of Steve’s Gamdom withdrawals go back to the community, subject to the published giveaway terms.">When Steve cashes out,<br />the community gets love.</SectionTitle>
          <div className="promise-stamp"><strong>7<span>%</span></strong><small>GIVE BACK</small></div>
        </div>
        <div className="tracker-grid">
          <article><span>COMMUNITY GIVEAWAYS</span><strong>$7,500,000+</strong><small>Campaign figure · verify before publishing</small></article>
          <article><span>CODE SIGNUPS</span><strong>11,000+</strong><small>Campaign figure · verify before publishing</small></article>
          <article className="tracker-countdown"><span>NEXT COMMUNITY DROP WINDOW</span><GiveawayCountdown /><small>Estimated weekly countdown only; not a confirmed draw time.</small></article>
        </div>
        <p className="giveaway-disclaimer">Totals and scheduling are supplied campaign figures and should be confirmed against current official information. Giveaway eligibility and rules apply. 18+ only.</p>
      </section>

      <section className="steve-world-section content-section" id="steve-world">
        <div className="steve-world-copy">
          <SectionTitle kicker="Who is SteveWillDoIt?">Full-send energy.<br />Big-hearted moves.</SectionTitle>
          <p>NELK Boys legend, viral challenge-maker, and a creator known for making every moment feel larger than life. From supercar surprises to huge community giveaways, Steve’s world is about going all in and bringing the crew along.</p>
          <ExternalLink className="text-link" href="https://kick.com/stevewilldoit">Watch Steve on Kick <span>↗</span></ExternalLink>
        </div>
        <div className="moment-grid">
          <article><span>CLASSIC MOMENT / 01</span><strong>Buying friends supercars</strong><small>Big reveal. Bigger reaction.</small></article>
          <article><span>LIVE ENERGY / 02</span><strong>$100K+ slot hits on Kick</strong><small>High-stakes moments, live.</small></article>
        </div>
      </section>

      <section className="kick-section content-section" id="community">
        <div className="kick-live-mark"><span />KICK / STEVEWILLDOIT</div>
        <div><p className="eyebrow"><span />LIVE & IN THE MIX</p><h2>Catch the next stream.</h2><p>Drop into Steve’s Kick channel for live sessions, big reactions, and community moments.</p></div>
        <ExternalLink className="button button-live" href="https://kick.com/stevewilldoit">Open Steve’s Kick <span>↗</span></ExternalLink>
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

      <section className="vip-section content-section">
        <SectionTitle kicker="VIP transfer & creator tip-outs" text="Ask Gamdom support whether your current Roobet or Stake VIP tier qualifies for a match. Approval, requirements, and availability are determined by Gamdom.">Bring your status.<br />Meet the crew.</SectionTitle>
        <div className="vip-grid">
          <article><span>HIGH ROLLERS</span><h3>Ask about a VIP match.</h3><p>Coming from Roobet or Stake? Contact Gamdom support with proof of your current VIP tier and ask whether a match is available. Approval and requirements are decided by Gamdom.</p><ExternalLink className="text-link" href={gamdomLink}>Ask Gamdom support <span>↗</span></ExternalLink></article>
          <CreatorApplication />
        </div>
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

function CreatorApplication() {
  const submitApplication = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent("Creator tip-out application · Code STEVE");
    const body = encodeURIComponent(`Name: ${form.get("creatorName")}\nChannel: ${form.get("creatorChannel")}\nAudience: ${form.get("creatorAudience")}\n\nPlease share your content and campaign details.`);
    window.location.href = `mailto:business@stevewilldoit.com?subject=${subject}&body=${body}`;
  };

  return (
    <article className="creator-apply-card">
      <span>SMALLER CREATORS</span><h3>Make something worth sharing.</h3>
      <p>Send your channel and audience details to ask about a creator tip-out. Selection and availability apply.</p>
      <form onSubmit={submitApplication}>
        <label>Name<input name="creatorName" autoComplete="name" required /></label>
        <label>Channel link<input name="creatorChannel" type="url" placeholder="https://" required /></label>
        <label>Audience size<input name="creatorAudience" inputMode="numeric" /></label>
        <button className="button button-gold" type="submit">Prepare application <span>↗</span></button>
      </form>
      <small className="terms-note">Opens your email app; no data is sent by this page.</small>
    </article>
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
