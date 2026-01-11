import { motion, AnimatePresence } from 'framer-motion'
import { Heart, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect, useCallback, useRef } from 'react'

// Gallery images data with meaningful alt text
const galleryImages = [
    {
        id: 1,
        src: '/images/gallery/sam-feb-moment-1.jpg',
        alt: 'Sam and Feb sharing a tender moment together',
        aspectRatio: 'portrait'
    },
    {
        id: 2,
        src: '/images/gallery/sam-feb-moment-2.jpg',
        alt: 'A beautiful candid shot of Sam and Feb',
        aspectRatio: 'landscape'
    },
    {
        id: 3,
        src: '/images/gallery/sam-feb-moment-3.jpg',
        alt: 'Sam and Feb captured in a joyful embrace',
        aspectRatio: 'portrait'
    },
    {
        id: 4,
        src: '/images/gallery/sam-feb-moment-4.jpg',
        alt: 'An intimate portrait of the couple',
        aspectRatio: 'landscape'
    },
    {
        id: 5,
        src: '/images/gallery/sam-feb-moment-5.jpg',
        alt: 'Sam and Feb in a romantic setting',
        aspectRatio: 'portrait'
    }
]

// Lightbox Modal Component
function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)
    const minSwipeDistance = 50

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowLeft') onPrev()
            if (e.key === 'ArrowRight') onNext()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onClose, onPrev, onNext])

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = 'unset' }
    }, [])

    // Touch handlers for swipe
    const onTouchStart = (e) => {
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        if (isLeftSwipe) onNext()
        if (isRightSwipe) onPrev()
    }

    const currentImage = images[currentIndex]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

            {/* Close button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Close lightbox"
            >
                <X className="w-6 h-6 text-white" />
            </motion.button>

            {/* Navigation - Previous */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                onClick={(e) => { e.stopPropagation(); onPrev() }}
                className="absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 hidden md:block"
                aria-label="Previous image"
            >
                <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>

            {/* Navigation - Next */}
            <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                onClick={(e) => { e.stopPropagation(); onNext() }}
                className="absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 hidden md:block"
                aria-label="Next image"
            >
                <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>

            {/* Image container with swipe support */}
            <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-[90vw] max-h-[85vh] z-40"
                onClick={(e) => e.stopPropagation()}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />
            </motion.div>

            {/* Image counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                <span className="text-white/80 text-sm font-medium">
                    {currentIndex + 1} / {images.length}
                </span>
            </div>
        </motion.div>
    )
}

// Single Gallery Image Component
function GalleryImage({ image, index, onClick, isLoaded, onLoad }) {
    const [isHovered, setIsHovered] = useState(false)
    const prefersReducedMotion = typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{
                duration: prefersReducedMotion ? 0.01 : 0.6,
                delay: prefersReducedMotion ? 0 : index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="group relative cursor-pointer break-inside-avoid mb-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onClick(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(index) }}
            aria-label={`View ${image.alt}`}
        >
            <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-500">
                {/* Image */}
                <motion.img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    onLoad={onLoad}
                    className="w-full h-auto object-cover"
                    animate={!prefersReducedMotion ? {
                        scale: isHovered ? 1.05 : 1,
                    } : {}}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                />

                {/* Hover Overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end justify-center pb-6"
                >
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: isHovered ? 1 : 0,
                            opacity: isHovered ? 1 : 0
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="p-3 rounded-full bg-white/20 backdrop-blur-sm"
                    >
                        <Heart className="w-5 h-5 text-white fill-white/50" />
                    </motion.div>
                </motion.div>

                {/* Soft glow effect on hover */}
                <motion.div
                    animate={{ opacity: isHovered ? 0.3 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 rounded-2xl ring-2 ring-rose-300/50 pointer-events-none"
                />
            </div>
        </motion.div>
    )
}

export default function Gifts() {
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [loadedImages, setLoadedImages] = useState(new Set())
    const [hasAnimated, setHasAnimated] = useState(false)

    useEffect(() => {
        setHasAnimated(true)
    }, [])

    const handleImageLoad = useCallback((index) => {
        setLoadedImages(prev => new Set([...prev, index]))
    }, [])

    const openLightbox = useCallback((index) => {
        setCurrentImageIndex(index)
        setLightboxOpen(true)
    }, [])

    const closeLightbox = useCallback(() => {
        setLightboxOpen(false)
    }, [])

    const goToPrevious = useCallback(() => {
        setCurrentImageIndex(prev =>
            prev === 0 ? galleryImages.length - 1 : prev - 1
        )
    }, [])

    const goToNext = useCallback(() => {
        setCurrentImageIndex(prev =>
            prev === galleryImages.length - 1 ? 0 : prev + 1
        )
    }, [])

    return (
        <>
            <section id="gifts" className="min-h-screen relative overflow-hidden">
                <div className="container mx-auto px-4 py-20 relative z-10">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-4 mb-16"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 }}
                            className="inline-block text-rose-500 font-medium tracking-widest uppercase text-sm"
                        >
                            Our Story in Pictures
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800"
                        >
                            Moments of Sam & Feb
                        </motion.h2>

                        {/* Decorative Divider */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={hasAnimated ? { scale: 1 } : {}}
                            transition={{ delay: 0.4 }}
                            className="flex items-center justify-center gap-4 pt-4"
                        >
                            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-rose-300" />
                            <Heart className="w-5 h-5 text-rose-400 fill-rose-200" />
                            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-rose-300" />
                        </motion.div>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={hasAnimated ? { opacity: 1 } : {}}
                            transition={{ delay: 0.5 }}
                            className="text-gray-500 text-lg md:text-xl max-w-lg mx-auto leading-relaxed font-light italic"
                        >
                            "And now these three remain: faith, hope and love. But the greatest of these is love."
                            <span className="block text-sm mt-2 text-rose-400 not-italic">— 1 Corinthians 13:13</span>
                        </motion.p>

                        {/* Decorative dots */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={hasAnimated ? { scale: 1 } : {}}
                            transition={{ delay: 0.6 }}
                            className="flex items-center justify-center gap-3 pt-2"
                        >
                            <div className="w-1 h-1 rounded-full bg-rose-300" />
                            <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                            <div className="w-1 h-1 rounded-full bg-rose-300" />
                        </motion.div>
                    </motion.div>

                    {/* Masonry Gallery Grid */}
                    <div className="max-w-6xl mx-auto">
                        {/* Desktop: 3 columns, Tablet: 2 columns, Mobile: 1 column */}
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
                            {galleryImages.map((image, index) => (
                                <GalleryImage
                                    key={image.id}
                                    image={image}
                                    index={index}
                                    onClick={openLightbox}
                                    isLoaded={loadedImages.has(index)}
                                    onLoad={() => handleImageLoad(index)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Bottom decorative element */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={hasAnimated ? { opacity: 1 } : {}}
                        transition={{ delay: 1.2 }}
                        className="flex items-center justify-center gap-4 mt-16"
                    >
                        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-rose-200" />
                        <div className="flex gap-2">
                            <Heart className="w-4 h-4 text-rose-300 fill-rose-200" />
                            <Heart className="w-3 h-3 text-rose-200 fill-rose-100" />
                        </div>
                        <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-rose-200" />
                    </motion.div>
                </div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxOpen && (
                    <Lightbox
                        images={galleryImages}
                        currentIndex={currentImageIndex}
                        onClose={closeLightbox}
                        onPrev={goToPrevious}
                        onNext={goToNext}
                    />
                )}
            </AnimatePresence>
        </>
    )
}
