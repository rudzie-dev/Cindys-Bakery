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
  UtensilsCrossed,
  Wheat,
  ShoppingBag,
  MessageCircle,
  Clock3
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  
  const currentYear = new Date().getFullYear();
  const phoneNumber = "0739015521";
  const whatsappUrl = `https://wa.me/27${phoneNumber.substring(1)}?text=Hello%20Sindy!%20I'd%20like%20to%20order%20some%20of%20your%20delicious%20baking...`;

  useEffect(() => {
    document.title = "Sindy's Bakery Ezakheni | The Warmth of Home Baking";

    const metaDescriptions = {
      "description": "Sindy's Bakery in Ezakheni offers heartwarming homemade muffins, scones, and bulk bakes. Made with love for your family.",
      "keywords": "bakery Ezakheni, home baking KZN, Sindy's Bakery, fresh scones, bulk muffins, Malandela Road bakery",
      "viewport": "width=device-width, initial-scale=1.0, maximum-scale=5.0",
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

  const menuItems = [
    { 
      name: "5Ltr Scones", 
      price: "R130", 
      category: "Family Favourites",
      description: "Warm, golden scones that taste just like Sunday morning."
    },
    { 
      name: "10Ltr Cupcakes / White Muffins", 
      price: "R230", 
      category: "Family Favourites",
      description: "Little bites of joy to share with the ones you love."
    },
    { 
      name: "5Ltr Cupcakes", 
      price: "R250", 
      category: "Specialty Treats",
      description: "Beautifully baked treats that make any day feel special."
    },
    { 
      name: "20Ltr Scones", 
      price: "R350", 
      category: "Big Gatherings",
      description: "A generous bucket of comfort for your big family events."
    },
    { 
      name: "5Ltr Brown Muffins (Plain)", 
      price: "R180", 
      category: "Wholesome Goodness",
      description: "Simple, earthy, and made with care—wholesome goodness."
    },
    { 
      name: "5Ltr Brown Muffins (w/ Choc Chips)", 
      price: "R220", 
      category: "Wholesome Goodness",
      description: "A warm hug in a muffin—rich chocolate meets home baking."
    },
    { 
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

  const nextTestimonial = () => setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="min-h-screen bg-[#fcfaf7] font-sans text-slate-800 selection:bg-blue-100 antialiased">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || isMenuOpen ? "bg-white/95 backdrop-blur-md py-3 shadow-sm border-b border-blue-100" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-12">
          <div className="flex items-center gap-2">
            <Cake className={`w-6 h-6 ${scrolled || isMenuOpen ? "text-blue-600" : "text-white"}`} />
            <div className="flex flex-col">
              <span className={`text-xl font-serif font-bold transition-colors ${scrolled || isMenuOpen ? "text-blue-900" : "text-white"}`}>Sindy's Bakery</span>
              <span className={`text-[9px] uppercase tracking-widest font-bold ${scrolled || isMenuOpen ? "text-blue-500" : "text-blue-100/80"}`}>Ezakheni • KZN</span>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2 rounded-lg ${scrolled || isMenuOpen ? "text-blue-900 bg-blue-50" : "text-white bg-white/10"}`}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div className={`hidden md:flex space-x-8 font-medium ${scrolled ? "text-slate-600" : "text-white"}`}>
            <a href="#menu" className="hover:text-blue-400 transition-colors">The Menu</a>
            <a href="#about" className="hover:text-blue-400 transition-colors">Our Kitchen</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">How to Order</a>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-blue-100 p-6 flex flex-col space-y-4 text-center">
            <a href="#menu" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold py-2">The Menu</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold py-2">How to Order</a>
            <a href={whatsappUrl} className="bg-emerald-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
              <MessageCircle size={20} /> WhatsApp Sindy
            </a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative min-h-[90svh] flex items-center justify-center overflow-hidden">
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
            <a href={whatsappUrl} className="bg-emerald-600 text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-xl flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors"><MessageCircle /> Chat with Sindy</a>
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section id="menu" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif text-blue-950 mb-4">Sindy's Oven Favorites</h2>
          <p className="text-slate-500 font-medium">Baked fresh to order. Pick your favorites and share the love.</p>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-6 rounded-full opacity-30" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, idx) => (
            <div key={idx} className="bg-white rounded-[2.5rem] border-2 border-blue-50 p-2 group hover:shadow-2xl transition-all duration-500">
              <div className="bg-blue-50 h-52 rounded-[2.2rem] flex flex-col items-center justify-center relative overflow-hidden">
                <Cake className="w-16 h-16 text-blue-200 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-600">{item.category}</div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-serif text-blue-950 font-bold">{item.name}</h3>
                  <span className="text-2xl font-black text-blue-600">{item.price}</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{item.description}</p>
                <a href={whatsappUrl} className="w-full bg-blue-50 text-blue-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all">
                  Order this Bucket
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reimagined Contact: The Kitchen Chat */}
      <section id="contact" className="py-24 px-4 bg-white relative overflow-hidden">
        {/* Flour-dusted background effect */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        
        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left side: Warm Invitation */}
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
                    <p className="text-xs text-blue-400 font-medium">Just down the road from the local shops!</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-left">
                  <div className="p-3 bg-blue-50 rounded-2xl text-blue-600"><Clock3 /></div>
                  <div>
                    <h4 className="font-bold text-blue-950">Baking Hours</h4>
                    <p className="text-slate-500">Mon - Sat: 08:00 - 17:00</p>
                    <p className="text-xs text-blue-400 font-medium">Please order 24 hours in advance for bulk!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Friendly "Chat Cards" instead of a Form */}
            <div className="bg-[#fcfaf7] p-8 md:p-12 rounded-[3rem] border-4 border-dashed border-blue-100 relative">
              <div className="absolute -top-6 -right-6 bg-yellow-400 text-blue-900 font-black p-4 rounded-full shadow-lg rotate-12 hidden md:block">
                Fresh Batch <br/> Coming Up!
              </div>
              
              <h3 className="text-3xl font-serif text-blue-900 mb-8 text-center">How can Sindy help?</h3>
              
              <div className="space-y-4">
                <a href={whatsappUrl} className="group flex items-center justify-between p-6 bg-white rounded-3xl border border-blue-50 hover:border-blue-300 transition-all hover:shadow-xl active:scale-95">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl"><MessageCircle /></div>
                    <div className="text-left">
                      <p className="font-bold text-blue-950">Order on WhatsApp</p>
                      <p className="text-sm text-slate-400 italic">"I'd like a 10Ltr bucket for tomorrow..."</p>
                    </div>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-blue-600" />
                </a>

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
                  <a href={whatsappUrl} className="inline-block text-yellow-400 font-bold border-b-2 border-yellow-400 pb-1 hover:text-white hover:border-white transition-all">Discuss Bulk Catering →</a>
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
