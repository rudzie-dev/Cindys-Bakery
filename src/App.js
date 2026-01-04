import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const App = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    businessName: '',
    vibe: '',
    topSellers: '',
    orderMethod: '',
    colorPref: ''
  });

  const partners = ["27676862733", "27678561563"];

  const steps = [
    { 
      title: "What is your bakery's name?", 
      subtitle: "This will be the header of your new website.",
      field: 'businessName',
      placeholder: 'e.g. The Sourdough Shed'
    },
    { 
      title: "Describe the 'Vibe'", 
      subtitle: "Is it rustic, modern, colorful, or elegant?",
      field: 'vibe',
      placeholder: 'e.g. Cozy farmhouse with warm wood tones'
    },
    { 
      title: "Your Signature Treats", 
      subtitle: "What are the 3 things everyone asks for?",
      field: 'topSellers',
      placeholder: 'e.g. Lemon Tart, Choc-chip cookies, Rye Bread'
    },
    { 
      title: "Color Preferences", 
      subtitle: "What colors do you want on the site?",
      field: 'colorPref',
      placeholder: 'e.g. Pastel pinks and cream'
    },
    { 
      title: "How do you take orders?", 
      subtitle: "WhatsApp? Instagram? Phone call?",
      field: 'orderMethod',
      placeholder: 'e.g. Direct message on WhatsApp'
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else handleFinalSubmit();
  };

  const handleFinalSubmit = () => {
    // 1. Create PDF
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("BAKERY WEBSITE DESIGN BRIEF", 20, 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    
    let y = 40;
    Object.entries(formData).forEach(([key, value]) => {
      doc.text(`${key.replace(/([A-Z])/g, ' $1').toUpperCase()}:`, 20, y);
      doc.text(`${value}`, 20, y + 7);
      y += 20;
    });

    // 2. Download
    doc.save(`${formData.businessName || 'Bakery'}_Brief.pdf`);

    // 3. Sequential WhatsApp Redirects
    const msg = encodeURIComponent(`Hi! I just finished my bakery website brief for ${formData.businessName}. The PDF is ready for you!`);
    
    // Open first partner
    window.open(`https://wa.me/${partners[0]}?text=${msg}`, '_blank');
    
    // Open second partner after small delay
    setTimeout(() => {
      window.open(`https://wa.me/${partners[1]}?text=${msg}`, '_blank');
    }, 2000);

    setStep(step + 1);
  };

  return (
    <div className="min-h-screen bg-[#FDF5E6] flex items-center justify-center p-4 font-sans text-[#4A3728]">
      <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(188,143,143,0.2)] p-8 md:p-12 border border-[#EEDC82]/30 relative overflow-hidden">
        
        {/* Decorative Baker Icon background */}
        <div className="absolute -right-4 -top-4 text-9xl opacity-5 select-none">🥐</div>

        {step < steps.length ? (
          <div className="space-y-10">
            {/* Progress Bar */}
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-[#BC8F8F]">
                <span>Project Onboarding</span>
                <span>{step + 1} / {steps.length}</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#BC8F8F] transition-all duration-700 ease-out" 
                  style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-semibold tracking-tight leading-tight">{steps[step].title}</h1>
              <p className="text-lg text-[#8C7B6E] font-light">{steps[step].subtitle}</p>
            </div>

            <div className="relative group">
              <input
                type="text"
                autoFocus
                className="w-full border-b-2 border-[#D2B48C]/40 focus:border-[#BC8F8F] outline-none py-4 text-2xl transition-all bg-transparent placeholder:text-gray-200"
                placeholder={steps[step].placeholder}
                value={formData[steps[step].field]}
                onChange={(e) => setFormData({...formData, [steps[step].field]: e.target.value})}
                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
              />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#BC8F8F] transition-all duration-300 group-focus-within:w-full"></div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button 
                onClick={() => setStep(step - 1)} 
                className={`text-[#8C7B6E] font-medium hover:text-[#4A3728] transition-colors ${step === 0 ? 'invisible' : ''}`}>
                ← Back
              </button>
              <button 
                onClick={handleNext}
                className="bg-[#4A3728] text-[#FDF5E6] px-12 py-5 rounded-2xl font-bold text-lg hover:bg-[#5D4636] transform hover:-translate-y-1 transition-all shadow-lg active:scale-95"
              >
                {step === steps.length - 1 ? 'Finalize Brief' : 'Continue'}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-[#FDF5E6] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">🥖</span>
            </div>
            <h2 className="text-4xl font-bold">All Set!</h2>
            <p className="text-[#8C7B6E] text-lg">Your custom brief has been generated. The PDF is downloading, and we've opened WhatsApp to notify the developers.</p>
            
            <div className="flex flex-col gap-3">
               <button 
                  onClick={() => window.location.reload()}
                  className="bg-[#BC8F8F] text-white py-4 rounded-xl font-bold hover:bg-[#A67B7B] transition-all"
               >
                 Create Another Brief
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
