import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, motion as Motion, useMotionValue, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { formatMoney } from "../data/menu";
import { cn } from "../lib/utils";

const heroFeatures = [
  { id: "strawberry", kicker: "Out of the fryer · 5:02", title: "Strawberry, still warm", sub: "Bright berry glaze, rainbow crunch, soft centre.", price: 4, image: "/assets/donut-1.webp", verb: "Get one" },
  { id: "crumble", kicker: "New this week", title: "Berry crumble", sub: "Freeze-dried berry crumb over a thin shell.", price: 4.5, image: "/assets/donut-5.webp", verb: "Get one" },
  { id: "icedlatte", kicker: "From the cold bar", title: "Iced latte, clear ice", sub: "Double shot, oat milk as standard.", price: 5, image: "/assets/icedlatte.webp", verb: "Order one" },
];

const ROTATE_MS = 5200;
const SWIPE_DISTANCE = 56;
const SWIPE_VELOCITY = 420;

const label = (item) => `${item.verb} · ${formatMoney(item.price)}`;

export default function Hero({ layout = "Feature card", autoRotate = true, onOpen, className }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);
  const viewportRef = useRef(null);
  const x = useMotionValue(0);
  const reduceMotion = useReducedMotion();
  const glide = reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 38, mass: 0.8 };
  const feature = heroFeatures[index];

  useLayoutEffect(() => {
    const element = viewportRef.current;
    if (!element) return undefined;
    const measure = () => setSlideWidth(element.offsetWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener("resize", measure);
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, [layout]);

  useEffect(() => {
    if (!autoRotate || paused || reduceMotion) return undefined;
    const rotation = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroFeatures.length);
    }, ROTATE_MS);
    return () => window.clearInterval(rotation);
  }, [autoRotate, paused, reduceMotion]);

  useEffect(() => {
    const controls = animate(x, -index * slideWidth, glide);
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, slideWidth, reduceMotion]);

  const goTo = (next) => setIndex((next + heroFeatures.length) % heroFeatures.length);

  const handleDragEnd = (event, info) => {
    let next = index;
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) next += 1;
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) next -= 1;
    next = Math.min(Math.max(next, 0), heroFeatures.length - 1);
    if (next === index) animate(x, -index * slideWidth, glide);
    else setIndex(next);
  };
  const open = () => onOpen?.(feature.id);

  const pauseHandlers = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocusCapture: () => setPaused(true),
    onBlurCapture: (event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); },
  };

  if (layout === "Compact strip") {
    return (
      <button
        type="button"
        onClick={open}
        {...pauseHandlers}
        className={cn("flex w-full items-center gap-3.5 rounded-card bg-[#FFEDF0] px-3.5 py-3 text-left transition-colors duration-200 ease-out hover:bg-[#FFE1E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7B8A] focus-visible:ring-offset-2", className)}
      >
        <span className="grid size-[62px] shrink-0 place-items-center rounded-full bg-[#FFE1E7] p-[5px]">
          <img key={feature.id} src={feature.image} alt="" className="motion-feature-pop block size-full object-contain" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
          <span className="text-[9.5px] font-medium uppercase tracking-[0.2em] text-[#E8536B]">{feature.kicker}</span>
          <span className="truncate text-[15px] font-medium tracking-[-0.025em]">{feature.title}</span>
          <span className="truncate text-[11.5px] text-[#A08D91]">{label(feature)}</span>
        </span>
        <span className="grid size-[34px] shrink-0 place-items-center rounded-full bg-[#2B2B2B]" aria-hidden="true">
          <ArrowRight className="size-[15px] text-white" />
        </span>
      </button>
    );
  }

  return (
    <section
      {...pauseHandlers}
      aria-roledescription="carousel"
      aria-label="Featured today"
      className={cn("relative isolate overflow-hidden rounded-card bg-[#FFEDF0]", className)}
    >
      <span aria-hidden="true" className="absolute -right-14 -top-20 -z-10 size-60 rounded-full bg-[#FFE1E7] sm:-right-24 sm:-top-32 sm:size-[26rem]" />
      <p className="sr-only" aria-live="polite">{feature.title}</p>

      <div ref={viewportRef} className="overflow-hidden">
        <Motion.div
          className="flex"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -(heroFeatures.length - 1) * slideWidth, right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          onDragStart={() => setPaused(true)}
          onDragEnd={handleDragEnd}
        >
          {heroFeatures.map((item, itemIndex) => (
            <div
              key={item.id}
              role="group"
              aria-roledescription="slide"
              aria-hidden={itemIndex !== index}
              className="relative flex w-full shrink-0 select-none flex-col justify-center overflow-hidden px-5 pb-24 pt-7 sm:px-9 sm:pb-28 sm:pt-11"
            >
              <img
                src={item.image}
                alt=""
                draggable="false"
                loading={itemIndex === 0 ? "eager" : "lazy"}
                className="pointer-events-none absolute -bottom-6 -right-[16%] w-[42%] max-w-[19rem] object-contain drop-shadow-[0_14px_18px_rgba(160,80,95,0.24)] sm:-bottom-8 sm:-right-2 sm:w-[40%]"
              />
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#E8536B] sm:text-xs">{item.kicker}</p>
              <h2 className="mt-2 max-w-[58%] text-pretty text-[22px] font-bold leading-[1.08] tracking-[-0.038em] sm:mt-3 sm:max-w-[26rem] sm:text-4xl">{item.title}</h2>
              <p className="mt-2 max-w-[56%] text-pretty text-[13px] leading-[1.5] text-[#A08D91] sm:mt-3 sm:max-w-[22rem] sm:text-[15px]">{item.sub}</p>
            </div>
          ))}
        </Motion.div>
      </div>

      <div className="absolute inset-x-5 bottom-5 flex items-center gap-2 sm:inset-x-9 sm:bottom-8 sm:gap-4">
        <button
          type="button"
          onClick={open}
          className="inline-flex h-10 w-[8.25rem] shrink-0 items-center justify-center overflow-hidden whitespace-nowrap rounded-full bg-[#2B2B2B] text-[13px] font-medium tracking-[-0.01em] text-white transition-[background-color,transform] duration-200 ease-out hover:bg-[#E8536B] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7B8A] focus-visible:ring-offset-2 sm:h-12 sm:w-[11.5rem] sm:text-sm"
        >
          <span key={feature.id} className="motion-swap">{label(feature)}</span>
        </button>
        <div className="flex items-center gap-1.5 sm:gap-2">
          {heroFeatures.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show ${item.title}`}
              aria-current={itemIndex === index ? "true" : undefined}
              onClick={() => goTo(itemIndex)}
              className={cn(
                "h-1.5 rounded-full transition-[width,background-color] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7B8A] focus-visible:ring-offset-2 sm:h-2",
                itemIndex === index ? "w-6 bg-[#E8536B] sm:w-7" : "w-1.5 bg-[#F7C6CE] sm:w-2",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
