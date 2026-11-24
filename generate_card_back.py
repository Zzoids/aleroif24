def generate_crownfall_svg():
    w, h = 300, 420
    
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="100%" height="100%" preserveAspectRatio="none">
  <defs>
    <!-- Background Gradients -->
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#2a0d4a" />
      <stop offset="50%" stop-color="#18072b" />
      <stop offset="100%" stop-color="#0b0314" />
    </radialGradient>
    
    <radialGradient id="coreGlow" cx="50%" cy="50%" r="35%">
      <stop offset="0%" stop-color="#a855f7" stop-opacity="0.4" />
      <stop offset="70%" stop-color="#6b21a8" stop-opacity="0.1" />
      <stop offset="100%" stop-color="#3b0764" stop-opacity="0" />
    </radialGradient>

    <!-- Gold Gradients -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE68A" />
      <stop offset="30%" stop-color="#F59E0B" />
      <stop offset="60%" stop-color="#D97706" />
      <stop offset="85%" stop-color="#B45309" />
      <stop offset="100%" stop-color="#78350F" />
    </linearGradient>

    <linearGradient id="goldH" x1="0%" y1="50%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#78350F" />
      <stop offset="25%" stop-color="#F59E0B" />
      <stop offset="50%" stop-color="#FEF3C7" />
      <stop offset="75%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#78350F" />
    </linearGradient>

    <linearGradient id="purpleGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#c084fc" />
      <stop offset="50%" stop-color="#9333ea" />
      <stop offset="100%" stop-color="#581c87" />
    </linearGradient>

    <!-- Filters -->
    <filter id="goldShine" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#000000" flood-opacity="0.8" />
    </filter>

    <filter id="amethystGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- 1. Base Background -->
  <rect width="{w}" height="{h}" rx="14" fill="url(#bgGlow)" />
  <circle cx="150" cy="210" r="140" fill="url(#coreGlow)" />

  <!-- Subtle Arcane Background Pattern (Sacred Geometry) -->
  <g opacity="0.18" stroke="url(#goldGrad)" stroke-width="0.8" fill="none">
    <circle cx="150" cy="210" r="95" />
    <circle cx="150" cy="210" r="70" stroke-dasharray="2 3" />
    <circle cx="150" cy="210" r="45" />
    <!-- 8-point star lines -->
    <line x1="150" y1="90" x2="150" y2="330" />
    <line x1="30" y1="210" x2="270" y2="210" />
    <line x1="65" y1="125" x2="235" y2="295" />
    <line x1="65" y1="295" x2="235" y2="125" />
    <!-- Diamond bounding box -->
    <polygon points="150,115 245,210 150,305 55,210" />
    <polygon points="150,130 230,210 150,290 70,210" stroke-dasharray="3 3" />
  </g>

  <!-- 2. Outer Ornate Golden Border -->
  <rect x="8" y="8" width="{w-16}" height="{h-16}" rx="10" fill="none" stroke="url(#goldGrad)" stroke-width="2.5" filter="url(#goldShine)" />
  <rect x="14" y="14" width="{w-28}" height="{h-28}" rx="8" fill="none" stroke="#6b21a8" stroke-width="1.2" />
  <rect x="18" y="18" width="{w-36}" height="{h-36}" rx="6" fill="none" stroke="url(#goldGrad)" stroke-width="1" stroke-dasharray="6 3" />

  <!-- 3. Four Ornate Symmetrical Corners -->
  <!-- Top-Left Corner -->
  <g transform="translate(18, 18)" filter="url(#goldShine)">
    <path d="M 0,0 L 32,0 C 24,6 18,12 14,20 C 12,26 8,30 0,32 Z" fill="url(#goldGrad)" />
    <circle cx="10" cy="10" r="2.5" fill="#e9d5ff" />
    <path d="M 0,40 L 40,0" stroke="url(#goldGrad)" stroke-width="1.2" fill="none" />
    <circle cx="24" cy="6" r="1.5" fill="#FDE68A" />
    <circle cx="6" cy="24" r="1.5" fill="#FDE68A" />
  </g>

  <!-- Top-Right Corner -->
  <g transform="translate({w-18}, 18) scale(-1, 1)" filter="url(#goldShine)">
    <path d="M 0,0 L 32,0 C 24,6 18,12 14,20 C 12,26 8,30 0,32 Z" fill="url(#goldGrad)" />
    <circle cx="10" cy="10" r="2.5" fill="#e9d5ff" />
    <path d="M 0,40 L 40,0" stroke="url(#goldGrad)" stroke-width="1.2" fill="none" />
    <circle cx="24" cy="6" r="1.5" fill="#FDE68A" />
    <circle cx="6" cy="24" r="1.5" fill="#FDE68A" />
  </g>

  <!-- Bottom-Left Corner -->
  <g transform="translate(18, {h-18}) scale(1, -1)" filter="url(#goldShine)">
    <path d="M 0,0 L 32,0 C 24,6 18,12 14,20 C 12,26 8,30 0,32 Z" fill="url(#goldGrad)" />
    <circle cx="10" cy="10" r="2.5" fill="#e9d5ff" />
    <path d="M 0,40 L 40,0" stroke="url(#goldGrad)" stroke-width="1.2" fill="none" />
    <circle cx="24" cy="6" r="1.5" fill="#FDE68A" />
    <circle cx="6" cy="24" r="1.5" fill="#FDE68A" />
  </g>

  <!-- Bottom-Right Corner -->
  <g transform="translate({w-18}, {h-18}) scale(-1, -1)" filter="url(#goldShine)">
    <path d="M 0,0 L 32,0 C 24,6 18,12 14,20 C 12,26 8,30 0,32 Z" fill="url(#goldGrad)" />
    <circle cx="10" cy="10" r="2.5" fill="#e9d5ff" />
    <path d="M 0,40 L 40,0" stroke="url(#goldGrad)" stroke-width="1.2" fill="none" />
    <circle cx="24" cy="6" r="1.5" fill="#FDE68A" />
    <circle cx="6" cy="24" r="1.5" fill="#FDE68A" />
  </g>

  <!-- 4. Top & Bottom Crown Ornament / Fleur-de-lis -->
  <!-- Top Crown -->
  <g transform="translate(150, 36)" filter="url(#goldShine)">
    <path d="M -28,-3 Q 0,-14 28,-3 Q 16,6 0,4 Q -16,6 -28,-3 Z" fill="url(#goldH)" />
    <!-- Winged tiara crest -->
    <path d="M 0,-15 L 6,-2 L 14,-7 L 9,5 L 0,3 L -9,5 L -14,-7 L -6,-2 Z" fill="url(#goldGrad)" />
    <circle cx="0" cy="-6" r="2.5" fill="#f43f5e" />
    <circle cx="-12" cy="-4" r="1.8" fill="#a855f7" />
    <circle cx="12" cy="-4" r="1.8" fill="#a855f7" />
  </g>

  <!-- Bottom Crown (Inverted) -->
  <g transform="translate(150, {h-36}) scale(1, -1)" filter="url(#goldShine)">
    <path d="M -28,-3 Q 0,-14 28,-3 Q 16,6 0,4 Q -16,6 -28,-3 Z" fill="url(#goldH)" />
    <path d="M 0,-15 L 6,-2 L 14,-7 L 9,5 L 0,3 L -9,5 L -14,-7 L -6,-2 Z" fill="url(#goldGrad)" />
    <circle cx="0" cy="-6" r="2.5" fill="#f43f5e" />
    <circle cx="-12" cy="-4" r="1.8" fill="#a855f7" />
    <circle cx="12" cy="-4" r="1.8" fill="#a855f7" />
  </g>

  <!-- 5. Central Crownfall Sigil (Wings of Dragonus & Sacred Eye) -->
  <!-- Outer Ring with Filigree Rays -->
  <g transform="translate(150, 210)" filter="url(#goldShine)">
    <!-- Arcane Sun Ring -->
    <circle cx="0" cy="0" r="62" fill="none" stroke="url(#goldGrad)" stroke-width="2" />
    <circle cx="0" cy="0" r="56" fill="none" stroke="#7e22ce" stroke-width="1.5" />
    <circle cx="0" cy="0" r="50" fill="none" stroke="url(#goldGrad)" stroke-width="1" stroke-dasharray="4 4" />

    <!-- Crownfall Majestic Wings Left -->
    <g fill="url(#goldGrad)" opacity="0.95">
      <!-- Upper primary feather -->
      <path d="M -20,-12 C -45,-32 -75,-25 -92,-6 C -75,-3 -55,-10 -30,-4 Z" />
      <!-- Middle secondary feather -->
      <path d="M -22,-2 C -50,-12 -78,2 -88,18 C -70,14 -52,6 -28,5 Z" />
      <!-- Lower tertiary feather -->
      <path d="M -20,8 C -45,8 -68,22 -76,36 C -60,26 -44,18 -22,14 Z" />
      <!-- Small accent feather -->
      <path d="M -16,16 C -32,22 -48,34 -52,48 C -42,38 -30,28 -15,22 Z" />
    </g>

    <!-- Crownfall Majestic Wings Right (Mirrored) -->
    <g transform="scale(-1, 1)" fill="url(#goldGrad)" opacity="0.95">
      <path d="M -20,-12 C -45,-32 -75,-25 -92,-6 C -75,-3 -55,-10 -30,-4 Z" />
      <path d="M -22,-2 C -50,-12 -78,2 -88,18 C -70,14 -52,6 -28,5 Z" />
      <path d="M -20,8 C -45,8 -68,22 -76,36 C -60,26 -44,18 -22,14 Z" />
      <path d="M -16,16 C -32,22 -48,34 -52,48 C -42,38 -30,28 -15,22 Z" />
    </g>

    <!-- Center Mystic Diamond & Eye -->
    <!-- Diamond Base -->
    <polygon points="0,-42 32,0 0,42 -32,0" fill="#1e0b38" stroke="url(#goldGrad)" stroke-width="2.5" />
    <polygon points="0,-34 25,0 0,34 -25,0" fill="url(#purpleGlowGrad)" stroke="#FDE68A" stroke-width="1" opacity="0.9" />

    <!-- Arcane 8-pointed star in center -->
    <polygon points="0,-24 4,-6 22,0 4,6 0,24 -4,6 -22,0 -4,-6" fill="url(#goldGrad)" filter="url(#goldShine)" />
    
    <!-- Central Amethyst Gem -->
    <circle cx="0" cy="0" r="7.5" fill="#fdf4ff" filter="url(#amethystGlow)" />
    <circle cx="0" cy="0" r="6" fill="#c084fc" />
    <circle cx="0" cy="0" r="3.5" fill="#581c87" />
    <circle cx="-1.5" cy="-1.5" r="1.2" fill="#ffffff" />
    
    <!-- Vertical Scepter Accents -->
    <path d="M 0,-42 L 0,-62 M 0,42 L 0,62" stroke="url(#goldGrad)" stroke-width="2" stroke-linecap="round" />
    <circle cx="0" cy="-62" r="3" fill="#FDE68A" />
    <circle cx="0" cy="62" r="3" fill="#FDE68A" />
    <circle cx="-62" cy="0" r="3" fill="#FDE68A" />
    <circle cx="62" cy="0" r="3" fill="#FDE68A" />
  </g>

  <!-- 6. Left and Right Border Filigree Nodes -->
  <g transform="translate(14, 210)" filter="url(#goldShine)">
    <polygon points="0,-16 8,0 0,16 -4,0" fill="url(#goldGrad)" />
    <circle cx="1" cy="0" r="2" fill="#a855f7" />
  </g>
  <g transform="translate({w-14}, 210) scale(-1, 1)" filter="url(#goldShine)">
    <polygon points="0,-16 8,0 0,16 -4,0" fill="url(#goldGrad)" />
    <circle cx="1" cy="0" r="2" fill="#a855f7" />
  </g>

  <!-- 7. Crownfall Subtle Runes along Inner Frame -->
  <g fill="url(#goldGrad)" opacity="0.6" font-family="serif" font-size="9" text-anchor="middle">
    <text x="150" y="26">✦ CROWNFALL ✦</text>
    <text x="150" y="{h-20}">✦ 24.11.2026 ✦</text>
  </g>
</svg>'''
    return svg

with open(r'd:\Proyectos\aleroif24-web\public\crownfall_card_back.svg', 'w', encoding='utf-8') as f:
    f.write(generate_crownfall_svg())

print('Generated crownfall_card_back.svg successfully!')
