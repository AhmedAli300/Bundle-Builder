
export function ProductImage({ productId, variantId = 'white', className = '' }) {
  const isDark = variantId === 'black';
  const isGrey = variantId === 'grey';
  const bodyFill = isDark ? '#23272D' : isGrey ? '#8E95A2' : '#FFFFFF';
  const bodyStroke = isDark ? '#111317' : isGrey ? '#6B7280' : '#E2E8F0';
  const accentFill = isDark ? '#323843' : isGrey ? '#A0A7B5' : '#F1F5F9';
  const lensGlass = '#0F172A';
  const lensRing = '#3B82F6';

  switch (productId) {
    case 'wyze-cam-v4':
      return (
        <svg className={`product-svg ${className}`} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="120" height="120" rx="16" fill="#F8FAFC" />
          <ellipse cx="80" cy="132" rx="34" ry="8" fill="#CBD5E1" />
          <path d="M72 110 L72 128 C72 130 88 130 88 128 L88 110 Z" fill="#94A3B8" />
          <rect x="42" y="38" width="76" height="74" rx="14" fill={bodyFill} stroke={bodyStroke} strokeWidth="3" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.08))" />
          <rect x="52" y="48" width="56" height="54" rx="10" fill={lensGlass} />
          <circle cx="80" cy="74" r="18" fill="#1E293B" stroke="#334155" strokeWidth="2" />
          <circle cx="80" cy="74" r="11" fill="#020617" />
          <circle cx="80" cy="74" r="5" fill={lensRing} opacity="0.9" />
          <circle cx="76" cy="70" r="3" fill="#FFFFFF" opacity="0.6" />
          <circle cx="80" cy="94" r="2" fill="#38BDF8" />
        </svg>
      );

    case 'wyze-cam-pan-v3':
      return (
        <svg className={`product-svg ${className}`} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="120" height="120" rx="16" fill="#F8FAFC" />
          <rect x="56" y="112" width="48" height="20" rx="6" fill={accentFill} stroke={bodyStroke} strokeWidth="2" />
          <rect x="68" y="104" width="24" height="10" fill="#94A3B8" />
          <rect x="46" y="34" width="68" height="72" rx="14" fill={bodyFill} stroke={bodyStroke} strokeWidth="3" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.08))" />
          <circle cx="80" cy="68" r="26" fill={lensGlass} />
          <circle cx="80" cy="68" r="15" fill="#1E293B" />
          <circle cx="80" cy="68" r="8" fill={lensRing} />
          <circle cx="77" cy="65" r="2.5" fill="#FFFFFF" opacity="0.7" />
        </svg>
      );

    case 'wyze-cam-floodlight-v2':
      return (
        <svg className={`product-svg ${className}`} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="120" height="120" rx="16" fill="#F8FAFC" />
          <g transform="rotate(-15 45 55)">
            <rect x="25" y="40" width="40" height="30" rx="4" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
            <rect x="28" y="43" width="34" height="24" rx="2" fill="#FEF08A" opacity="0.85" />
          </g>
          <g transform="rotate(15 115 55)">
            <rect x="95" y="40" width="40" height="30" rx="4" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
            <rect x="98" y="43" width="34" height="24" rx="2" fill="#FEF08A" opacity="0.85" />
          </g>
          <circle cx="80" cy="70" r="18" fill={accentFill} stroke={bodyStroke} strokeWidth="2" />
          <path d="M80 88 L80 98" stroke="#64748B" strokeWidth="4" />
          <rect x="58" y="98" width="44" height="40" rx="8" fill={bodyFill} stroke={bodyStroke} strokeWidth="2" />
          <rect x="64" y="104" width="32" height="28" rx="6" fill={lensGlass} />
          <circle cx="80" cy="118" r="8" fill={lensRing} />
        </svg>
      );

    case 'wyze-duo-cam-doorbell':
      return (
        <svg className={`product-svg ${className}`} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="120" height="120" rx="16" fill="#F8FAFC" />
          <rect x="54" y="28" width="52" height="104" rx="12" fill={lensGlass} stroke="#334155" strokeWidth="3" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.12))" />
          <circle cx="80" cy="48" r="10" fill="#1E293B" stroke="#475569" strokeWidth="2" />
          <circle cx="80" cy="48" r="5" fill={lensRing} />
          <circle cx="80" cy="74" r="8" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
          <circle cx="80" cy="74" r="4" fill="#38BDF8" />
          <circle cx="80" cy="108" r="12" fill="none" stroke="#3B82F6" strokeWidth="3.5" />
          <circle cx="80" cy="108" r="8" fill="#1E293B" />
        </svg>
      );

    case 'wyze-battery-cam-pro':
      return (
        <svg className={`product-svg ${className}`} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="120" height="120" rx="16" fill="#F8FAFC" />
          <path d="M50 115 Q30 135 25 140 L40 140 Q45 130 65 115 Z" fill="#94A3B8" />
          <rect x="44" y="44" width="72" height="68" rx="18" fill={bodyFill} stroke={bodyStroke} strokeWidth="3" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.08))" />
          <rect x="52" y="52" width="56" height="52" rx="12" fill={lensGlass} />
          <circle cx="80" cy="78" r="14" fill="#1E293B" />
          <circle cx="80" cy="78" r="8" fill={lensRing} />
          <circle cx="77" cy="75" r="2" fill="#FFF" opacity="0.8" />
          <rect x="70" y="58" width="20" height="5" rx="2.5" fill="#22C55E" />
        </svg>
      );

    case 'wyze-sense-motion':
      return (
        <svg className={`product-svg ${className}`} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="120" height="120" rx="16" fill="#F8FAFC" />
          <rect x="48" y="48" width="64" height="64" rx="12" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.06))" />
          <ellipse cx="80" cy="74" rx="20" ry="14" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
          <path d="M64 74 Q80 66 96 74" stroke="#64748B" strokeWidth="1.5" fill="none" />
          <circle cx="80" cy="98" r="2" fill="#3B82F6" />
        </svg>
      );

    case 'wyze-sense-hub':
      return (
        <svg className={`product-svg ${className}`} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="120" height="120" rx="16" fill="#F8FAFC" />
          <rect x="42" y="52" width="76" height="56" rx="10" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.06))" />
          <circle cx="80" cy="80" r="14" fill="none" stroke="#2563EB" strokeWidth="3" />
          <circle cx="80" cy="80" r="8" fill="#DBEAFE" />
          <rect x="74" y="108" width="12" height="12" fill="#94A3B8" />
        </svg>
      );

    case 'wyze-microsd-256':
      return (
        <svg className={`product-svg ${className}`} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="120" height="120" rx="16" fill="#F8FAFC" />
          <path d="M50 36 L100 36 L110 46 L110 124 C110 128 106 132 102 132 L58 132 C54 132 50 128 50 124 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
          <path d="M50 36 L100 36 L110 46 L110 76 L50 76 Z" fill="#2563EB" />
          <text x="56" y="54" fill="#FFFFFF" fontSize="12" fontFamily="sans-serif" fontWeight="bold">WYZE</text>
          <text x="56" y="70" fill="#93C5FD" fontSize="9" fontFamily="sans-serif">microSDXC</text>
          <text x="56" y="102" fill="#FFFFFF" fontSize="18" fontFamily="sans-serif" fontWeight="900">256</text>
          <text x="92" y="102" fill="#CBD5E1" fontSize="10" fontFamily="sans-serif" fontWeight="bold">GB</text>
          <text x="56" y="120" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">V30 A2 U3</text>
        </svg>
      );

    case 'cam-unlimited':
      return (
        <svg className={`product-svg ${className}`} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="120" height="120" rx="16" fill="#EFF6FF" />
          <path d="M80 34 L114 48 V78 C114 102 99 122 80 130 C61 122 46 102 46 78 V48 L80 34 Z" fill="#2563EB" stroke="#1D4ED8" strokeWidth="3" />
          <path d="M68 78 L76 86 L94 68" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M66 102 Q73 95 80 102 Q87 109 94 102 Q87 95 80 102 Q73 109 66 102 Z" fill="none" stroke="#93C5FD" strokeWidth="2.5" />
        </svg>
      );

    default:
      return (
        <svg className={`product-svg ${className}`} viewBox="0 0 160 160" fill="none">
          <rect x="20" y="20" width="120" height="120" rx="16" fill="#F1F5F9" />
          <circle cx="80" cy="80" r="30" fill="#CBD5E1" />
        </svg>
      );
  }
}
