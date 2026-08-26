import { useEffect, useRef } from "react";

type Particle = {
  a: number;
  r: number;
  tube: number;
  z: number;
  speed: number;
  phase: number;
  size: number;
  ring: number;
  sx: number;
  sy: number;
  tx: number;
  ty: number;
};

const INK = "21, 15, 62";
const ACCENT = "214, 61, 119";
const COLLAPSE_MS = 900;

/**
 * Quantum orbital field for light IWT-style surfaces.
 * Ink particles, magenta collapse underline. Canvas only.
 */
export function QuantumField({
  collapsed,
  targetRef,
}: {
  collapsed: boolean;
  targetRef: React.RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const collapsedRef = useRef(collapsed);
  const kickRef = useRef<(() => void) | null>(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    collapsedRef.current = collapsed;
    if (collapsed) kickRef.current?.();
  }, [collapsed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    let collapseStart: number | null = null;
    let done = false;
    let running = false;

    const targetLine = () => {
      const parent = canvas.parentElement;
      const el = targetRef.current;
      if (!parent || !el) return { x1: w * 0.08, x2: w * 0.55, y: h * 0.42 };
      const p = parent.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      return {
        x1: r.left - p.left,
        x2: r.right - p.left,
        y: r.bottom - p.top + 4,
      };
    };

    const project = (p: Particle, time: number, parallax: { x: number; y: number }) => {
      const a = p.a + time * p.speed;
      const tube = p.tube + Math.sin(time * 0.0012 + p.phase) * 3;
      const cx = w * 0.72 + parallax.x * 22;
      const cy = h * 0.5 + parallax.y * 14;
      const x = cx + Math.cos(a) * p.r + Math.cos(a * 2 + p.phase) * tube * 0.3;
      const y =
        cy + Math.sin(a) * p.r * 0.4 + Math.sin(a * 1.5 + p.phase) * tube * 0.22 + p.z * 0.12;
      const depth = (Math.sin(a) + 1) * 0.5;
      return { x, y, depth };
    };

    const assignTargets = (capture = true) => {
      const { x1, x2, y } = targetLine();
      particles.forEach((p, i) => {
        const t = particles.length > 1 ? i / (particles.length - 1) : 0;
        p.tx = x1 + (x2 - x1) * t;
        p.ty = y;
        if (capture) {
          const proj = project(p, performance.now(), mouse.current);
          p.sx = proj.x;
          p.sy = proj.y;
        }
      });
    };

    const build = () => {
      const count = Math.max(70, Math.min(110, Math.round((w * h) / 11000)));
      particles = [];
      for (let i = 0; i < count; i++) {
        const ring = i % 3;
        particles.push({
          a: Math.random() * Math.PI * 2,
          r: 60 + ring * 48 + Math.random() * 24,
          tube: (Math.random() - 0.5) * 28,
          z: (Math.random() - 0.5) * 60,
          speed: 0.00015 + Math.random() * 0.00028 * (ring % 2 === 0 ? 1 : -1),
          phase: Math.random() * Math.PI * 2,
          size: 1 + Math.random() * 1.4,
          ring,
          sx: 0,
          sy: 0,
          tx: 0,
          ty: 0,
        });
      }
      assignTargets(true);
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particles.length === 0) build();
      else assignTargets(false);
    };

    const drawCollapsedLine = (progress: number) => {
      const { x1, x2, y } = targetLine();
      const width = Math.max(0, (x2 - x1) * progress);
      ctx.beginPath();
      ctx.moveTo(x1, y);
      ctx.lineTo(x1 + width, y);
      ctx.strokeStyle = `rgba(${ACCENT}, ${0.7 + 0.3 * progress})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const frame = (time: number) => {
      running = true;
      ctx.clearRect(0, 0, w, h);
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.06;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.06;
      const parallax = { x: mouse.current.x, y: mouse.current.y };

      if (collapsedRef.current) {
        if (collapseStart === null) {
          collapseStart = time;
          assignTargets(true);
          done = false;
        }
        const k = Math.min(1, (time - collapseStart) / COLLAPSE_MS);
        const e = easeOut(k);
        if (!done) {
          for (const p of particles) {
            const x = p.sx + (p.tx - p.sx) * e;
            const y = p.sy + (p.ty - p.sy) * e;
            const alpha = 1 - e;
            if (alpha > 0.05) {
              ctx.beginPath();
              ctx.arc(x, y, p.size * (1 - e * 0.4), 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${ACCENT}, ${0.28 * alpha})`;
              ctx.fill();
            }
          }
        }
        drawCollapsedLine(done ? 1 : e);
        if (k >= 1) {
          done = true;
          running = false;
          return;
        }
      } else {
        const cx = w * 0.72 + parallax.x * 22;
        const cy = h * 0.5 + parallax.y * 14;
        for (let ring = 0; ring < 3; ring++) {
          const rr = 60 + ring * 48;
          ctx.beginPath();
          ctx.ellipse(cx, cy, rr, rr * 0.4, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${INK}, ${0.05 + ring * 0.015})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        const projected = particles.map((p) => ({ p, ...project(p, time, parallax) }));

        for (let i = 0; i < projected.length; i++) {
          const a = projected[i];
          for (let j = i + 1; j < projected.length; j++) {
            const b = projected[j];
            if (a.p.ring !== b.p.ring) continue;
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            if (dist < 46) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(${ACCENT}, ${(1 - dist / 46) * 0.1})`;
              ctx.lineWidth = 0.7;
              ctx.stroke();
            }
          }
        }

        for (const { p, x, y, depth } of projected) {
          const r = p.size * (0.75 + depth * 0.7);
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${INK}, ${0.12 + depth * 0.2})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      raf = requestAnimationFrame(frame);
    };

    kickRef.current = () => {
      if (done) return;
      cancelAnimationFrame(raf);
      running = false;
      start();
    };

    const onMove = (e: PointerEvent) => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const r = parent.getBoundingClientRect();
      mouse.current.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      mouse.current.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };

    resize();
    if (reduced) {
      done = true;
      collapsedRef.current = true;
      const paint = () => {
        resize();
        ctx.clearRect(0, 0, w, h);
        drawCollapsedLine(1);
      };
      paint();
      const ro = new ResizeObserver(paint);
      if (canvas.parentElement) ro.observe(canvas.parentElement);
      return () => {
        ro.disconnect();
        kickRef.current = null;
      };
    }

    start();
    window.addEventListener("pointermove", onMove, { passive: true });
    const ro = new ResizeObserver(() => {
      resize();
      if (done) {
        ctx.clearRect(0, 0, w, h);
        drawCollapsedLine(1);
      }
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      kickRef.current = null;
      running = false;
    };
  }, [targetRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
