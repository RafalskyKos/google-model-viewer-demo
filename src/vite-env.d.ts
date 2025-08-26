/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string;
      alt?: string;
      'auto-rotate'?: boolean;
      'camera-controls'?: boolean;
      'touch-action'?: string;
      'interaction-prompt'?: string;
      ar?: boolean;
      'ar-modes'?: string;
      'environment-image'?: string;
      'shadow-intensity'?: string;
      'camera-orbit'?: string;
      'min-camera-orbit'?: string;
      'max-camera-orbit'?: string;
      ref?: React.RefObject<any>;
    };
  }
}
