"use client";
import React, { useState } from 'react';
import TattooPositioner from '@/components/TattooPositioner/TattooPositioner';

export default function Page() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [baseImage, setBaseImage] = useState(null);
  const [tattooImage, setTattooImage] = useState(null);

  return (
    <TattooPositioner
      position={position}
      setPosition={setPosition}
      scale={scale}
      setScale={setScale}
      rotation={rotation}
      setRotation={setRotation}
      baseImage={baseImage}
      tattooImage={tattooImage}
    />
  );
}
