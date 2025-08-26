import React, { useRef, useState } from 'react';
import '@google/model-viewer/dist/model-viewer';



interface QualityLevel {
  name: string;
  src: string;
}

interface PhoneViewerProps {
  className?: string;
}

/**
 * PhoneViewer component - displays a 3D iPhone model with quality selection and rotation controls
 */
const PhoneViewer: React.FC<PhoneViewerProps> = ({ className }) => {
  const qualityLevels: QualityLevel[] = [
    { name: 'Good', src: '/3d/iphone_16_pro_max/good.glb' },
    { name: 'Excellent', src: '/3d/iphone_16_pro_max/excellent.glb' },
    { name: 'Premium', src: '/3d/iphone_16_pro_max/premium.glb' }
  ];

  const [selectedQuality, setSelectedQuality] = useState<QualityLevel>(qualityLevels[2]); // Excellent по умолчанию
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modelViewerRef = useRef<any>(null);

  // Quality descriptions based on the screenshot (unused but kept for future reference)
  // const qualityDescriptions = {
  //   Fair: 'Basic condition with visible wear',
  //   Good: 'Minor signs of use, good functionality', 
  //   Excellent: 'Minimal wear, excellent condition',
  //   Premium: 'Like new, premium quality'
  // };

  // Component descriptions from screenshot
  const componentInfo = [
    {
      icon: '📱',
      title: 'Screen',
      description: 'Flawless. No signs of use, no scratches, no nothing.'
    },
    {
      icon: '📱',
      title: 'Body', 
      description: 'Almost no signs of use. May have hairline scratches that are barely visible. You might strain your eyes just to spot them.'
    },
    {
      icon: '⚙️',
      title: 'Hardware',
      description: '100% fully functional. Tested, checked, and cleaned by professional refurbishers who are vetted by Back Market.'
    },
    {
      icon: '🔋',
      title: 'Battery',
      description: 'Good health: minimum 80% battery capacity. Good performance for average daily use.'
    }
  ];

  const resetCamera = () => {
    if (modelViewerRef.current) {
      modelViewerRef.current.resetTurntableRotation();
    }
  };

  const zoomIn = () => {
    if (modelViewerRef.current) {
      const currentOrbit = modelViewerRef.current.getCameraOrbit();
      const newRadius = Math.max(currentOrbit.radius - 0.5, 1); // Минимальный радиус 1м
      modelViewerRef.current.cameraOrbit = `${currentOrbit.theta}rad ${currentOrbit.phi}rad ${newRadius}m`;
    }
  };

  const zoomOut = () => {
    if (modelViewerRef.current) {
      const currentOrbit = modelViewerRef.current.getCameraOrbit();
      const newRadius = Math.min(currentOrbit.radius + 0.5, 10); // Максимальный радиус 10м
      modelViewerRef.current.cameraOrbit = `${currentOrbit.theta}rad ${currentOrbit.phi}rad ${newRadius}m`;
    }
  };

  return (
    <div className={`phone-viewer ${className || ''}`}>
      {/* Quality Selection Buttons */}
      <div className="quality-selector">
        {qualityLevels.map((quality) => (
          <button
            key={quality.name}
            className={`quality-btn ${selectedQuality.name === quality.name ? 'active' : ''}`}
            onClick={() => setSelectedQuality(quality)}
          >
            {quality.name}
          </button>
        ))}
      </div>

      {/* 3D Model Viewer */}
      <div className="model-container">
        {/* @ts-expect-error model-viewer is a custom element */}
        <model-viewer
          ref={modelViewerRef}
          src={selectedQuality.src}
          alt={`iPhone 16 Pro Max - ${selectedQuality.name}`}
          auto-rotate
          camera-controls
          touch-action="pan-y"
          interaction-prompt="auto"
          ar
          ar-modes="webxr scene-viewer quick-look"
          environment-image="/Export.png"
          shadow-intensity="1"
          camera-orbit="45deg 75deg 2.5m"
          min-camera-orbit="auto auto auto"
          max-camera-orbit="auto auto auto"
          style={{
            width: '100%',
            height: '500px',
            backgroundColor: 'transparent'
          }}
        />
        
        {/* Control Buttons */}
        <div className="controls">
          <button className="control-btn left" onClick={() => {
            if (modelViewerRef.current) {
              const currentOrbit = modelViewerRef.current.getCameraOrbit();
              modelViewerRef.current.cameraOrbit = `${currentOrbit.theta - 0.5}rad ${currentOrbit.phi}rad ${currentOrbit.radius}m`;
            }
          }}>
            <span className="control-icon">↻</span>
            <span className="control-text">Turn left</span>
          </button>
          
          <button className="control-btn reset" onClick={resetCamera}>
            <span className="control-icon">⟲</span>
            <span className="control-text">Reset</span>
          </button>
          
          <button className="control-btn right" onClick={() => {
            if (modelViewerRef.current) {
              const currentOrbit = modelViewerRef.current.getCameraOrbit();
              modelViewerRef.current.cameraOrbit = `${currentOrbit.theta + 0.5}rad ${currentOrbit.phi}rad ${currentOrbit.radius}m`;
            }
          }}>
            <span className="control-icon">↺</span>
            <span className="control-text">Turn right</span>
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="zoom-controls">
          <button className="zoom-btn zoom-in" onClick={zoomIn}>
            <span className="zoom-icon">+</span>
          </button>
          <button className="zoom-btn zoom-out" onClick={zoomOut}>
            <span className="zoom-icon">−</span>
          </button>
        </div>
      </div>

      {/* Component Information */}
      <div className="component-info">
        {componentInfo.map((component, index) => (
          <div key={index} className="component-item">
            <div className="component-header">
              <span className="component-icon">{component.icon}</span>
              <h3 className="component-title">{component.title}</h3>
            </div>
            <p className="component-description">{component.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhoneViewer;
