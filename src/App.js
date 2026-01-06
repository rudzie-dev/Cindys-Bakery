import React, { useState, useEffect, useMemo } from 'react';
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
  ArrowRight,
  Quote
} from 'lucide-react';

const App = () => {
  // --- STATE ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const currentYear = new Date().getFullYear();
  const phoneNumber = "0739015521";
  const DELIVERY_FEE = 30; // Standard local delivery fee

  // --- MENU DATA ---
  const menuItems = useMemo(() => [
    { id: 1, name: "5Ltr Scones", price: "R130", category: "Family Favourites", description: "Warm, golden scones that taste just like Sunday morning." },
    { id: 2, name: "10Ltr Cupcakes / White Muffins", price: "R230", category: "Family Favourites", description: "Little bites of joy to share with the ones you love." },
    { id: 3, name: "5Ltr Cupcakes", price: "R250", category: "Specialty Treats", description: "Beautifully baked treats that make any day feel special." },
    { id: 4, name: "20Ltr Scones", price: "R350", category: "Big Gatherings", description: "A generous bucket of comfort for your big family events." },
    { id: 5, name: "5Ltr Brown Muffins (Plain)", price: "R180", category: "Wholesome Goodness", description: "Simple, earthy, and made with care—wholesome goodness." },
    { id: 6, name: "5Ltr Brown Muffins (w/ Choc Chips)", price: "R220", category: "Wholesome Goodness", description: "A warm hug in a muffin—rich chocolate meets home baking." },
    { id: 7, name: "20Ltr Muffins", price: "R450", category: "Big Gatherings", description: "Enough sweetness to make every guest smile at your party." },
  ], []);

  const testimonials = [
    { name: "Thandi M.", text: "The scones were perfect for our family gathering. Everyone asked for the number!", rating: 5 },
    { name: "Sipho Z.", text: "Best muffins in Ezakheni. Fresh, soft, and still warm when I picked them up.", rating: 5 },
    { name: "Nomusa K.", text: "Sindy saved our event with the 20Ltr bucket. High quality and great price.", rating: 5 }
  ];

  // --- EFFECTS ---
  useEffect(() => {
    const savedCart = localStorage.getItem('sindys_bakery_cart');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) { console.error("Failed to load cart"); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sindys_bakery_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'menu', 'about', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- HELPERS ---
  const getPrice = (priceStr) => parseInt(priceStr.replace('R', '')) || 0;
  const cartSubtotal = cart.reduce((sum, item) => sum + (getPrice(item.price) * item.quantity), 0);
  const cartTotal = deliveryMethod === 'delivery' ? cartSubtotal + DELIVERY_FEE : cartSubtotal;
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // --- ACTIONS ---
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
      if (item.id === itemId) {
        const newQuantity = Math.max(0, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const checkoutWhatsApp = () => {
    if (cart.length === 0) return;
    let message = "Hello Sindy! 🧁 I'd like to place an order:%0A%0A";
    cart.forEach(item => { message += `▪️ ${item.quantity}x ${item.name} (${item.price})%0A`; });
    message += `%0A*Subtotal: R${cartSubtotal}*`;
    if (deliveryMethod === 'delivery') message += `%0ADelivery Fee: R${DELIVERY_FEE}`;
    message += `%0A*Total Order: R${cartTotal}*`;
    message += `%0A------------------`;
    message += `%0AMethod: ${deliveryMethod === 'delivery' ? '🚚 Delivery' : '🏪 Store Pickup'}`;
    const url = `https://wa.me/27${phoneNumber.substring(1)}?text=${message}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] font-sans text-slate-800 antialiased selection:bg-blue-100">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${scrolled || isMenuOpen ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-blue-100 py-2" : "bg-transparent py-4 md:py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <div className={`p-2 rounded-xl transition-all duration-300 ${scrolled || isMenuOpen ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-white/10 text-white backdrop-blur-sm"}`}>
               <Cake size={24} />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-serif font-bold leading-none transition-colors ${scrolled || isMenuOpen ? "text-blue-900" : "text-white"}`}>Sindy's Bakery</span>
              <span className={`text-[10px] uppercase tracking-[0.2em] font-bold mt-1 transition-colors ${scrolled || isMenuOpen ? "text-blue-400" : "text-blue-200/60"}`}>Ezakheni</span>
            </div>
          </a>

          <div className={`hidden md:flex items-center gap-1 p-1.5 rounded-full transition-all duration-500 ${scrolled ? "bg-slate-100/80 backdrop-blur-sm border border-slate-200/50" : "bg-black/20 backdrop-blur-sm border border-white/10"}`}>
            {[
              { id: 'menu', label: "The Menu", href: "#menu" },
              { id: 'about', label: "Our Kitchen", href: "#about" },
              { id: 'contact', label: "How to Order", href: "#contact" }
            ].map((link) => (
              <a 
                key={link.id}
                href={link.href} 
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  activeSection === link.id 
                    ? (scrolled ? "bg-white text-blue-600 shadow-sm" : "bg-white/20 text-white") 
                    : (scrolled ? "text-slate-500 hover:text-blue-600" : "text-white/70 hover:text-white")
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsCartOpen(true)}
              className={`relative group flex items-center gap-2 px-4 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95 ${scrolled || isMenuOpen ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "bg-white text-blue-900 shadow-xl"}`}
            >
              <ShoppingBag size={18} />
              <span className="font-bold text-sm hidden sm:block">Basket</span>
              {cartItemCount > 0 && (
                <span className={`flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full text-[10px] font-black animate-in zoom-in ${scrolled || isMenuOpen ? "bg-white text-blue-600" : "bg-blue-600 text-white"}`}>
                  {cartItemCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className={`md:hidden p-2.5 rounded-full transition-colors ${scrolled || isMenuOpen ? "text-slate-600 hover:bg-slate-100" : "text-white hover:bg-white/20"}`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Drawer (No changes to logic, just standard component) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end items-stretch">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-2xl font-serif font-bold text-blue-950">Your Basket</h2>
                <p className="text-slate-400 text-sm">{cartItemCount} items selected</p>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-200"><ShoppingBag size={40} /></div>
                  <p className="text-slate-400 font-medium">Your basket is feeling light...</p>
                  <button onClick={() => setIsCartOpen(false)} className="text-blue-600 font-bold border-b-2 border-blue-600 pb-0.5">Start Picking Treats</button>
                </div>
              ) : (
                <div className="space-y-4 pb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-slate-100 hover:bg-blue-50/30 transition-colors">
                      <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-blue-300 shrink-0"><Cake size={24} /></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-blue-950 text-sm leading-tight">{item.name}</h4>
                          <span className="font-bold text-blue-600 text-sm">R{getPrice(item.price) * item.quantity}</span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg p-1">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-blue-600"><Minus size={14}/></button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-blue-600"><Plus size={14}/></button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-6 border-t border-slate-100 bg-white">
                <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                  <button onClick={() => setDeliveryMethod('pickup')} className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${deliveryMethod === 'pickup' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500'}`}><Store size={14} /> Pickup</button>
                  <button onClick={() => setDeliveryMethod('delivery')} className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${deliveryMethod === 'delivery' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500'}`}><Truck size={14} /> Delivery (+R{DELIVERY_FEE})</button>
                </div>
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>R{cartSubtotal}</span></div>
                  {deliveryMethod === 'delivery' && <div className="flex justify-between text-slate-500"><span>Delivery Fee</span><span>R{DELIVERY_FEE}</span></div>}
                  <div className="flex justify-between items-end pt-2 border-t border-slate-50"><span className="text-slate-950 font-bold">Total</span><span className="text-2xl font-serif font-black text-blue-950">R{cartTotal}</span></div>
                </div>
                <button onClick={checkoutWhatsApp} className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"><MessageCircle size={20} /><span>Send Order to WhatsApp</span></button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 1. HERO (The Hook) */}
      <section id="home" className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=2000" className="w-full h-full object-cover scale-105" alt="Bakery Hero" />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-950/40 to-[#fcfaf7]" />
        </div>
        <div className="relative text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-block px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black tracking-widest uppercase rounded-full mb-8 shadow-xl">Hand-crafted in Ezakheni</div>
          <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-[1.1] drop-shadow-2xl">Warmth of <br/><span className="text-blue-200 italic">Home in Every Bite</span></h1>
          <p className="text-lg md:text-2xl text-blue-50/90 mb-12 max-w-2xl mx-auto drop-shadow-lg font-medium">Real ingredients, baked fresh daily in Sindy's kitchen. Made for the moments that matter.</p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a href="#menu" className="bg-white text-blue-950 px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl hover:bg-blue-50 transition-all hover:-translate-y-1 active:scale-95">Explore the Menu</a>
            <button onClick={() => setIsCartOpen(true)} className="bg-blue-600 text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-xl flex items-center justify-center gap-3 hover:bg-blue-700 transition-all hover:-translate-y-1 active:scale-95">
              <ShoppingBag size={20} /> My Basket {cartItemCount > 0 && `(${cartItemCount})`}
            </button>
          </div>
        </div>
      </section>

      {/* 2. MENU (The catalog - immediate gratification) */}
      <section id="menu" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-serif text-blue-950 mb-6 tracking-tight">From the Oven</h2>
          <p className="text-slate-500 font-medium leading-relaxed">Everything is baked to order to ensure maximum freshness. Select your bulk bakes below for family events or daily treats.</p>
          <div className="flex justify-center gap-2 mt-8"><div className="h-1 w-12 bg-blue-600 rounded-full" /><div className="h-1 w-4 bg-blue-200 rounded-full" /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {menuItems.map((item) => {
            const inCart = cart.find(c => c.id === item.id);
            return (
              <div key={item.id} className="bg-white rounded-[2.5rem] border border-blue-50 p-3 group hover:shadow-[0_20px_60px_-15px_rgba(30,64,175,0.1)] transition-all duration-500 flex flex-col h-full">
                <div className="bg-blue-50/50 h-56 rounded-[2rem] flex flex-col items-center justify-center relative overflow-hidden shrink-0 group-hover:bg-blue-50 transition-colors">
                  <Cake className="w-16 h-16 text-blue-200 group-hover:scale-110 group-hover:text-blue-300 transition-all duration-500" />
                  <div className="absolute top-5 left-5 bg-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-sm">{item.category}</div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="text-2xl font-serif text-blue-950 font-bold leading-tight">{item.name}</h3>
                    <span className="text-2xl font-black text-blue-600 shrink-0">{item.price}</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">{item.description}</p>
                  {inCart ? (
                    <div className="flex-1 bg-blue-950 text-white py-4 rounded-2xl font-bold flex items-center justify-between px-6 shadow-xl shadow-blue-950/20">
                        <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-blue-300 transition-colors"><Minus size={20} /></button>
                        <span className="text-sm">{inCart.quantity} in Basket</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-blue-300 transition-colors"><Plus size={20} /></button>
                    </div>
                  ) : (
                    <button onClick={() => addToCart(item)} className="w-full bg-blue-50 text-blue-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all active:scale-95 group/btn">
                      <Plus size={18} className="group-hover/btn:rotate-90 transition-transform" /> Add to Order
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. ABOUT (The "Why" - Build trust in the quality) */}
      <section id="about" className="py-32 px-6 bg-blue-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-900/20 -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="inline-flex items-center gap-2 text-blue-400 font-black tracking-widest uppercase text-xs mb-8">
                <Heart size={14} fill="currentColor" /> Hand-made Tradition
              </div>
              <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-[1.1]">
                Real Baking <br/> For <span className="text-blue-400 italic underline decoration-blue-800 underline-offset-8">Real People</span>
              </h2>
              <p className="text-lg md:text-xl text-blue-100/70 mb-12 leading-relaxed max-w-lg">
                I believe that family celebrations deserve better than store-bought. That's why I keep things simple: fresh dough, high-quality ingredients, and a lot of patience. 
                Every scone and muffin is baked with the same care I'd use for my own children.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl text-blue-400 shadow-sm"><MapPin size={20}/></div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">Ezakheni Local</h4>
                    <p className="text-blue-100/50 text-sm">Serving our neighbors since day one.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl text-blue-400 shadow-sm"><Star size={20}/></div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">Quality Guaranteed</h4>
                    <p className="text-blue-100/50 text-sm">Real butter. No shortcuts. Just flavor.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-[3.5rem] border border-white/10">
                <div className="flex flex-col gap-8">
                   <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shrink-0">1</div>
                      <div>
                        <p className="font-bold text-lg mb-1">Order Ahead</p>
                        <p className="text-blue-100/60 text-sm">We bake to order. Give us 24 hours to ensure your treats are fresh out the oven.</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shrink-0">2</div>
                      <div>
                        <p className="font-bold text-lg mb-1">Pickup or Delivery</p>
                        <p className="text-blue-100/60 text-sm">Collect from Section B or have us deliver within the Ezakheni area for a small fee.</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shrink-0">3</div>
                      <div>
                        <p className="font-bold text-lg mb-1">Enjoy Together</p>
                        <p className="text-blue-100/60 text-sm">Share the warmth with your friends and family. That's what it's all about!</p>
                      </div>
                   </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS (Social Proof) */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <Quote className="text-blue-100 w-16 h-16 mb-6" fill="currentColor" />
            <div className="min-h-[120px]">
               <p className="text-2xl md:text-3xl font-serif text-blue-950 italic mb-8">"{testimonials[activeTestimonial].text}"</p>
            </div>
            <p className="font-bold text-blue-600 tracking-widest uppercase text-sm">— {testimonials[activeTestimonial].name}</p>
            <div className="flex gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${idx === activeTestimonial ? "bg-blue-600 w-8" : "bg-blue-100"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACT (The Closer) */}
      <section id="contact" className="py-32 px-6 bg-[#fcfaf7] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-serif text-blue-950 mb-8 leading-[1.1]">Ready to <br/><span className="text-blue-700 italic">order?</span></h2>
              <div className="space-y-6">
                 <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-2xl text-blue-600 shadow-sm border border-blue-50"><MapPin size={20}/></div>
                    <div>
                      <h4 className="font-bold text-blue-950 text-sm mb-1">Find Us</h4>
                      <p className="text-slate-500 text-sm">5084 Malandela Road, Section B, Ezakheni</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-2xl text-blue-600 shadow-sm border border-blue-50"><Clock3 size={20}/></div>
                    <div>
                      <h4 className="font-bold text-blue-950 text-sm mb-1">Business Hours</h4>
                      <p className="text-slate-500 text-sm">Mon - Sat: Orders ready by 9am. Please order 24h in advance.</p>
                    </div>
                  </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-14 rounded-[3.5rem] border border-blue-100 shadow-2xl relative">
              <div className="absolute -top-6 -right-6 bg-yellow-400 text-blue-950 font-black px-6 py-4 rounded-3xl shadow-xl rotate-12 hidden md:block">Bulk Orders <br/> Welcome!</div>
              <h3 className="text-3xl font-serif text-blue-950 mb-8">How to get in touch</h3>
              <div className="space-y-4">
                <a href={`tel:${phoneNumber}`} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl hover:border-blue-400 border border-transparent transition-all group">
                  <div className="flex items-center gap-5">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform"><Phone /></div>
                    <div className="text-left"><p className="font-bold text-blue-950">Call Sindy</p><p className="text-xs text-slate-400">Speak directly to the baker</p></div>
                  </div>
                  <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                </a>
                <div className="p-8 bg-blue-900 rounded-[2.5rem] text-white text-center mt-10 shadow-2xl shadow-blue-900/20">
                  <p className="font-serif italic text-xl mb-3 text-blue-100">Special Occasions?</p>
                  <p className="text-blue-300/80 text-sm mb-6 leading-relaxed">Planning a Wedding or Funeral? We provide large quantities for local ceremonies. Contact me for a custom quote.</p>
                  <a href={`https://wa.me/27${phoneNumber.substring(1)}?text=I'd like to discuss a custom order`} className="inline-block bg-white text-blue-900 px-8 py-3 rounded-full font-bold text-sm hover:bg-blue-50 transition-colors">Request Quote</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 py-24 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <div className="bg-blue-600 text-white p-1.5 rounded-lg"><Cake size={20}/></div>
              <span className="text-2xl font-serif font-black text-blue-950 tracking-tight">Sindy's Bakery</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">© {currentYear} Sindy's Bakery. Ezakheni, KZN.<br/>Small-batch baking with the biggest heart.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="font-serif text-xl text-blue-950 font-bold">Made in Ezakheni</p>
            <p className="text-blue-600 font-black tracking-[0.3em] uppercase text-xs">Fresh Every Day</p>
            <div className="mt-4 flex gap-4 text-slate-300">
              <Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
