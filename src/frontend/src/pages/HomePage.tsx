import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart, MapPin, Star } from "lucide-react";

const YEAR = new Date().getFullYear();
const CAFFEINE_HREF = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

export default function HomePage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.953 0.020 85) 0%, oklch(0.929 0.030 148) 100%)",
        fontFamily: "GeneralSans, DMSans, sans-serif",
      }}
    >
      {/* ── HEADER ─────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 shadow-xs"
        style={{
          background: "oklch(0.974 0.012 80 / 0.97)",
          borderBottom: "1px solid oklch(0.882 0.035 84)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span
            className="font-display font-semibold text-lg tracking-tight"
            style={{ color: "oklch(0.384 0.085 155)" }}
          >
            🙏 Devotional Services
          </span>
          <nav className="flex items-center gap-6">
            <Link
              to="/temple/nellai-tirupati"
              data-ocid="nav.temple_link"
              className="text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "oklch(0.710 0.115 73)" }}
            >
              Nellai Tirupati
            </Link>
          </nav>
        </div>
      </header>

      {/* ── HERO BANNER ────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 py-24"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.233 0.025 122) 0%, oklch(0.384 0.085 155) 60%, oklch(0.233 0.025 122) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 600px 400px at 50% 40%, oklch(0.710 0.115 73) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-2xl">
          <p
            className="text-sm tracking-[0.25em] uppercase mb-4"
            style={{ color: "oklch(0.710 0.115 73)" }}
          >
            ✦ Sacred Temple Guide ✦
          </p>
          <h1
            className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ color: "oklch(0.974 0.012 80)" }}
          >
            Devotional Services
          </h1>
          <p
            className="text-base md:text-lg mb-10"
            style={{ color: "oklch(0.882 0.035 84 / 0.9)" }}
          >
            Experience the divine grace of sacred temples in Tamil Nadu. Explore
            rituals, sevas, and spiritual significance of ancient shrines.
          </p>
          <Link
            to="/temple/nellai-tirupati"
            data-ocid="hero.primary_button"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105 active:scale-95"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.757 0.120 77) 0%, oklch(0.710 0.115 73) 100%)",
              color: "oklch(0.233 0.025 122)",
              boxShadow: "0 4px 20px oklch(0.710 0.115 73 / 0.4)",
            }}
          >
            Explore Nellai Tirupati
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── TEMPLE CARD ────────────────────────────────── */}
      <section className="max-w-5xl mx-auto w-full px-6 py-16">
        <div className="text-center mb-12">
          <h2
            className="font-display text-2xl md:text-3xl font-semibold mb-2"
            style={{ color: "oklch(0.384 0.085 155)" }}
          >
            Featured Temples
          </h2>
          <div className="gold-divider">
            <span className="gold-divider-dot" />
            <span className="gold-divider-dot" />
            <span className="gold-divider-dot" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Temple Detail Card */}
          <div
            className="gold-swoosh rounded-2xl overflow-hidden shadow-temple flex flex-col"
            style={{
              background: "oklch(0.974 0.012 80)",
              border: "1px solid oklch(0.882 0.035 84)",
            }}
          >
            <div
              className="relative h-48 flex items-end p-6"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.384 0.085 155 / 0.7) 0%, oklch(0.233 0.025 122 / 0.9) 100%), url('/assets/generated/temple-hero-nellai-tirupati.dim_1920x1080.jpg') center/cover no-repeat",
              }}
            >
              <div>
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2"
                  style={{
                    background: "oklch(0.710 0.115 73 / 0.3)",
                    color: "oklch(0.757 0.120 77)",
                    border: "1px solid oklch(0.710 0.115 73 / 0.5)",
                  }}
                >
                  Vaishnavite Temple
                </span>
                <h3 className="font-display text-xl font-bold text-white">
                  Nellai Tirupati – Sanyasigramam
                </h3>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <div
                className="flex items-center gap-2 text-sm mb-4"
                style={{ color: "oklch(0.520 0.040 140)" }}
              >
                <MapPin size={14} />
                <span>Sanyasigramam, Tirunelveli, Tamil Nadu</span>
              </div>
              <p
                className="text-sm leading-relaxed mb-6 flex-1"
                style={{ color: "oklch(0.400 0.030 120)" }}
              >
                Sri Prathyaksha Venkatachalapathy Perumal appeared here as a
                direct blessing to Sage Agastya. Known as Dakshina Tirupati,
                this sacred shrine grants divine boons to sincere devotees.
              </p>
              <div className="flex items-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    size={14}
                    fill="oklch(0.710 0.115 73)"
                    className="text-temple-gold"
                  />
                ))}
                <span
                  className="text-xs ml-2"
                  style={{ color: "oklch(0.520 0.040 140)" }}
                >
                  Highly revered
                </span>
              </div>
              <Link
                to="/temple/nellai-tirupati"
                data-ocid="temple.card.primary_button"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all hover:brightness-110 active:scale-95"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.384 0.085 155) 0%, oklch(0.320 0.080 155) 100%)",
                  color: "oklch(0.974 0.012 80)",
                  boxShadow: "0 4px 16px oklch(0.384 0.085 155 / 0.3)",
                }}
              >
                View More
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-6">
            {[
              {
                icon: "🕉️",
                title: "Daily Sevas",
                desc: "Multiple sevas throughout the day including Abhishekam, Archana, and Deepa Aradhana.",
              },
              {
                icon: "🔥",
                title: "Homam Rituals",
                desc: "Sacred fire rituals including Mrityunjaya Homam, Navagraha Homam, and more.",
              },
              {
                icon: "🙏",
                title: "Special Festivals",
                desc: "Purattasi Garuda Seva, Vaikunta Ekadasi, Brahmotsavam, and other grand festivals.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="gold-swoosh flex items-start gap-4 p-5 rounded-2xl"
                style={{
                  background: "oklch(0.974 0.012 80)",
                  border: "1px solid oklch(0.882 0.035 84)",
                  boxShadow: "0 2px 12px oklch(0.384 0.085 155 / 0.06)",
                }}
              >
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h4
                    className="font-display font-semibold mb-1"
                    style={{ color: "oklch(0.384 0.085 155)" }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.400 0.030 120)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer
        className="mt-auto py-6 text-center text-sm"
        style={{
          background: "oklch(0.384 0.085 155)",
          color: "oklch(0.882 0.035 84 / 0.8)",
        }}
      >
        <p className="flex items-center justify-center gap-1.5">
          &copy; {YEAR}. Built with{" "}
          <Heart size={13} fill="currentColor" className="inline" /> using{" "}
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
    </div>
  );
}
