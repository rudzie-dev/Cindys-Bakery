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
  MessageCircle,
  Clock3,
  ShoppingBasket,
  Plus,
  Minus,
  Trash2,
  Truck,
  Store,
  Check
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  
  // Order State
  const [cart, setCart] = useState([]);
  const [fulfillment, setFulfillment] = useState('pickup'); // 'pickup' or 'delivery'

  const phoneNumber = "0739015521";
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    document.title = "Sindy's Bakery | Ezakheni Home Baking";
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 1, name: "5Ltr Scones", price: 130, category: "Family Favourites", desc: "Warm, golden scones." },
    { id: 2, name: "10Ltr Cupcakes", price: 230, category: "Family Favourites", desc: "Little bites of joy." },
    { id: 3, name: "5Ltr Cupcakes", price: 250, category: "Specialty", desc: "Extra special treats." },
    { id: 4, name: "20Ltr Scones", price: 350, category: "Big Gatherings", desc: "Generous bucket for events." },
    { id: 5, name: "5Ltr Brown Muffins", price: 180, category: "Wholesome", desc: "Simple and earthy." },
    { id: 6, name: "5Ltr Choc Chip Muffins", price: 220, category: "Wholesome", desc: "Rich chocolate goodness." },
    { id: 7, name: "20Ltr Muffins", price: 450, category: "Big Gatherings", desc: "Sweetness for the crowd." },
  ];

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const sendOrder = () => {
    const orderDetails = cart.map(item => `- ${item.qty}x ${item.name} (R${item.price * item.qty})`).join('%0A');
    const total = `%0A*Total: R${cartTotal}*`;
    const type = `%0A%0AOrder Type: *${fulfillment === 'delivery' ? '🚚 Delivery' : '🏪 Pickup'}*`;
    const message = `Hello Sindy! I'd like to place an order:%0A%0A${orderDetails}${total}${type}%0A%0APlease let me know if you can assist!`;
    window.open(`https://wa.me/27${phoneNumber.substring(1)}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] font-sans text-slate-800 antialiased">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all ${scrolled || isMenuOpen ? "bg-white/95 backdrop-blur-md py-3 shadow-sm" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-12">
          <div className="flex items-center gap-2">
            <Cake className={scrolled || isMenuOpen ? "text-blue-600" : "text-white"} />
            <span className={`text-xl font-serif font-bold ${scrolled || isMenuOpen ? "text-blue-900" : "text-white"}`}>Sindy's Bakery</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 rounded-full ${scrolled || isMenuOpen ? "bg-blue-50 text-blue-600" : "bg-white/10 text-white"}`}
            >
              <ShoppingBasket size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                  {cart.reduce((a, b) => a + b.qty, 0)}
                </span>
              )}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2 md:hidden ${scrolled || isMenuOpen ? "text-blue-900" : "text-white"}`}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[60] transform transition-transform duration-500 flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b flex justify-between items-center bg-blue-900 text-white">
          <div className="flex items-center gap-2">
            <ShoppingBasket />
            <h2 className="text-xl font-bold">Your Order</h2>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/10 rounded-full"><X /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
              <ShoppingBasket size={64} strokeWidth={1} />
              <p className="text-lg">Your bucket is empty!</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl">
                    <div className="flex-1">
                      <h4 className="font-bold text-blue-950">{item.name}</h4>
                      <p className="text-blue-600 font-bold">R{item.price * item.qty}</p>
                    </div>
                    <div className="flex items-center bg-white border rounded-xl p-1">
                      <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:text-blue-600"><Minus size={16} /></button>
                      <span className="px-3 font-bold">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:text-blue-600"><Plus size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">How will you get your order?</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setFulfillment('pickup')}
                    className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${fulfillment === 'pickup' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 hover:border-slate-200'}`}
                  >
                    <Store size={20} /> <span className="font-bold">Pickup</span>
                  </button>
                  <button 
                    onClick={() => setFulfillment('delivery')}
                    className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${fulfillment === 'delivery' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 hover:border-slate-200'}`}
                  >
                    <Truck size={20} /> <span className="font-bold">Delivery</span>
                  </button>
                </div>
                {fulfillment === 'delivery' && (
                  <p className="text-[10px] text-blue-500 font-medium px-2 italic">Delivery fee will be calculated based on your location in Ezakheni.</p>
                )}
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-slate-50 border-t space-y-4">
            <div className="flex justify-between items-center text-xl font-serif">
              <span>Total Amount</span>
              <span className="font-black text-blue-900">R{cartTotal}</span>
            </div>
            <button 
              onClick={sendOrder}
              className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:bg-emerald-700 transition-all active:scale-95"
            >
              <MessageCircle /> Send Order to Sindy
            </button>
          </div>
        )}
      </div>

      {/* Hero */}
      <section className="relative h-[80svh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=2000" className="w-full h-full object-cover" alt="Hero" />
          <div className="absolute inset-0 bg-blue-950/60" />
        </div>
        <div className="relative text-center px-4">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">Baked with Love</h1>
          <p className="text-xl text-blue-50 mb-8 max-w-xl mx-auto">Fresh buckets of happiness delivered to your door in Ezakheni.</p>
          <a href="#menu" className="bg-white text-blue-950 px-8 py-4 rounded-full font-bold shadow-xl">Start Your Order</a>
        </div>
      </section>

      {/* Menu Grid */}
      <section id="menu" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-blue-950">Select Your Buckets</h2>
          <p className="text-slate-500 mt-2">Mix and match to fill your home with sweetness.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => {
            const inCart = cart.find(i => i.id === item.id);
            return (
              <div key={item.id} className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Cake /></div>
                  <span className="text-2xl font-black text-blue-900">R{item.price}</span>
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-1">{item.name}</h3>
                <p className="text-slate-500 text-sm mb-6">{item.desc}</p>
                
                {inCart ? (
                  <div className="flex items-center justify-between bg-blue-600 text-white rounded-2xl p-2 px-4">
                    <button onClick={() => updateQty(item.id, -1)} className="p-2"><Minus size={20} /></button>
                    <span className="font-bold text-lg">{inCart.qty} in bucket</span>
                    <button onClick={() => updateQty(item.id, 1)} className="p-2"><Plus size={20} /></button>
                  </div>
                ) : (
                  <button 
                    onClick={() => addToCart(item)}
                    className="w-full py-4 rounded-2xl border-2 border-blue-600 text-blue-600 font-bold flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <Plus size={20} /> Add to Order
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-blue-950 mb-8">Ready to Chat?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl flex flex-col items-center">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-full mb-4"><MapPin /></div>
              <h4 className="font-bold">Visit Sindy</h4>
              <p className="text-slate-500">5084 Malandela Road, Ezakheni</p>
            </div>
            <div className="bg-white p-8 rounded-3xl flex flex-col items-center">
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full mb-4"><Phone /></div>
              <h4 className="font-bold">Call or WhatsApp</h4>
              <p className="text-slate-500">{phoneNumber}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Button Mobile Overlay */}
      {cart.length > 0 && !isCartOpen && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 left-6 md:left-auto md:w-64 bg-blue-900 text-white p-5 rounded-2xl shadow-2xl z-40 flex items-center justify-between md:gap-4 animate-in fade-in slide-in-from-bottom-4"
        >
          <div className="flex items-center gap-3">
            <ShoppingBasket />
            <span className="font-bold">View Bucket</span>
          </div>
          <span className="bg-white/20 px-3 py-1 rounded-lg text-sm font-bold">R{cartTotal}</span>
        </button>
      )}

      <footer className="py-12 text-center text-slate-400 text-sm">
        <p>© {currentYear} Sindy's Bakery Ezakheni</p>
      </footer>
    </div>
  );
};

export default App;
