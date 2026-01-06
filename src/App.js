import React, { useState, useEffect } from 'react';
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

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState('pickup'); // 'pickup' or 'delivery'
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  
  const currentYear = new Date().getFullYear();
  const phoneNumber = "0739015521";
  
  // Helper to parse price string "R130" to number 130
  const getPrice = (priceStr) => parseInt(priceStr.replace('R', ''));

  useEffect(() => {
    document.title = "Sindy's Bakery Ezakheni | The Warmth of Home Baking";

    // Add smooth scrolling globally
    document.documentElement.style.scrollBehavior = 'smooth';

    const metaDescriptions = {
      "description": "Sindy's Bakery in Ezakheni offers heartwarming homemade muffins, scones, and bulk bakes. Made with love for your family.",
      "keywords": "bakery Ezakheni, home baking KZN, Sindy's Bakery, fresh scones, bulk muffins, Malandela Road bakery",
      "viewport": "width=device-width, initial-scale=1.0, maximum-shadow-5.0",
      "theme-color": "#1e40af"
    };

    Object.entries(metaDescriptions).forEach(([name, content]) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = content;
    });

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when cart/menu is open
  useEffect(() => {
    if (isCartOpen || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isCartOpen, isMenuOpen]);

  const menuItems = [
    { 
      id: 1,
      name: "5Ltr Scones", 
      price: "R130", 
      category: "Family Favourites",
      description: "Warm, golden scones that taste just like Sunday morning."
    },
    { 
      id: 2,
      name: "10Ltr Cupcakes / White Muffins", 
      price: "R230", 
      category: "Family Favourites",
      description: "Little bites of joy to share with the ones you love."
    },
    { 
      id: 3,
      name: "5Ltr Cupcakes", 
      price: "R250", 
      category: "Specialty Treats",
      description: "Beautifully baked treats that make any day feel special."
    },
    { 
      id: 4,
      name: "20Ltr Scones", 
      price: "R350", 
      category: "Big Gatherings",
      description: "A generous bucket of comfort for your big family events."
    },
    { 
      id: 5,
      name: "5Ltr Brown Muffins (Plain)", 
      price: "R180", 
      category: "Wholesome Goodness",
      description: "Simple, earthy, and made with care—wholesome goodness."
    },
    { 
      id: 6,
      name: "5Ltr Brown Muffins (w/ Choc Chips)", 
      price: "R220", 
      category: "Wholesome Goodness",
      description: "A warm hug in a muffin—rich chocolate meets home baking."
    },
    { 
      id: 7,
      name: "20Ltr Muffins", 
      price: "R450", 
      category: "Big Gatherings",
      description: "Enough sweetness to make every guest smile at your party."
    },
  ];

  const testimonials = [
    {
      name: "Thandi M.",
      text: "Sindy's baking reminds me of home. The chocolate chip muffins are pure happiness! You can taste the care in every bite.",
      stars: 5
    },
    {
      name: "Sipho D.",
      text: "Sindy puts her heart into these scones. I ordered the 20Ltr for our family reunion and it brought us all together.",
      stars: 5
    },
    {
      name: "Elena R.",
      text: "Honest, heartwarming baking. The brown muffins are perfect for breakfast with the kids. Truly made with love.",
      stars: 5
    }
  ];

  // Cart Functions
  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
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

  const handleBrowseMenu = (e) => {
    e.preventDefault();
    setIsCartOpen(false);
    // Smooth scroll to menu section after cart starts closing
    setTimeout(() => {
      const menuSection = document.getElementById('menu');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (getPrice(item.price) * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const checkoutWhatsApp = () => {
    if (cart.length === 0) return;

    let message = "Hello Sindy! 🧁 I'd like to place an order:%0A%0A";
    
    cart.forEach(item => {
      message += `▪️ ${item.quantity}x ${item.name} (${item.price})%0A`;
    });

    message += `%0A*Total Estimate: R${cartTotal}*`;
    message += `%0A------------------`;
    message += `%0AMethod: ${deliveryMethod === 'delivery' ? '🚚 Delivery' : '🏪 Store Pickup'}`;
    message += `%0A%0A(Please let me know if this is available!)`;

    const url = `https://wa.me/27${phoneNumber.substring(1)}?text=${message}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] font-sans text-slate-800 selection:bg-blue-100 antialiased relative">
      
      {/* Navbar */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled || isMenuOpen ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-blue-100 py-2" : "bg-transparent py-4 md:py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          <a href="#" className="flex-shrink-0 flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className={`p-2 rounded-xl transition-colors ${scrolled || isMenuOpen ? "bg-blue-50 text-blue-600" : "bg-white/10 text-white"}`}>
               <Cake size={24} />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-serif font-bold transition-colors leading-none ${scrolled || isMenuOpen ? "text-blue-900" : "text-white"}`}>Sindy's Bakery</span>
              <span className={`text-[10px] uppercase tracking-[0.2em] font-bold mt-1 ${scrolled || isMenuOpen ? "text-blue-400" : "text-blue-100/80"}`}>Ezakheni</span>
            </div>
          </a>

          <div className={`hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 p-1.5 rounded-full transition-all duration-300 ${scrolled ? "bg-slate-100/50 backdrop-blur-sm border border-white/50" : "bg-black/20 backdrop-blur-sm border border-white/10"}`}>
            {[
              { label: "The Menu", href: "#menu" },
              { label: "Our Kitchen", href: "#about" },
              { label: "How to Order", href: "#contact" }
            ].map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${scrolled ? "text-slate-600 hover:bg-white hover:text-blue-600 hover:shadow-sm" : "text-white hover:bg-white/20"}`}
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsCartOpen(true)}
              className={`relative group flex items-center gap-2 pl-3 pr-3 py-2 rounded-full transition-all hover:scale-105 active:scale-95 ${scrolled || isMenuOpen ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg shadow-blue-600/20" : "bg-white text-blue-900 shadow-xl"}`}
            >
              <ShoppingBag size={20} className={cartItemCount > 0 ? "fill-current" : ""} />
              <span className="font-bold text-sm hidden sm:block">Basket</span>
              {cartItemCount > 0 && (
                <span className={`ml-1 text-[10px] font-bold h-5 min-w-[1.25rem] px-1 flex items-center justify-center rounded-full ${scrolled || isMenuOpen ? "bg-white text-blue-600" : "bg-blue-600 text-white"}`}>
                  {cartItemCount}
                </span>
              )}
            </button>

            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className={`p-2.5 rounded-full transition-colors ${scrolled || isMenuOpen ? "text-slate-600 hover:bg-slate-100" : "text-white hover:bg-white/20"}`}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-blue-100 shadow-xl animate-in slide-in-from-top-2">
            <div className="p-4 flex flex-col space-y-2">
              <a href="#menu" onClick={() => setIsMenuOpen(false)} className="p-4 rounded-xl hover:bg-blue-50 text-blue-900 font-bold flex justify-between items-center">
                The Menu <ArrowRight size={16} className="text-blue-300" />
              </a>
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="p-4 rounded-xl hover:bg-blue-50 text-blue-900 font-bold flex justify-between items-center">
                Our Kitchen <ArrowRight size={16} className="text-blue-300" />
              </a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="p-4 rounded-xl hover:bg-blue-50 text-blue-900 font-bold flex justify-between items-center">
                How to Order <ArrowRight size={16} className="text-blue-300" />
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Cart Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-center md:justify-end items-end md:items-stretch">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsCartOpen(false)} 
          />
          
          <div className="relative w-full md:w-[450px] bg-white h-[85vh] md:h-full shadow-2xl flex flex-col 
                          animate-in slide-in-from-bottom duration-300 md:animate-in md:slide-in-from-right
                          rounded-t-[2.5rem] md:rounded-none overflow-hidden">
            
            <div className="md:hidden w-full flex justify-center pt-4 pb-1" onClick={() => setIsCartOpen(false)}>
              <div className="w-16 h-1.5 bg-slate-200 rounded-full" />
            </div>

            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-serif font-bold text-blue-950">Your Basket</h2>
                <p className="text-slate-400 text-sm">{cartItemCount} items selected</p>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-6 text-center px-8">
                  <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-blue-200">
                    <ShoppingBag size={48} />
                  </div>
                  <div>
                    <h3 className="text-blue-950 font-bold text-lg mb-2">Your basket is empty</h3>
                    <p className="text-sm">Looks like you haven't picked any treats yet.</p>
                  </div>
                  <a 
                    href="#menu" 
                    onClick={handleBrowseMenu} 
                    className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                  >
                    Browse the Menu
                  </a>
                </div>
              ) : (
                <div className="space-y-4 pb-32">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-colors group">
                      <div className="w-20 h-20 bg-blue-50 rounded-xl flex items-center justify-center text-blue-300 shrink-0">
                        <Cake size={32} />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-bold text-blue-950 line-clamp-2 leading-tight">{item.name}</h4>
                          <span className="font-bold text-blue-600 text-sm whitespace-nowrap">{item.price}</span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                           <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)} 
                              className="p-1.5 hover:bg-slate-50 text-slate-400 hover:text-blue-600 rounded-l-lg transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-1 text-sm font-bold w-6 text-center text-blue-950">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)} 
                              className="p-1.5 hover:bg-slate-50 text-slate-400 hover:text-blue-600 rounded-r-lg transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)} 
                            className="text-slate-300 hover:text-red-500 transition-colors p-2"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-slate-100 bg-white absolute bottom-0 w-full rounded-t-[2rem] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                  <button 
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${deliveryMethod === 'pickup' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <Store size={16} /> Collect
                  </button>
                  <button 
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${deliveryMethod === 'delivery' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <Truck size={16} /> Delivery
                  </button>
                </div>

                <div className="flex justify-between items-end mb-6">
                  <span className="text-slate-500 font-medium">Total Estimate</span>
                  <span className="text-3xl font-serif font-bold text-blue-950">R{cartTotal}</span>
                </div>
                
                <button 
                  onClick={checkoutWhatsApp}
                  className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-95"
                >
                  <MessageCircle size={22} />
                  <span>Send Order to Sindy</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero */}
      <section id="about" className="relative min-h-[90svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=2000" className="w-full h-full object-cover" alt="Sindy's Baking" />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 via-blue-950/40 to-[#fcfaf7]" />
        </div>
        <div className="relative text-center px-4 max-w-4xl pt-10">
          <div className="inline-block px-4 py-1 bg-blue-600 text-white text-[10px] font-bold tracking-widest uppercase rounded-full mb-6">Fresh from the heart of Ezakheni</div>
          <h1 className="text-5xl md:text-8xl font-serif text-white mb-6 leading-tight drop-shadow-2xl">The Warmth of <br/><span className="text-blue-100 italic">Home in Every Bite</span></h1>
          <p className="text-lg md:text-2xl text-blue-50 mb-10 max-w-2xl mx-auto drop-shadow-md">No fancy factories, just Sindy's kitchen. Real ingredients, baked fresh for your family gatherings.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#menu" className="bg-white text-blue-900 px-10 py-5 rounded-2xl text-lg font-bold shadow-xl hover:scale-105 transition-transform active:scale-95">See Today's Treats</a>
            <button onClick={() => setIsCartOpen(true)} className="bg-blue-600 text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
              <ShoppingBag size={20} /> View Basket {cartItemCount > 0 && `(${cartItemCount})`}
            </button>
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section id="menu" className="py-24 px-4 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif text-blue-950 mb-4">Sindy's Oven Favorites</h2>
          <p className="text-slate-500 font-medium">Baked fresh to order. Pick your favorites and add them to your basket.</p>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-6 rounded-full opacity-30" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => {
            const inCart = cart.find(c => c.id === item.id);
            return (
              <div key={item.id} className="bg-white rounded-[2.5rem] border-2 border-blue-50 p-2 group hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                <div className="bg-blue-50 h-52 rounded-[2.2rem] flex flex-col items-center justify-center relative overflow-hidden shrink-0">
                  <Cake className="w-16 h-16 text-blue-200 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-600">{item.category}</div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-serif text-blue-950 font-bold leading-tight">{item.name}</h3>
                    <span className="text-2xl font-black text-blue-600 shrink-0 ml-2">{item.price}</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">{item.description}</p>
                  
                  {inCart ? (
                    <div className="flex items-center gap-2">
                       <div className="flex-1 bg-blue-900 text-white py-4 rounded-2xl font-bold flex items-center justify-between px-6">
                          <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-blue-200"><Minus size={18} /></button>
                          <span>{inCart.quantity} in Basket</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-blue-200"><Plus size={18} /></button>
                       </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => addToCart(item)}
                      className="w-full bg-blue-50 text-blue-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all active:scale-95"
                    >
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
      <section id="contact" className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        
        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-blue-600 font-bold tracking-widest uppercase text-sm mb-6">
                <Heart size={16} fill="currentColor" /> Baked in Ezakheni
              </div>
              <h2 className="text-4xl md:text-7xl font-serif text-blue-950 mb-8 leading-tight">
                Let's get the <br/> <span className="italic text-blue-700 underline decoration-blue-100 underline-offset-8">oven started</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                I don't have a big call center or a fancy office. Just a warm kitchen and a phone! Whether it's a birthday, a local event, or just tea with the family, I'd love to bake for you.
              </p>
              
              <div className="flex flex-col gap-6 max-w-md mx-auto lg:mx-0">
                <div className="flex items-start gap-4 text-left">
                  <div className="p-3 bg-blue-50 rounded-2xl text-blue-600"><MapPin /></div>
                  <div>
                    <h4 className="font-bold text-blue-950">Where to find me</h4>
                    <p className="text-slate-500">5084 Malandela Road, Section B, Ezakheni</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-left">
                  <div className="p-3 bg-blue-50 rounded-2xl text-blue-600"><Clock3 /></div>
                  <div>
                    <h4 className="font-bold text-blue-950">Baking Hours</h4>
                    <p className="text-slate-500">Mon - Sat: 08:00 - 17:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#fcfaf7] p-8 md:p-12 rounded-[3rem] border-4 border-dashed border-blue-100 relative">
              <div className="absolute -top-6 -right-6 bg-yellow-400 text-blue-900 font-black p-4 rounded-full shadow-lg rotate-12 hidden md:block">
                Fresh Batch <br/> Coming Up!
              </div>
              
              <h3 className="text-3xl font-serif text-blue-900 mb-8 text-center">How can Sindy help?</h3>
              
              <div className="space-y-4">
                <button onClick={handleBrowseMenu} className="w-full group flex items-center justify-between p-6 bg-white rounded-3xl border border-blue-50 hover:border-blue-300 transition-all hover:shadow-xl active:scale-95">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl"><ShoppingBag /></div>
                    <div className="text-left">
                      <p className="font-bold text-blue-950">Start an Order</p>
                      <p className="text-sm text-slate-400 italic">"I'll pick my favorites from the menu..."</p>
                    </div>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-blue-600" />
                </button>

                <a href={`tel:${phoneNumber}`} className="group flex items-center justify-between p-6 bg-white rounded-3xl border border-blue-50 hover:border-blue-300 transition-all hover:shadow-xl active:scale-95">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl"><Phone /></div>
                    <div className="text-left">
                      <p className="font-bold text-blue-950">Give Sindy a Call</p>
                      <p className="text-sm text-slate-400">Prefer to talk? I'm available all day!</p>
                    </div>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-blue-600" />
                </a>

                <div className="p-6 bg-blue-900 rounded-[2rem] text-white text-center shadow-xl mt-8">
                  <p className="font-serif italic text-lg mb-2">Ceremonies & Large Events</p>
                  <p className="text-blue-200 text-sm mb-4">Planning something big in Ezakheni? Let's chat about a custom price for large bulk orders.</p>
                  <a href={`https://wa.me/27${phoneNumber.substring(1)}?text=I'd like to discuss a bulk order`} className="inline-block text-yellow-400 font-bold border-b-2 border-yellow-400 pb-1 hover:text-white hover:border-white transition-all">Discuss Bulk Catering →</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-blue-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" className="text-yellow-400" />)}
          </div>
          <div className="relative min-h-[200px] flex items-center justify-center">
            {testimonials.map((t, i) => (
              <div key={i} className={`absolute transition-all duration-500 ${i === activeTestimonial ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
                <p className="text-2xl md:text-3xl font-serif italic mb-6 leading-relaxed">"{t.text}"</p>
                <p className="font-bold tracking-widest uppercase text-sm text-blue-300">— {t.name}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-12">
            <button onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)} className="p-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors"><ChevronLeft /></button>
            <button onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)} className="p-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors"><ChevronRight /></button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-20 px-6 border-t border-blue-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Cake className="text-blue-600" />
              <span className="text-xl font-serif font-bold text-blue-950">Sindy's Bakery</span>
            </div>
            <p className="text-slate-400 text-sm">© {currentYear} Sindy's Bakery. Ezakheni Section B.<br/>Baked with local love and fresh ingredients.</p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <p className="font-serif text-xl text-blue-950 mb-2">Order your fresh bakes today</p>
            <p className="text-blue-500 font-bold tracking-[0.2em]">{phoneNumber}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
