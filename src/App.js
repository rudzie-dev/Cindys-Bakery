import React, { useState, useEffect, useCallback } from 'react';
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
  const [deliveryMethod, setDeliveryMethod] = useState('pickup'); 
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  
  const currentYear = new Date().getFullYear();
  const phoneNumber = "0739015521";
  
  // Refactored Price Logic: Using numbers instead of strings
  const formatPrice = (amount) => `R${amount}`;

  useEffect(() => {
    document.title = "Sindy's Bakery Ezakheni | The Warmth of Home Baking";
    document.documentElement.style.scrollBehavior = 'smooth';

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when overlays are open
  useEffect(() => {
    if (isMenuOpen || isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen, isCartOpen]);

  // Handle Keyboard Escape key to close overlays
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const menuItems = [
    {
      id: 1,
      name: "Sindy's Signature Muffins",
      description: "A dozen of our famous light and fluffy home-style muffins.",
      price: 130,
      category: "Family Favourites",
      popular: true
    },
    {
      id: 2,
      name: "Classic Tea Scones",
      description: "Batch of 12 traditional buttery scones, perfect for tea time.",
      price: 130,
      category: "Family Favourites",
      popular: true
    },
    {
      id: 3,
      name: "The Celebration Bucket",
      description: "Our large signature bucket filled with a variety of bakes for events.",
      price: 450,
      category: "Big Gatherings",
      popular: false
    },
    {
      id: 4,
      name: "Daily Fresh Loaf",
      description: "Standard size fresh farm-style white bread, baked daily.",
      price: 18,
      category: "Essentials",
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Mam' Thandi",
      text: "The best muffins in Ezakheni. They taste just like the ones my grandmother used to make. Always fresh!",
      rating: 5
    },
    {
      name: "Sipho Khumalo",
      text: "Sindy saved our community meeting with the 450 bucket. Everyone was asking where we got the scones!",
      rating: 5
    },
    {
      name: "Nolwazi Dlamini",
      text: "Convenient and delicious. I love that I can just WhatsApp my order and collect it on my way home.",
      rating: 5
    }
  ];

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
    setIsMenuOpen(false); // Close mobile menu if adding from there
  };

  const updateQuantity = (id, delta) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    const methodEmoji = deliveryMethod === 'pickup' ? '🏪 Collection' : '🚚 Delivery';
    const addressInfo = deliveryMethod === 'delivery' ? `\n📍 Address: ${deliveryAddress}` : '';
    
    let message = `Hello Sindy! I'd like to place an order from the website:\n\n`;
    cart.forEach(item => {
      message += `• ${item.name} (${item.quantity}x) - ${formatPrice(item.price * item.quantity)}\n`;
    });
    message += `\n💰 *Total: ${formatPrice(cartTotal)}*`;
    message += `\n📦 Method: ${methodEmoji}${addressInfo}`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 px-6 py-4 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-blue-50' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg shadow-blue-200 shadow-lg">
              <Cake className="text-white w-6 h-6" />
            </div>
            <span className={`text-2xl font-serif font-bold ${scrolled ? 'text-blue-950' : 'text-blue-950 md:text-white'}`}>
              Sindy's Bakery
            </span>
          </div>

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center gap-8 font-medium ${scrolled ? 'text-slate-600' : 'text-white'}`}>
            <a href="#menu" className="hover:text-blue-500 transition-colors">Menu</a>
            <a href="#about" className="hover:text-blue-500 transition-colors">Our Story</a>
            <a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a>
            <button 
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Shopping Cart"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all border-2 ${
                scrolled 
                ? 'bg-blue-50 text-blue-600 border-blue-50 hover:bg-blue-100' 
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              <ShoppingBag size={20} />
              <span>{cart.length > 0 ? `(${cart.length})` : 'Cart'}</span>
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Shopping Cart"
              className={`relative p-2 rounded-full ${scrolled ? 'text-blue-950 bg-blue-50' : 'text-blue-950 bg-white shadow-md'}`}
            >
              <ShoppingBag size={22} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-bold">
                  {cart.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Mobile Menu"
              className={scrolled ? 'text-blue-950' : 'text-blue-950 md:text-white'}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80" 
            alt="Fresh bread and pastries" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/60 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-100 px-4 py-2 rounded-full mb-6">
              <Star size={16} className="fill-blue-400 text-blue-400" />
              <span className="text-sm font-semibold tracking-wide uppercase">Ezakheni's Favourite Local Bakery</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-[1.1]">
              The Warmth of <br/>
              <span className="text-blue-400">Home Baking</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-50/80 mb-10 max-w-lg leading-relaxed">
              Serving Ezakheni Section B with heartwarming homemade muffins, scones, and fresh bakes since 2018. Pure ingredients, pure love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#menu" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2 group">
                Browse Fresh Menu
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button onClick={() => setIsCartOpen(true)} className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2">
                Order for Collection
              </button>
            </div>
          </div>
          
          <div className="hidden md:flex justify-end animate-float">
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500/20 rounded-[2rem] blur-2xl" />
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                    <Clock3 className="text-white" />
                  </div>
                  <div>
                    <p className="text-blue-100 text-xs uppercase tracking-wider font-bold">Open Daily</p>
                    <p className="text-white font-serif">6:00 AM - 6:00 PM</p>
                  </div>
                </div>
                <div className="space-y-4">
                   <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                      <p className="text-white font-medium">Fresh Batch Ready!</p>
                      <p className="text-blue-200 text-sm">Signature Scones just out the oven.</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="flex gap-5 group">
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
              <Heart size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-blue-950">Baked with Love</h3>
              <p className="text-slate-500 leading-relaxed">Every batch is prepared with the same care as if it were for our own family table.</p>
            </div>
          </div>
          <div className="flex gap-5 group">
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
              <ShoppingBag size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-blue-950">Easy Ordering</h3>
              <p className="text-slate-500 leading-relaxed">No complex apps. Just browse, pick your favourites, and WhatsApp us to confirm.</p>
            </div>
          </div>
          <div className="flex gap-5 group">
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
              <Clock3 size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-blue-950">Always Fresh</h3>
              <p className="text-slate-500 leading-relaxed">We bake daily in Section B. Never stale, never compromised. Only the best.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-blue-950 mb-4">Our Fresh Menu</h2>
            <p className="text-slate-500 text-lg">Choose from our daily bakes. Perfect for family breakfasts, afternoon tea, or community gatherings.</p>
          </div>
          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
            <button className="px-6 py-2 bg-white text-blue-600 rounded-lg shadow-sm font-bold text-sm">All Items</button>
            <button className="px-6 py-2 text-slate-500 rounded-lg hover:text-blue-600 transition-colors font-bold text-sm">Bulk Buckets</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item) => (
            <div key={item.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 flex flex-col">
              <div className="relative aspect-square overflow-hidden bg-slate-50">
                <div className="absolute inset-0 bg-blue-100 flex items-center justify-center opacity-40">
                   <Cake size={48} className="text-blue-300" />
                </div>
                {item.popular && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 border border-blue-50 shadow-sm z-10">
                    Most Loved
                  </div>
                )}
                <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full text-slate-300 hover:text-red-500 transition-colors z-10">
                  <Heart size={20} />
                </button>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-blue-950 leading-tight group-hover:text-blue-600 transition-colors">{item.name}</h3>
                </div>
                <p className="text-slate-400 text-sm mb-6 flex-grow">{item.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-serif font-bold text-blue-950">{formatPrice(item.price)}</span>
                  <button 
                    onClick={() => addToCart(item)}
                    className="bg-blue-50 text-blue-600 p-3 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm shadow-blue-100"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-blue-950 py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex justify-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => <Star key={i} size={20} className="fill-blue-400 text-blue-400" />)}
          </div>
          <p className="text-2xl md:text-4xl font-serif italic text-white leading-relaxed mb-12">
            "{testimonials[activeTestimonial].text}"
          </p>
          <p className="text-blue-400 font-bold tracking-widest uppercase mb-16">— {testimonials[activeTestimonial].name}</p>
          
          <div className="flex justify-center gap-4 text-white">
            <button 
              aria-label="Previous Testimonial"
              onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)} 
              className="p-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors"
            >
              <ChevronLeft />
            </button>
            <button 
              aria-label="Next Testimonial"
              onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)} 
              className="p-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-white py-20 px-6 border-t border-blue-50">
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
            <div className="flex gap-4">
              <a href={`tel:${phoneNumber}`} className="p-3 rounded-xl bg-slate-50 text-slate-600 hover:text-blue-600 transition-colors">
                <Phone size={20} />
              </a>
              <a href="#menu" className="p-3 rounded-xl bg-slate-50 text-slate-600 hover:text-blue-600 transition-colors">
                <MapPin size={20} />
              </a>
              <a href={`https://wa.me/${phoneNumber}`} className="p-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Slide-out Cart */}
      <div 
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div 
          className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm" 
          onClick={() => setIsCartOpen(false)} 
        />
        <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-out transform flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 border-b flex justify-between items-center bg-blue-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-blue-600" />
              <h2 className="text-xl font-serif font-bold text-blue-950 text-center">Your Basket</h2>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              aria-label="Close Shopping Cart"
              className="p-2 hover:bg-blue-100 rounded-full transition-colors text-blue-600"
            >
              <X />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag size={32} className="text-blue-200" />
                </div>
                <p className="text-slate-400 mb-6 italic">Your basket is empty. Sindy is ready to bake for you!</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-blue-600 font-bold border-b-2 border-blue-600"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100">
                    <Cake className="text-blue-200" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-bold text-blue-950">{item.name}</h4>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                        className="text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-slate-400 text-xs mb-3">{formatPrice(item.price)} each</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-100">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                          className="w-6 h-6 flex items-center justify-center text-blue-600 hover:bg-white rounded transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                          className="w-6 h-6 flex items-center justify-center text-blue-600 hover:bg-white rounded transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="ml-auto font-bold text-blue-950">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t space-y-4 bg-slate-50">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Service Method</p>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      deliveryMethod === 'pickup' 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    <Store size={16} />
                    Collect
                  </button>
                  <button 
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      deliveryMethod === 'delivery' 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    <Truck size={16} />
                    Delivery
                  </button>
                </div>
                
                {/* NEW: Delivery Address Field */}
                {deliveryMethod === 'delivery' && (
                  <div className="mt-4 animate-fade-in">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Delivery Address</label>
                    <textarea 
                      placeholder="Street name, house number, area..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none min-h-[80px]"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center px-2 py-2">
                <span className="text-slate-500 font-medium">Total Balance</span>
                <span className="text-3xl font-serif font-bold text-blue-950">{formatPrice(cartTotal)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={deliveryMethod === 'delivery' && !deliveryAddress.trim()}
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl ${
                  deliveryMethod === 'delivery' && !deliveryAddress.trim()
                  ? 'bg-slate-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
                }`}
              >
                <MessageCircle size={20} />
                Send WhatsApp Order
              </button>
              <p className="text-[10px] text-center text-slate-400 px-4 leading-relaxed italic">
                {deliveryMethod === 'delivery' && !deliveryAddress.trim() 
                  ? "Please enter your address to enable delivery" 
                  : "Clicking will open WhatsApp to confirm your order details with Sindy."
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div 
          className="absolute inset-0 bg-blue-950/90 backdrop-blur-lg" 
          onClick={() => setIsMenuOpen(false)} 
        />
        <div className="relative h-full flex flex-col items-center justify-center gap-12 text-white p-6">
          <button 
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close Mobile Menu"
            className="absolute top-10 right-10 text-white/50 hover:text-white"
          >
            <X size={32} />
          </button>
          
          <div className="flex flex-col items-center gap-8 text-3xl font-serif font-bold">
            <a href="#menu" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-400 transition-colors">The Menu</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-400 transition-colors">Our Story</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-400 transition-colors">Contact Us</a>
          </div>

          <div className="flex gap-6 mt-8">
            <a href={`tel:${phoneNumber}`} className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <Phone size={24} />
            </a>
            <a href={`https://wa.me/${phoneNumber}`} className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-500 transition-colors">
              <MessageCircle size={24} />
            </a>
          </div>

          <div className="mt-auto text-center">
            <p className="text-white/40 text-sm">Sindy's Bakery Ezakheni</p>
            <p className="text-white/20 text-xs mt-2">Section B, Malandela Road</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
