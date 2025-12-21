import React, { useMemo } from 'react';
import { OutputMode } from '../types';
import { P5_SCAFFOLD, THREE_SCAFFOLD, HTML_SCAFFOLD } from '../constants';

interface RendererProps {
  code: string | null;
  mode: OutputMode;
  imageUrl?: string | null;
}

const Renderer: React.FC<RendererProps> = ({ code, mode, imageUrl }) => {
  
  const srcDoc = useMemo(() => {
    if (!code && !imageUrl) return '';
    
    if (mode === OutputMode.IMAGE && imageUrl) {
      return `
        <!DOCTYPE html>
        <html>
          <body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh; background:transparent;">
             <img src="${imageUrl}" style="max-width:100%; max-height:100%; object-fit:contain;" />
          </body>
        </html>
      `;
    }

    if (!code) return '';

    switch (mode) {
      case OutputMode.P5JS:
        return P5_SCAFFOLD.replace('/*__CODE__*/', code);
      
      case OutputMode.THREEJS:
        return THREE_SCAFFOLD.replace('/*__CODE__*/', code);
      
      case OutputMode.HTML:
        // For HTML mode, we inject the whole thing or wrap partials
        if (code.includes('<html')) return code;
        return HTML_SCAFFOLD.replace('/*__CODE__*/', code);
      
      case OutputMode.SVG:
        return `
          <!DOCTYPE html>
          <html>
            <body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh; background:transparent;">
              ${code}
            </body>
          </html>
        `;
      
      default:
        return '';
    }
  }, [code, mode, imageUrl]);

  if (!code && !imageUrl) return null;

  return (
    <iframe
      title="Rendered Output"
      srcDoc={srcDoc}
      className="w-full h-full bg-white rounded-md overflow-hidden"
      sandbox="allow-scripts" // Crucial for security, but allows JS execution for p5/three
    />
  );
};

export default Renderer;
