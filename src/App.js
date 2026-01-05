import React, { useState, useEffect, useRef } from 'react';
import { 
  Cake, 
  MapPin, 
  Phone, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Star,
  Heart,
  ShoppingBag,
  MessageCircle,
  Clock3,
  Plus,
  Minus,
  Trash2,
  Truck,
  Store,
  ArrowRight
} from 'lucide-react';

// Custom Hook for Reveal Animations
const useReveal = () => {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, revealed];
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  
  const currentYear = new Date().getFullYear();
  const phoneNumber = "0739015521";
  
  const getPrice = (priceStr) => parseInt(priceStr.replace('R', ''));

  // Global Setup
  useEffect(() => {
    document.title = "Sindy's Bakery Ezakheni | The Warmth of Home Baking";
    
    // Global Smooth Scroll for all anchors
    const handleLinkClick = (e) => {
      const href = e.target.closest('a')?.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const navHeight = 80;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
          setIsMenuOpen(false); // Close mobile menu if open
        }
      }
    };

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleLinkClick);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = (isCartOpen || isMenuOpen) ? 'hidden' : 'unset';
  }, [isCartOpen, isMenuOpen]);

  const menuItems = [
    { id: 1, name: "5Ltr Scones", price: "R130", category: "Family Favourites", description: "Warm, golden scones that taste just like Sunday morning." },
    { id: 2, name: "10Ltr Cupcakes / White Muffins", price: "R230", category: "Family Favourites", description: "Little bites of joy to share with the ones you love." },
    { id: 3, name: "5Ltr Cupcakes", price: "R250", category: "Specialty Treats", description: "Beautifully baked treats that make any day feel special." },
    { id: 4, name: "20Ltr Scones", price: "R350", category: "Big Gatherings", description: "A generous bucket of comfort for your big family events." },
    { id: 5, name: "5Ltr Brown Muffins (Plain)", price: "R180", category: "Wholesome Goodness", description: "Simple, earthy, and made with care—wholesome goodness." },
    { id: 6, name: "5Ltr Brown Muffins (w/ Choc Chips)", price: "R220", category: "Wholesome Goodness", description: "A warm hug in a muffin—rich chocolate meets home baking." },
    { id: 7, name: "20Ltr Muffins", price: "R450", category: "Big Gatherings", description: "Enough sweetness to make every guest smile at your party." },
  ];

  const testimonials = [
    { name: "Thandi M.", text: "Sindy's baking reminds me of home. The chocolate chip muffins are pure happiness!", stars: 5 },
    { name: "Sipho D.", text: "Sindy puts her heart into these scones. I ordered the 20Ltr for our family reunion.", stars: 5 },
    { name: "Elena R.", text: "Honest, heartwarming baking. The brown muffins are perfect for breakfast.", stars: 5 }
  ];

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (itemId, change) => {
    setCart(prev => prev.map(item => {
      if (item.id === itemId) return { ...item, quantity: Math.max(0, item.quantity + change) };
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (getPrice(item.price) * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const checkoutWhatsApp = () => {
    let message = "Hello Sindy! 🧁 I'd like to place an order:%0A%0A";
    cart.forEach(item => { message += `▪️ ${item.quantity}x ${item.name} (${item.price})%0A`; });
    message += `%0A*Total Estimate: R${cartTotal}*`;
    message += `%0AMethod: ${deliveryMethod === 'delivery' ? '🚚 Delivery' : '🏪 Store Pickup'}`;
    window.open(`https://wa.me/27${phoneNumber.substring(1)}?text=${message}`, '_blank');
  };

  // Section Reveal Hooks
  const [menuRef, menuVisible] = useReveal();
  const [contactRef, contactVisible] = useReveal();

  return (
    <div className="min-h-screen bg-[#fcfaf7] font-sans text-slate-800 antialiased relative">
      <style>{`
        .reveal { opacity: 0; transform: translateY(20px); transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
      `}</style>

      {/* Navbar */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${scrolled || isMenuOpen ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-blue-100 py-2" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group transition-transform active:scale-95">
            <div className={`p-2 rounded-xl transition-all duration-500 group-hover:rotate-12 ${scrolled || isMenuOpen ? "bg-blue-50 text-blue-600" : "bg-white/10 text-white"}`}>
               <Cake size={24} />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-serif font-bold transition-colors leading-none ${scrolled || isMenuOpen ? "text-blue-900" : "text-white"}`}>Sindy's Bakery</span>
              <span className={`text-[10px] uppercase tracking-[0.2em] font-bold mt-1 ${scrolled || isMenuOpen ? "text-blue-400" : "text-blue-100/80"}`}>Ezakheni</span>
            </div>
          </a>

          <div className={`hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 p-1.5 rounded-full transition-all duration-500 ${scrolled ? "bg-slate-100/50 backdrop-blur-sm border border-white/50" : "bg-black/10 backdrop-blur-sm"}`}>
            {[{ label: "The Menu", href: "#menu" }, { label: "Our Kitchen", href: "#about" }, { label: "Contact", href: "#contact" }].map((link) => (
              <a key={link.label} href={link.href} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${scrolled ? "text-slate-600 hover:bg-white hover:text-blue-600" : "text-white hover:bg-white/20"}`}>
                {link.label}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsCartOpen(true)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 ${scrolled || isMenuOpen ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "bg-white text-blue-900 shadow-xl"}`}
            >
              <ShoppingBag size={20} strokeWidth={2.5} className={cartItemCount > 0 ? "animate-bounce" : ""} />
              <span className="font-bold text-sm hidden sm:block">Basket</span>
              {cartItemCount > 0 && (
                <span className={`flex items-center justify-center text-[10px] font-black h-5 min-w-[1.25rem] px-1 rounded-full animate-in zoom-in duration-300 ${scrolled || isMenuOpen ? "bg-white text-blue-600" : "bg-blue-600 text-white"}`}>
                  {cartItemCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`md:hidden p-2.5 rounded-full transition-colors ${scrolled || isMenuOpen ? "text-slate-600 hover:bg-slate-100" : "text-white hover:bg-white/20"}`}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="about" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 scale-105 animate-[pulse_8s_infinite_alternate]">
          <img src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=2000" className="w-full h-full object-cover" alt="Sindy's Baking" />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-950/40 to-[#fcfaf7]" />
        </div>
        <div className="relative text-center px-4 max-w-4xl pt-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
          <div className="inline-block px-4 py-1 bg-blue-600 text-white text-[10px] font-bold tracking-widest uppercase rounded-full mb-6">Fresh from the heart of Ezakheni</div>
          <h1 className="text-5xl md:text-8xl font-serif text-white mb-6 leading-tight">The Warmth of <br/><span className="text-blue-100 italic">Home in Every Bite</span></h1>
          <p className="text-lg md:text-2xl text-blue-50/90 mb-10 max-w-2xl mx-auto">No fancy factories, just Sindy's kitchen. Real ingredients, baked fresh for your family gatherings.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#menu" className="bg-white text-blue-900 px-10 py-5 rounded-2xl text-lg font-bold shadow-xl hover:scale-105 hover:shadow-2xl transition-all">See Today's Treats</a>
            <button onClick={() => setIsCartOpen(true)} className="bg-blue-600/20 backdrop-blur-md text-white border border-white/30 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-blue-600 transition-all">View Basket</button>
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section id="menu" ref={menuRef} className={`py-32 px-4 max-w-7xl mx-auto scroll-mt-20 reveal ${menuVisible ? 'visible' : ''}`}>
        <div className="text-center mb-20 reveal stagger-1">
          <h2 className="text-4xl md:text-6xl font-serif text-blue-950 mb-4">Sindy's Oven Favorites</h2>
          <p className="text-slate-500 font-medium">Everything is handmade and baked fresh to your order.</p>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-6 rounded-full opacity-30" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, idx) => {
            const inCart = cart.find(c => c.id === item.id);
            return (
              <div key={item.id} className={`bg-white rounded-[2.5rem] border border-blue-50 p-2 group hover:shadow-2xl transition-all duration-500 flex flex-col h-full reveal stagger-${(idx % 3) + 1} ${menuVisible ? 'visible' : ''}`}>
                <div className="bg-[#fdfcfb] h-52 rounded-[2.2rem] flex flex-col items-center justify-center relative overflow-hidden shrink-0 group-hover:bg-blue-50 transition-colors duration-500">
                  <Cake className="w-16 h-16 text-blue-100 group-hover:text-blue-200 group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-600">{item.category}</div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-serif text-blue-950 font-bold leading-tight group-hover:text-blue-700 transition-colors">{item.name}</h3>
                    <span className="text-2xl font-black text-blue-600 shrink-0 ml-2">{item.price}</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">{item.description}</p>
                  {inCart ? (
                    <div className="flex items-center gap-2 animate-in zoom-in duration-300">
                       <div className="flex-1 bg-blue-900 text-white py-4 rounded-2xl font-bold flex items-center justify-between px-6 shadow-lg shadow-blue-900/20">
                          <button onClick={() => updateQuantity(item.id, -1)} className="hover:scale-125 transition-transform"><Minus size={18} /></button>
                          <span className="text-sm tracking-wider uppercase">{inCart.quantity} in Basket</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="hover:scale-125 transition-transform"><Plus size={18} /></button>
                       </div>
                    </div>
                  ) : (
                    <button onClick={() => addToCart(item)} className="w-full bg-blue-50 text-blue-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all active:scale-95 group-hover:translate-y-[-4px]">
                      <Plus size={18} /> Add to Order
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className={`py-32 px-4 bg-white relative overflow-hidden reveal ${contactVisible ? 'visible' : ''}`}>
        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="reveal stagger-1">
              <h2 className="text-4xl md:text-7xl font-serif text-blue-950 mb-8 leading-tight">Let's get the <br/> <span className="italic text-blue-700 underline decoration-blue-100 underline-offset-8">oven started</span></h2>
              <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">Whether it's for a ceremony, a family gathering, or just a treat—I'd love to bake for you.</p>
              <div className="space-y-6">
                <div className="flex items-start gap-4"><div className="p-3 bg-blue-50 rounded-2xl text-blue-600"><MapPin /></div><div><h4 className="font-bold text-blue-950">Where to find me</h4><p className="text-slate-500">5084 Malandela Road, Section B, Ezakheni</p></div></div>
                <div className="flex items-start gap-4"><div className="p-3 bg-blue-50 rounded-2xl text-blue-600"><Clock3 /></div><div><h4 className="font-bold text-blue-950">Baking Hours</h4><p className="text-slate-500">Mon - Sat: 08:00 - 17:00</p></div></div>
              </div>
            </div>
            <div className="bg-[#fcfaf7] p-8 md:p-12 rounded-[3.5rem] border-2 border-blue-50 reveal stagger-2">
              <div className="space-y-4">
                <a href="#menu" className="w-full group flex items-center justify-between p-6 bg-white rounded-3xl border border-blue-50 hover:border-blue-200 transition-all hover:shadow-xl active:scale-95">
                  <div className="flex items-center gap-4 text-left">
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl group-hover:rotate-6 transition-transform"><ShoppingBag /></div>
                    <div><p className="font-bold text-blue-950">Start an Order</p><p className="text-sm text-slate-400">Pick from the menu above</p></div>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href={`tel:${phoneNumber}`} className="group flex items-center justify-between p-6 bg-white rounded-3xl border border-blue-50 hover:border-blue-200 transition-all hover:shadow-xl active:scale-95">
                  <div className="flex items-center gap-4 text-left">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl group-hover:rotate-6 transition-transform"><Phone /></div>
                    <div><p className="font-bold text-blue-950">Call Sindy</p><p className="text-sm text-slate-400">Prefer to talk? Call anytime</p></div>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-center md:justify-end items-end md:items-stretch">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full md:w-[450px] bg-white h-[85vh] md:h-full shadow-2xl flex flex-col animate-in slide-in-from-bottom md:slide-in-from-right duration-500 rounded-t-[2.5rem] md:rounded-none overflow-hidden">
            <div className="px-8 py-8 border-b border-slate-50 flex justify-between items-center bg-white">
              <div><h2 className="text-2xl font-serif font-bold text-blue-950">Your Basket</h2><p className="text-slate-400 text-sm">{cartItemCount} items selected</p></div>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center animate-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-200 mb-6"><ShoppingBag size={40} /></div>
                  <h3 className="text-blue-950 font-bold text-lg mb-2">Empty Basket</h3>
                  <a href="#menu" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-100">Browse Menu</a>
                </div>
              ) : (
                <div className="space-y-4 pb-32">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-slate-50 hover:bg-blue-50/30 transition-colors animate-in slide-in-from-right-4">
                      <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-blue-200 shrink-0"><Cake size={24} /></div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-2"><h4 className="font-bold text-blue-950 text-sm">{item.name}</h4><span className="font-bold text-blue-600 text-sm">{item.price}</span></div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-lg px-2 py-1">
                            <button onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></button>
                          </div>
                          <button onClick={() => updateQuantity(item.id, -item.quantity)} className="text-slate-300 hover:text-red-500"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-8 border-t border-slate-50 bg-white absolute bottom-0 w-full animate-in slide-in-from-bottom duration-500">
                <div className="flex justify-between items-end mb-6"><span className="text-slate-500">Total Estimate</span><span className="text-3xl font-serif font-bold text-blue-950">R{cartTotal}</span></div>
                <button onClick={checkoutWhatsApp} className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-emerald-700 hover:shadow-xl hover:translate-y-[-2px] transition-all active:scale-95"><MessageCircle size={20} /> Order via WhatsApp</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Testimonials */}
      <section className="py-32 bg-blue-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-center gap-1 mb-8 animate-pulse">
            {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" className="text-yellow-400" />)}
          </div>
          <div className="relative min-h-[160px] flex items-center justify-center">
            {testimonials.map((t, i) => (
              <div key={i} className={`absolute transition-all duration-700 ease-out ${i === activeTestimonial ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <p className="text-2xl md:text-3xl font-serif italic mb-6 leading-relaxed">"{t.text}"</p>
                <p className="font-bold tracking-widest uppercase text-xs text-blue-400">— {t.name}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-12">
            <button onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)} className="p-3 border border-white/10 rounded-full hover:bg-white/10 transition-all active:scale-90"><ChevronLeft /></button>
            <button onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)} className="p-3 border border-white/10 rounded-full hover:bg-white/10 transition-all active:scale-90"><ChevronRight /></button>
          </div>
        </div>
      </section>

      <footer className="bg-white py-16 px-6 border-t border-blue-50 text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center gap-2"><Cake className="text-blue-600" /><span className="text-xl font-serif font-bold text-blue-950">Sindy's Bakery</span></div>
          <p className="text-slate-400 text-sm">© {currentYear} Sindy's Bakery. 5084 Malandela Road, Ezakheni Section B.</p>
          <div className="h-px w-12 bg-blue-100" />
          <p className="text-blue-500 font-bold tracking-[0.2em]">{phoneNumber}</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
