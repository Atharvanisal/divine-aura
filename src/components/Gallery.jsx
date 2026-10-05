import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export default function Gallery({
  items,
  columns = 4,
  aspectRatio = 'aspect-square',
  showCaptions = true
}) {
  const [activeIdx, setActiveIdx] = useState(null);

  const handleOpen = (idx) => {
    setActiveIdx(idx);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setActiveIdx(null);
    document.body.style.overflow = 'auto';
  };

  const handlePrev = useCallback(() => {
    if (activeIdx !== null) {
      setActiveIdx((prev) => (prev > 0 ? prev - 1 : items.length - 1));
    }
  }, [activeIdx, items.length]);

  const handleNext = useCallback(() => {
    if (activeIdx !== null) {
      setActiveIdx((prev) => (prev < items.length - 1 ? prev + 1 : 0));
    }
  }, [activeIdx, items.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeIdx === null) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx, handlePrev, handleNext]);

  const colClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
  };

  return (
    <div>
      {/* Grid */}
      <div className={`grid ${colClasses[columns] || colClasses[4]} gap-4 sm:gap-6`}>
        {items.map((item, index) => (
          <div
            key={item.id || index}
            onClick={() => handleOpen(index)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#EAE0D5]/50 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className={`${aspectRatio} overflow-hidden`}>
              <img
                src={item.src || item.image}
                alt={item.caption || item.title || `Gallery item ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                loading="lazy"
              />
            </div>

            {/* Hover overlay with zoom icon */}
            <div className="absolute inset-0 bg-espresso/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
              <div className="flex justify-end">
                <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                  <ZoomIn className="w-4 h-4" />
                </span>
              </div>
              {showCaptions && (item.caption || item.title) && (
                <div>
                  <p className="text-xs font-semibold text-gold-200 uppercase tracking-wider">
                    {item.category || 'Divine Aura'}
                  </p>
                  <p className="text-xs sm:text-sm font-medium line-clamp-2 mt-0.5">
                    {item.caption || item.title}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn"
          onClick={handleClose}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Close image viewer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 sm:left-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 sm:right-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Next image"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Active Image and Caption */}
          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={items[activeIdx].src || items[activeIdx].image}
              alt={items[activeIdx].caption || items[activeIdx].title || 'Enlarged gallery view'}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
            />
            {(items[activeIdx].caption || items[activeIdx].title) && (
              <div className="mt-4 text-center max-w-xl">
                <p className="text-white text-sm sm:text-base font-medium">
                  {items[activeIdx].caption || items[activeIdx].title}
                </p>
                {items[activeIdx].category && (
                  <p className="text-gold-300 text-xs uppercase tracking-widest mt-1">
                    {items[activeIdx].category}
                  </p>
                )}
              </div>
            )}
            <div className="text-white/60 text-xs mt-2">
              {activeIdx + 1} / {items.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
