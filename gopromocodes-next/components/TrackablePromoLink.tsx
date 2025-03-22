'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface TrackablePromoLinkProps {
  href: string;
  promoCodeId: number;
  storeId: number;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
}

const TrackablePromoLink = ({ 
  href, 
  promoCodeId, 
  storeId, 
  className = '', 
  children,
  target = '_blank',
  rel = 'nofollow'
}: TrackablePromoLinkProps) => {
  const router = useRouter();
  const [isLogging, setIsLogging] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (isLogging) return;
    setIsLogging(true);

    try {
      const response = await fetch('/api/clicks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          promoCodeId,
          storeId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to log click');
      }

      // After successful logging, navigate to the destination
      if (target === '_blank') {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else {
        router.push(href);
      }
    } catch (error) {
      console.error('Error logging click:', error);
      // If logging fails, still navigate to the destination
      if (target === '_blank') {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else {
        router.push(href);
      }
    } finally {
      setIsLogging(false);
    }
  };

  return (
    <Link 
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default TrackablePromoLink; 