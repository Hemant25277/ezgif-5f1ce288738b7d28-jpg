'use client';
import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';

const TOTAL_FRAMES = 40;
const FRAME_PATH = '/frames';

export default function HeroCanvasAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  // ── Scroll tracking ──────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  // Subtle anti-gravity float (reduced so canvas stays mostly on-screen)
  const yOffset = useTransform(scrollVelocity, [-1, 0, 1], [8, 0, -8]);

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // ── Text opacity sections ────────────────────────────────────
  // Compressed so they fit into the shorter scroll zone
  const section1Opacity = useTransform(smoothProgress, [0, 0.05, 0.18, 0.22], [0, 1, 1, 0]);
  const section2Opacity = useTransform(smoothProgress, [0.25, 0.30, 0.50, 0.55], [0, 1, 1, 0]);
  const section3Opacity = useTransform(smoothProgress, [0.60, 0.65, 0.80, 0.85], [0, 1, 1, 0]);
  const section4Opacity = useTransform(smoothProgress, [0.88, 0.92, 0.97, 1.0], [0, 1, 1, 0]);
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);

  // ── Preload frames ───────────────────────────────────────────
  useEffect(() => {
    let loadedCount = 0;
    let cancelled = false;
    const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) =>
      new Promise<void>(resolve => {
        const img = new Image();
        img.src = `${FRAME_PATH}/frame_${i}.jpg`;
        img.onload = () => {
          if (!cancelled) {
            imgs[i] = img;
            loadedCount++;
            setLoadProgress((loadedCount / TOTAL_FRAMES) * 100);
          }
          resolve();
        };
        img.onerror = () => resolve(); // skip broken frames gracefully
      })
    );

    Promise.all(promises).then(() => {
      if (!cancelled) {
        imagesRef.current = imgs;
        setImagesLoaded(true);
      }
    });

    return () => { cancelled = true; };
  }, []);

  // ── Canvas renderer ──────────────────────────────────────────
  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Only resize the pixel buffer when dimensions actually changed
    if (canvas.width !== vw || canvas.height !== vh) {
      canvas.width = vw;
      canvas.height = vh;
    }

    const idx = Math.max(0, Math.min(Math.round(frameIndex.get()), TOTAL_FRAMES - 1));
    const img = imagesRef.current[idx];
    if (!img || !img.complete) return;

    // Cover-fit: fill the whole canvas, crop edges
    const scale = Math.max(vw / img.width, vh / img.height);
    const dx = (vw - img.width * scale) / 2;
    const dy = (vh - img.height * scale) / 2;

    ctx.clearRect(0, 0, vw, vh);
    ctx.drawImage(img, dx, dy, img.width * scale, img.height * scale);
  }, [frameIndex]);

  // ── Wire up canvas on load ───────────────────────────────────
  useEffect(() => {
    if (!imagesLoaded) return;

    // Draw initial frame immediately
    drawFrame();

    // Re-draw whenever scroll changes
    const unsubscribe = frameIndex.on('change', () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(drawFrame);
    });

    // Re-draw on resize
    const onResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(drawFrame);
    };
    window.addEventListener('resize', onResize);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [imagesLoaded, drawFrame, frameIndex]);

  const scrollToProducts = () =>
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });

  // ── Loading Screen ───────────────────────────────────────────
  if (!imagesLoaded) {
    return (
      <div className="fixed inset-0 bg-[#1A0F0A] flex flex-col items-center justify-center z-50">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-5xl mb-6"
        >
          ☕
        </motion.div>
        <div className="w-64 h-1.5 bg-[#3D2820] rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-[#D4A574] to-[#4F9C8F] rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${loadProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-[#C9B8A0] text-sm tracking-wider">
          Loading… {Math.round(loadProgress)}%
        </p>
      </div>
    );
  }

  // ── Hero ─────────────────────────────────────────────────────
  return (
    // ↓ REDUCED from h-[500vh] to h-[220vh] — cuts hero scroll zone by more than half
    <div ref={containerRef} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#1A0F0A]">

        {/* Canvas — absolutely fills the viewport */}
        <motion.div style={{ y: yOffset }} className="absolute inset-0">
          <canvas
            ref={canvasRef}
            style={{ display: 'block', width: '100vw', height: '100vh' }}
          />
        </motion.div>

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(26,15,10,0.55) 100%)' }}
        />

        {/* ── Text overlays ── */}
        <div className="absolute inset-0 pointer-events-none">

          {/* Section 1 — "Experience Coffee" */}
          <motion.div style={{ opacity: section1Opacity }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-[#F5E6D3] mb-4 tracking-tight leading-tight drop-shadow-2xl">
              Experience<br />Coffee
            </h1>
            <p className="text-lg md:text-2xl text-[#C9B8A0]">Where every sip defies gravity</p>
          </motion.div>

          {/* Section 2 — "Crafted to Perfection" */}
          <motion.div style={{ opacity: section2Opacity }}
            className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-[#F5E6D3] mb-3 drop-shadow-xl leading-tight">
              Crafted to<br />Perfection
            </h2>
            <p className="text-lg md:text-xl text-[#C9B8A0]">From bean to cup, excellence floats in every drop</p>
          </motion.div>

          {/* Section 3 — "Anti-Gravity Flavour" */}
          <motion.div style={{ opacity: section3Opacity }}
            className="absolute inset-0 flex flex-col items-end justify-center px-8 md:px-20 text-right"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-[#F5E6D3] mb-3 drop-shadow-xl leading-tight">
              Anti-Gravity<br />Flavour
            </h2>
            <p className="text-lg md:text-xl text-[#C9B8A0]">Defying expectations, elevating taste</p>
          </motion.div>

          {/* Section 4 — "Discover Your Blend" */}
          <motion.div style={{ opacity: section4Opacity }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-[#F5E6D3] mb-8 drop-shadow-xl">
              Discover Your Blend
            </h2>
            <motion.button
              whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(79,156,143,0.5)' }}
              whileTap={{ scale: 0.96 }}
              onClick={scrollToProducts}
              className="pointer-events-auto px-10 py-4 bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white rounded-full text-lg font-semibold shadow-2xl relative overflow-hidden"
            >
              {/* shimmer */}
              <motion.span
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'linear', repeatDelay: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />
              <span className="relative">Explore Collection ↓</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <p className="text-[#C9B8A0] text-xs tracking-widest uppercase">Scroll to Explore</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-[#C9B8A0]/40 rounded-full flex items-start justify-center pt-2"
          >
            <div className="w-1 h-3 bg-[#C9B8A0]/60 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
