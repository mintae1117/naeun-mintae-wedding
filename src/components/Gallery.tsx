import React, { useState } from 'react';
import type { WeddingData } from '../types';

interface GalleryProps {
  data: WeddingData;
}

export const Gallery: React.FC<GalleryProps> = ({ data }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="gallery-section">
      <h2 className="section-title">GALLERY</h2>
      <p className="section-subtitle">우리의 소중한 순간들</p>

      <div className="gallery-grid">
        {data.gallery.map((image) => (
          <div
            key={image.id}
            className="gallery-item"
            onClick={() => setSelectedImage(image.id)}
          >
            <div className="image-placeholder">
              <p className="placeholder-text">사진 {image.id}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content">
            <button className="modal-close" onClick={() => setSelectedImage(null)}>
              ✕
            </button>
            <div className="modal-image-placeholder">
              <p className="placeholder-text">확대된 사진 {selectedImage}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
