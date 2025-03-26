'use client';

import { useState, useRef } from 'react';
import './positioner.css';

export default function TattooPositioner({
  position,
  setPosition,
  scale,
  setScale,
  rotation,
  setRotation,
  baseImage,
  tattooImage,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [opacity, setOpacity] = useState(0.8);

  const containerRef = useRef<HTMLDivElement>(null);

  // Dragging handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging && containerRef.current) {
      const bounds = containerRef.current.getBoundingClientRect();
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      setPosition({
        x: newX,
        y: newY,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Utility functions
  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
    setScale(1);
    setRotation(0);
    setOpacity(0.8);
  };

  return (
    <div className="container">
      <h1 className="title">Tattoo Positioning Previewer</h1>

      <div className="controls">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Velikost: {scale.toFixed(1)}</label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rotace: {rotation}°</label>
            <input
              type="range"
              min="0"
              max="360"
              value={rotation}
              onChange={(e) => setRotation(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Průhlednost: {opacity.toFixed(1)}</label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="button-group">
            <button onClick={resetPosition} className="button-reset">
              Reset
            </button>
          </div>
        </div>
      </div>

      <div
        className="preview-area"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {baseImage ? (
          <img src={baseImage} alt="Body part" className="w-full h-full object-contain" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Upload a body part image or use demo images</p>
          </div>
        )}

        {tattooImage && baseImage && (
          <div
            onMouseDown={handleMouseDown}
            style={{
              position: 'absolute',
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: `scale(${scale}) rotate(${rotation}deg)`,
              opacity: opacity,
              cursor: isDragging ? 'grabbing' : 'grab',
              transformOrigin: 'center',
              userSelect: 'none',
            }}
          >
            <img src={tattooImage} alt="Tattoo" className="pointer-events-none max-w-xs max-h-xs" />
          </div>
        )}
      </div>
    </div>
  );
}
