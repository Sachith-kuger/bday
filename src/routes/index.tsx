import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import p0 from "@/assets/p0.jpg.asset.json";
import p1 from "@/assets/p1.jpg.asset.json";
import p2 from "@/assets/p2.jpg.asset.json";
import p3 from "@/assets/p3.jpg.asset.json";
import p4 from "@/assets/p4.jpg.asset.json";
import p5 from "@/assets/p5.jpg.asset.json";
import p6 from "@/assets/p6.jpg.asset.json";
import p7 from "@/assets/p7.jpg.asset.json";

const SITE = "https://id-preview--fa9d96ef-3f9f-4bdf-bfbe-6c1432d3f004.lovable.app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SHREYAL / TWENTY — A Birthday Exhibition" },
      {
        name: "description",
        content:
          "Five words, five rooms, one gift. A cinematic birthday exhibition made for Shreyal on the day she turns twenty.",
      },
      { property: "og:title", content: "SHREYAL / TWENTY — A Birthday Exhibition" },
      {
        property: "og:description",
        content: "Five words, five rooms, one gift. A cinematic birthday exhibition for Shreyal.",
      },
      { property: "og:image", content: `${SITE}${p0.url}` },
      { name: "twitter:image", content: `${SITE}${p0.url}` },
    ],
  }),
  component: Index,
});

const rooms = [
  {
    n: "I",
    word: "UNPLANNED",
    tag: "room one · arrivals",
    line: "Nobody circles the date a best friend shows up.",
    body: "She wasn't on anyone's list. She simply arrived, stayed, and quietly rewrote the seating chart of an entire life. Now there's no version of the story that works without her in it.",
    img: p2.url,
  },
  {
    n: "II",
    word: "UNLICENSED",
    tag: "room two · the practice",
    line: "A therapist with no certificate and a perfect record.",
    body: "Unqualified on paper, unbeatable in practice. She lets a spiral run its full length, waits for the exact right silence, and then says the one sentence that puts the furniture back where it belongs.",
    img: p3.url,
  },
  {
    n: "III",
    word: "SOLUTIONIST",
    tag: "room three · the workshop",
    line: "Chaos goes in. A numbered plan comes out.",
    body: "Hand her a problem still shaking and half-formed, and it comes back solved — with steps, in order, in a tone that suggests it was never that complicated. It was. She just makes it look otherwise.",
    img: p4.url,
  },
  {
    n: "IV",
    word: "TSUNDERE",
    tag: "room four · the fine print",
    line: "Certified difficult. Appeals permanently closed.",
    body: "Sharp edges, an eye-roll on standby, a 'whatever, fine' that carries more affection than most speeches. Underneath the entire performance sits one of the kindest people alive — a fact she has never once admitted out loud.",
    img: p5.url,
  },
  {
    n: "V",
    word: "HOME",
    tag: "room five · the last door",
    line: "Some people are a place before they are a person.",
    body: "A room where nothing has to be performed and nothing has to be earned. That's rarer than it sounds, rarer than she thinks, and the reason this whole exhibition exists.",
    img: p6.url,
  },
];

const gallery = [
  { src: p1.url, cap: "Plate I — unbothered" },
  { src: p7.url, cap: "Plate II — effortless" },
  { src: p3.url, cap: "Plate III — no explanations" },
  { src: p5.url, cap: "Plate IV — city lights" },
  { src: p6.url, cap: "Plate V — salt air" },
  { src: p4.url, cap: "Plate VI — the wall matched" },
];

function useReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("in-view"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);
}

function Confetti({ fire }: { fire: boolean }) {
  const [pieces, setPieces] = useState<
    { left: string; bg: string; dur: string; delay: string; round: string }[]
  >([]);
  useEffect(() => {
    if (!fire) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const colors = ["var(--gold)", "var(--rose)", "var(--glow)", "var(--foreground)"];
    setPieces(
      Array.from({ length: 54 }, () => ({
        left: `${Math.random() * 100}%`,
        bg: colors[Math.floor(Math.random() * colors.length)]!,
        dur: `${2 + Math.random() * 1.8}s`,
        delay: `${Math.random() * 0.6}s`,
        round: Math.random() > 0.5 ? "50%" : "0",
      })),
    );
    const t = setTimeout(() => setPieces([]), 5200);
    return () => clearTimeout(t);
  }, [fire]);
  return (
    <>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="pointer-events-none absolute top-0 h-[12px] w-[5px] opacity-90"
          style={{
            left: p.left,
            background: p.bg,
            borderRadius: p.round,
            animation: `confetti-fall ${p.dur} linear ${p.delay} forwards`,
          }}
        />
      ))}
    </>
  );
}

function Marquee({ text, reverse = false }: { text: string; reverse?: boolean }) {
  return (
    <div className="overflow-hidden border-y border-border bg-obsidian py-4">
      <div
        className="flex w-max gap-12 whitespace-nowrap"
        style={{
          animation: `marquee-x ${reverse ? "30s" : "24s"} linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {Array.from({ length: 2 }).map((_, k) => (
          <span key={k} className="flex gap-12">
            {Array.from({ length: 6 }).map((__, i) => (
              <span
                key={i}
                className="font-[family-name:var(--font-display)] text-[clamp(1.4rem,3vw,2.4rem)] uppercase tracking-[0.12em] text-muted-foreground"
              >
                {text} <span className="text-gold">✦</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

function Index() {
  useReveal();
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [claimed, setClaimed] = useState<"idle" | "sending" | "done">("idle");
  const startRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
      setScrollY(window.scrollY);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const unlock = () => {
    if (claimed !== "idle") return;
    setClaimed("sending");
    const BOT_TOKEN = "8986881810:AAFJJBxNDHQRFNgQQD2QWjYHz3Ys-QsQ108";
    const CHAT_ID = "8478473709";
    const msg = encodeURIComponent(
      "🎁 Shreyal just unlocked her ₹500 birthday gift! Time to send it 💸",
    );
    const pixel = new Image();
    pixel.onload = pixel.onerror = () => setClaimed("done");
    pixel.src = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${msg}`;
    setTimeout(() => setClaimed("done"), 2000);
  };

  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const coverFade = Math.max(0, 1 - scrollY / (vh * 0.85));

  return (
    <main className="relative bg-obsidian">
      {/* aurora field */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute left-[-15%] top-[-10%] h-[60vh] w-[60vw] rounded-full opacity-25 blur-[120px]"
          style={{
            background: "radial-gradient(circle, var(--glow), transparent 65%)",
            animation: "aurora-drift 22s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] h-[55vh] w-[55vw] rounded-full opacity-25 blur-[130px]"
          style={{
            background: "radial-gradient(circle, var(--gold), transparent 65%)",
            animation: "aurora-drift 28s ease-in-out infinite reverse",
          }}
        />
      </div>

      <div className="fixed inset-x-0 top-0 z-50 h-[3px] bg-foreground/10">
        <div
          className="h-full transition-[width] duration-75"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg,var(--gold),var(--rose),var(--glow))",
          }}
        />
      </div>

      {/* COVER */}
      <section className="grain relative z-10 h-[100svh] w-full overflow-hidden">
        <img
          src={p0.url}
          alt="Shreyal on her twentieth birthday"
          className="absolute inset-0 h-full w-full object-cover object-center"
          style={{
            animation: "slow-zoom 18s ease-out forwards",
            transform: `translateY(${scrollY * 0.25}px)`,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,oklch(0.11_0.016_275/0.72),oklch(0.11_0.016_275/0.25)_38%,oklch(0.11_0.016_275/0.95))]" />

        <div
          className="absolute inset-0 flex flex-col justify-between px-5 py-7 sm:px-10"
          style={{ opacity: coverFade }}
        >
          <div className="flex items-start justify-between text-[0.6rem] uppercase tracking-[0.35em] text-foreground/70">
            <span>Exhibition No. 20</span>
            <span className="hidden sm:inline">Admission: free</span>
            <span>Sept 6</span>
          </div>

          <div className="pb-8 text-center">
            <p
              className="text-[0.6rem] uppercase tracking-[0.5em] text-gold"
              style={{ animation: "rise-in 1s ease-out both" }}
            >
              now showing
            </p>
            <h1
              className="foil mt-3 font-[family-name:var(--font-display)] text-[clamp(3.4rem,17vw,11rem)] uppercase leading-[0.82] tracking-[-0.02em]"
              style={{ animation: "rise-in 1.1s cubic-bezier(.16,.84,.28,1) 0.1s both" }}
            >
              Shreyal
            </h1>
            <p
              className="stroke-type font-[family-name:var(--font-display)] text-[clamp(2.6rem,14vw,9rem)] uppercase leading-[0.85] tracking-[0.02em]"
              style={{ animation: "rise-in 1.1s cubic-bezier(.16,.84,.28,1) 0.25s both" }}
            >
              Twenty
            </p>
            <p className="mx-auto mt-5 max-w-md font-[family-name:var(--font-serif-ui)] text-[clamp(1.05rem,3.6vw,1.5rem)] italic text-foreground/75">
              Five words. Five rooms. One thing waiting at the end.
            </p>
            <button
              type="button"
              onClick={() => startRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="mt-8 rounded-full border border-gold/60 px-7 py-3 text-[0.6rem] uppercase tracking-[0.34em] text-gold backdrop-blur-sm transition hover:bg-gold hover:text-primary-foreground"
              style={{ animation: "float-soft 3.4s ease-in-out infinite" }}
            >
              enter the exhibition ↓
            </button>
          </div>
        </div>
      </section>

      <Marquee text="Happy 20th Shreyal" />

      {/* WALL TEXT */}
      <section ref={startRef} className="relative z-10 px-5 py-24 sm:px-10">
        <Confetti fire={claimed === "done"} />
        <div className="mx-auto max-w-4xl text-center">
          <span className="reveal block text-[0.6rem] uppercase tracking-[0.4em] text-gold">
            wall text · read before entering
          </span>
          <p className="reveal mt-7 font-[family-name:var(--font-serif-ui)] text-[clamp(1.7rem,5.6vw,3.4rem)] italic leading-[1.15]">
            Nineteen has closed for good. What follows is an attempt to put a whole person into five
            words — and the honest admission that five isn't nearly enough.
          </p>
          <div className="reveal mx-auto mt-10 h-px w-24 bg-gold/60" />
          <p className="reveal mx-auto mt-8 max-w-xl leading-relaxed text-muted-foreground">
            Curated by someone who has watched all five of these words hold true on the same
            afternoon. Take the rooms slowly; they were hung in this order on purpose.
          </p>
        </div>
      </section>

      {/* FIVE ROOMS */}
      {rooms.map((r, i) => (
        <section key={r.word} className="relative z-10 border-t border-border">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-16 sm:px-10 md:grid-cols-2 md:gap-14 md:py-24">
            <figure
              className={`reveal relative overflow-hidden ${i % 2 ? "md:order-2" : ""}`}
              style={{ aspectRatio: "4/5" }}
            >
              <img
                src={r.img}
                alt={`Shreyal — ${r.word.toLowerCase()}`}
                loading="lazy"
                className="h-full w-full object-cover transition duration-[1200ms] hover:scale-[1.05]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,oklch(0.11_0.016_275/0.75),transparent_55%)]" />
              <figcaption className="absolute bottom-4 left-4 text-[0.58rem] uppercase tracking-[0.28em] text-foreground/70">
                {r.tag}
              </figcaption>
            </figure>

            <div className={i % 2 ? "md:order-1" : ""}>
              <div className="reveal flex items-baseline gap-4">
                <span className="font-[family-name:var(--font-display)] text-[clamp(2rem,6vw,3.4rem)] text-gold/50">
                  {r.n}
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <h2 className="reveal mt-3 font-[family-name:var(--font-display)] text-[clamp(2.6rem,11vw,5.6rem)] uppercase leading-[0.86] tracking-[-0.01em]">
                {r.word}
              </h2>
              <p className="reveal mt-4 font-[family-name:var(--font-serif-ui)] text-[clamp(1.2rem,4vw,1.9rem)] italic text-gold">
                {r.line}
              </p>
              <p className="reveal mt-5 max-w-lg leading-relaxed text-muted-foreground">{r.body}</p>
            </div>
          </div>
        </section>
      ))}

      <Marquee text="Twenty looks good on her" reverse />

      {/* GALLERY RAIL */}
      <section className="relative z-10 py-20">
        <div className="mx-auto mb-8 flex max-w-6xl flex-wrap items-end justify-between gap-3 px-5 sm:px-10">
          <h2 className="reveal font-[family-name:var(--font-display)] text-[clamp(2rem,7vw,3.6rem)] uppercase leading-none">
            The <span className="foil">evidence</span>
          </h2>
          <span className="reveal text-[0.58rem] uppercase tracking-[0.3em] text-muted-foreground">
            swipe → plates i–vi
          </span>
        </div>
        <div className="rail flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-10">
          {gallery.map((g) => (
            <figure key={g.cap} className="group w-[70vw] shrink-0 snap-center sm:w-[300px]">
              <div className="overflow-hidden bg-card">
                <img
                  src={g.src}
                  alt={g.cap}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition duration-[900ms] group-hover:scale-[1.05] group-hover:grayscale-0"
                  style={{ aspectRatio: "3/4" }}
                />
              </div>
              <figcaption className="mt-2 text-[0.56rem] uppercase tracking-[0.24em] text-muted-foreground">
                {g.cap}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* GIFT */}
      <section className="relative z-10 px-5 pb-24 pt-10 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="reveal mb-10 text-center">
            <span className="text-[0.6rem] uppercase tracking-[0.4em] text-gold">
              the last room
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.2rem,8vw,4.4rem)] uppercase leading-none">
              One more thing
            </h2>
          </div>

          <div className="reveal relative mx-auto max-w-xl overflow-hidden border border-gold/35 bg-card shadow-lux">
            <div
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{ background: "radial-gradient(120% 70% at 50% 0%, var(--gold), transparent 60%)" }}
            />
            <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-obsidian" />
            <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-obsidian" />
            <div className="relative flex items-center justify-between border-b border-dashed border-gold/30 px-6 py-3 text-[0.58rem] uppercase tracking-[0.28em] text-muted-foreground">
              <span>birthday voucher</span>
              <span className="text-gold">№ 020</span>
            </div>
            <div className="relative px-6 py-10 text-center sm:px-10">
              <p className="foil font-[family-name:var(--font-display)] text-[clamp(4rem,20vw,8rem)] leading-[0.85]">
                ₹500
              </p>
              <p className="mx-auto mt-4 max-w-sm leading-relaxed text-muted-foreground">
                Lunch, dinner, dessert, or all three in one sitting. No questions, no receipts.
                Twenty-year-olds deserve good food.
              </p>
              <button
                type="button"
                onClick={unlock}
                disabled={claimed !== "idle"}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-9 py-4 text-[0.68rem] font-bold uppercase tracking-[0.26em] text-primary-foreground transition hover:-translate-y-0.5 disabled:opacity-80"
                style={claimed === "idle" ? { animation: "pulse-ring 2.2s ease-out infinite" } : undefined}
              >
                {claimed === "idle"
                  ? "Unlock the gift"
                  : claimed === "sending"
                    ? "Sending…"
                    : "Unlocked 🎉"}
              </button>
              <p className="mt-4 text-[0.56rem] uppercase tracking-[0.22em] text-muted-foreground">
                {claimed === "done"
                  ? "he's been notified — check your upi app soon"
                  : "tap to claim — he'll take it from here"}
              </p>
            </div>
            <div className="relative border-t border-dashed border-gold/30 px-6 py-3 text-center text-[0.54rem] uppercase tracking-[0.3em] text-muted-foreground">
              non-transferable · expires never
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border px-5 py-20 text-center sm:px-10">
        <p className="font-[family-name:var(--font-serif-ui)] text-[clamp(1.8rem,6vw,3.4rem)] italic leading-tight">
          Welcome to twenty. <span className="foil not-italic">It suits her.</span>
        </p>
        <span className="mt-5 block text-[0.56rem] uppercase tracking-[0.3em] text-muted-foreground">
          Exhibition No. 20 · assembled with an unreasonable amount of thought
        </span>
      </footer>
    </main>
  );
}
