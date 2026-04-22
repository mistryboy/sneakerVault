import { useState, useEffect } from 'react';
import { useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * use360Rotation
 * Handles loading and scrolling logic for a 36-frame sneaker image sequence.
 * 
 * @param {string} baseUrl - Base URL or path prefix for images (e.g., '/frames/sneaker_')
 * @param {number} frameCount - Total number of frames (e.g., 36)
 */
export const use360Rotation = (baseUrl, frameCount = 36) => {
  const [images, setImages] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);

  const { scrollYProgress } = useScroll();
  
  // Create a spring-smoothed frame index
  const rawFrameIndex = useTransform(scrollYProgress, [0, 0.4], [0, frameCount - 1]);
  const smoothFrameIndex = useSpring(rawFrameIndex, {
    stiffness: 100,
    damping: 20,
    mass: 0.5
  });

  useEffect(() => {
    const urls = Array.from({ length: frameCount }, (_, i) => {
      // Assuming zero-padded filenames: 01.webp, 02.webp, etc.
      const index = (i + 1).toString().padStart(2, '0');
      return `${baseUrl}${index}.webp`;
    });

    const preloadImages = () => {
      urls.forEach((url) => {
        const img = new Image();
        img.src = url;
        img.onload = () => setLoadedCount((prev) => prev + 1);
      });
      setImages(urls);
    };

    preloadImages();
  }, [baseUrl, frameCount]);

  const isLoaded = loadedCount === frameCount;

  return { smoothFrameIndex, images, isLoaded, loadedCount };
};
