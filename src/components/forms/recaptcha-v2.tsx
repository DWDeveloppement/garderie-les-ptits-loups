'use client';

import { useEffect, useRef, useState } from 'react';

import ReCAPTCHA from 'react-google-recaptcha';

type RecaptchaV2Props = {
  onVerify: (token: string | null) => void;
  onExpire?: () => void;
  onError?: () => void;
  className?: string;
};

export function RecaptchaV2({ onVerify, onExpire, onError, className = '' }: RecaptchaV2Props) {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [siteKey, setSiteKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Éviter l'erreur d'hydratation et récupérer la clé
  useEffect(() => {
    setIsMounted(true);

    // Récupérer la clé reCAPTCHA via l'API
    fetch('/api/recaptcha-config')
      .then((res) => res.json())
      .then((data) => {
        if (data.siteKey) {
          setSiteKey(data.siteKey);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Erreur récupération clé reCAPTCHA:', error);
        setIsLoading(false);
      });
  }, []);

  // Gestionnaire de vérification
  const handleVerify = (token: string | null) => {
    console.log('🔍 reCAPTCHA v2 token:', token ? '✅ Généré' : '❌ Erreur');
    onVerify(token);
  };

  // Gestionnaire d'expiration
  const handleExpire = () => {
    console.log('⏰ reCAPTCHA v2 expiré');
    onExpire?.();
  };

  // Gestionnaire d'erreur
  const handleError = () => {
    console.log('❌ reCAPTCHA v2 erreur');
    onError?.();
  };

  // Rendu côté serveur : placeholder neutre
  if (!isMounted || isLoading) {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className='rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm'>
          <div className='flex items-center space-x-2'>
            <div className='h-4 w-4 animate-pulse rounded bg-gray-400'></div>
            <span className='text-sm text-gray-600'>Chargement...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!siteKey) {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className='bg-orange-surface border-orange-6 rounded-lg border p-4 shadow-sm'>
          <div className='flex items-center space-x-2'>
            <div className='text-orange-9 h-4 w-4'>⚠️</div>
            <span className='text-orange-9 text-sm'>reCAPTCHA non configuré</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Annonce d'accessibilité pour les lecteurs d'écran */}
      <div className='sr-only' aria-live='polite' aria-label='Information de sécurité'>
        Un système de protection anti-spam va apparaître. Vous devrez cocher une case &ldquo;Je ne suis pas un
        robot&rdquo; et possiblement résoudre un défi visuel avant de pouvoir envoyer le formulaire.
      </div>

      {/* reCAPTCHA v2 */}
      <div className='relative'>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={siteKey}
          onChange={handleVerify}
          onExpired={handleExpire}
          onErrored={handleError}
          theme='light'
          size='normal'
          tabIndex={0}
          aria-label='Vérification de sécurité reCAPTCHA'
        />
      </div>

      {/* Message d'information - Visible uniquement pour les lecteurs d'écran */}
      <div className='mt-3 text-center'>
        <p className='text-purple-9 sr-only text-xs opacity-75'>
          Cette vérification nous aide à protéger le site contre les messages automatiques.
        </p>
      </div>
    </div>
  );
}

// Hook pour réinitialiser reCAPTCHA
export function useRecaptchaReset() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const resetRecaptcha = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
      console.log('🔄 reCAPTCHA v2 réinitialisé');
    }
  };

  return { recaptchaRef, resetRecaptcha };
}
