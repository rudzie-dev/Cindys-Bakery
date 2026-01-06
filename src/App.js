import React, { useState, useEffect, useMemo } from 'react';
import { 
  Cake, MapPin, Phone, Menu, X, Star, Heart, ShoppingBag, 
  MessageCircle, Clock3, Plus, Minus, Trash2, Truck, Store, Quote
} from 'lucide-react';

const App = () => {
  // --- STATE ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  
  const currentYear = new Date().getFullYear();
  const phoneNumber = "0739015521";
  const DELIVERY_FEE = 30;

  // --- MENU DATA ---
  const menuItems = useMemo(() => [
    { id: 1, name: "5Ltr Scones", price: 130, category: "Scones", image: "https://images.unsplash.com/photo-1589114066442-84bb9176761d?q=80&w=800" },
    { id: 2, name: "10Ltr Cupcakes / Muffins", price: 230, category: "Mixed", image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=800" },
    { id: 3, name: "5Ltr Cupcakes", price: 250, category: "Treats", image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=800" },
    { id: 4, name: "20Ltr Scones", price: 350, category: "Bulk", image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=800" },
    { id: 5, name: "5Ltr Plain Muffins", price: 180, category: "Muffins", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800" },
    { id: 6, name: "5Ltr Choc-Chip Muffins", price: 220, category: "Muffins", image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=800" },
    { id: 7, name: "20Ltr Muffins", price: 450, category: "Bulk", image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=800" },
  ], []);

  const testimonials = [
    { name: "Thandi M.", text: "The scones were perfect for our family gathering. Everyone asked for the number!" },
    { name: "Sipho Z.", text: "Best muffins in Ezakheni. Fresh, soft, and still warm when I picked them up." },
    { name: "Nomusa K.", text: "Sindy saved our event with the 20Ltr bucket. High quality and great price." }
  ];

  // --- EFFECTS ---
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- CALCULATIONS ---
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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
    setCart(prev => prev.map(item => item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity + change) } : item).filter(i => i.quantity > 0));
  };

  const checkoutWhatsApp = () => {
    if (cart.length === 0) return;
    const items = cart.map(i => `• ${i.quantity}x ${i.name} (R${i.price * i.quantity})`).join('%0A');
    const message = `*NEW ORDER - SINDY'S BAKERY*%0A%0A${items}%0A%0A*Total: R${cartTotal}*%0A*Method:* ${deliveryMethod === 'delivery' ? '🚚 Delivery' : '🏪 Pickup'}%0A%0APlease confirm if available!`;
    window.open(`https://wa.me/27${phoneNumber.substring(1)}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-slate-800 selection:bg-blue-100 overflow-x-hidden">
      
      {/* Dynamic Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || isMenuOpen ? "bg-white/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${scrolled || isMenuOpen ? "bg-blue-600 text-white" : "bg-white text-blue-600 shadow-lg"}`}>
              <Cake size={20} />
            </div>
            <span className={`text-xl font-serif font-bold ${scrolled || isMenuOpen ? "text-blue-900" : "text-white"}`}>Sindy's</span>
          </a>

          <div className="flex items-center gap-2">
            <button onClick={() => setIsCartOpen(true)} className={`relative p-2.5 rounded-full ${scrolled || isMenuOpen ? "bg-slate-100 text-blue-900" : "bg-white/10 text-white backdrop-blur-md"}`}>
              <ShoppingBag size={22} />
              {cartItemCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">{cartItemCount}</span>}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2.5 rounded-full ${scrolled || isMenuOpen ? "text-slate-600" : "text-white"}`}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="bg-white border-t border-slate-100 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
            {['Home', 'Menu', 'About', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-2xl font-serif font-bold text-blue-900">{link}</a>
            ))}
            <button onClick={checkoutWhatsApp} className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-4"><MessageCircle size={20} /> Order on WhatsApp</button>
          </div>
        )}
      </nav>

      {/* Cart Bottom Sheet (Optimized for Mobile) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center sm:justify-end">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-h-[85vh] sm:max-w-md bg-white rounded-t-3xl sm:rounded-l-3xl shadow-2xl flex flex-col animate-in slide-in-from-bottom sm:slide-in-from-right duration-300">
            <div className="h-1.5 w-12 bg-slate-200 rounded-full mx-auto my-3 sm:hidden" />
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-serif font-bold text-blue-950">My Basket</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 text-slate-400"><X size={24}/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="py-20 text-center text-slate-400">Your basket is empty</div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center bg-slate-50 p-3 rounded-2xl">
                    <img src={item.image} className="w-14 h-14 rounded-xl object-cover" alt={item.name} />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-blue-900">{item.name}</h4>
                      <p className="text-blue-600 font-bold text-sm">R{item.price * item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white rounded-lg p-1 border">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1"><Minus size={14}/></button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1"><Plus size={14}/></button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t bg-slate-50">
                <div className="flex bg-white p-1 rounded-xl mb-4 shadow-sm">
                  <button onClick={() => setDeliveryMethod('pickup')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${deliveryMethod === 'pickup' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>Pickup</button>
                  <button onClick={() => setDeliveryMethod('delivery')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${deliveryMethod === 'delivery' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>Delivery (+R30)</button>
                </div>
                <div className="flex justify-between items-center mb-4 px-2">
                  <span className="text-slate-500 font-medium">Total Price</span>
                  <span className="text-2xl font-serif font-black text-blue-950">R{cartTotal}</span>
                </div>
                <button onClick={checkoutWhatsApp} className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-200">
                  <MessageCircle size={20} /> Order via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1200" className="w-full h-full object-cover" alt="Hero" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-950/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-2xl animate-in fade-in slide-in-from-left duration-700">
          <span className="inline-block text-blue-400 font-black tracking-widest text-[10px] uppercase mb-4">Ezakheni Section B</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-6">Home-baked <br/><span className="italic text-blue-200">with Love</span></h1>
          <p className="text-blue-50/80 text-lg mb-8 max-w-md">Fresh scones, muffins, and cupcakes baked daily in Sindy's kitchen. Quality you can taste.</p>
          <a href="#menu" className="inline-block bg-white text-blue-900 px-8 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition-transform">Explore Menu</a>
        </div>
      </section>

      {/* Optimized Grid Menu */}
      <section id="menu" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-blue-950 mb-3">Today's Fresh Bakes</h2>
          <div className="h-1 w-12 bg-blue-600 mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {menuItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col group">
              <div className="aspect-square relative overflow-hidden">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name} loading="lazy" />
                <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur px-2 py-1 rounded-lg text-xs font-black text-blue-600 shadow-sm">R{item.price}</div>
              </div>
              <div className="p-3 md:p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-sm md:text-base text-blue-950 mb-3 line-clamp-2">{item.name}</h3>
                <button 
                  onClick={() => addToCart(item)}
                  className="mt-auto w-full bg-blue-50 text-blue-700 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 active:bg-blue-600 active:text-white transition-colors"
                >
                  <Plus size={14} /> Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Compact Info Section */}
      <section id="about" className="bg-blue-950 py-20 px-6 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Heart className="mx-auto text-blue-400 mb-6" size={40} fill="currentColor" />
          <h2 className="text-3xl md:text-5xl font-serif mb-6 italic">Baked just for you</h2>
          <p className="text-blue-100/70 text-lg leading-relaxed mb-10">We prioritize real ingredients and local community. Whether it's a 20Ltr bucket for an event or a 5Ltr treat for home, we bake every batch to order.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
            <div className="p-4 bg-white/5 rounded-2xl"><MapPin className="mx-auto mb-2 text-blue-400" size={20}/> Section B</div>
            <div className="p-4 bg-white/5 rounded-2xl"><Clock3 className="mx-auto mb-2 text-blue-400" size={20}/> 24h Notice</div>
            <div className="p-4 bg-white/5 rounded-2xl col-span-2 md:col-span-1"><Truck className="mx-auto mb-2 text-blue-400" size={20}/> Delivery Available</div>
          </div>
        </div>
      </section>

      {/* Minimal Testimonials */}
      <section className="py-20 px-6 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="mx-auto text-blue-50 mb-4" size={60} fill="currentColor" />
          <p className="text-xl font-serif text-blue-900 italic mb-6">"{testimonials[activeTestimonial].text}"</p>
          <p className="text-blue-600 font-bold uppercase text-xs tracking-widest">— {testimonials[activeTestimonial].name}</p>
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} className={`h-1.5 rounded-full transition-all ${i === activeTestimonial ? "w-8 bg-blue-600" : "w-3 bg-slate-200"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Floating Order Button (Mobile Only) */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <button 
          onClick={() => setIsCartOpen(true)}
          className="bg-blue-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center animate-bounce"
        >
          <ShoppingBag size={24} />
          {cartItemCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 w-6 h-6 rounded-full border-2 border-white text-[10px] font-bold flex items-center justify-center">{cartItemCount}</span>}
        </button>
      </div>

      {/* Footer */}
      <footer id="contact" className="bg-slate-50 border-t py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-serif font-bold text-blue-900 mb-2">Sindy's Bakery</h3>
            <p className="text-slate-400 text-sm">5084 Malandela Road, Ezakheni<br/>Call/WhatsApp: {phoneNumber}</p>
          </div>
          <div className="flex gap-4">
            <a href={`tel:${phoneNumber}`} className="bg-white p-4 rounded-2xl border shadow-sm text-blue-600 hover:bg-blue-50"><Phone size={24}/></a>
            <a href={`https://wa.me/27${phoneNumber.substring(1)}`} className="bg-emerald-600 p-4 rounded-2xl shadow-lg text-white hover:scale-110 transition-transform"><MessageCircle size={24}/></a>
          </div>
        </div>
        <div className="text-center mt-12 text-[10px] text-slate-300 uppercase tracking-widest font-bold">
          © {currentYear} Sindy's Bakery • Freshly Baked in Ezakheni
        </div>
      </footer>
    </div>
  );
};

export default App;
