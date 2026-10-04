import React, { useState } from 'react';
import { Heart, Sparkles, MapPin, Calendar, Clock, Volume2, Music } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WelcomeCard({ lang, onOpenInvitation, isOpened, playMusic }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleOpen = () => {
    // Trigger festive golden talambralu / rose confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FFD700', '#FF4D6D', '#FFF275', '#E63946'],
    });
    if (playMusic) playMusic();
    if (onOpenInvitation) onOpenInvitation();
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-8">
      {/* Decorative Golden Outer Frame */}
      <div className="relative royal-card rounded-3xl p-6 sm:p-10 md:p-14 text-center overflow-hidden border-2 border-gold-500/50 shadow-2xl backdrop-blur-md">
        {/* Ornate Corner Elements */}
        <div className="absolute top-3 left-3 text-gold-400 font-serif text-2xl select-none">𑁍</div>
        <div className="absolute top-3 right-3 text-gold-400 font-serif text-2xl select-none">𑁍</div>
        <div className="absolute bottom-3 left-3 text-gold-400 font-serif text-2xl select-none">𑁍</div>
        <div className="absolute bottom-3 right-3 text-gold-400 font-serif text-2xl select-none">𑁍</div>

        {/* Toranam & Kalash Top Header */}
        <div className="flex justify-center items-center gap-3 mb-4">
          <span className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent"></span>
          <span className="text-xl sm:text-2xl animate-pulse-slow">🪔</span>
          <span className="text-sm sm:text-base font-bold tracking-widest text-gold-300 uppercase font-telugu">
            {lang === 'te' ? '|| శ్రీ గణేశాయ నమః || శ్రీ లక్ష్మీ వేంకటేశ్వర ప్రసన్నః ||' : '|| Sri Ganeshayanamah || Sri Venkateswara Prasanna ||'}
          </span>
          <span className="text-xl sm:text-2xl animate-pulse-slow">🪔</span>
          <span className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent"></span>
        </div>

        {/* Auspicious Vedic Invocations */}
        <div className="bg-maroon-900/60 rounded-xl py-2 px-4 max-w-lg mx-auto mb-6 border border-gold-500/30">
          <p className="text-xs sm:text-sm text-gold-200 font-serif italic tracking-wide">
            "వక్రతుండ మహాకాయ సూర్యకోటి సమప్రభ |<br />
            నిర్విఘ్నం కురు మే దేవ సర్వకార్యేషు సర్వదా ||"
          </p>
          <div className="mt-1 flex justify-center gap-4 text-xs font-semibold text-gold-400">
            <span>✨ శ్రీరస్తు</span>
            <span>🌸 శుభమస్తు</span>
            <span>🪔 అవిఘ్నమస్తు</span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-gold-500/20 text-gold-300 border border-gold-400/40 mb-3">
            {lang === 'te' ? 'పెళ్ళి పిలుపు • వివాహ ఆహ్వాన శుభపత్రిక' : 'Royal Wedding Invitation • Save The Date'}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-royal gold-gradient-text tracking-wide mb-2">
            {lang === 'te' ? 'పెళ్ళి సందడి' : 'Pelli Sandadi'}
          </h1>
          <p className="text-gold-200/90 text-sm sm:text-base font-medium max-w-2xl mx-auto">
            {lang === 'te' 
              ? 'మా ఇంట జరుగనున్న కల్యాణ మహోత్సవానికి మిమ్ములను మరియు మీ కుటుంబ సభ్యులను సకుటుంబ సపరివార సమేతంగా సాదరంగా ఆహ్వానిస్తున్నాము.'
              : 'With the divine blessings of Almighty & elders, we cordially invite you and your family to celebrate the auspicious wedding ceremony.'}
          </p>
        </div>

        {/* Couple Presentation Section */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center my-8 max-w-3xl mx-auto">
          {/* Groom Card */}
          <div className="md:col-span-5 bg-gradient-to-b from-maroon-900/80 to-maroon-950/90 p-5 rounded-2xl border border-gold-500/40 shadow-lg transform transition hover:scale-105">
            <div className="w-16 h-16 mx-auto rounded-full bg-gold-500/20 border-2 border-gold-400 flex items-center justify-center text-3xl mb-3 shadow-inner">
              👑
            </div>
            <span className="text-xs uppercase font-bold tracking-wider text-gold-400">
              {lang === 'te' ? 'వరుడు (Groom)' : 'Groom'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-gold-100 mt-1 font-royal">
              {lang === 'te' ? 'చి|| సాయి శ్రీధర్ శర్మ' : 'Chi. Sai Sreedhar Sharma'}
            </h2>
            <p className="text-xs text-gold-300/80 mb-2">B.Tech, M.S. (Software Architect, Dallas, USA)</p>
            <div className="text-xs text-silk-200/80 border-t border-gold-500/20 pt-2">
              <p className="font-semibold text-gold-300">
                {lang === 'te' ? 'తల్లిదండ్రులు:' : "Parents:"}
              </p>
              <p>{lang === 'te' ? 'శ్రీమతి లక్ష్మి & శ్రీ ఆంజనేయులు శర్మ' : 'Smt. Lakshmi & Sri Anjaneyulu Sharma'}</p>
            </div>
          </div>

          {/* Golden Kalyana Knot / Mangalasutra Motif */}
          <div className="md:col-span-1 flex flex-col items-center justify-center my-2 md:my-0">
            <div className="w-12 h-12 rounded-full gold-gradient-bg flex items-center justify-center shadow-lg text-maroon-950 font-bold animate-float-gentle">
              <Heart className="w-6 h-6 fill-maroon-900 text-maroon-900" />
            </div>
            <span className="text-xs font-bold text-gold-400 mt-1 uppercase tracking-tighter">Weds</span>
          </div>

          {/* Bride Card */}
          <div className="md:col-span-5 bg-gradient-to-b from-maroon-900/80 to-maroon-950/90 p-5 rounded-2xl border border-gold-500/40 shadow-lg transform transition hover:scale-105">
            <div className="w-16 h-16 mx-auto rounded-full bg-gold-500/20 border-2 border-gold-400 flex items-center justify-center text-3xl mb-3 shadow-inner">
              👸
            </div>
            <span className="text-xs uppercase font-bold tracking-wider text-gold-400">
              {lang === 'te' ? 'వధువు (Bride)' : 'Bride'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-gold-100 mt-1 font-royal">
              {lang === 'te' ? 'చి||ల||సౌ|| శ్రావ్య సుందరి' : 'Chi.La.Sow. Sravya Sundari'}
            </h2>
            <p className="text-xs text-gold-300/80 mb-2">B.Tech, MBA (Product Manager, Hyderabad)</p>
            <div className="text-xs text-silk-200/80 border-t border-gold-500/20 pt-2">
              <p className="font-semibold text-gold-300">
                {lang === 'te' ? 'తల్లిదండ్రులు:' : "Parents:"}
              </p>
              <p>{lang === 'te' ? 'శ్రీమతి పద్మావతి & శ్రీ రామచంద్ర మూర్తి' : 'Smt. Padmavathi & Sri Ramachandra Murthy'}</p>
            </div>
          </div>
        </div>

        {/* Sumuhurtham Highlight Pill */}
        <div className="my-6 p-4 rounded-2xl bg-gold-500/10 border border-gold-500/40 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-around gap-4 text-left">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-gold-500/20 text-gold-400">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gold-400 font-semibold uppercase">{lang === 'te' ? 'వివాహ సుముహూర్తం' : 'Sumuhurtham'}</p>
              <p className="text-sm sm:text-base font-bold text-gold-100 font-serif">
                {lang === 'te' ? '24 నవంబర్ 2026, మంగళవారం' : 'Tuesday, 24th November 2026'}
              </p>
              <p className="text-xs text-gold-300/90 font-telugu">
                {lang === 'te' ? 'ఉదయం 09:42 నిమిషాలకు (ధనుర్లగ్నమున)' : 'At 09:42 AM (Dhanur Lagna Sumuhurtham)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-gold-500/20 text-gold-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gold-400 font-semibold uppercase">{lang === 'te' ? 'కల్యాణ వేదిక' : 'Auspicious Venue'}</p>
              <p className="text-xs sm:text-sm font-bold text-gold-100">
                {lang === 'te' ? 'శ్రీ లక్ష్మీ వేంకటేశ్వర కల్యాణ మండపం' : 'Sri Lakshmi Venkateswara Convention'}
              </p>
              <p className="text-xs text-gold-300/90">Road No. 36, Jubilee Hills, Hyderabad</p>
            </div>
          </div>
        </div>

        {/* Open Invitation Action Button */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={handleOpen}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full gold-gradient-bg text-maroon-950 font-bold text-base shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-gold-500/50 active:scale-95"
          >
            <Sparkles className={`w-5 h-5 mr-2 transition-transform duration-500 ${isHovered ? 'rotate-180 scale-125' : ''}`} />
            <span>
              {lang === 'te' ? 'ఆహ్వాన పత్రికను వీక్షించండి (View Full Invitation)' : 'Explore Royal Wedding Experience'}
            </span>
          </button>
        </div>

        {/* Footnote */}
        <p className="mt-4 text-xs text-gold-400/70 font-serif">
          {lang === 'te' ? '|| కల్యాణ వైభోగమే.. అందరికీ ఆనందమే ||' : '|| Mangala Vaibhogam • An Auspicious Celebration ||'}
        </p>
      </div>
    </div>
  );
}
