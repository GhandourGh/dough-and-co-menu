import { useEffect, useMemo, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion as Motion, useReducedMotion } from "motion/react";
import { Check, ChevronDown, Heart, Instagram, Menu as MenuIcon, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { categories, formatMoney, menu } from "./data/menu";
import { cn } from "./lib/utils";
import Hero from "./components/Hero";


function IconButton({ label, className, children, ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn("inline-flex size-10 shrink-0 items-center justify-center rounded-full text-[#2B2B2B] transition-[background-color,transform] duration-150 ease-out hover:bg-[#F7F8FA] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7B8A] focus-visible:ring-offset-2", className)}
      {...props}
    >
      {children}
    </button>
  );
}

function SideDrawer({ open, onOpenChange, onShowMenu, onShowFavorites, favoriteCount }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay fixed inset-0 z-40 bg-[#2B2B2B]/35" />
        <Dialog.Content className="drawer-left fixed inset-y-0 left-0 z-50 flex w-[min(88vw,19rem)] flex-col overflow-y-auto bg-white px-6 py-7 shadow-xl focus:outline-none">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-[#FF7B8A]">Open until 16:00</p>
              <Dialog.Title className="mt-1 text-balance text-2xl font-bold text-[#2B2B2B]">Dough &amp; Co</Dialog.Title>
              <Dialog.Description className="sr-only">Menu navigation and shop information.</Dialog.Description>
            </div>
            <Dialog.Close asChild><IconButton label="Close navigation"><X className="size-5" /></IconButton></Dialog.Close>
          </div>

          <nav className="mt-7 border-t border-[#ECEEF1]" aria-label="Menu navigation">
            <Dialog.Close asChild>
              <button type="button" onClick={onShowMenu} className="flex w-full items-center justify-between border-b border-[#ECEEF1] py-4 text-left text-sm font-semibold hover:text-[#FF7B8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7B8A]">
                Full menu <span className="text-xs font-normal text-[#9AA0A6]">{menu.length} items</span>
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button type="button" onClick={onShowFavorites} className="flex w-full items-center justify-between border-b border-[#ECEEF1] py-4 text-left text-sm font-semibold hover:text-[#FF7B8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7B8A]">
                Favourites <span className="text-xs font-normal text-[#9AA0A6]">{favoriteCount} saved</span>
              </button>
            </Dialog.Close>
          </nav>

          <div className="mt-6 space-y-2">
            <details className="group rounded-card bg-[#F7F8FA] px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7B8A]">Hours &amp; location <ChevronDown className="size-4 text-[#9AA0A6] group-open:rotate-180" /></summary>
              <p className="mt-3 text-pretty text-xs leading-5 text-[#6B7076]">26 Baker Row, Ground Floor<br />Mon–Fri 7:00–16:00<br />Sat–Sun 8:00–15:00</p>
            </details>
            <details className="group rounded-card bg-[#F7F8FA] px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7B8A]">Allergens &amp; milk <ChevronDown className="size-4 text-[#9AA0A6] group-open:rotate-180" /></summary>
              <p className="mt-3 text-pretty text-xs leading-5 text-[#6B7076]">Donuts contain wheat, egg, and dairy. Whole, oat, almond, and soy milk are available.</p>
            </details>
            <details className="group rounded-card bg-[#F7F8FA] px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7B8A]">Boxes &amp; catering <ChevronDown className="size-4 text-[#9AA0A6] group-open:rotate-180" /></summary>
              <p className="mt-3 text-pretty text-xs leading-5 text-[#6B7076]">Order boxes of 24 or more by 16:00 the day before. Smaller boxes are available same day.</p>
            </details>
          </div>

          <div className="mt-auto pt-8">
            <p className="text-xs text-[#9AA0A6]">26 Baker Row, Ground Floor</p>
            <a href="https://www.instagram.com/doughandco26/" target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-[#FF7B8A] hover:text-[#E8636F]"><Instagram className="size-4" /> @doughandco26</a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Header({ category, onCategory, favoriteMode, favoriteCount, onFavoriteMode, cartCount, onCartOpen, drawerOpen, onDrawerOpen, onShowMenu, onOpenProduct }) {
  const categoryNavRef = useRef(null);
  const categoryButtonRefs = useRef({});
  const [compactHeaderVisible, setCompactHeaderVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const nav = categoryNavRef.current;
    const activeButton = categoryButtonRefs.current[category];
    if (!nav || !activeButton) return;
    activeButton.scrollIntoView({ block: "nearest", inline: "center" });
  }, [category]);

  useEffect(() => {
    const updateCompactHeader = () => setCompactHeaderVisible(window.scrollY > 72);
    updateCompactHeader();
    window.addEventListener("scroll", updateCompactHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateCompactHeader);
  }, []);

  return (
    <>
      <header className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid h-20 grid-cols-[1fr_auto_1fr] items-center gap-2">
            <div className="flex justify-start">
              <IconButton label="Open navigation" onClick={() => onDrawerOpen(true)}><MenuIcon className="size-6" /></IconButton>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF6EC] px-3 py-2 text-xs font-medium text-[#4D9B6A] sm:px-4 sm:text-sm">
              <span className="size-2 rounded-full bg-[#64B27F]" />Open until 16:00
            </div>
            <div className="flex justify-end gap-1 sm:gap-2">
              <IconButton label={favoriteMode ? "Show menu" : "Show favourites"} onClick={onFavoriteMode} className="relative">
                <Heart className={cn("size-5", favoriteMode && "fill-[#FF7B8A] text-[#FF7B8A]")} />
                {favoriteCount > 0 && <span className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-[#FF7B8A] text-[10px] font-bold text-white tabular-nums">{favoriteCount}</span>}
              </IconButton>
              <IconButton label="Open order" onClick={onCartOpen} className="relative">
                <ShoppingBag className="size-5" />
                {cartCount > 0 && <span className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-[#FF7B8A] text-[10px] font-bold text-white tabular-nums">{cartCount}</span>}
              </IconButton>
            </div>
          </div>

          <Hero className="mb-4" onOpen={onOpenProduct} />
        </div>
      </header>

      <AnimatePresence initial={false}>
        {compactHeaderVisible && (
          <Motion.div
            className="fixed inset-x-0 top-[env(safe-area-inset-top)] z-40 border-b border-[#ECEEF1] bg-white shadow-sm"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.18, ease: compactHeaderVisible ? "easeOut" : "easeIn" }}
            aria-label="Quick actions"
          >
            <div className="mx-auto grid h-14 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-8">
              <div className="flex justify-start">
                <IconButton label="Open navigation" onClick={() => onDrawerOpen(true)}><MenuIcon className="size-5" /></IconButton>
              </div>
              <span className="text-sm font-bold">Dough &amp; Co</span>
              <div className="flex justify-end gap-2.5">
                <IconButton label={favoriteMode ? "Show menu" : "Show favourites"} onClick={onFavoriteMode} className="relative">
                  <Heart className={cn("size-5", favoriteMode && "fill-[#FF7B8A] text-[#FF7B8A]")} />
                  {favoriteCount > 0 && <span className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-[#FF7B8A] text-[10px] font-bold text-white tabular-nums">{favoriteCount}</span>}
                </IconButton>
                <IconButton label="Open order" onClick={onCartOpen} className="relative">
                  <ShoppingBag className="size-5" />
                  {cartCount > 0 && <span className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-[#FF7B8A] text-[10px] font-bold text-white tabular-nums">{cartCount}</span>}
                </IconButton>
              </div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>

      <div className="sticky top-[calc(3.5rem+env(safe-area-inset-top))] z-30 border-y border-[#ECEEF1] bg-white shadow-sm">
          <nav ref={categoryNavRef} data-category-nav className="category-scroll mx-auto flex h-16 max-w-7xl scroll-smooth gap-7 overflow-x-auto px-4 pt-3 sm:px-6 lg:px-8" aria-label="Menu categories">
              {categories.map((item) => (
                <button ref={(node) => { if (node) categoryButtonRefs.current[item.id] = node; }} key={item.id} type="button" aria-current={category === item.id ? "location" : undefined} onClick={() => onCategory(item.id)} className={cn("relative shrink-0 origin-bottom pb-4 pt-1 text-sm transition-[color,transform,translate,scale] duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7B8A]", category === item.id ? "-translate-y-0.5 scale-110 font-bold text-[#2B2B2B]" : "translate-y-0 scale-100 font-medium text-[#B4B8BE] hover:text-[#6B7076]")}>
                  {item.label}{category === item.id && <span className="motion-fade absolute bottom-2 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[#FF7B8A]" />}
                </button>
              ))}
          </nav>
      </div>
      <SideDrawer open={drawerOpen} onOpenChange={onDrawerOpen} onShowMenu={onShowMenu} onShowFavorites={() => { if (!favoriteMode) onFavoriteMode(); }} favoriteCount={favoriteCount} />
    </>
  );
}

function ProductCard({ item, favorite, onFavorite, onAdd, onOpen, animationDelay, headingLevel = "h3" }) {
  return (
    <article className="motion-rise group relative flex min-h-64 flex-col overflow-hidden rounded-card bg-[#F7F8FA] p-4 sm:min-h-72 sm:p-5" style={{ animationDelay }}>
      {item.badge && <span className={cn("absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[11px] font-medium uppercase", item.soldOut ? "bg-[#ECEEF1] text-[#9AA0A6]" : item.badge === "Vegan" ? "bg-[#EAF6EC] text-[#4D9B6A]" : item.badge === "New" ? "bg-[#FFF1E6] text-[#C2711F]" : "bg-[#FFEDF0] text-[#FF6072]")}>{item.badge === "Bestseller" ? "Popular" : item.badge}</span>}
      <IconButton label={favorite ? `Remove ${item.name} from favourites` : `Add ${item.name} to favourites`} onClick={() => onFavorite(item.id)} className="absolute right-2 top-2 z-10 size-9 hover:bg-white"><Heart className={cn("size-4 text-[#D7DAE0]", favorite && "fill-[#FF7B8A] text-[#FF7B8A]")} /></IconButton>
      <button type="button" onClick={() => onOpen(item)} className="flex min-h-0 flex-1 items-center justify-center pt-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7B8A]">
        <img src={item.image} alt="" className={cn("max-h-36 w-full object-contain transition-transform duration-150 group-hover:scale-[1.03] sm:max-h-44", item.soldOut && "opacity-35 grayscale")} loading="lazy" />
        <span className="sr-only">View {item.name}</span>
      </button>
      <div className="mt-3 flex items-end justify-between gap-2">
        <button type="button" onClick={() => onOpen(item)} className="min-w-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7B8A]">
          {headingLevel === "h3"
            ? <h3 className="truncate text-sm font-bold text-[#2B2B2B] sm:text-base">{item.name}</h3>
            : <h2 className="truncate text-sm font-bold text-[#2B2B2B] sm:text-base">{item.name}</h2>}
          <p className="mt-1 text-sm font-bold text-[#FF6072] tabular-nums">{formatMoney(item.price)}</p>
        </button>
        <button type="button" onClick={() => onAdd(item)} disabled={item.soldOut} aria-label={`Add ${item.name} to order`} className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#FF7B8A] text-white transition-transform duration-150 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7B8A] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#D7DAE0] sm:size-11"><Plus className="size-5" /></button>
      </div>
    </article>
  );
}

function ProductDialog({ item, open, onOpenChange, onAdd, favorite, onFavorite }) {
  if (!item) return null;
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay fixed inset-0 z-40 bg-[#2B2B2B]/35" />
        <Dialog.Content className="dialog-panel fixed inset-x-3 bottom-3 z-50 max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-card bg-white shadow-xl focus:outline-none sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:w-[min(92vw,44rem)] sm:-translate-x-1/2 sm:-translate-y-1/2">
          <Dialog.Title className="sr-only">{item.name}</Dialog.Title><Dialog.Description className="sr-only">Product details for {item.name}.</Dialog.Description>
          <Dialog.Close asChild><IconButton label="Close item" className="absolute right-4 top-4 z-10 bg-white"><X className="size-5" /></IconButton></Dialog.Close>
          <div className="grid sm:grid-cols-2">
            <div className="grid min-h-72 place-items-center bg-[#F7F8FA] p-8"><img src={item.image} alt={item.name} className="max-h-64 w-full object-contain" /></div>
            <div className="flex flex-col p-7">
              {item.badge && <span className="w-fit rounded-full bg-[#FFEDF0] px-3 py-1 text-xs font-medium text-[#FF6072]">{item.badge}</span>}
              <h2 className="mt-4 text-balance text-3xl font-bold text-[#2B2B2B]">{item.name}</h2><p className="mt-3 text-pretty text-sm leading-6 text-[#6B7076]">{item.description}</p>
              <div className="mt-6 rounded-card bg-[#F7F8FA] p-4 text-xs leading-5 text-[#6B7076]">Made fresh today. Ask the team about allergens and milk alternatives.</div>
              <div className="mt-7 flex items-center justify-between gap-3">
                <span className="text-xl font-bold text-[#FF6072] tabular-nums">{formatMoney(item.price)}</span>
                <div className="flex items-center gap-2">
                  <IconButton label={favorite ? `Remove ${item.name} from favourites` : `Add ${item.name} to favourites`} onClick={() => onFavorite(item.id)}><Heart className={cn("size-5", favorite && "fill-[#FF7B8A] text-[#FF7B8A]")} /></IconButton>
                  <button type="button" onClick={() => { onAdd(item); onOpenChange(false); }} disabled={item.soldOut} className="inline-flex h-11 items-center gap-2 rounded-full bg-[#FF7B8A] px-5 text-sm font-bold text-white transition-colors duration-150 hover:bg-[#E8636F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7B8A] focus-visible:ring-offset-2 disabled:bg-[#D7DAE0]"><Plus className="size-4" /> Add</button>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function CartDrawer({ open, onOpenChange, cart, onQuantity }) {
  const [service, setService] = useState("Pickup");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const submit = (event) => { event.preventDefault(); if (!name.trim()) { setError("Add your name for the order."); return; } setError(""); setConfirmed(true); };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay fixed inset-0 z-40 bg-[#2B2B2B]/35" />
        <Dialog.Content className="drawer-right fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-xl focus:outline-none">
          <div className="flex items-center justify-between border-b border-[#ECEEF1] px-6 py-5">
            <div><Dialog.Title className="text-xl font-bold">Your order</Dialog.Title><Dialog.Description className="mt-1 text-xs text-[#9AA0A6]">Ready in 15–20 minutes</Dialog.Description></div>
            <Dialog.Close asChild><IconButton label="Close order"><X className="size-5" /></IconButton></Dialog.Close>
          </div>
          {confirmed ? (
            <div className="motion-pop flex flex-1 flex-col items-center justify-center p-8 text-center"><span className="grid size-14 place-items-center rounded-full bg-[#EAF6EC] text-[#4D9B6A]"><Check className="size-7" /></span><h2 className="mt-5 text-balance text-2xl font-bold">Thanks, {name}.</h2><p className="mt-2 text-pretty text-sm leading-6 text-[#6B7076]">Your {service.toLowerCase()} order is confirmed.</p><button type="button" onClick={() => setConfirmed(false)} className="mt-6 text-sm font-bold text-[#FF6072]">Back to order</button></div>
          ) : cart.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center"><span className="grid size-14 place-items-center rounded-full bg-[#FFEDF0] text-[#FF7B8A]"><ShoppingBag className="size-6" /></span><h2 className="mt-5 text-balance text-lg font-bold">Nothing here yet</h2><p className="mt-2 text-pretty text-sm text-[#9AA0A6]">Tap the pink plus on anything you want.</p><Dialog.Close className="mt-5 text-sm font-bold text-[#FF6072]">Browse menu</Dialog.Close></div>
          ) : (
            <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
              <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 rounded-card bg-[#F7F8FA] p-3">
                    <img src={item.image} alt="" className="size-14 shrink-0 object-contain" />
                    <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{item.name}</p><p className="mt-1 text-xs font-semibold text-[#FF6072] tabular-nums">{formatMoney(item.price)}</p></div>
                    <div className="flex items-center rounded-full bg-white"><IconButton label={`Remove one ${item.name}`} onClick={() => onQuantity(item.id, -1)} className="size-8"><Minus className="size-3" /></IconButton><span className="w-5 text-center text-xs font-bold tabular-nums">{item.quantity}</span><IconButton label={`Add one ${item.name}`} onClick={() => onQuantity(item.id, 1)} className="size-8"><Plus className="size-3" /></IconButton></div>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#ECEEF1] px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5">
                <fieldset><legend className="sr-only">Service type</legend><div className="grid grid-cols-2 gap-2 rounded-full bg-[#F7F8FA] p-1">{["Pickup", "Delivery"].map((option) => <label key={option} className={cn("cursor-pointer rounded-full px-4 py-2 text-center text-xs font-bold", service === option ? "bg-white text-[#2B2B2B] shadow-sm" : "text-[#9AA0A6]")}><input type="radio" name="service" value={option} checked={service === option} onChange={() => setService(option)} className="sr-only" />{option}</label>)}</div></fieldset>
                <label htmlFor="order-name" className="mt-4 block text-xs font-bold">Name for the order</label><input id="order-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className="mt-2 h-11 w-full rounded-full border border-[#E6E8EC] px-4 text-sm outline-none focus:border-[#FF7B8A] focus:ring-2 focus:ring-[#FFEDF0]" />
                {error && <p className="mt-2 text-xs font-semibold text-red-600">{error}</p>}
                <div className="mt-5 flex items-center justify-between"><span className="text-sm font-bold">Total</span><span className="text-xl font-bold tabular-nums">{formatMoney(total)}</span></div>
                <button type="submit" className="mt-4 h-12 w-full rounded-full bg-[#FF7B8A] text-sm font-bold text-white transition-colors duration-150 hover:bg-[#E8636F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7B8A] focus-visible:ring-offset-2">Place order</button>
              </div>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default function App() {
  const [category, setCategory] = useState("popular");
  const [favoriteMode, setFavoriteMode] = useState(false);
  const [favorites, setFavorites] = useState(() => new Set());
  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [productOpen, setProductOpen] = useState(false);
  const sectionRefs = useRef({});

  const items = useMemo(() => {
    return favoriteMode ? menu.filter((item) => favorites.has(item.id)) : menu;
  }, [favoriteMode, favorites]);

  const menuSections = useMemo(() => categories.map((section) => ({
    ...section,
    items: menu.filter((item) => section.id === "popular" ? item.featured : item.category === section.id),
  })), []);

  const browsingFullMenu = !favoriteMode;

  useEffect(() => {
    if (!browsingFullMenu) return undefined;
    let frameId = null;

    const updateActiveSection = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        const categoryNavBottom = document.querySelector("[data-category-nav]")?.getBoundingClientRect().bottom;
        const marker = (categoryNavBottom ?? 138) + 24;
        let nextCategory = categories[0].id;

        for (const section of categories) {
          const element = sectionRefs.current[section.id];
          if (element && element.getBoundingClientRect().top <= marker) nextCategory = section.id;
        }

        const atPageEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        if (atPageEnd) nextCategory = categories[categories.length - 1].id;
        setCategory((current) => current === nextCategory ? current : nextCategory);
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [browsingFullMenu]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const scrollToCategory = (id) => {
    setFavoriteMode(false);
    setCategory(id);
    window.requestAnimationFrame(() => sectionRefs.current[id]?.scrollIntoView({ block: "start" }));
  };
  const showMenu = () => { scrollToCategory("popular"); };
  const toggleFavorites = () => { setFavoriteMode((current) => !current); };
  const toggleFavorite = (id) => setFavorites((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  const addToCart = (item) => setCart((current) => { const existing = current.find((line) => line.id === item.id); return existing ? current.map((line) => line.id === item.id ? { ...line, quantity: line.quantity + 1 } : line) : [...current, { ...item, quantity: 1 }]; });
  const changeQuantity = (id, amount) => setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0));
  const openProduct = (item) => { setSelected(item); setProductOpen(true); };
  const openProductById = (id) => { const item = menu.find((entry) => entry.id === id); if (item) openProduct(item); };

  return (
    <div className="min-h-dvh bg-white text-[#2B2B2B]">
      <Header category={category} onCategory={scrollToCategory} favoriteMode={favoriteMode} favoriteCount={favorites.size} onFavoriteMode={toggleFavorites} cartCount={cartCount} onCartOpen={() => setCartOpen(true)} drawerOpen={drawerOpen} onDrawerOpen={setDrawerOpen} onShowMenu={showMenu} onOpenProduct={openProductById} />
      <main className="mx-auto min-h-[calc(100dvh-8rem)] max-w-7xl px-4 pb-16 pt-9 sm:px-6 sm:pt-12 lg:px-8">
        {browsingFullMenu ? (
          <div className="space-y-14 sm:space-y-20">
            {menuSections.map((section, sectionIndex) => (
              <section key={section.id} id={`menu-${section.id}`} ref={(node) => { if (node) sectionRefs.current[section.id] = node; }} className="scroll-mt-20" aria-labelledby={`heading-${section.id}`}>
                <div className="mb-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-[#9AA0A6]">{sectionIndex === 0 ? "Fresh today" : `${section.items.length} items`}</p>
                    <h2 id={`heading-${section.id}`} className="mt-1 text-balance text-2xl font-bold sm:text-3xl">{section.label}</h2>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
                  {section.items.map((item, index) => <ProductCard key={item.id} item={item} favorite={favorites.has(item.id)} onFavorite={toggleFavorite} onAdd={addToCart} onOpen={openProduct} animationDelay={`${Math.min(index, 6) * 35}ms`} headingLevel="h3" />)}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div><p className="text-sm text-[#9AA0A6]">{favorites.size} saved items</p><h2 className="mt-1 text-balance text-2xl font-bold sm:text-3xl">Favourites</h2></div>
            </div>
            {items.length > 0 ? (
              <div key={String(favoriteMode)} className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
                {items.map((item, index) => <ProductCard key={item.id} item={item} favorite={favorites.has(item.id)} onFavorite={toggleFavorite} onAdd={addToCart} onOpen={openProduct} animationDelay={`${Math.min(index, 6) * 35}ms`} />)}
              </div>
            ) : (
              <div className="motion-fade rounded-card bg-[#F7F8FA] px-6 py-16 text-center"><Heart className="mx-auto size-7 text-[#D7DAE0]" /><h2 className="mt-4 text-balance text-lg font-bold">No favourites yet</h2><p className="mt-2 text-pretty text-sm text-[#9AA0A6]">Tap the heart on anything you love.</p><button type="button" onClick={showMenu} className="mt-5 text-sm font-bold text-[#FF6072]">Back to popular</button></div>
            )}
          </>
        )}
      </main>
      <ProductDialog item={selected} open={productOpen} onOpenChange={setProductOpen} onAdd={addToCart} favorite={selected ? favorites.has(selected.id) : false} onFavorite={toggleFavorite} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} cart={cart} onQuantity={changeQuantity} />
      <footer className="border-t border-[#ECEEF1] px-4 py-8 text-center text-xs text-[#9AA0A6]">Dough &amp; Co · 26 Baker Row · Made fresh daily</footer>
    </div>
  );
}
