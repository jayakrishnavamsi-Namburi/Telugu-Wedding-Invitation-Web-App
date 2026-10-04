import React, { useState, useEffect, useRef } from 'react';
import WelcomeCard from '../components/WelcomeCard';
import VideoStage from '../components/VideoStage';
import RsvpForm from '../components/RsvpForm';
import {
  Volume2,
  VolumeX,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Sparkles,
  Phone,
  Navigation,
  Share2,
  Shield,
  Music,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Auspicious Telugu Wedding Events
const WEDDING_EVENTS = [
  {
    id: 1,
    icon: '✨',
    nameTe: 'ప్రధానం & నిశ్చితార్థం',
    nameEn: 'Pradhana Karyakramam & Engagement',
    dateTe: '22 నవంబర్ 2026, ఉదయం 10:00 గంటలకు',
    dateEn: '22nd Nov 2026, 10:00 AM',
    venueTe: 'శ్రీ కృష్ణ గ్రాండ్ బాంక్వెట్స్, మాదాపూర్',
    venueEn: 'Sri Krishna Grand Banquets, Madhapur',
    descTe: 'తాంబూలాలు మార్చుకుని వధూవరులను నిశ్చయించుకునే పవిత్ర వేడుక.',
    descEn: 'Traditional ring exchange & mutual blessings by both families.',
  },
  {
    id: 2,
    icon: '🌼',
    nameTe: 'మంగళ స్నానం & హల్దీ వేడుక',
    nameEn: 'Mangala Snanam & Haldi Ceremony',
    dateTe: '23 నవంబర్ 2026, ఉదయం 08:30 గంటలకు',
    dateEn: '23rd Nov 2026, 08:30 AM',
    venueTe: 'వధూవరుల స్వగృహములలో',
    venueEn: 'Respective Family Residences',
    descTe: 'పసుపు రాసి, సుగంధ జలాలతో మంగళ స్నానం చేయించే సంప్రదాయ ఉత్సవం.',
    descEn: 'Sacred turmeric bath with herbal fragrances for auspicious glow.',
  },
  {
    id: 3,
    icon: '🪘',
    nameTe: 'సంగీత్ & మెహందీ నైట్',
    nameEn: 'Sangeet & Mehendi Sandadi',
    dateTe: '23 నవంబర్ 2026, సాయంత్రం 06:30 గంటలకు',
    dateEn: '23rd Nov 2026, 06:30 PM',
    venueTe: 'ది ప్యాలెస్ లాన్స్, గచ్చిబౌలి, హైదరాబాద్',
    venueEn: 'The Palace Lawns, Gachibowli, Hyderabad',
    descTe: 'ఆటపాటలు, సంగీతం, గోరింటాకు వేడుకలతో కూడిన ఆనందోత్సాహం.',
    descEn: 'An evening of music, dance performances & traditional henna art.',
  },
  {
    id: 4,
    icon: '🪔',
    nameTe: 'కల్యాణ మహోత్సవం (సుముహూర్తం)',
    nameEn: 'Sumuhurtham & Kalyana Mahotsavam',
    dateTe: '24 నవంబర్ 2026, ఉదయం 09:42 గంటలకు',
    dateEn: '24th Nov 2026, 09:42 AM',
    venueTe: 'శ్రీ లక్ష్మీ వేంకటేశ్వర కల్యాణ మండపం, జూబ్లీ హిల్స్',
    venueEn: 'Sri Lakshmi Venkateswara Convention, Jubilee Hills',
    descTe: 'జీలకర్ర బెల్లం, మాంగల్య ధారణ, తలంబ్రాలు మరియు సప్తపది పవిత్ర ఘట్టం.',
    descEn: 'Sacred Mangalsutra dharana, Jeelakarra-Bellam, Talambralu & Saptapadi.',
    highlight: true,
  },
  {
    id: 5,
    icon: '🍲',
    nameTe: 'స్నేహ విందు & రిసెప్షన్',
    nameEn: 'Grand Wedding Reception & Feast',
    dateTe: '24 నవంబర్ 2026, సాయంత్రం 07:00 గంటల నుండి',
    dateEn: '24th Nov 2026, 07:00 PM Onwards',
    venueTe: 'రాయల్ పామ్ గార్డెన్స్, జూబ్లీ హిల్స్, హైదరాబాద్',
    venueEn: 'Royal Palm Gardens, Jubilee Hills, Hyderabad',
    descTe: 'నూతన దంపతులకు ఆశీస్సులు మరియు ఆంధ్రా సంప్రదాయ రాజభోజనం.',
    descEn: 'Gala reception evening with traditional Andhra royal feast.',
  },
];

export default function InvitationPage({ lang, setLang, onNavigateAdmin }) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [liveWishes, setLiveWishes] = useState([]);
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const isAudioSynthesizing = useRef(false);

  // Countdown timer calculation for Sumuhurtham (24th Nov 2026 09:42:00)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-11-24T09:42:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch live wishes
  useEffect(() => {
    fetch('/api/guests')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setLiveWishes(data.data.filter((g) => g.wishes));
        }
      })
      .catch((e) => console.log('Wishes fetch:', e));
  }, []);

  const handleRsvpSubmitted = (newGuest) => {
    setLiveWishes((prev) => [newGuest, ...prev]);
  };

  // Traditional Mangala Vadyam / Nadaswaram Audio Synthesizer (Carnatic Raga Kalyani / Gambheera Nattai)
  const toggleAudio = () => {
    if (isAudioPlaying) {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setIsAudioPlaying(false);
    } else {
      playAuspiciousMusic();
      setIsAudioPlaying(true);
    }
  };

  const playAuspiciousMusic = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      if (isAudioSynthesizing.current) return;
      isAudioSynthesizing.current = true;

      // Auspicious Carnatic Notes (Sa, Ri, Ga, Ma, Pa, Dha, Ni, Sa)
      const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
      let step = 0;

      const scheduleTone = () => {
        if (!isAudioSynthesizing.current || !audioCtxRef.current) return;
        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const noteIndex = Math.floor(Math.sin(step * 0.4) * 3 + 4) % notes.length;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(notes[noteIndex] * (step % 2 === 0 ? 1 : 1.25), ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.65);

        step++;
        setTimeout(scheduleTone, 550);
      };

      scheduleTone();
    } catch (e) {
      console.log('Audio init error:', e);
    }
  };

  // Falling Petals & Golden Rice (Talambralu) Simulation Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 4 + 2,
        density: Math.random() * particleCount,
        color: ['#D4AF37', '#FFD700', '#FF4D6D', '#FFF275', '#FFFDF0'][Math.floor(Math.random() * 5)],
        tilt: Math.random() * 10 - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.lineWidth = p.radius / 2;
        ctx.strokeStyle = p.color;
        ctx.fillStyle = p.color;

        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.density) + 1 + p.radius / 2) * 0.7;
        p.x += Math.sin(p.density) * 0.8;
        p.tilt = Math.sin(p.tiltAngle - i / 3) * 12;

        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        ctx.fill();

        if (p.x > width + 20 || p.x < -20 || p.y > height) {
          particles[i] = {
            x: Math.random() * width,
            y: -10,
            radius: p.radius,
            density: p.density,
            color: p.color,
            tilt: p.tilt,
            tiltAngleIncremental: p.tiltAngleIncremental,
            tiltAngle: p.tiltAngle,
          };
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'శ్రీరస్తు | Telugu Wedding Invitation',
        text: 'Join us in celebrating the wedding of Sai Sreedhar & Sravya Sundari on 24th Nov 2026!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const triggerTalambraluBurst = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      colors: ['#FFD700', '#D4AF37', '#FFBF00', '#FF4D6D'],
      origin: { y: 0.8 },
    });
  };

  return (
    <div className="relative min-h-screen pb-16">
      {/* Interactive Falling Petals & Golden Rice Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-70" />

      {/* Traditional Mango Leaves Toranam Banner */}
      <div className="sticky top-0 z-40 bg-maroon-950/90 backdrop-blur-md border-b border-gold-500/30 px-4 py-2.5 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🥭</span>
            <span className="text-xs sm:text-sm font-bold font-telugu text-gold-300 tracking-wider">
              {lang === 'te' ? '|| శుభమస్తు • కల్యాణ ప్రాప్తిరస్తు ||' : '|| Subhamasthu • Divine Union ||'}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Audio Toggle Button */}
            <button
              onClick={toggleAudio}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition border ${
                isAudioPlaying
                  ? 'gold-gradient-bg text-maroon-950 border-gold-400 animate-pulse'
                  : 'bg-maroon-900/80 text-gold-300 border-gold-500/40 hover:border-gold-300'
              }`}
              title="Toggle Nadaswaram Music"
            >
              {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">
                {isAudioPlaying ? (lang === 'te' ? 'సంగీతం మ్యూట్' : 'Mute Music') : (lang === 'te' ? 'నాదస్వరం' : 'Play Music')}
              </span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'te' ? 'en' : 'te')}
              className="px-3 py-1.5 rounded-full text-xs font-bold bg-maroon-900 border border-gold-500/40 text-gold-200 hover:bg-gold-500/20 transition"
            >
              {lang === 'te' ? 'English' : 'తెలుగు'}
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/40 hover:bg-gold-500/30 transition"
              title="Share Invitation"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Admin Portal Shortcut */}
            <button
              onClick={onNavigateAdmin}
              className="p-1.5 rounded-full bg-maroon-900 border border-gold-500/30 text-gold-400 hover:text-gold-200 transition"
              title="Admin Dashboard"
            >
              <Shield className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {copied && (
        <div className="fixed top-14 right-4 z-50 bg-gold-500 text-maroon-950 text-xs font-bold px-4 py-2 rounded-xl shadow-xl animate-bounce">
          Link copied to clipboard! ✨
        </div>
      )}

      {/* Hero Welcome Card */}
      <section className="relative z-10 pt-4">
        <WelcomeCard lang={lang} playMusic={playAuspiciousMusic} />
      </section>

      {/* Auspicious Muhurtham Countdown Timer */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 py-6">
        <div className="royal-card rounded-2xl p-6 border border-gold-500/40 text-center shadow-xl">
          <div className="flex justify-center items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-gold-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-gold-300">
              {lang === 'te' ? 'సుముహూర్తానికి మిగిలిన సమయం (Sumuhurtham Countdown)' : 'Countdown to Auspicious Sumuhurtham'}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto">
            <div className="bg-maroon-950/80 p-3 rounded-xl border border-gold-500/30">
              <span className="text-2xl sm:text-4xl font-bold font-serif text-gold-100">{timeLeft.days}</span>
              <p className="text-[10px] sm:text-xs text-gold-400 uppercase mt-1">{lang === 'te' ? 'రోజులు' : 'Days'}</p>
            </div>
            <div className="bg-maroon-950/80 p-3 rounded-xl border border-gold-500/30">
              <span className="text-2xl sm:text-4xl font-bold font-serif text-gold-100">{timeLeft.hours}</span>
              <p className="text-[10px] sm:text-xs text-gold-400 uppercase mt-1">{lang === 'te' ? 'గంటలు' : 'Hours'}</p>
            </div>
            <div className="bg-maroon-950/80 p-3 rounded-xl border border-gold-500/30">
              <span className="text-2xl sm:text-4xl font-bold font-serif text-gold-100">{timeLeft.minutes}</span>
              <p className="text-[10px] sm:text-xs text-gold-400 uppercase mt-1">{lang === 'te' ? 'నిమిషాలు' : 'Mins'}</p>
            </div>
            <div className="bg-maroon-950/80 p-3 rounded-xl border border-gold-500/30">
              <span className="text-2xl sm:text-4xl font-bold font-serif text-gold-100">{timeLeft.seconds}</span>
              <p className="text-[10px] sm:text-xs text-gold-400 uppercase mt-1">{lang === 'te' ? 'సెకన్లు' : 'Secs'}</p>
            </div>
          </div>

          <button
            onClick={triggerTalambraluBurst}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gold-500/15 border border-gold-400/40 text-xs font-semibold text-gold-200 hover:bg-gold-500/25 transition"
          >
            <span>🌾 {lang === 'te' ? 'తలంబ్రాలు చల్లండి (Shower Golden Blessings)' : 'Shower Golden Talambralu'}</span>
          </button>
        </div>
      </section>

      {/* Wedding Events / Schedule Section (కార్యక్రమములు) */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Calendar className="w-4 h-4 text-gold-400" />
            <span>{lang === 'te' ? 'కల్యాణ కార్యక్రమ వివరములు' : 'Wedding Itinerary & Schedule'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-royal gold-gradient-text">
            {lang === 'te' ? 'శుభ ముహూర్తములు & వేడుకలు' : 'Ceremonies & Celebrations'}
          </h2>
          <p className="text-xs sm:text-sm text-gold-200/80 max-w-md mx-auto mt-1">
            {lang === 'te'
              ? 'ప్రతి వేడుకలో పాల్గొని నూతన వధూవరులను ఆశీర్వదించవలసిందిగా కోరుచున్నాము.'
              : 'Join us across each sacred ceremony to shower your affectionate blessings.'}
          </p>
        </div>

        <div className="space-y-4">
          {WEDDING_EVENTS.map((event) => (
            <div
              key={event.id}
              className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                event.highlight
                  ? 'bg-gradient-to-r from-maroon-900/90 via-maroon-800/80 to-maroon-900/90 border-gold-400 shadow-xl ring-1 ring-gold-400/50'
                  : 'bg-maroon-950/70 border-gold-500/30 hover:border-gold-400/60'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="text-3xl p-3 rounded-2xl bg-gold-500/20 border border-gold-400/40 shrink-0">
                    {event.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-bold font-royal text-gold-100">
                        {lang === 'te' ? event.nameTe : event.nameEn}
                      </h3>
                      {event.highlight && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gold-500 text-maroon-950 uppercase">
                          {lang === 'te' ? 'ముఖ్య ముహూర్తం' : 'Main Muhurtham'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-gold-300/90 mt-1 font-semibold">
                      {lang === 'te' ? event.dateTe : event.dateEn}
                    </p>
                    <p className="text-xs text-gold-200/70 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span>{lang === 'te' ? event.venueTe : event.venueEn}</span>
                    </p>
                    <p className="text-xs text-silk-200/80 mt-2 italic font-serif">
                      {lang === 'te' ? event.descTe : event.descEn}
                    </p>
                  </div>
                </div>

                <div className="sm:self-center shrink-0">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gold-500/20 text-gold-300 border border-gold-500/40 hover:bg-gold-500/30 text-xs font-semibold transition"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{lang === 'te' ? 'దారి చూడుము' : 'Get Directions'}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cinematic Video Stage Component */}
      <section className="relative z-10">
        <VideoStage lang={lang} />
      </section>

      {/* RSVP Form Component */}
      <section className="relative z-10" id="rsvp">
        <RsvpForm lang={lang} onRsvpSubmitted={handleRsvpSubmitted} />
      </section>

      {/* Live Blessings Wall / Guestbook */}
      {liveWishes.length > 0 && (
        <section className="relative z-10 max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Heart className="w-4 h-4 text-gold-400" />
              <span>{lang === 'te' ? 'బంధుమిత్రుల ఆశీర్వచనములు' : 'Wishes from Family & Friends'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-royal gold-gradient-text">
              {lang === 'te' ? 'ఆత్మీయుల దీవెనలు (Guestbook)' : 'Loving Blessings Wall'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {liveWishes.slice(0, 6).map((item, idx) => (
              <div
                key={item._id || idx}
                className="bg-maroon-900/60 p-4 rounded-2xl border border-gold-500/30 relative flex flex-col justify-between"
              >
                <div className="text-xs text-gold-200 italic mb-3 font-serif">
                  "{item.wishes}"
                </div>
                <div className="border-t border-gold-500/20 pt-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-gold-300 truncate max-w-[150px]">{item.name}</span>
                  <span className="text-[10px] text-gold-400/80">{item.side ? item.side.split('(')[0] : 'Guest'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Traditional Host & Invitee Details (ఆహ్వానించువారు) */}
      <footer className="relative z-10 max-w-4xl mx-auto px-4 pt-8 text-center">
        <div className="royal-card rounded-3xl p-8 border border-gold-500/40">
          <div className="w-12 h-12 mx-auto rounded-full gold-gradient-bg flex items-center justify-center text-maroon-950 font-bold mb-3 shadow-lg">
            𑁍
          </div>
          <h3 className="text-lg font-bold font-royal text-gold-100 mb-1">
            {lang === 'te' ? 'ఆహ్వానించువారు (Cordially Invited By)' : 'With Best Compliments & Blessings'}
          </h3>
          <p className="text-xs sm:text-sm text-gold-300 font-telugu max-w-lg mx-auto">
            {lang === 'te'
              ? 'శ్రీమతి లక్ష్మి & శ్రీ ఆంజనేయులు శర్మ గార్లు, మరియు శ్రీమతి పద్మావతి & శ్రీ రామచంద్ర మూర్తి గార్లు'
              : 'Sri & Smt. Anjaneyulu Sharma and Sri & Smt. Ramachandra Murthy'}
          </p>
          <p className="text-xs text-gold-400/80 mt-1">
            {lang === 'te' ? 'సమస్త బంధుమిత్రులు & కుటుంబ సభ్యులు' : 'Near & Dear Family, Relatives and Friends'}
          </p>

          <div className="mt-6 pt-4 border-t border-gold-500/20 flex flex-wrap items-center justify-center gap-4 text-xs text-gold-400">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              <span>+91 98480 12345 / +91 94401 56789</span>
            </span>
            <span>•</span>
            <span>Jubilee Hills, Hyderabad, Telangana</span>
          </div>

          <p className="mt-4 text-[11px] text-gold-500/70 font-serif">
            🌸 సంప్రదాయ పెళ్ళి సందడి • Designed with Royal Maroon & Gold Elegance 🌸
          </p>
        </div>
      </footer>
    </div>
  );
}
