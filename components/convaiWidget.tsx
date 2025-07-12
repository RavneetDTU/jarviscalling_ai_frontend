'use client';

import { useEffect } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        'agent-id': string;
      };
    }
  }
}

export default function ConvaiWidget() {
  useEffect(() => {
    const scriptId = 'elevenlabs-convai-widget';

    // Load the script if not already loaded
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.type = 'text/javascript';
      script.id = scriptId;

      script.onload = () => {
        console.log('[ConvaiWidget] Widget script loaded.');
        observeForOverlay();
      };

      document.body.appendChild(script);
    } else {
      console.log('[ConvaiWidget] Script already loaded.');
      observeForOverlay();
    }

    function observeForOverlay() {
      const observer = new MutationObserver(() => {
        const overlay = document.querySelector('.overlay');
        if (overlay) {
          console.log('[ConvaiWidget] Found overlay');
          overrideBranding(overlay as HTMLElement);
          observer.disconnect(); // stop observing once found
        }
        else{
            console.log('[ConvaiWidget] Overlay not found yet, continuing to observe.');
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    }

    function overrideBranding(overlay: HTMLElement) {
      const brandingText = overlay.querySelector('p span');
      const brandingLink = overlay.querySelector('a');

      if (brandingText && brandingText.textContent?.includes('Powered by ElevenLabs')) {
        brandingText.textContent = 'Powered by Jarvis AI';
        console.log('[ConvaiWidget] Branding text updated.');
      }
      else{
        console.log('[ConvaiWidget] Branding text not found or already updated.');
      }

      if (brandingLink && brandingLink instanceof HTMLAnchorElement) {
        brandingLink.href = 'https://yourdomain.com';
        brandingLink.textContent = 'Conversational Assistant';
        brandingLink.target = '_blank';
        console.log('[ConvaiWidget] Branding link updated.');
      }
    }
  }, []);

  return (
    <elevenlabs-convai agent-id="agent_01jymc25vpf3ps455qa4ymn17a"></elevenlabs-convai>
  );
}
