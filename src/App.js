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
  RefreshCw
} from 'lucide-react';

// --- CONFIGURATION ---
const PARTNER_1_PHONE = "1234567890"; 
const PARTNER_2_PHONE = "0987654321"; 

const App = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    businessName: '',
    bakeryType: '',
    vibe: '',
    specialty: '',
    instagram: '',
    description: '',
    deliveryMethod: ''
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
      bakeryType: '',
      vibe: '',
      specialty: '',
      instagram: '',
      description: '',
      deliveryMethod: ''
    });
    setStep(0);
  };

  const sendWhatsApp = (number) => {
    const summary = `*NEW CLIENT DISCOVERY* 🥐\n` +
      `--------------------------\n` +
      `*Bakery Name:* ${formData.businessName}\n` +
      `*Specialty:* ${formData.specialty}\n` +
      `*Vibe:* ${formData.vibe}\n` +
      `*Instagram:* ${formData.instagram || 'Not provided'}\n` +
      `*Story/Logistics:* ${formData.deliveryMethod || 'Not provided'}\n` +
      `--------------------------\n` +
      `_Sent via Bakery Onboarding Portal_`;

    const text = encodeURIComponent(summary);
    window.open(`https://wa.me/${number}?text=${text}`, '_blank');
  };

  // --- UI COMPONENTS ---

  const Welcome = () => (
    <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-1000">
      <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-8 relative">
        <div className="absolute inset-0 bg-orange-100 rounded-full animate-ping opacity-20"></div>
        <ChefHat className="text-orange-700 w-12 h-12 relative z-10" />
      </div>
      <h1 className="text-5xl font-serif text-slate-800 mb-6 leading-tight">Your bakery deserves <br/><span className="italic text-orange-700">a beautiful home.</span></h1>
      <p className="text-slate-500 max-w-lg text-lg mb-10 leading-relaxed">Let's start your journey from the oven to the internet. Tell us about your brand.</p>
      <button 
        onClick={nextStep}
        className="px-10 py-5 bg-orange-700 text-white rounded-2xl font-semibold hover:bg-orange-800 transition-all shadow-xl shadow-orange-100 flex items-center gap-3 group"
      >
        Start Discovery <ChevronRight className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );

  const StepName = () => (
    <div className="w-full max-w-2xl animate-in slide-in-from-bottom-8 duration-700">
      <span className="text-orange-700 font-bold tracking-widest text-xs uppercase mb-4 block">Step 01</span>
      <h2 className="text-3xl md:text-4xl font-serif text-slate-800 mb-10">What's the name of your <br/>bakery project?</h2>
      <input 
        autoFocus
        type="text"
        placeholder="e.g. Flour & Soul"
        value={formData.businessName}
        onChange={(e) => updateField('businessName', e.target.value)}
        className="w-full bg-transparent border-b-2 border-slate-200 py-6 text-4xl focus:border-orange-700 outline-none transition-colors text-slate-700 font-serif italic"
      />
      <div className="mt-16 flex justify-between items-center">
        <button onClick={prevStep} className="text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2"><ChevronLeft size={20}/> Back</button>
        <button 
          onClick={nextStep} 
          disabled={!formData.businessName} 
          className="px-10 py-4 bg-slate-900 text-white rounded-xl disabled:opacity-30 shadow-lg"
        >
          Next Step
        </button>
      </div>
    </div>
  );

  const StepSpecialty = () => {
    const options = [
      { id: 'cakes', label: 'Custom Cakes', icon: <Cake />, desc: 'Celebrations and artistic designs.' },
      { id: 'pastries', label: 'Fine Pastries', icon: <Heart />, desc: 'The delicate art of French baking.' },
      { id: 'bread', label: 'Artisan Bread', icon: <Store />, desc: 'Sourdough and heritage grains.' },
    ];
    return (
      <div className="w-full max-w-4xl animate-in fade-in duration-700 px-4">
        <h2 className="text-3xl font-serif text-center text-slate-800 mb-12 italic">What is your primary craft?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {options.map((opt) => (
            <button 
              key={opt.id}
              onClick={() => { updateField('specialty', opt.label); nextStep(); }}
              className={`p-10 rounded-[2.5rem] border-2 text-left group transition-all duration-300 ${
                formData.specialty === opt.label ? 'border-orange-700 bg-orange-50 shadow-inner' : 'border-slate-100 bg-white hover:border-orange-200 hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-700 mb-6 group-hover:scale-110 transition-transform">{opt.icon}</div>
              <p className="font-serif text-2xl text-slate-800 mb-2">{opt.label}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{opt.desc}</p>
            </button>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button onClick={prevStep} className="text-slate-400 hover:text-slate-600 transition-colors">Go Back</button>
        </div>
      </div>
    );
  };

  const StepVibe = () => {
    const vibes = ['Minimal & Modern', 'Rustic & Organic', 'Playful & Bright', 'Luxury & High-End'];
    return (
      <div className="w-full max-w-2xl animate-in slide-in-from-right-8 duration-700">
        <h2 className="text-3xl font-serif text-slate-800 mb-10 italic text-center">Choose your brand's personality</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {vibes.map((v) => (
            <button 
              key={v}
              onClick={() => { updateField('vibe', v); nextStep(); }}
              className={`px-8 py-4 rounded-full border-2 transition-all ${
                formData.vibe === v ? 'bg-orange-700 text-white border-orange-700 scale-105' : 'bg-white border-slate-100 text-slate-600 hover:border-orange-300'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button onClick={prevStep} className="text-slate-400 hover:text-slate-600 transition-colors">Back</button>
        </div>
      </div>
    );
  };

  const StepDetails = () => (
    <div className="w-full max-w-2xl animate-in slide-in-from-bottom-8 duration-700">
      <h2 className="text-3xl font-serif text-slate-800 mb-8 italic text-center">Final details for the build...</h2>
      <div className="space-y-6">
        <div className="relative">
          <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
          <input 
            type="text"
            placeholder="Instagram Handle (e.g. @myshop)"
            value={formData.instagram}
            onChange={(e) => updateField('instagram', e.target.value)}
            className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-6 text-lg outline-none focus:ring-2 focus:ring-orange-700/20 focus:border-orange-700 transition-all shadow-sm"
          />
        </div>
        <textarea 
          placeholder="Tell us about your story or delivery preferences..."
          value={formData.deliveryMethod}
          onChange={(e) => updateField('deliveryMethod', e.target.value)}
          rows={3}
          className="w-full bg-white border border-slate-100 rounded-2xl p-6 text-lg outline-none focus:ring-2 focus:ring-orange-700/20 focus:border-orange-700 transition-all shadow-sm"
        />
      </div>
      <div className="mt-12 flex justify-between items-center">
        <button onClick={prevStep} className="text-slate-400">Back</button>
        <button onClick={nextStep} className="px-10 py-4 bg-orange-700 text-white rounded-xl shadow-lg font-semibold hover:bg-orange-800 transition-all">Submit Details</button>
      </div>
    </div>
  );

  const FinalStep = () => (
    <div className="w-full max-w-xl animate-in zoom-in duration-700 text-center bg-white p-12 rounded-[3rem] shadow-2xl shadow-orange-900/5">
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
        <CheckCircle2 className="text-green-600 w-10 h-10" />
      </div>
      <h2 className="text-4xl font-serif text-slate-800 mb-4 tracking-tight">Success!</h2>
      <p className="text-slate-500 mb-10 text-lg">Your discovery is complete. Please send the summary to our partners to begin your website build.</p>
      
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
          <RefreshCw size={14} /> Reset for New Client
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FCF9F6] flex flex-col items-center justify-center p-8 text-slate-900 relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-100/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-amber-100/40 rounded-full blur-3xl pointer-events-none"></div>

      {/* Progress Line */}
      {step > 0 && step < 5 && (
        <div className="fixed top-8 w-64 h-1 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-orange-700 transition-all duration-700 ease-out" 
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      )}

      {/* Main Experience */}
      <div className="w-full flex items-center justify-center z-10">
        {step === 0 && <Welcome />}
        {step === 1 && <StepName />}
        {step === 2 && <StepSpecialty />}
        {step === 3 && <StepVibe />}
        {step === 4 && <StepDetails />}
        {step === 5 && <FinalStep />}
      </div>

      {/* Subtle Icons */}
      <div className="fixed bottom-12 left-12 opacity-5 animate-pulse hidden xl:block">
        <Cake size={180} />
      </div>
      <div className="fixed top-12 right-12 opacity-5 animate-pulse hidden xl:block">
        <Store size={180} />
      </div>
    </div>
  );
};

export default App;
