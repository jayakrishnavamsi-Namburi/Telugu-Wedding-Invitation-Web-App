import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Film, Heart } from 'lucide-react';

export default function VideoStage({ lang }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState('trailer');
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(e => console.log('Video play policy:', e));
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="royal-card rounded-3xl p-5 sm:p-8 border-2 border-gold-500/40 shadow-2xl relative overflow-hidden">
        {/* Glow & Backdrop Ambience */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-maroon-600/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Section Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Film className="w-4 h-4 text-gold-400" />
            <span>{lang === 'te' ? 'సినిమాటిక్ ఆహ్వానం' : 'Cinematic Video Invitation'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-royal gold-gradient-text">
            {lang === 'te' ? 'సేవ్ ద డేట్ & ముహూర్త ఘట్టాలు' : 'Save The Date & Celebrations'}
          </h2>
          <p className="text-xs sm:text-sm text-gold-200/80 mt-1">
            {lang === 'te' 
              ? 'శ్రీధర్ & శ్రావ్యల వివాహ వేడుకల మధుర క్షణాల ప్రివ్యూ' 
              : 'Glimpses of love, tradition & joyous moments of Sreedhar & Sravya'}
          </p>
        </div>

        {/* Video Type Selector */}
        <div className="flex justify-center gap-2 mb-4">
          <button
            onClick={() => setActiveTab('trailer')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'trailer'
                ? 'gold-gradient-bg text-maroon-950 shadow-md font-bold'
                : 'bg-maroon-900/60 text-gold-300 border border-gold-500/30 hover:border-gold-400'
            }`}
          >
            🎬 {lang === 'te' ? 'సేవ్ ద డేట్ టీజర్' : 'Save the Date Teaser'}
          </button>
          <button
            onClick={() => setActiveTab('moments')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'moments'
                ? 'gold-gradient-bg text-maroon-950 shadow-md font-bold'
                : 'bg-maroon-900/60 text-gold-300 border border-gold-500/30 hover:border-gold-400'
            }`}
          >
            🪔 {lang === 'te' ? 'తెలుగు సంప్రదాయం' : 'Traditional Moments'}
          </button>
        </div>

        {/* Video Stage Frame */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-gold-400/60 shadow-2xl bg-black aspect-video flex items-center justify-center group">
          {activeTab === 'trailer' ? (
            <div className="w-full h-full relative">
              {/* Responsive Iframe for traditional Telugu Wedding Cinematics */}
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=0&controls=1&rel=0"
                title="Telugu Wedding Invitation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            /* Local MP4 stage with custom luxury overlay */
            <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-tr from-maroon-950 via-maroon-900 to-maroon-950">
              <video
                ref={videoRef}
                src="/assets/wedding-video.mp4"
                poster="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80"
                className="w-full h-full object-cover"
                loop
                playsInline
              />

              {/* Decorative Mandapam overlay banner */}
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full gold-gradient-bg flex items-center justify-center text-maroon-950 mb-3 shadow-xl cursor-pointer hover:scale-110 transition"
                     onClick={togglePlay}>
                  {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-royal text-gold-100 mb-1">
                  {lang === 'te' ? 'జీలకర్ర బెల్లం & తలంబ్రాల వేడుక' : 'Jeelakarra Bellam & Talambralu'}
                </h3>
                <p className="text-xs sm:text-sm text-gold-300 max-w-md">
                  {lang === 'te' 
                    ? 'రెండు మనసులు ఒక్కటయ్యే పవిత్ర కల్యాణ ఘట్టం' 
                    : 'The sacred union of two souls bound in eternal companionship'}
                </p>

                {/* Controls Bar */}
                <div className="mt-4 flex items-center gap-3 bg-maroon-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-gold-500/30">
                  <button onClick={togglePlay} className="text-gold-300 hover:text-gold-100">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <span className="text-xs text-gold-400">|</span>
                  <button onClick={toggleMute} className="text-gold-300 hover:text-gold-100">
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="text-xs text-gold-200">
                    {isPlaying ? (lang === 'te' ? 'ప్లే అవుతోంది' : 'Playing') : (lang === 'te' ? 'ప్లే చేయడానికి క్లిక్ చేయండి' : 'Click to Play')}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Motif Footnote */}
        <div className="mt-4 flex items-center justify-between text-xs text-gold-300/80 px-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>{lang === 'te' ? 'ప్రత్యక్ష ప్రసారం అందుబాటులో ఉంటుంది (Live Webcast Available)' : 'Live Webcast Available on Wedding Day'}</span>
          </div>
          <div className="flex items-center gap-1 text-gold-400">
            <Heart className="w-3.5 h-3.5 fill-gold-400" />
            <span>#SravyaWedsSreedhar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
