import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles } from 'lucide-react';
import SectionContainer from '../SectionContainer';

/**
 * Premium Video Showcase Section for Divine Aura
 * Showcases salon/beauty footage in a large, elegant container.
 * Fully modular and responsive with clean custom controls.
 */
export default function VideoShowcase({
  videoSrc = '/assets/showcase_video.mp4',
  posterSrc = '/assets/home_hero_editorial.jpg',
  eyebrow = 'A Glimpse of Divine Aura',
  title = 'Beauty, Care & Confidence',
  description = 'Step into the world of Divine Aura and experience our approach to beauty, personal care and professional artistry.',
  className = '',
  bgClassName = 'bg-[#FAF6F0] border-t border-[#EAE0D5]/70'
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Video autoplay or missing source handled gracefully
        setIsPlaying(false);
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    }
  };

  return (
    <section className={`py-12 sm:py-16 lg:py-20 ${bgClassName} relative overflow-hidden ${className}`}>
      <SectionContainer>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-14">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#9E7A38] bg-[#F4ECDC] border border-[#E5D7BE] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{eyebrow}</span>
            </div>
          )}
          {title && (
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-4.5xl text-espresso font-normal leading-tight">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-3.5 text-base sm:text-lg text-warmBrown-600 font-light leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Video Player Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Subtle warm luxury backdrop detail */}
          <div className="absolute -inset-3 bg-gradient-to-tr from-[#E8DCcb]/50 via-[#F4ECDC]/40 to-[#DACAB2]/40 rounded-3xl -z-10 blur-sm" />

          {/* Player Shell */}
          <div
            onClick={togglePlay}
            className="group relative rounded-3xl overflow-hidden border-4 border-white shadow-luxury bg-[#231C18] aspect-[16/9] w-full cursor-pointer select-none"
          >
            <video
              ref={videoRef}
              src={videoSrc}
              poster={posterSrc}
              playsInline
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
            />

            {/* Subtle aesthetic gradient overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 transition-opacity duration-300 pointer-events-none ${
                isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
              }`}
            />

            {/* Center Play Button Overlay (visible when paused) */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 ${
                isPlaying
                  ? 'opacity-0 pointer-events-none scale-95'
                  : 'opacity-100 scale-100'
              }`}
            >
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 text-[#9E7A38] shadow-2xl backdrop-blur-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110 border border-[#EAE0D5]"
                aria-label="Play Video"
              >
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
              </div>
              <p className="mt-3.5 text-xs sm:text-sm font-medium text-white/90 tracking-wide drop-shadow-sm uppercase">
                Watch The Experience
              </p>
            </div>

            {/* Bottom Minimal Floating Controls (visible on hover when playing) */}
            <div
              className={`absolute bottom-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between transition-opacity duration-300 ${
                isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition-colors"
                  aria-label="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
