import React, { useState, useEffect } from 'react';
import { 
  ChefHat, 
  ChevronRight, 
  ChevronLeft, 
  Cake, 
  Store, 
  Instagram, 
  CheckCircle2, 
  MessageCircle,
  Heart,
  RefreshCw,
  Palette,
  Users,
  UtensilsCrossed,
  Globe
} from 'lucide-react';

// --- CONFIGURATION ---
const PARTNER_1_PHONE = "1234567890"; 
const PARTNER_2_PHONE = "0987654321"; 

const App = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    businessName: '',
    specialty: '',
    vibe: '',
    targetAudience: '',
    colorPalette: '',
    topProducts: '',
    instagram: '',
    deliveryMethod: '',
    websiteGoals: ''
  });

  // Dynamic Browser Tab Title
  useEffect(() => {
    document.title = "Bakery Brand Discovery";
  }, []);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const startNewSession = () => {
    setFormData({
      businessName: '',
      specialty: '',
      vibe: '',
      targetAudience: '',
      colorPalette: '',
      topProducts: '',
      instagram: '',
      deliveryMethod: '',
      websiteGoals: ''
    });
    setStep(0);
  };

  const sendWhatsApp = (number) => {
    const summary = `*NEW WEBSITE BUILD REQUEST* 🥐\n` +
      `--------------------------\n` +
      `*1. BRAND IDENTITY*\n` +
      `• Name: ${formData.businessName}\n` +
      `• Specialty: ${formData.specialty}\n` +
      `• Vibe: ${formData.vibe}\n` +
      `• Colors: ${formData.colorPalette}\n\n` +
      `*2. BUSINESS DETAILS*\n` +
      `• Audience: ${formData.targetAudience}\n` +
      `• Top Sellers: ${formData.topProducts}\n` +
      `• IG: ${formData.instagram || 'N/A'}\n\n` +
      `*3. LOGISTICS & GOALS*\n` +
      `• Process: ${formData.deliveryMethod}\n` +
      `• Website Goal: ${formData.websiteGoals}\n` +
      `--------------------------`;

    const text = encodeURIComponent(summary);
    window.open(`https://wa.me/${number}?text=${text}`, '_blank');
  };

  // --- STABLE RENDER COMPONENT ---
  // We use a internal function that returns JSX rather than a full Component 
  // to avoid the re-mounting focus bug on inputs.
  
  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-1000">
            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-8 relative">
              <div className="absolute inset-0 bg-orange-100 rounded-full animate-ping opacity-20"></div>
              <ChefHat className="text-orange-700 w-12 h-12 relative z-10" />
            </div>
            <h1 className="text-5xl font-serif text-slate-800 mb-6 leading-tight">Your bakery deserves <br/><span className="italic text-orange-700">a beautiful home.</span></h1>
            <p className="text-slate-500 max-w-lg text-lg mb-10 leading-relaxed">Let's gather the specific ingredients needed to build your professional website.</p>
            <button onClick={nextStep} className="px-10 py-5 bg-orange-700 text-white rounded-2xl font-semibold hover:bg-orange-800 transition-all shadow-xl shadow-orange-100 flex items-center gap-3 group">
              Start Discovery <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        );

      case 1: // Name
        return (
          <div className="w-full max-w-2xl animate-in slide-in-from-bottom-8 duration-700">
            <span className="text-orange-700 font-bold tracking-widest text-xs uppercase mb-4 block">Section 1: The Brand</span>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-800 mb-10">What's the official name of <br/>your bakery?</h2>
            <input 
              autoFocus
              type="text"
              placeholder="e.g. Flour & Soul"
              value={formData.businessName}
              onChange={(e) => updateField('businessName', e.target.value)}
              className="w-full bg-transparent border-b-2 border-slate-200 py-6 text-4xl focus:border-orange-700 outline-none transition-colors text-slate-700 font-serif italic"
            />
            <div className="mt-16 flex justify-between items-center">
              <button onClick={prevStep} className="text-slate-400 flex items-center gap-2"><ChevronLeft size={20}/> Back</button>
              <button onClick={nextStep} disabled={!formData.businessName} className="px-10 py-4 bg-slate-900 text-white rounded-xl disabled:opacity-30">Continue</button>
            </div>
          </div>
        );

      case 2: // Specialty & Products
        return (
          <div className="w-full max-w-2xl animate-in fade-in duration-700">
            <h2 className="text-3xl font-serif text-slate-800 mb-4 italic">What are your "Hero" products?</h2>
            <p className="text-slate-500 mb-8">List 3 items you want front-and-center on your homepage.</p>
            <textarea 
              autoFocus
              placeholder="1. Sourdough Boule&#10;2. Cardamom Buns&#10;3. Custom Celebration Cakes"
              value={formData.topProducts}
              onChange={(e) => updateField('topProducts', e.target.value)}
              rows={4}
              className="w-full bg-white border border-slate-200 rounded-2xl p-6 text-xl outline-none focus:ring-2 focus:ring-orange-700/20 focus:border-orange-700 transition-all shadow-sm"
            />
            <div className="mt-12 flex justify-between items-center">
              <button onClick={prevStep} className="text-slate-400">Back</button>
              <button onClick={nextStep} disabled={!formData.topProducts} className="px-10 py-4 bg-orange-700 text-white rounded-xl shadow-lg">Next</button>
            </div>
          </div>
        );

      case 3: // Visual Direction
        return (
          <div className="w-full max-w-3xl animate-in slide-in-from-right-8 duration-700">
            <h2 className="text-3xl font-serif text-slate-800 mb-10 text-center italic">Visual Direction & Colors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Palette size={16}/> Preferred Colors
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Sage green, cream, gold"
                  value={formData.colorPalette}
                  onChange={(e) => updateField('colorPalette', e.target.value)}
                  className="w-full p-4 bg-white border border-slate-200 rounded-xl outline-none focus:border-orange-700"
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Users size={16}/> Target Audience
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Local families, wedding planners"
                  value={formData.targetAudience}
                  onChange={(e) => updateField('targetAudience', e.target.value)}
                  className="w-full p-4 bg-white border border-slate-200 rounded-xl outline-none focus:border-orange-700"
                />
              </div>
            </div>
            <div className="text-center space-y-4">
              <p className="text-slate-500 italic">Select a brand vibe:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Modern & Minimal', 'Rustic & Cozy', 'Playful & Bold', 'Classic Elegance'].map(v => (
                  <button 
                    key={v} 
                    onClick={() => updateField('vibe', v)}
                    className={`px-6 py-3 rounded-full border-2 transition-all ${formData.vibe === v ? 'bg-orange-700 text-white border-orange-700' : 'bg-white border-slate-200 text-slate-600'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-12 flex justify-between items-center">
              <button onClick={prevStep} className="text-slate-400">Back</button>
              <button onClick={nextStep} disabled={!formData.vibe} className="px-10 py-4 bg-slate-900 text-white rounded-xl shadow-lg">Continue</button>
            </div>
          </div>
        );

      case 4: // Logistics & Goals
        return (
          <div className="w-full max-w-2xl animate-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-3xl font-serif text-slate-800 mb-8 italic">Website Goals & Logistics</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2"><Globe size={16}/> What's the main goal of the site?</label>
                <select 
                  value={formData.websiteGoals}
                  onChange={(e) => updateField('websiteGoals', e.target.value)}
                  className="w-full p-4 bg-white border border-slate-200 rounded-xl outline-none focus:border-orange-700"
                >
                  <option value="">Select a goal...</option>
                  <option value="Online Ordering">Direct Online Ordering</option>
                  <option value="Portfolio / Inquiry Only">Showcase Work & Inquiries</option>
                  <option value="Blog & Recipes">Share Recipes & Community</option>
                  <option value="Event Bookings">Bookings for Classes/Events</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2"><Instagram size={16}/> Instagram Handle</label>
                <input 
                  type="text"
                  placeholder="@yourbakery"
                  value={formData.instagram}
                  onChange={(e) => updateField('instagram', e.target.value)}
                  className="w-full p-4 bg-white border border-slate-200 rounded-xl outline-none focus:border-orange-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2"><UtensilsCrossed size={16}/> Delivery or Pickup instructions?</label>
                <textarea 
                  placeholder="e.g. Pickup only on Saturdays from my home kitchen in Austin..."
                  value={formData.deliveryMethod}
                  onChange={(e) => updateField('deliveryMethod', e.target.value)}
                  rows={2}
                  className="w-full p-4 bg-white border border-slate-200 rounded-xl outline-none focus:border-orange-700"
                />
              </div>
            </div>
            <div className="mt-12 flex justify-between items-center">
              <button onClick={prevStep} className="text-slate-400">Back</button>
              <button onClick={nextStep} className="px-10 py-4 bg-orange-700 text-white rounded-xl shadow-lg font-semibold hover:bg-orange-800 transition-all">Submit Details</button>
            </div>
          </div>
        );

      case 5: // Success
        return (
          <div className="w-full max-w-xl animate-in zoom-in duration-700 text-center bg-white p-12 rounded-[3rem] shadow-2xl shadow-orange-900/5">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="text-green-600 w-10 h-10" />
            </div>
            <h2 className="text-4xl font-serif text-slate-800 mb-4 tracking-tight">Strategy Complete!</h2>
            <p className="text-slate-500 mb-10 text-lg">We now have enough detail to build a high-converting bakery site. Send the brief to the dev team below.</p>
            
            <div className="space-y-4">
              <button 
                onClick={() => sendWhatsApp(PARTNER_1_PHONE)}
                className="w-full py-5 bg-green-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-green-700 transition-all shadow-lg"
              >
                <MessageCircle size={22} /> Send to Partner One
              </button>
              <button 
                onClick={() => sendWhatsApp(PARTNER_2_PHONE)}
                className="w-full py-5 border-2 border-green-600 text-green-700 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-green-50 transition-all"
              >
                <MessageCircle size={22} /> Send to Partner Two
              </button>

              <button 
                onClick={startNewSession}
                className="mt-8 text-slate-400 hover:text-slate-600 text-sm flex items-center justify-center gap-2 mx-auto transition-colors"
              >
                <RefreshCw size={14} /> New Session
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF9F6] flex flex-col items-center justify-center p-8 text-slate-900 relative overflow-hidden font-sans">
      
      {/* Decorative BG */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-100/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-amber-100/40 rounded-full blur-3xl pointer-events-none"></div>

      {/* Static Progress Bar */}
      {step > 0 && step < 5 && (
        <div className="fixed top-8 w-64 h-1 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-orange-700 transition-all duration-700 ease-out" 
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      )}

      {/* Experience Container */}
      <div className="w-full flex items-center justify-center z-10">
        {renderContent()}
      </div>

      {/* Ambient Icons */}
      <div className="fixed bottom-12 left-12 opacity-5 animate-pulse hidden xl:block">
        <UtensilsCrossed size={180} />
      </div>
      <div className="fixed top-12 right-12 opacity-5 animate-pulse hidden xl:block">
        <Cake size={180} />
      </div>
    </div>
  );
};

export default App;
