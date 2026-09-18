import React from 'react';

export interface MizigeGridProps {
  size: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Authentic 米字格 (Mǐzìgé) Calligraphy Grid
 * Designed strictly according to Hanzero's Warm Modern Oriental aesthetic:
 * - Rice Paper / Pure White paper surface
 * - Subtle Tea Wash diagonals (#EBE4D8)
 * - Warm Bamboo crosshairs (#DDD5C7)
 * - Soft organic border (#E2DBD0)
 */
export const MizigeGrid: React.FC<MizigeGridProps> = ({
  size,
  className = '',
  style = {},
  children,
}) => {
  return (
    <div
      className={`mizige-container ${className}`}
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: 'var(--bg-card, #FFFFFF)',
        border: '1.5px solid var(--border-card, #E2DBD0)',
        borderRadius: 'var(--radius-lg, 20px)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card, 0 8px 24px -4px rgba(44, 34, 20, 0.05))',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'none',
        ...style,
      }}
    >
      {/* SVG Background Grid Lines */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {/* Diagonals (Corner-to-Corner) */}
        <line
          x1="0"
          y1="0"
          x2="100"
          y2="100"
          stroke="#EBE4D8"
          strokeWidth="0.8"
          strokeDasharray="2,3"
        />
        <line
          x1="0"
          y1="100"
          x2="100"
          y2="0"
          stroke="#EBE4D8"
          strokeWidth="0.8"
          strokeDasharray="2,3"
        />

        {/* Center Crosshairs (Horizontal & Vertical) */}
        <line
          x1="50"
          y1="0"
          x2="50"
          y2="100"
          stroke="#DDD5C7"
          strokeWidth="1"
          strokeDasharray="3,3"
        />
        <line
          x1="0"
          y1="50"
          x2="100"
          y2="50"
          stroke="#DDD5C7"
          strokeWidth="1"
          strokeDasharray="3,3"
        />

        {/* Inner Safety Boundary (10% padding watermark guide) */}
        <rect
          x="10"
          y="10"
          width="80"
          height="80"
          fill="none"
          stroke="#F3EDE4"
          strokeWidth="0.6"
          strokeDasharray="3,3"
        />
      </svg>

      {/* Render Target Container / Content */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
};
