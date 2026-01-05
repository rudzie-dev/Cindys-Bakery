import React, { useState, useEffect } from 'react';
import { 
  Cake, 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Star,
  CheckCircle2, 
  Heart,
  UtensilsCrossed,
  Wheat,
  ShoppingBag
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  
  const currentYear = new Date().getFullYear();
  const phoneNumber = "0739015521";
  const whatsappUrl = `https://wa.me/27${phoneNumber.substring(1)}`;

  // Side effect to manage SEO head tags and JSON-LD to avoid DOM nesting errors
  useEffect(() => {
    // 1. Update Document Title
    document.title = "Sindy's Bakery Ezakheni | The Warmth of Home Baking in KZN";

    // 2. Add/Update Meta Tags
    const metaDescriptions = {
      "description": "Sindy's Bakery in Ezakheni offers heartwarming homemade muffins, scones, and bulk bakes. Taste the love in every bite. Order 5Ltr-20Ltr buckets for your family today.",
      "keywords": "bakery Ezakheni, home baking KZN, comfort food Ezakheni, Sindy's Bakery, fresh scones, bulk muffins, family events catering, Malandela Road bakery, homemade biscuits",
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

    // 3. Structured Data (JSON-LD)
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Bakery",
      "name": "Sindy's Bakery",
      "description": "Baking memories with fresh homemade muffins, scones, and bulk bakes in Ezakheni. Made with love.",
      "url": "https://sindysbakery.co.za",
      "telephone": `+27${phoneNumber.substring(1)}`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "5084 Malandela Road",
        "addressLocality": "Ezakheni",
        "addressRegion": "KwaZulu-Natal",
        "postalCode": "3381",
        "addressCountry": "ZA"
      }
    };

    let scriptTag = document.getElementById('bakery-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'bakery-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(jsonLd);

    // Scroll listener
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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

  const categories = [
    {
      title: "Oven Fresh Daily",
      description: "We wake up early to bake, so you can start your day with the warmth of fresh muffins.",
      icon: <UtensilsCrossed className="w-8 h-8 text-blue-600" />
    },
    {
      title: "Family Buckets",
      description: "Generous 5Ltr to 20Ltr buckets, because happiness is meant to be shared with family.",
      icon: <ShoppingBag className="w-8 h-8 text-blue-500" />
    },
    {
      title: "Sweet Memories",
      description: "Biscuits and cookies that taste just like the ones Grandma used to make.",
      icon: <Wheat className="w-8 h-8 text-blue-400" />
    }
  ];

  const nextTestimonial = () => setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="min-h-screen bg-[#fcfaf7] font-sans text-slate-800 overflow-x-hidden selection:bg-blue-100 antialiased">
      {/* Navbar */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled || isMenuOpen
          ? "bg-white/95 backdrop-blur-md py-3 shadow-sm border-b border-blue-100" 
          : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            <div className="flex items-center gap-2 md:gap-3">
              <div className={`p-1.5 md:p-2 rounded-full border transition-colors duration-300 ${
                scrolled || isMenuOpen ? "bg-blue-50 border-blue-100" : "bg-white/10 border-white/20"
              }`}>
                <Cake className={`w-5 h-5 md:w-6 md:h-6 ${scrolled || isMenuOpen ? "text-blue-600" : "text-white"}`} />
              </div>
              <div className="flex flex-col">
                <span className={`text-xl md:text-2xl font-serif font-bold tracking-tight leading-none transition-colors duration-300 ${
                  scrolled || isMenuOpen ? "text-blue-900" : "text-white"
                }`}>
                  Sindy's Bakery
                </span>
                <span className={`text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold mt-1 transition-colors duration-300 ${
                  scrolled || isMenuOpen ? "text-blue-500" : "text-blue-100/80"
                }`}>
                  Ezakheni • KZN
                </span>
              </div>
            </div>

            <div className={`hidden md:flex space-x-10 font-medium transition-colors duration-300 ${
              scrolled ? "text-slate-500" : "text-white/90"
            }`}>
              <a href="#hero" className="hover:text-blue-400 transition-colors">Home</a>
              <a href="#menu" className="hover:text-blue-400 transition-colors">Our Menu</a>
              <a href="#testimonials" className="hover:text-blue-400 transition-colors">Love Notes</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">Order</a>
            </div>

            <div className="hidden md:block">
              <a 
                href={whatsappUrl} 
                className={`inline-flex items-center px-6 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95 ${
                  scrolled 
                  ? "bg-emerald-600 text-white hover:bg-emerald-700" 
                  : "bg-white/20 text-white backdrop-blur-md hover:bg-white/30 border border-white/30"
                }`}
              >
                <Phone className="w-4 h-4 mr-2" />
                Contact Sindy
              </a>
            </div>

            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className={`p-3 rounded-xl transition-colors active:scale-90 ${
                  scrolled || isMenuOpen ? "text-blue-900 bg-blue-50" : "text-white bg-white/10 backdrop-blur-sm"
                }`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-blue-100 transition-all duration-300 ease-in-out origin-top ${
          isMenuOpen ? "scale-y-100 opacity-100 visible" : "scale-y-0 opacity-0 invisible"
        }`}>
          <div className="px-6 py-8 flex flex-col space-y-6 text-center">
            <a href="#hero" className="text-xl text-slate-700 font-bold py-2 active:bg-blue-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#menu" className="text-xl text-slate-700 font-bold py-2 active:bg-blue-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Our Menu</a>
            <a href="#testimonials" className="text-xl text-slate-700 font-bold py-2 active:bg-blue-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Love Notes</a>
            <a href="#contact" className="text-xl text-slate-700 font-bold py-2 active:bg-blue-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Order Now</a>
            <a 
              href={whatsappUrl} 
              className="bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              Chat with Sindy
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute inset-0">
          <div className="w-full h-full relative">
            <img 
              src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=2000" 
              alt="Fresh homemade muffins at Sindy's Bakery" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 via-blue-950/50 to-[#fcfaf7]" />
          </div>
        </div>
        
        <div className="relative text-center px-4 max-w-4xl mx-auto pt-20 pb-12">
          <div className="inline-block px-4 py-1.5 bg-blue-600 text-white text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase rounded-full mb-6 shadow-lg">
            Baked with Love in Ezakheni
          </div>
          <h1 className="text-4xl xs:text-5xl md:text-8xl font-serif text-white mb-6 leading-[1.1] drop-shadow-2xl">
            The Warmth of <br/><span className="text-blue-100 underline decoration-white/30 underline-offset-8">Home in Every Bite</span>
          </h1>
          <p className="text-lg md:text-2xl text-blue-50 mb-10 font-medium max-w-2xl mx-auto drop-shadow-lg px-2">
            From our oven to your heart. Fresh muffins, scones, and cookies made to bring your family together.
          </p>
          <div className="flex flex-col xs:flex-row gap-4 justify-center px-6">
            <a 
              href="#menu" 
              className="w-full xs:w-auto bg-white text-blue-900 px-8 py-4 md:px-10 md:py-5 rounded-2xl text-base md:text-lg font-bold hover:bg-blue-50 transition-all shadow-2xl active:scale-95 border-b-4 border-blue-200"
            >
              See Our Treats
            </a>
            <a 
              href={whatsappUrl} 
              className="w-full xs:w-auto bg-white/10 backdrop-blur-md text-white border-2 border-white/40 px-8 py-4 md:px-10 md:py-5 rounded-2xl text-base md:text-lg font-bold hover:bg-white/20 transition-all active:scale-95"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 px-4 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-serif italic text-lg md:text-xl">Our Kitchen</span>
            <h2 className="text-3xl md:text-6xl font-serif mt-2 mb-4 text-slate-900">Baked Fresh for Your Family</h2>
            <div className="w-16 md:w-24 h-1 bg-blue-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {menuItems.map((item, idx) => (
              <article 
                key={idx} 
                className="group bg-white rounded-3xl overflow-hidden border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="text-center p-6">
                    <Cake className="w-16 h-16 text-blue-400 mx-auto mb-2 opacity-40" />
                    <p className="text-blue-600 text-sm font-semibold">Fresh from Sindy's Oven</p>
                  </div>
                  <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    {item.category}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-blue-900 font-bold text-lg leading-tight drop-shadow-sm">
                      {item.name}
                    </h3>
                  </div>
                </div>
                
                <div className="p-5">
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed min-h-[40px]">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-blue-100">
                    <span className="text-3xl font-serif font-black text-blue-600">
                      {item.price}
                    </span>
                    <a 
                      href={whatsappUrl}
                      className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-md"
                    >
                      Treat Your Family
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}></div>
        <div className="max-w-5xl mx-auto px-6 relative text-center">
          <div className="flex justify-center mb-8">
             <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                <Heart className="w-6 h-6 text-blue-300 fill-blue-300" />
             </div>
          </div>

          <div className="relative min-h-[320px] xs:min-h-[280px] flex items-center justify-center">
            {testimonials.map((t, idx) => (
              <div 
                key={idx}
                className={`transition-all duration-700 absolute inset-0 flex flex-col items-center justify-center ${
                  idx === activeTestimonial ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
                }`}
              >
                <div className="flex gap-1.5 mb-6">
                  {[...Array(t.stars)].map((_, i) => <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-xl md:text-4xl font-serif italic mb-8 leading-relaxed text-blue-50 max-w-3xl">
                  "{t.text}"
                </p>
                <p className="font-bold text-blue-200 tracking-[0.2em] uppercase text-xs md:text-sm">{t.name}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button onClick={prevTestimonial} className="p-4 rounded-2xl border border-white/20 hover:bg-white hover:text-blue-900 transition-all">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextTestimonial} className="p-4 rounded-2xl border border-white/20 hover:bg-white hover:text-blue-900 transition-all">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="text-center lg:text-left">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-[10px] md:text-sm">Contact Us</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-6 text-slate-900 mt-2">Bring the sweetness home</h2>
            <p className="text-slate-600 mb-10 text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
              Whether you need a batch of muffins for breakfast or bulk scones for a big family celebration in Ezakheni, Sindy is ready to bake for you.
            </p>

            <div className="grid gap-6 text-left max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-4 md:gap-6 bg-blue-50/50 p-4 rounded-2xl">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <MapPin className="text-blue-600 w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-950 text-sm md:text-base">Visit Sindy's Kitchen</h4>
                  <p className="text-slate-500 text-sm md:text-lg">5084 Malandela Road, Ezakheni</p>
                </div>
              </div>
              <div className="flex items-center gap-4 md:gap-6 bg-blue-50/50 p-4 rounded-2xl">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Phone className="text-blue-600 w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-950 text-sm md:text-base">Call or WhatsApp Sindy</h4>
                  <p className="text-slate-500 text-sm md:text-lg">{phoneNumber}</p>
                </div>
              </div>
            </div>
            
            <a 
              href={whatsappUrl} 
              className="inline-flex w-full md:w-auto items-center justify-center mt-10 bg-emerald-600 text-white px-8 py-5 md:px-12 md:py-6 rounded-2xl md:rounded-3xl font-bold text-lg md:text-xl hover:bg-emerald-700 transition-all shadow-xl active:scale-95"
            >
              <Phone className="w-5 h-5 md:w-6 md:h-6 mr-3" />
              Chat on WhatsApp
            </a>
          </div>

          <div className="bg-[#fcfaf7] p-6 md:p-14 rounded-[2rem] md:rounded-[3rem] border border-blue-100 shadow-inner">
            <h3 className="text-2xl md:text-3xl font-serif text-blue-950 mb-6 md:mb-8 text-center">Send Sindy a Message</h3>
            <form className="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Your Name" className="w-full p-4 rounded-xl bg-white border border-blue-100 outline-none focus:ring-2 focus:ring-blue-400" />
              <input type="tel" placeholder="Phone Number" className="w-full p-4 rounded-xl bg-white border border-blue-100 outline-none focus:ring-2 focus:ring-blue-400" />
              <textarea rows="4" placeholder="What delicious treats can Sindy bake for you?" className="w-full p-4 rounded-xl bg-white border border-blue-100 outline-none focus:ring-2 focus:ring-blue-400"></textarea>
              <button className="w-full bg-blue-600 text-white py-4 md:py-5 rounded-xl font-bold text-base md:text-lg hover:bg-blue-700 transition-all shadow-lg active:scale-95">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 md:py-20 px-6 border-t border-dashed border-blue-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 md:gap-12">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1.5 bg-blue-50 rounded-lg">
                <Cake className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xl font-serif font-bold text-blue-950">Sindy's Bakery</span>
            </div>
            <p className="text-slate-400 font-medium text-xs md:text-sm">
              © {currentYear} Sindy's Bakery. Ezakheni, KwaZulu-Natal.<br/>
              Handcrafted with local love and fresh ingredients.<br/>
              <span className="text-[10px]">Serving Ezakheni, Ladysmith and surrounding KZN areas</span>
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="font-serif text-lg md:text-xl text-blue-950 mb-2">Order your fresh bakes today</p>
            <p className="text-blue-500 font-bold tracking-widest text-[10px] md:text-xs uppercase">{phoneNumber}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
