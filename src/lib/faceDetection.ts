import * as faceapi from 'face-api.js';

let modelsLoaded = false;

export async function loadFaceDetectionModels() {
  if (modelsLoaded) return;
  try {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    modelsLoaded = true;
  } catch (error) {
    console.error('Failed to load face detection models', error);
  }
}

export interface FaceCropResult {
  x: number;
  y: number;
  width: number;
  height: number;
  originalImage: HTMLImageElement;
}

export async function detectFace(imageUrl: string): Promise<FaceCropResult | null> {
  await loadFaceDetectionModels();

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;
    img.onload = async () => {
      // Use TinyFaceDetector with default options
      const detection = await faceapi.detectSingleFace(
        img,
        new faceapi.TinyFaceDetectorOptions({ inputSize: 416, scoreThreshold: 0.3 })
      );

      if (detection) {
        // Expand the bounding box slightly for a better portrait crop
        const box = detection.box;
        const paddingX = box.width * 0.5;
        const paddingY = box.height * 0.6; // More padding on Y for shoulders
        
        let x = Math.max(0, box.x - paddingX);
        let y = Math.max(0, box.y - paddingY);
        const width = Math.min(img.width - x, box.width + paddingX * 2);
        const height = Math.min(img.height - y, box.height + paddingY * 2);

        // Make it a square if possible, based on width/height max
        const size = Math.max(width, height);
        
        // Try to center the square around the face
        const centerX = box.x + box.width / 2;
        const centerY = box.y + box.height / 2;
        
        x = Math.max(0, centerX - size / 2);
        y = Math.max(0, centerY - size / 2);
        
        // Ensure it doesn't go out of bounds
        if (x + size > img.width) x = img.width - size;
        if (y + size > img.height) y = img.height - size;
        if (x < 0) x = 0;
        if (y < 0) y = 0;

        const finalSize = Math.min(size, img.width - x, img.height - y);

        resolve({
          x,
          y,
          width: finalSize,
          height: finalSize,
          originalImage: img
        });
      } else {
        // Fallback: If no face detected, crop from center (square)
        const size = Math.min(img.width, img.height);
        const x = (img.width - size) / 2;
        const y = (img.height - size) / 2;
        resolve({
          x,
          y,
          width: size,
          height: size,
          originalImage: img
        });
      }
    };
    img.onerror = () => resolve(null);
  });
}
