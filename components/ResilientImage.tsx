'use client';

import { useState } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
  priority?: boolean;
}

export function ResilientImage({
  src,
  alt,
  fallbackTitle,
  className = '',
  priority = false,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 p-6 text-center ${className}`}
      >
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg border border-blue-200 bg-white text-blue-700">
          <Layers className="h-5 w-5" aria-hidden="true" />
        </div>
        <p className="font-display text-sm font-semibold text-slate-800">{fallbackTitle}</p>
        <p className="mt-1 text-xs text-slate-500">Cobalt Studio Academy</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
