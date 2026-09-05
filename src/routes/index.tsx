import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const p0 = { url: "/photos/p0.jpg" };
const p1 = { url: "/photos/p1.jpg" };
const p2 = { url: "/photos/p2.jpg" };
const p3 = { url: "/photos/p3.jpg" };
const p4 = { url: "/photos/p4.jpg" };
const p5 = { url: "/photos/p5.jpg" };
const p6 = { url: "/photos/p6.jpg" };
const p7 = { url: "/photos/p7.jpg" };

const SITE = "https://id-preview--fa9d96ef-3f9f-4bdf-bfbe-6c1432d3f004.lovable.app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Shreyal — from your best friend" },
      {
        name: "description",
        content:
          "A little birthday letter for the most stubborn, softest, smartest person I know. Happy twentieth, Shreyal.",
      },
      { property: "og:title", content: "Happy Birthday, Shreyal" },
      {
        property: "og:description",
        content: "A birthday letter for my unexpected best friend, turning twenty.",
      },
      { property: "og:image", content: `${SITE}${p0.url}` },
      { name: "twitter:image", content: `${SITE}${p0.url}` },
    ],
  }),
  component: Index,
});

const chapters = [
  {
    n: "01",
    kicker: "the plot twist",
    word: "Unexpected",
    hand: "and thank god for that",
    img: p2.url,
    body: "I didn't go looking for a best friend. You just showed up, made yourself at home, and somehow became the person I text first about literally everything. Best plot twist I never asked for.",
    tilt: "-4deg",
  },
  {
    n: "02",
    kicker: "the practice",
    word: "My therapist",
    hand: "no degree, full refund never",
    img: p3.url,
    body: "You've talked me down from more spirals than I can count. No appointment, no bill — just you letting me ramble, then saying the one thing that fixes my entire week. Certified? No. Unmatched? Absolutely.",
    tilt: "3.5deg",
  },
  {
    n: "03",
    kicker: "the workshop",
    word: "Solutionist",
    hand: "give her chaos, get back a plan",
    img: p4.url,
    body: "I bring you a mess that's still on fire and you hand it back solved — in steps, in order, like it was never a big deal. It was a big deal. You just make everything look easy.",
    tilt: "-3deg",
  },
  {
    n: "04",
    kicker: "the fine print",
    word: "Tsundere",
    hand: "bossy outside, softest inside",
    img: p5.url,
    body: "You act tough, you boss me around, you roll your eyes like it's a sport — and then you're the first to check if I ate, if I slept, if I got home safe. The attitude is a front. The kindness is the real you. (You'll deny this. I'm screenshotting it anyway.)",
    tilt: "4deg",
  },
  {
    n: "05",
    kicker: "the last door",
    word: "Home",
    hand: "my favorite place isn't a place",
    img: p6.url,
    body: "Some people are a place before they're a person. With you I don't have to perform or explain — I just get to exist. That's rarer than you think, and it's the whole reason this little site exists.",
    tilt: "-3.5deg",
  },
];

const strip = [
  { src: p1.url, cap: "unbothered", r: "-5deg" },
  { src: p7.url, cap: "effortless", r: "3deg" },
  { src: p3.url, cap: "no explanations", r: "-2deg" },
  { src: p5.url, cap: "main character", r: "4deg" },
  { src: p6.url, cap: "warm one", r: "-4deg" },
  { src: p4.url, cap: "the wall matched", r: "2.5deg" },
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
    const colors = ["var(--coral)", "var(--berry)", "var(--paper)", "var(--marigold-deep)"];
    setPieces(
      Array.from({ length: 60 }, () => ({
        left: `${Math.random() * 100}%`,
        bg: colors[Math.floor(Math.random() * colors.length)]!,
        dur: `${2 + Math.random() * 1.8}s`,
        delay: `${Math.random() * 0.6}s`,
        round: Math.random() > 0.5 ? "50%" : "0",
      })),
    );
    const t = setTimeout(() => setPieces([]), 5400);
    return () => clearTimeout(t);
  }, [fire]);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 h-[13px] w-[6px] opacity-90"
          style={{
            left: p.left,
            background: p.bg,
            borderRadius: p.round,
            animation: `confetti-fall ${p.dur} linear ${p.delay} forwards`,
          }}
        />
      ))}
    </div>
  );
}

function Marquee({ text, reverse = false }: { text: string; reverse?: boolean }) {
  return (
    <div className="overflow-hidden border-y-2 border-plum bg-coral py-3">
      <div
        className="flex w-max gap-10 whitespace-nowrap"
        style={{
          animation: `marquee-x ${reverse ? "32s" : "26s"} linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {Array.from({ length: 2 }).map((_, k) => (
          <span key={k} className="flex gap-10">
            {Array.from({ length: 6 }).map((__, i) => (
              <span
                key={i}
                className="font-[family-name:var(--font-display)] text-[clamp(1.3rem,3vw,2.1rem)] font-black uppercase tracking-[0.04em] text-primary-foreground"
              >
                {text} <span className="text-marigold">✿</span>
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
  const [loadBurst, setLoadBurst] = useState(false);
  const startRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoadBurst(true), 500);
    return () => clearTimeout(t);
  }, []);

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
    <main className="relative bg-marigold">
      <Confetti fire={loadBurst || claimed === "done"} />

      {/* scroll progress ribbon */}
      <div className="fixed inset-x-0 top-0 z-50 h-[4px] bg-plum/15">
        <div
          className="h-full bg-plum transition-[width] duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ---------- COVER ---------- */}
      <section className="grain relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-5 py-16 text-center">
        <div
          className="mx-auto max-w-4xl"
          style={{ opacity: coverFade, transform: `translateY(${scrollY * 0.12}px)` }}
        >
          <p
            className="font-[family-name:var(--font-hand)] text-[clamp(1.6rem,5vw,2.6rem)] font-bold text-coral"
            style={{ animation: "rise-in 0.9s ease-out both" }}
          >
            okay before you say anything — yes, I made you a whole website.
          </p>

          <h1 className="mt-2 font-[family-name:var(--font-display)] font-black uppercase leading-[0.82] tracking-[-0.02em]">
            <span
              className="block text-[clamp(2.6rem,11vw,7rem)]"
              style={{ animation: "rise-in 1s cubic-bezier(.16,.84,.28,1) 0.1s both" }}
            >
              Happy
            </span>
            <span
              className="outline-type block text-[clamp(2.6rem,11vw,7rem)]"
              style={{ animation: "rise-in 1s cubic-bezier(.16,.84,.28,1) 0.2s both" }}
            >
              Birthday
            </span>
          </h1>

          <div
            className="relative mt-6 inline-block"
            style={{ animation: "rise-in 1s cubic-bezier(.16,.84,.28,1) 0.34s both" }}
          >
            <span className="relative z-10 inline-block -rotate-2 bg-plum px-6 py-2 font-[family-name:var(--font-display)] text-[clamp(2rem,8vw,4.4rem)] font-black uppercase text-marigold shadow-lux">
              Shreyal
            </span>
          </div>

          <p className="mx-auto mt-7 max-w-md text-[clamp(1.05rem,3.6vw,1.35rem)] leading-relaxed text-plum/80">
            The most stubborn, softest, smartest person I know is officially{" "}
            <span className="font-semibold text-coral">twenty</span>. Scroll — I have things to say
            and you can't interrupt this time.
          </p>

          <button
            type="button"
            onClick={() => startRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="mt-8 rounded-full bg-coral px-8 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground shadow-lux transition hover:-translate-y-0.5"
            style={{ animation: "float-soft 3.4s ease-in-out infinite" }}
          >
            read the letter ↓
          </button>
        </div>

        {/* floating polaroid peek */}
        <div
          className="polaroid absolute bottom-[-3rem] right-[6vw] hidden w-40 rotate-6 md:block"
          style={{ transform: `rotate(6deg) translateY(${scrollY * -0.05}px)`, opacity: coverFade }}
        >
          <img
            src={p1.url}
            alt="Shreyal, being effortlessly herself"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </section>

      <Marquee text="Happy Birthday Shreyal" />

      {/* ---------- OPENING NOTE ---------- */}
      <section ref={startRef} className="relative px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="tape reveal relative mx-auto max-w-2xl rounded-lg bg-paper p-8 text-card-foreground shadow-lux sm:p-12">
            <p className="font-[family-name:var(--font-hand)] text-[clamp(1.4rem,4vw,2rem)] font-semibold text-coral">
              Dear Shreyal,
            </p>
            <p className="mt-4 text-[clamp(1.1rem,3.2vw,1.4rem)] leading-relaxed">
              I tried to put you into a birthday card and ran out of room, so here we are. Five
              things I know to be true about you — hung up in order, on purpose. Take them slowly.
              No eye-rolling.
            </p>
            <p className="mt-6 font-[family-name:var(--font-hand)] text-[clamp(1.3rem,3.5vw,1.7rem)] text-plum/70">
              (yes, I know you're already rolling your eyes.)
            </p>
          </div>
        </div>
      </section>

      {/* ---------- FIVE CHAPTERS ---------- */}
      {chapters.map((c, i) => (
        <section key={c.word} className="relative px-5 py-10 sm:py-16">
          <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-16">
            {/* photo */}
            <div className={`reveal flex justify-center ${i % 2 ? "md:order-2" : ""}`}>
              <figure
                className="polaroid w-[min(78vw,20rem)] transition-transform duration-500 hover:rotate-0"
                style={{ transform: `rotate(${c.tilt})` }}
              >
                <img
                  src={c.img}
                  alt={`Shreyal — ${c.word.toLowerCase()}`}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
                <figcaption className="mt-3 text-center font-[family-name:var(--font-hand)] text-2xl font-semibold text-plum/80">
                  {c.hand}
                </figcaption>
              </figure>
            </div>

            {/* text */}
            <div className={i % 2 ? "md:order-1" : ""}>
              <div className="reveal flex items-center gap-3">
                <span className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,7vw,4rem)] font-black text-coral">
                  {c.n}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  {c.kicker}
                </span>
              </div>
              <h2 className="reveal mt-2 font-[family-name:var(--font-display)] text-[clamp(2.6rem,10vw,5rem)] font-black uppercase leading-[0.88] tracking-[-0.01em]">
                {c.word}
              </h2>
              <p className="reveal mt-5 max-w-lg text-[clamp(1.05rem,3vw,1.3rem)] leading-relaxed text-plum/85">
                {c.body}
              </p>
            </div>
          </div>
        </section>
      ))}

      <div className="py-8" />
      <Marquee text="Twenty looks good on you" reverse />

      {/* ---------- PHOTO STRIP ---------- */}
      <section className="relative py-20">
        <div className="mx-auto mb-10 max-w-5xl px-5">
          <h2 className="reveal font-[family-name:var(--font-display)] text-[clamp(2.2rem,8vw,4rem)] font-black uppercase leading-none">
            The <span className="text-coral">evidence</span>
          </h2>
          <p className="reveal mt-2 font-[family-name:var(--font-hand)] text-2xl text-plum/70">
            exhibit A through F — swipe →
          </p>
        </div>
        <div className="rail flex snap-x snap-mandatory gap-8 overflow-x-auto px-6 pb-6 sm:px-10">
          {strip.map((g) => (
            <figure
              key={g.cap}
              className="polaroid w-[62vw] shrink-0 snap-center transition-transform duration-500 hover:rotate-0 sm:w-[16rem]"
              style={{ transform: `rotate(${g.r})` }}
            >
              <img
                src={g.src}
                alt={g.cap}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <figcaption className="mt-3 text-center font-[family-name:var(--font-hand)] text-2xl font-semibold text-plum/80">
                {g.cap}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------- GIFT ---------- */}
      <section className="relative px-5 pb-24 pt-6">
        <div className="mx-auto max-w-2xl">
          <div className="reveal mb-8 text-center">
            <p className="font-[family-name:var(--font-hand)] text-[clamp(1.6rem,5vw,2.4rem)] font-bold text-coral">
              one more thing before you go
            </p>
            <h2 className="mt-1 font-[family-name:var(--font-display)] text-[clamp(2rem,8vw,3.6rem)] font-black uppercase leading-none">
              Go eat something ridiculous
            </h2>
          </div>

          <div className="reveal relative mx-auto max-w-xl overflow-hidden rounded-2xl border-2 border-plum bg-paper text-card-foreground shadow-lux">
            <div className="flex items-center justify-between border-b-2 border-dashed border-plum/40 px-6 py-3 text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">
              <span>birthday voucher</span>
              <span className="text-coral">№ 020</span>
            </div>
            <span className="absolute -left-3 top-[3.1rem] h-6 w-6 rounded-full bg-marigold" />
            <span className="absolute -right-3 top-[3.1rem] h-6 w-6 rounded-full bg-marigold" />

            <div className="px-6 py-10 text-center sm:px-10">
              <p className="font-[family-name:var(--font-display)] text-[clamp(4rem,20vw,8rem)] font-black leading-[0.85] text-coral">
                ₹500
              </p>
              <p className="mx-auto mt-4 max-w-sm text-[clamp(1rem,3vw,1.2rem)] leading-relaxed text-plum/80">
                Lunch, dinner, dessert, or all three in one sitting. My treat — no arguments (I
                already know you'll argue anyway).
              </p>

              <button
                type="button"
                onClick={unlock}
                disabled={claimed !== "idle"}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-coral px-10 py-4 text-sm font-black uppercase tracking-[0.18em] text-primary-foreground transition hover:-translate-y-0.5 disabled:opacity-80"
                style={claimed === "idle" ? { animation: "pulse-ring 2.2s ease-out infinite" } : undefined}
              >
                {claimed === "idle"
                  ? "Unlock your gift"
                  : claimed === "sending"
                    ? "Sending…"
                    : "Unlocked!"}
              </button>

              <p className="mt-4 font-[family-name:var(--font-hand)] text-xl text-plum/70">
                {claimed === "done"
                  ? "sent it your way — go check your UPI, birthday girl"
                  : "tap it and I'll handle the rest"}
              </p>
            </div>

            <div className="border-t-2 border-dashed border-plum/40 px-6 py-3 text-center text-[0.65rem] font-bold uppercase tracking-[0.24em] text-muted-foreground">
              non-transferable · expires never · no receipts
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="grain relative border-t-2 border-plum bg-coral px-5 py-24 text-center text-primary-foreground">
        <p className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,9vw,4.6rem)] font-black uppercase leading-[0.9]">
          Happy twenty,
          <br />
          Shreyal
        </p>
        <p className="mx-auto mt-6 max-w-md font-[family-name:var(--font-hand)] text-[clamp(1.6rem,5vw,2.4rem)] font-semibold">
          love you (ew, I said it) — now go have the best year yet.
        </p>
      </footer>
    </main>
  );
}
