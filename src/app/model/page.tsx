"use client";
import React, { useState } from 'react';
import TattooPositioner from '@/components/TattooPositioner/TattooPositioner';

export default function Page() { 

  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  return (
    <TattooPositioner position={position} setPosition={setPosition} />
  );
}
