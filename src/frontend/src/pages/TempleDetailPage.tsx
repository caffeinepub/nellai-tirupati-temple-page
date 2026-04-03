import { Link } from "@tanstack/react-router";
import {
  ArrowUp,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Flame,
  Home,
  Sparkles,
  Star,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const YEAR = new Date().getFullYear();
const CAFFEINE_HREF = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

// ── Static data ───────────────────────────────────────────────────────────────

const SEVAS = [
  {
    name: "Archana",
    desc: "Offering of flowers with chanting of 108 divine names of the Lord",
  },
  {
    name: "Sahasranama Archana",
    desc: "Grand archana with the recitation of 1000 sacred names",
  },
  {
    name: "Annadhana",
    desc: "Sacred offering of food to all devotees — a meritorious act of charity",
  },
  {
    name: "Sarva Alankaram",
    desc: "Full divine adornment of the deity with flowers, garlands, and jewels",
  },
  {
    name: "Oonjal",
    desc: "Swing seva — the Lord is ceremonially placed on a decorated swing",
  },
  {
    name: "Abhishekam",
    desc: "Sacred bathing of the deity with milk, honey, rose water, and sacred substances",
  },
  {
    name: "Kalyana Utsavam",
    desc: "Divine celestial wedding ceremony of the Lord with His consorts",
  },
];

const HOMAMS = [
  {
    name: "Mrityunjaya Homam",
    desc: "For health, longevity, and protection from illness",
  },
  {
    name: "Mahashanthi Homam",
    desc: "For peace, harmony, and removal of doshas",
  },
  { name: "Ayushya Homam", desc: "For long life and wellbeing" },
  {
    name: "Navagraha Homam",
    desc: "For planetary peace and removing obstacles",
  },
  {
    name: "Parihara Homam",
    desc: "Customized rituals for specific doshas",
  },
];

const FESTIVALS = [
  {
    name: "Purattasi Garuda Seva",
    desc: "Grand Garuda Vahana procession during Purattasi month",
  },
  {
    name: "Vaikunta Ekadasi",
    desc: "Opening of Swarga Vaasal — special darshan for moksha seekers",
  },
  {
    name: "Margazhi Festival",
    desc: "Daily early morning special poojas throughout the auspicious Margazhi month",
  },
  {
    name: "Deepavali 10-Day Dolotsavam",
    desc: "Ten-day swing festival celebrating the divine glory during Deepavali season",
  },
];

const FIVE_FACES = [
  {
    face: "Hanuman",
    direction: "East",
    icon: "🐒",
    blessings: [
      "Grants courage, devotion & strength",
      "Removes fear and enemies",
    ],
  },
  {
    face: "Narasimha",
    direction: "South",
    icon: "🦁",
    blessings: [
      "Destroys evil forces & negativity",
      "Grants fearlessness and protection",
    ],
  },
  {
    face: "Garuda",
    direction: "West",
    icon: "🦅",
    blessings: [
      "Removes poison, black magic & evil eye",
      "Grants swift divine blessings",
    ],
  },
  {
    face: "Varaha",
    direction: "North",
    icon: "🐗",
    blessings: [
      "Grants prosperity & land/property blessings",
      "Removes Vastu doshas",
    ],
  },
  {
    face: "Hayagriva",
    direction: "Upward (Urdhva)",
    icon: "🐴",
    blessings: [
      "Grants wisdom, knowledge & intelligence",
      "Blesses education, exams & speech",
    ],
  },
];

// ── Section Navigator Data ────────────────────────────────────────────────────

const NAV_SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "sthalapuranam", label: "Sacred History" },
  { id: "deities", label: "Deities" },
  { id: "sevas", label: "Sevas" },
  { id: "homams-festivals", label: "Homams & Festivals" },
  { id: "significance", label: "Significance" },
  { id: "panchamukha", label: "Panchamukha" },
  { id: "five-faces", label: "Five Faces" },
  { id: "offerings", label: "Offerings" },
];

// ── Floating Section Navigator ────────────────────────────────────────────────

function SectionNav() {
  const [activeId, setActiveId] = useState<string>("hero");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const entries = new Map<string, number>();

    observerRef.current = new IntersectionObserver(
      (observed) => {
        for (const entry of observed) {
          entries.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId = "hero";
        let bestRatio = 0;
        for (const [id, ratio] of entries.entries()) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestRatio > 0) {
          setActiveId(bestId);
        }
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0] },
    );

    const observer = observerRef.current;
    for (const section of NAV_SECTIONS) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Section navigation"
      data-ocid="temple.section_nav.panel"
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-0"
    >
      {NAV_SECTIONS.map((section, index) => {
        const isActive = activeId === section.id;
        const isHovered = hoveredId === section.id;
        const isLast = index === NAV_SECTIONS.length - 1;

        return (
          <div key={section.id} className="flex flex-col items-center">
            <div className="relative flex items-center group">
              {isHovered && (
                <div
                  className="absolute right-full mr-3 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none"
                  style={{
                    background: "oklch(0.384 0.085 155)",
                    color: "oklch(0.974 0.012 80)",
                    boxShadow: "0 4px 16px oklch(0.384 0.085 155 / 0.35)",
                    border: "1px solid oklch(0.710 0.115 73 / 0.3)",
                    animation: "fadeInLeft 0.15s ease",
                  }}
                >
                  {section.label}
                  <span
                    style={{
                      position: "absolute",
                      right: "-5px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 0,
                      height: 0,
                      borderTop: "5px solid transparent",
                      borderBottom: "5px solid transparent",
                      borderLeft: "5px solid oklch(0.384 0.085 155)",
                    }}
                  />
                </div>
              )}

              <button
                type="button"
                data-ocid={`temple.section_nav.item.${index + 1}`}
                aria-label={`Go to ${section.label}`}
                onClick={() => handleClick(section.id)}
                onMouseEnter={() => setHoveredId(section.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  width: isActive ? "14px" : "10px",
                  height: isActive ? "14px" : "10px",
                  borderRadius: "50%",
                  border: isActive
                    ? "2px solid oklch(0.710 0.115 73)"
                    : "1.5px solid oklch(0.710 0.115 73 / 0.5)",
                  background: isActive
                    ? "oklch(0.710 0.115 73)"
                    : "oklch(0.974 0.012 80)",
                  boxShadow: isActive
                    ? "0 0 8px oklch(0.710 0.115 73 / 0.6), 0 0 16px oklch(0.710 0.115 73 / 0.3)"
                    : "none",
                  transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  cursor: "pointer",
                  flexShrink: 0,
                  display: "block",
                }}
              />
            </div>

            {!isLast && (
              <div
                style={{
                  width: "1px",
                  height: "14px",
                  background: "oklch(0.710 0.115 73 / 0.3)",
                  flexShrink: 0,
                }}
              />
            )}
          </div>
        );
      })}

      <style>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </nav>
  );
}

// ── Section wrapper with scroll reveal ───────────────────────────────────────

function RevealSection({
  children,
  className = "",
  style,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}) {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      id={id}
      className={`scroll-reveal ${className}`}
      style={style}
    >
      {children}
    </section>
  );
}

// ── Section heading helper ────────────────────────────────────────────────────

function SectionHeading({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="text-center mb-2">
      <h2
        className="font-display text-2xl md:text-3xl font-semibold section-heading-text"
        style={{
          color: light ? "oklch(0.757 0.120 77)" : "oklch(0.384 0.085 155)",
        }}
      >
        {children}
      </h2>
      <div className="gold-divider">
        <span className="gold-divider-dot" />
        <span className="gold-divider-dot" />
        <span className="gold-divider-dot" />
      </div>
    </div>
  );
}

// ── Section Dropdown ────────────────────────────────────────────────────────

function SectionDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSectionClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        data-ocid="temple.sections_dropdown.button"
        aria-label="Open section navigation"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "7px 14px",
          borderRadius: "9999px",
          border: "1.5px solid oklch(0.710 0.115 73 / 0.5)",
          background: "oklch(0.165 0.055 155)",
          color: "oklch(0.710 0.115 73)",
          fontFamily: "PlayfairDisplay, serif",
          fontSize: "0.88rem",
          fontWeight: 600,
          cursor: "pointer",
          letterSpacing: "0.02em",
          transition: "background 0.18s, border-color 0.18s",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "oklch(0.220 0.042 140)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "oklch(0.165 0.055 155)";
        }}
      >
        ✦ Sections
        <span
          style={{
            display: "inline-block",
            transition: "transform 0.2s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            fontSize: "0.75rem",
            lineHeight: 1,
          }}
        >
          ▾
        </span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          data-ocid="temple.sections_dropdown.panel"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            zIndex: 200,
            minWidth: "220px",
            background: "oklch(0.974 0.012 80)",
            border: "1.5px solid oklch(0.710 0.115 73 / 0.35)",
            borderRadius: "14px",
            boxShadow:
              "0 8px 32px oklch(0.165 0.055 155 / 0.18), 0 2px 8px oklch(0 0 0 / 0.12)",
            overflow: "hidden",
            animation: "dropdownFadeIn 0.15s ease",
          }}
        >
          <div
            style={{
              padding: "10px 14px 8px",
              borderBottom: "1px solid oklch(0.882 0.035 84)",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "oklch(0.710 0.115 73)",
              fontWeight: 700,
            }}
          >
            Jump to Section
          </div>
          <nav aria-label="Jump to section">
            {NAV_SECTIONS.map((section, index) => (
              <button
                key={section.id}
                type="button"
                data-ocid={`temple.sections_dropdown.item.${index + 1}`}
                onClick={() => handleSectionClick(section.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                  padding: "10px 16px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.15s",
                  borderBottom:
                    index < NAV_SECTIONS.length - 1
                      ? "1px solid oklch(0.882 0.035 84 / 0.5)"
                      : "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "oklch(0.710 0.115 73 / 0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "transparent";
                }}
              >
                <span
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: "oklch(0.710 0.115 73 / 0.15)",
                    border: "1px solid oklch(0.710 0.115 73 / 0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    color: "oklch(0.600 0.100 73)",
                    flexShrink: 0,
                  }}
                >
                  {index + 1}
                </span>
                <span
                  style={{
                    fontFamily: "PlayfairDisplay, serif",
                    fontSize: "0.88rem",
                    fontWeight: 500,
                    color: "oklch(0.384 0.085 155)",
                  }}
                >
                  {section.label}
                </span>
              </button>
            ))}
          </nav>
        </div>
      )}

      <style>{`
        @keyframes dropdownFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ── Section Progress Indicator ──────────────────────────────────────────────

function SectionProgress() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const entries = new Map<string, number>();

    observerRef.current = new IntersectionObserver(
      (observed) => {
        for (const entry of observed) {
          entries.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId = NAV_SECTIONS[0].id;
        let bestRatio = 0;
        for (const [id, ratio] of entries.entries()) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestRatio > 0) {
          const idx = NAV_SECTIONS.findIndex((s) => s.id === bestId);
          if (idx !== -1) setActiveIndex(idx);
        }
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0] },
    );

    const observer = observerRef.current;
    for (const section of NAV_SECTIONS) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const goTo = (index: number) => {
    const target = NAV_SECTIONS[index];
    if (!target) return;
    const el = document.getElementById(target.id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const canPrev = activeIndex > 0;
  const canNext = activeIndex < NAV_SECTIONS.length - 1;
  const currentSection = NAV_SECTIONS[activeIndex];

  return (
    <div
      data-ocid="temple.section_progress.panel"
      style={{
        position: "fixed",
        bottom: "76px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 49,
        display: "flex",
        alignItems: "center",
        gap: "6px",
        background: "oklch(0.165 0.055 155 / 0.88)",
        border: "1px solid oklch(0.710 0.115 73 / 0.4)",
        borderRadius: "9999px",
        padding: "6px 8px",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 20px oklch(0 0 0 / 0.3)",
        userSelect: "none",
      }}
    >
      {/* Prev arrow */}
      <button
        type="button"
        data-ocid="temple.section_progress.pagination_prev"
        aria-label="Previous section"
        onClick={() => goTo(activeIndex - 1)}
        disabled={!canPrev}
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "1px solid oklch(0.710 0.115 73 / 0.35)",
          background: canPrev
            ? "oklch(0.710 0.115 73 / 0.18)"
            : "oklch(0.710 0.115 73 / 0.05)",
          color: canPrev
            ? "oklch(0.710 0.115 73)"
            : "oklch(0.710 0.115 73 / 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: canPrev ? "pointer" : "default",
          transition: "all 0.2s",
          flexShrink: 0,
        }}
      >
        <ChevronLeft size={15} />
      </button>

      {/* Section label pill */}
      <div
        style={{
          padding: "4px 14px",
          borderRadius: "9999px",
          background: "oklch(0.710 0.115 73 / 0.15)",
          border: "1px solid oklch(0.710 0.115 73 / 0.3)",
          minWidth: "130px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "0.6rem",
            color: "oklch(0.710 0.115 73 / 0.65)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            lineHeight: 1,
            marginBottom: "2px",
          }}
        >
          Section {activeIndex + 1} of {NAV_SECTIONS.length}
        </div>
        <div
          style={{
            fontSize: "0.78rem",
            fontFamily: "PlayfairDisplay, serif",
            fontWeight: 600,
            color: "oklch(0.905 0.025 82)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: 1.3,
          }}
        >
          {currentSection?.label}
        </div>
      </div>

      {/* Next arrow */}
      <button
        type="button"
        data-ocid="temple.section_progress.pagination_next"
        aria-label="Next section"
        onClick={() => goTo(activeIndex + 1)}
        disabled={!canNext}
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "1px solid oklch(0.710 0.115 73 / 0.35)",
          background: canNext
            ? "oklch(0.710 0.115 73 / 0.18)"
            : "oklch(0.710 0.115 73 / 0.05)",
          color: canNext
            ? "oklch(0.710 0.115 73)"
            : "oklch(0.710 0.115 73 / 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: canNext ? "pointer" : "default",
          transition: "all 0.2s",
          flexShrink: 0,
        }}
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function TempleDetailPage() {
  const [showBackTop, setShowBackTop] = useState(false);
  const [showBookSeva, setShowBookSeva] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowBackTop(y > 300);
      setShowBookSeva(y > 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToSevas = () => {
    const el = document.getElementById("sevas");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ fontFamily: "GeneralSans, DMSans, sans-serif" }}
    >
      {/* ═══════════════════════════════════════════════════
          STICKY HEADER
          ═══════════════════════════════════════════════════ */}
      <header
        data-ocid="temple.panel"
        className="sticky top-0 z-50"
        style={{
          background: "oklch(0.974 0.012 80 / 0.97)",
          borderBottom: "1px solid oklch(0.882 0.035 84)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 2px 12px oklch(0.384 0.085 155 / 0.08)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <SectionDropdown />
            <span
              className="font-display font-semibold text-base md:text-lg truncate"
              style={{ color: "oklch(0.384 0.085 155)" }}
            >
              🙏 Nellai Tirupati
            </span>
          </div>
          <Link
            to="/"
            data-ocid="temple.back_link"
            className="inline-flex items-center gap-1.5 text-sm font-medium whitespace-nowrap transition-colors hover:opacity-75"
            style={{ color: "oklch(0.710 0.115 73)" }}
          >
            <Home size={14} />
            Back to Home
          </Link>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════ */}
      <section
        id="hero"
        data-ocid="temple.hero.section"
        className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 py-24"
        style={{
          background:
            "linear-gradient(175deg, oklch(0.165 0.055 155) 0%, oklch(0.220 0.042 140) 40%, oklch(0.268 0.065 118) 100%)",
        }}
      >
        {/* Cartoon temple image overlay — higher opacity than before */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('/assets/generated/temple-hero-cartoon.dim_1920x1080.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.45,
            mixBlendMode: "luminosity",
          }}
        />

        {/* CSS Mandala / lotus pattern overlay */}
        <div className="hero-mandala-overlay" />

        {/* Enhanced radial gold glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 900px 550px at 50% 58%, oklch(0.710 0.115 73 / 0.22) 0%, oklch(0.710 0.115 73 / 0.08) 45%, transparent 70%)",
          }}
        />
        {/* Secondary ambient warm glow at top */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 600px 300px at 50% 10%, oklch(0.757 0.120 77 / 0.10) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-3xl">
          {/* Tamil ornamental header */}
          <p
            className="tracking-[0.30em] uppercase mb-5"
            style={{
              color: "oklch(0.710 0.115 73)",
              fontSize: "clamp(0.75rem, 2vw, 0.95rem)",
              textShadow: "0 0 20px oklch(0.710 0.115 73 / 0.5)",
            }}
          >
            ✦ &nbsp; ஶ்ரீ வேங்கடாசலபதி &nbsp; ✦
          </p>

          <h1
            className="font-display font-bold leading-tight mb-5"
            style={{
              fontSize: "clamp(2.2rem, 6.5vw, 3.8rem)",
              color: "oklch(0.974 0.012 80)",
              textShadow:
                "0 2px 32px oklch(0 0 0 / 0.55), 0 0 60px oklch(0.710 0.115 73 / 0.15)",
            }}
          >
            Nellai Tirupati
            <br />
            <span style={{ color: "oklch(0.757 0.120 77)" }}>
              – Sanyasigramam
            </span>
          </h1>

          {/* Gold horizontal rule between title and subtitle */}
          <div
            className="flex items-center justify-center gap-3 mb-5"
            aria-hidden="true"
          >
            <div
              style={{
                flex: 1,
                maxWidth: 120,
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, oklch(0.710 0.115 73 / 0.8), transparent)",
              }}
            />
            <span
              style={{
                color: "oklch(0.757 0.120 77)",
                fontSize: 14,
                lineHeight: 1,
              }}
            >
              ✦
            </span>
            <div
              style={{
                flex: 1,
                maxWidth: 120,
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, oklch(0.710 0.115 73 / 0.8), transparent)",
              }}
            />
          </div>

          <p
            className="text-base md:text-xl font-light leading-relaxed mb-10"
            style={{
              color: "oklch(0.882 0.035 84 / 0.90)",
              fontStyle: "italic",
            }}
          >
            A Sacred Abode of Sri Prathyaksha Venkatachalapathy Perumal
          </p>

          {/* Decorative star row */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <span style={{ color: "oklch(0.710 0.115 73)", opacity: 0.55 }}>
              ──────
            </span>
            <Star
              size={16}
              fill="oklch(0.710 0.115 73)"
              style={{ color: "oklch(0.710 0.115 73)" }}
            />
            <span style={{ color: "oklch(0.710 0.115 73)", opacity: 0.55 }}>
              ──────
            </span>
          </div>

          {/* Scroll indicator */}
          <div
            data-ocid="temple.hero.scroll_indicator"
            className="flex flex-col items-center gap-2"
          >
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "oklch(0.710 0.115 73 / 0.7)" }}
            >
              Scroll to explore
            </p>
            <div
              className="animate-bounce-gentle"
              style={{ color: "oklch(0.710 0.115 73)" }}
            >
              <ChevronDown size={28} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 2 — STHALAPURANAM  (two-column layout)
          ═══════════════════════════════════════════════════ */}
      <RevealSection
        id="sthalapuranam"
        className="section-parchment px-6 py-16"
      >
        <div className="max-w-5xl mx-auto">
          <SectionHeading>Sthalapuranam (Sacred Temple History)</SectionHeading>

          <div className="grid md:grid-cols-2 gap-8 mt-8 items-start">
            {/* Left: Narrative text */}
            <div className="space-y-5">
              <p
                className="text-sm md:text-base leading-8"
                style={{ color: "oklch(0.400 0.030 120)" }}
              >
                This ancient temple, with a history spanning over{" "}
                <strong style={{ color: "oklch(0.384 0.085 155)" }}>
                  400 years
                </strong>
                , stands as a beacon of divine grace in Sanyasigramam near{" "}
                <strong style={{ color: "oklch(0.384 0.085 155)" }}>
                  Nellai (Tirunelveli)
                </strong>
                .
              </p>
              <p
                className="text-sm md:text-base leading-8"
                style={{ color: "oklch(0.400 0.030 120)" }}
              >
                According to the{" "}
                <span
                  className="font-semibold"
                  style={{ color: "oklch(0.710 0.115 73)" }}
                >
                  Matsya Purana
                </span>
                , this sacred land was blessed when the great sage{" "}
                <span
                  className="font-semibold"
                  style={{ color: "oklch(0.710 0.115 73)" }}
                >
                  Agastya Muni
                </span>{" "}
                performed intense penance here, seeking the Lord's grace.
              </p>
              <p
                className="text-sm md:text-base leading-8"
                style={{ color: "oklch(0.400 0.030 120)" }}
              >
                Moved by the sage's devotion,{" "}
                <span
                  className="font-semibold"
                  style={{ color: "oklch(0.384 0.085 155)" }}
                >
                  Sri Venkatachalapathy Perumal
                </span>{" "}
                manifested in His full divine form — a rare{" "}
                <span
                  className="font-semibold italic"
                  style={{ color: "oklch(0.710 0.115 73)" }}
                >
                  Prathyaksha Darshan
                </span>{" "}
                (direct vision) — blessing the spot with eternal sanctity.
              </p>
              <p
                className="text-sm md:text-base leading-8"
                style={{ color: "oklch(0.400 0.030 120)" }}
              >
                The temple is thus known as a{" "}
                <span
                  className="font-semibold"
                  style={{ color: "oklch(0.384 0.085 155)" }}
                >
                  Prathyaksha Darshan Kshetram
                </span>{" "}
                — a place where the Lord appeared directly, making it equivalent
                in spiritual power to the sacred hills of Tirupati.
              </p>
              <div className="pt-2">
                <span
                  className="inline-block px-6 py-2 rounded-full text-xs tracking-widest uppercase"
                  style={{
                    background: "oklch(0.929 0.030 148)",
                    color: "oklch(0.384 0.085 155)",
                    border: "1px solid oklch(0.710 0.115 73 / 0.3)",
                    fontWeight: 600,
                  }}
                >
                  ✦ Prathyaksha Darshan Kshetram ✦
                </span>
              </div>
            </div>

            {/* Right: Origin Story card */}
            <div
              className="rounded-2xl p-6 md:p-8 shadow-lg h-fit"
              style={{
                background: "oklch(0.233 0.040 155)",
                border: "2px solid oklch(0.710 0.115 73 / 0.5)",
                boxShadow:
                  "0 8px 40px oklch(0.165 0.055 155 / 0.4), 0 0 0 1px oklch(0.710 0.115 73 / 0.15)",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <BookOpen
                  size={22}
                  style={{ color: "oklch(0.710 0.115 73)" }}
                />
                <h3
                  className="font-display font-bold text-lg"
                  style={{ color: "oklch(0.757 0.120 77)" }}
                >
                  Origin Story
                </h3>
              </div>
              <div
                className="w-full h-px mb-6"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.710 0.115 73 / 0.6), transparent)",
                }}
              />
              <div className="flex justify-center mb-5">
                <span className="text-5xl">📜</span>
              </div>
              <ul className="space-y-3">
                {[
                  "Over 400 Years Old",
                  "Referenced in Matsya Purana",
                  "Sage Agastya's Tapasya",
                  "Prathyaksha Darshan of Perumal",
                  "Dakshina Tirupati",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: "oklch(0.882 0.035 84)" }}
                  >
                    <span
                      className="flex-shrink-0 mt-1 text-xs"
                      style={{ color: "oklch(0.710 0.115 73)" }}
                    >
                      ✦
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div
                className="mt-6 pt-5"
                style={{ borderTop: "1px solid oklch(0.710 0.115 73 / 0.2)" }}
              >
                <p
                  className="text-xs italic text-center"
                  style={{ color: "oklch(0.757 0.120 77 / 0.8)" }}
                >
                  "Where the Lord appeared — the land became eternal."
                </p>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ═══════════════════════════════════════════════════
          SECTION 3 — DEITIES  (dark green bg, gold accents)
          ═══════════════════════════════════════════════════ */}
      <RevealSection
        id="deities"
        className="px-6 py-16"
        style={{ background: "oklch(0.233 0.040 155)" }}
      >
        <div className="max-w-4xl mx-auto">
          <SectionHeading light>Deities of the Temple</SectionHeading>
          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            {[
              {
                label: "Moolavar",
                name: "Sri Prathyaksha Venkatachalapathy Perumal",
                icon: "🏛️",
                note: "Presiding Deity",
              },
              {
                label: "Utsavar",
                name: "Sri Kalyana Srinivasa Perumal",
                icon: "👑",
                note: "Processional Deity",
              },
              {
                label: "Consorts",
                name: "Sri Devi & Bhoo Devi",
                icon: "🌸",
                note: "Divine Consorts",
              },
            ].map((deity, i) => (
              <div
                key={deity.label}
                data-ocid={`temple.deity.card.item.${i + 1}`}
                className="gold-swoosh deity-card rounded-2xl p-6 text-center"
                style={{
                  background: "oklch(0.180 0.035 155)",
                  border: "1.5px solid oklch(0.710 0.115 73 / 0.35)",
                }}
              >
                <div
                  className="text-4xl mb-3 mx-auto w-16 h-16 flex items-center justify-center rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.250 0.045 155) 0%, oklch(0.200 0.038 140) 100%)",
                    border: "2px solid oklch(0.710 0.115 73 / 0.4)",
                  }}
                >
                  {deity.icon}
                </div>
                <span
                  className="text-xs tracking-wider uppercase font-medium block mb-2"
                  style={{ color: "oklch(0.710 0.115 73)" }}
                >
                  {deity.label}
                </span>
                <p
                  className="font-display font-semibold text-sm leading-snug"
                  style={{ color: "oklch(0.882 0.035 84)" }}
                >
                  {deity.name}
                </p>
                <p
                  className="text-xs mt-2"
                  style={{ color: "oklch(0.710 0.115 73 / 0.75)" }}
                >
                  {deity.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ═══════════════════════════════════════════════════
          SECTION 4 — SEVAS & OFFERINGS  (2-col table, no amount)
          ═══════════════════════════════════════════════════ */}
      <RevealSection id="sevas" className="section-parchment px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <SectionHeading>Sevas &amp; Offerings</SectionHeading>

          {/* Seva card grid — 2 cols on desktop, 1 on mobile */}
          <div
            data-ocid="temple.sevas.table"
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
          >
            {SEVAS.map((seva, i) => (
              <div
                key={seva.name}
                data-ocid={`temple.sevas.row.item.${i + 1}`}
                className="rounded-xl p-5"
                style={{
                  background: "oklch(0.974 0.012 80)",
                  border: "1px solid oklch(0.882 0.035 84)",
                  borderLeft: "4px solid oklch(0.710 0.115 73)",
                  boxShadow: "0 2px 10px oklch(0.384 0.085 155 / 0.05)",
                }}
              >
                <p
                  className="font-display font-bold text-base mb-2"
                  style={{ color: "oklch(0.600 0.100 73)" }}
                >
                  {seva.name}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.400 0.030 120)" }}
                >
                  {seva.desc}
                </p>
              </div>
            ))}
          </div>

          <div
            className="mt-6 p-4 rounded-xl text-sm italic text-center"
            style={{
              background: "oklch(0.929 0.030 148 / 0.5)",
              color: "oklch(0.400 0.030 120)",
              border: "1px dashed oklch(0.710 0.115 73 / 0.4)",
            }}
          >
            📿 Contact the temple directly to schedule a Seva or make an
            offering.
          </div>
        </div>
      </RevealSection>

      {/* ═══════════════════════════════════════════════════
          SECTION 5 — HOMAMS & FESTIVALS  (COMBINED SIDE-BY-SIDE)
          ═══════════════════════════════════════════════════ */}
      <RevealSection id="homams-festivals" className="section-sage px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <SectionHeading>Homams &amp; Festivals</SectionHeading>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {/* LEFT: Homams — icon-grid */}
            <div
              className="rounded-2xl p-6 md:p-8 shadow-lg"
              style={{
                background: "oklch(0.974 0.012 80)",
                border: "1px solid oklch(0.882 0.035 84)",
              }}
            >
              <h3
                className="font-display font-semibold text-lg mb-5 flex items-center gap-2"
                style={{ color: "oklch(0.384 0.085 155)" }}
              >
                🔥 Homam Offerings
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {HOMAMS.map((h, i) => (
                  <div
                    key={h.name}
                    data-ocid={`temple.homam.item.${i + 1}`}
                    className="rounded-xl p-4 flex items-start gap-3"
                    style={{
                      background: "oklch(0.165 0.055 155)",
                      border: "1px solid oklch(0.710 0.115 73 / 0.3)",
                    }}
                  >
                    <div
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.757 0.120 77) 0%, oklch(0.710 0.115 73) 100%)",
                      }}
                    >
                      <Flame
                        size={14}
                        style={{ color: "oklch(0.165 0.055 155)" }}
                      />
                    </div>
                    <div>
                      <p
                        className="font-display font-bold text-sm mb-1"
                        style={{ color: "oklch(0.757 0.120 77)" }}
                      >
                        {h.name}
                      </p>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "oklch(0.882 0.035 84 / 0.8)" }}
                      >
                        {h.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="mt-5 p-3 rounded-xl text-xs italic text-center"
                style={{
                  background: "oklch(0.929 0.030 148 / 0.5)",
                  color: "oklch(0.400 0.030 120)",
                  border: "1px dashed oklch(0.710 0.115 73 / 0.4)",
                }}
              >
                🙏 Contact the temple for Homam bookings.
              </div>
            </div>

            {/* RIGHT: Festivals — vertical timeline */}
            <div
              className="rounded-2xl p-6 md:p-8 shadow-lg"
              style={{
                background: "oklch(0.974 0.012 80)",
                border: "1px solid oklch(0.882 0.035 84)",
              }}
            >
              <h3
                className="font-display font-semibold text-lg mb-5 flex items-center gap-2"
                style={{ color: "oklch(0.384 0.085 155)" }}
              >
                🎉 Sacred Festivals
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {FESTIVALS.map((f, i) => (
                  <div
                    key={f.name}
                    data-ocid={`temple.festivals.item.${i + 1}`}
                    className="rounded-xl p-4"
                    style={{
                      background: "oklch(0.953 0.025 85)",
                      border: "1px solid oklch(0.710 0.115 73 / 0.3)",
                      borderLeft: "3px solid oklch(0.710 0.115 73)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div
                        className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.757 0.120 77) 0%, oklch(0.710 0.115 73) 100%)",
                          color: "oklch(0.165 0.055 155)",
                        }}
                      >
                        <Calendar size={12} />
                      </div>
                      <p
                        className="font-display font-bold text-sm"
                        style={{ color: "oklch(0.384 0.085 155)" }}
                      >
                        {f.name}
                      </p>
                    </div>
                    <p
                      className="text-xs leading-relaxed pl-8"
                      style={{ color: "oklch(0.400 0.030 120)" }}
                    >
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ═══════════════════════════════════════════════════
          SECTION 6 — SPIRITUAL SIGNIFICANCE
          Gold-plaque card with 4-corner flourishes
          ═══════════════════════════════════════════════════ */}
      <RevealSection id="significance" className="section-parchment px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <div
            data-ocid="temple.significance.card"
            className="significance-card rounded-2xl p-8 md:p-12 text-center"
            style={{
              background: "oklch(0.974 0.012 80)",
              border: "2px solid oklch(0.710 0.115 73 / 0.65)",
              boxShadow:
                "0 0 48px oklch(0.710 0.115 73 / 0.15), 0 4px 32px oklch(0.384 0.085 155 / 0.12), inset 0 0 32px oklch(0.710 0.115 73 / 0.04)",
            }}
          >
            <span className="corner-bl" aria-hidden="true">
              ✦
            </span>
            <span className="corner-br" aria-hidden="true">
              ✦
            </span>

            <div className="flex justify-center mb-6">
              <Sparkles size={32} style={{ color: "oklch(0.710 0.115 73)" }} />
            </div>
            <h2
              className="font-display text-2xl md:text-3xl font-semibold mb-4 section-heading-text"
              style={{ color: "oklch(0.384 0.085 155)" }}
            >
              Spiritual Significance
            </h2>
            <div className="gold-divider">
              <span className="gold-divider-dot" />
              <span className="gold-divider-dot" />
              <span className="gold-divider-dot" />
            </div>
            <p
              className="text-sm md:text-base leading-8 mt-4"
              style={{ color: "oklch(0.400 0.030 120)" }}
            >
              This temple is home to{" "}
              <span
                className="font-semibold"
                style={{ color: "oklch(0.710 0.115 73)" }}
              >
                Varaprasadi Perumal — the Lord who grants boons
              </span>
              . Devotees believe that prayers made with pure devotion are always
              fulfilled here. The divine energy of the temple is said to rival
              that of Tirupati, making it a{" "}
              <span
                className="font-semibold italic"
                style={{ color: "oklch(0.384 0.085 155)" }}
              >
                Dakshina Tirupati (Southern Tirupati)
              </span>
              .
            </p>
            <div
              className="inline-block px-6 py-2 rounded-full text-xs tracking-widest uppercase mt-6"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.757 0.120 77 / 0.2) 0%, oklch(0.710 0.115 73 / 0.2) 100%)",
                color: "oklch(0.710 0.115 73)",
                border: "1px solid oklch(0.710 0.115 73 / 0.5)",
              }}
            >
              ✦ Varaprasadi Kshetram ✦
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ═══════════════════════════════════════════════════
          SECTION 7 — PANCHAMUKHA ANJANEYA ORIGIN
          Warm gold/cream background (distinctly warmer)
          ═══════════════════════════════════════════════════ */}
      <RevealSection
        id="panchamukha"
        className="px-6 py-16"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.970 0.030 85) 0%, oklch(0.950 0.040 80) 50%, oklch(0.940 0.035 78) 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <SectionHeading>Sri Panchamukha Anjaneya Swamy</SectionHeading>
          <div
            className="rounded-2xl p-6 md:p-10 mt-6"
            style={{
              background: "oklch(0.985 0.015 80 / 0.85)",
              border: "1px solid oklch(0.710 0.115 73 / 0.35)",
              boxShadow: "0 8px 40px oklch(0.710 0.115 73 / 0.1)",
            }}
          >
            <div className="flex justify-center mb-6">
              <span className="text-6xl">🐒</span>
            </div>
            <p
              className="text-sm md:text-base leading-8 text-center mb-5"
              style={{ color: "oklch(0.400 0.030 120)" }}
            >
              The installation of Sri Panchamukha Anjaneya Swamy in this temple
              came about through a{" "}
              <span
                className="font-semibold"
                style={{ color: "oklch(0.384 0.085 155)" }}
              >
                divine dream
              </span>
              . The temple's chief priest received a sacred vision instructing
              him to install the five-faced form of Anjaneya Swamy within the
              temple premises.
            </p>
            <p
              className="text-sm md:text-base leading-8 text-center mb-6"
              style={{ color: "oklch(0.400 0.030 120)" }}
            >
              Following the divine command, the idol was consecrated with full
              Vedic rituals (Kumbhabhishekam), and since then, devotees have
              experienced{" "}
              <span
                className="font-semibold italic"
                style={{ color: "oklch(0.600 0.100 73)" }}
              >
                miraculous blessings
              </span>{" "}
              — answered prayers, healed ailments, and fulfilled wishes.
            </p>
            <div
              className="p-4 rounded-xl text-sm text-center italic"
              style={{
                background: "oklch(0.940 0.035 78 / 0.8)",
                color: "oklch(0.384 0.085 155)",
                border: "1px solid oklch(0.710 0.115 73 / 0.4)",
              }}
            >
              Sri Panchamukha Anjaneya Swamy manifests in five divine faces,
              each representing a powerful cosmic force and direction.
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ═══════════════════════════════════════════════════
          SECTION 8 — FIVE DIVINE FACES GRID
          ═══════════════════════════════════════════════════ */}
      <RevealSection id="five-faces" className="section-sage px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <SectionHeading>The Five Divine Faces</SectionHeading>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {FIVE_FACES.map((face, i) => (
              <div
                key={face.face}
                data-ocid={`temple.five-faces.item.${i + 1}`}
                className="gold-swoosh deity-card rounded-2xl p-6"
                style={{
                  background: "oklch(0.974 0.012 80)",
                }}
              >
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-full text-3xl mb-4"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.929 0.030 148) 0%, oklch(0.953 0.020 85) 100%)",
                    border: "2px solid oklch(0.710 0.115 73 / 0.5)",
                  }}
                >
                  {face.icon}
                </div>
                <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                  <h3
                    className="font-display font-bold text-base"
                    style={{ color: "oklch(0.384 0.085 155)" }}
                  >
                    {face.face}
                  </h3>
                  <span
                    className="text-xs"
                    style={{
                      color: "oklch(0.710 0.115 73)",
                      background: "oklch(0.710 0.115 73 / 0.12)",
                      padding: "2px 8px",
                      borderRadius: "99px",
                    }}
                  >
                    {face.direction}
                  </span>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {face.blessings.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-xs leading-relaxed"
                      style={{ color: "oklch(0.400 0.030 120)" }}
                    >
                      <span
                        className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full"
                        style={{ background: "oklch(0.710 0.115 73)" }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ═══════════════════════════════════════════════════
          SECTION 9 — SPECIAL OFFERINGS & AUSPICIOUS DAYS
          ═══════════════════════════════════════════════════ */}
      <RevealSection id="offerings" className="section-parchment px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <SectionHeading>
            Special Offerings &amp; Auspicious Days
          </SectionHeading>
          <div className="grid sm:grid-cols-2 gap-8 mt-8">
            {/* Special Offerings — Card Grid */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "oklch(0.974 0.012 80)",
                border: "1px solid oklch(0.882 0.035 84)",
              }}
            >
              <h3
                className="font-display font-semibold text-lg mb-5 flex items-center gap-2"
                style={{ color: "oklch(0.384 0.085 155)" }}
              >
                <span className="text-xl">🌺</span> Special Offerings
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  {
                    name: "Vadamalai Prarthana",
                    desc: "Sacred garland offering — a powerful vow fulfilled with devotion",
                    primary: true,
                  },
                  {
                    name: "Vastra Danam",
                    desc: "Divine cloth offering to the Lord as an act of surrendered worship",
                    primary: true,
                  },
                  {
                    name: "Coconut Breaking",
                    desc: "Symbolic offering of ego at the Lord's feet for blessings",
                    primary: false,
                  },
                  {
                    name: "Sesame Oil Lamps",
                    desc: "Lighting of sesame oil lamps to dispel darkness and invoke grace",
                    primary: false,
                  },
                ].map((offering, i) => (
                  <div
                    key={offering.name}
                    data-ocid={`temple.offerings.item.${i + 1}`}
                    className="rounded-xl p-4"
                    style={{
                      background: offering.primary
                        ? "linear-gradient(135deg, oklch(0.953 0.030 82) 0%, oklch(0.940 0.035 78) 100%)"
                        : "oklch(0.974 0.012 80)",
                      border: offering.primary
                        ? "1.5px solid oklch(0.710 0.115 73 / 0.5)"
                        : "1px solid oklch(0.882 0.035 84)",
                      borderLeft: "3px solid oklch(0.710 0.115 73)",
                    }}
                  >
                    <p
                      className="font-display font-bold text-sm mb-1"
                      style={{ color: "oklch(0.600 0.100 73)" }}
                    >
                      ✦ {offering.name}
                    </p>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "oklch(0.400 0.030 120)" }}
                    >
                      {offering.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Auspicious Days — 3 key highlighted items */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "oklch(0.974 0.012 80)",
                border: "1px solid oklch(0.882 0.035 84)",
              }}
            >
              <h3
                className="font-display font-semibold text-lg mb-5 flex items-center gap-2"
                style={{ color: "oklch(0.384 0.085 155)" }}
              >
                <span className="text-xl">🗓️</span> Auspicious Days
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Amavasya (New Moon)", icon: "🌑" },
                  { label: "Moola Nakshatra", icon: "⭐" },
                  { label: "Every Saturday", icon: "🪔" },
                ].map((d, i) => (
                  <div
                    key={d.label}
                    data-ocid={`temple.auspicious.item.${i + 1}`}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.929 0.030 148 / 0.8) 0%, oklch(0.910 0.035 148 / 0.6) 100%)",
                      border: "1px solid oklch(0.710 0.115 73 / 0.3)",
                    }}
                  >
                    <span className="text-2xl">{d.icon}</span>
                    <span
                      className="font-semibold text-sm"
                      style={{ color: "oklch(0.384 0.085 155)" }}
                    >
                      {d.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ═══════════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════════ */}
      <footer
        className="py-8 text-center"
        style={{
          background: "oklch(0.384 0.085 155)",
          color: "oklch(0.882 0.035 84 / 0.8)",
        }}
      >
        <p
          className="font-display text-sm mb-1"
          style={{ color: "oklch(0.757 0.120 77)" }}
        >
          🙏 Sri Prathyaksha Venkatachalapathy Perumal Thiruvadigale Sharanam 🙏
        </p>
        <p className="text-xs mt-3 flex items-center justify-center gap-1">
          &copy; {YEAR}. Built with ❤️ using{" "}
          <a
            href={CAFFEINE_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:opacity-80"
          >
            caffeine.ai
          </a>
        </p>
      </footer>

      {/* ═══════════════════════════════════════════════════
          STICKY BOOK SEVA BUTTON  (bottom-center, shows after 200px)
          ═══════════════════════════════════════════════════ */}
      {showBookSeva && (
        <button
          onClick={scrollToSevas}
          type="button"
          data-ocid="temple.book_seva.button"
          aria-label="Book a Seva — scroll to Sevas section"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.757 0.120 77) 0%, oklch(0.710 0.115 73) 60%, oklch(0.660 0.108 68) 100%)",
            color: "oklch(0.165 0.055 155)",
            boxShadow:
              "0 4px 24px oklch(0.710 0.115 73 / 0.5), 0 2px 8px oklch(0 0 0 / 0.2)",
          }}
        >
          📿 Book a Seva
        </button>
      )}

      {/* ═══════════════════════════════════════════════════
          FLOATING BACK TO TOP — pulsing ring animation
          Stays at bottom-right (not to conflict with Book Seva)
          ═══════════════════════════════════════════════════ */}
      {showBackTop && (
        <button
          onClick={scrollToTop}
          type="button"
          data-ocid="temple.back_to_top.button"
          aria-label="Back to top"
          className="back-to-top-btn fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.757 0.120 77) 0%, oklch(0.710 0.115 73) 100%)",
            color: "oklch(0.233 0.025 122)",
          }}
        >
          <ArrowUp size={15} />
          Top
        </button>
      )}

      {/* ═══════════════════════════════════════════════════
          FLOATING SECTION NAVIGATOR (dot nav, right side)
          ═══════════════════════════════════════════════════ */}
      {/* Section Progress + Prev/Next */}
      <SectionProgress />

      <SectionNav />
    </div>
  );
}
