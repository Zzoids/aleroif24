def get_killua_hair(expression='happy'):
    return '''
    <!-- Back Hair Spikes -->
    <path d="M 28,55 C 10,48 5,30 18,18 C 22,12 30,8 40,6 C 45,2 60,0 72,4 C 85,0 102,4 108,12 C 120,18 126,34 116,52 C 125,58 120,70 110,75 C 106,78 100,78 96,75 L 28,75 Z" fill="#E2E8F0" />
    <path d="M 18,35 C 4,32 0,22 8,14 C 15,8 25,10 32,16 Z" fill="#F1F5F9" />
    <path d="M 112,32 C 128,30 132,18 122,12 C 114,6 104,10 98,16 Z" fill="#F1F5F9" />

    <!-- Main Fluffy Volume -->
    <path d="M 22,48 C 14,35 20,20 34,14 C 42,6 60,5 72,8 C 84,4 102,8 110,16 C 122,24 124,40 114,52 C 118,62 110,72 98,72 C 90,72 82,70 78,66 C 72,70 60,70 54,66 C 46,70 34,70 28,64 C 22,60 20,54 22,48 Z" fill="#F8FAFC" />
    
    <!-- Top Signature Spikes -->
    <path d="M 45,12 C 40,-4 58,2 52,14 Z" fill="#FFFFFF" />
    <path d="M 62,8 C 65,-8 80,0 74,12 Z" fill="#FFFFFF" />
    <path d="M 80,10 C 90,-4 102,6 92,16 Z" fill="#FFFFFF" />
    '''

def get_killua_bangs():
    return '''
    <!-- Front Bangs falling on forehead -->
    <path d="M 32,32 C 36,44 44,48 48,34 C 52,48 62,50 64,36 C 68,52 78,50 82,34 C 86,46 94,44 98,32 C 104,40 108,42 110,36 C 106,26 98,22 92,20 C 70,18 50,20 32,32 Z" fill="#FFFFFF" />
    <!-- Stray locks -->
    <path d="M 46,38 C 50,48 56,46 54,38 Z" fill="#F1F5F9" />
    <path d="M 72,38 C 76,50 82,46 80,38 Z" fill="#F1F5F9" />
    '''

def make_killua_running():
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 200" width="100%" height="100%">
  <defs>
    <filter id="chibiShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.25" />
    </filter>
    <linearGradient id="boxPink" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F43F5E" />
      <stop offset="100%" stop-color="#BE123C" />
    </linearGradient>
    <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FEF08A" />
      <stop offset="50%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>
    <linearGradient id="blueEye" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0284C7" />
      <stop offset="40%" stop-color="#2563EB" />
      <stop offset="100%" stop-color="#1E3A8A" />
    </linearGradient>
  </defs>

  <!-- Speed Dust Particles Behind -->
  <g opacity="0.7">
    <ellipse cx="25" cy="180" rx="14" ry="4" fill="#CBD5E1" />
    <ellipse cx="40" cy="185" rx="8" ry="3" fill="#E2E8F0" />
    <circle cx="15" cy="170" r="3" fill="#CBD5E1" />
    <circle cx="28" cy="165" r="2" fill="#E2E8F0" />
    <!-- Speed Lines -->
    <line x1="8" y1="110" x2="35" y2="110" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" />
    <line x1="2" y1="125" x2="30" y2="125" stroke="#94A3B8" stroke-width="2.5" stroke-linecap="round" />
    <line x1="12" y1="140" x2="42" y2="140" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" />
  </g>

  <!-- Chibi Killua Character (Leaning forward running) -->
  <g transform="translate(20, 10)" filter="url(#chibiShadow)">
    <!-- Back Leg (Stretching back) -->
    <g transform="translate(42, 130)">
      <path d="M 0,0 L -25,25 L -18,32 L 6,10 Z" fill="#A78BFA" /> <!-- Shorts -->
      <path d="M -24,24 L -35,35" stroke="#FED7AA" stroke-width="8" stroke-linecap="round" /> <!-- Leg -->
      <!-- Sneaker -->
      <path d="M -46,38 C -48,34 -42,30 -36,32 L -30,38 C -30,42 -42,44 -46,38 Z" fill="#6366F1" />
      <rect x="-46" y="40" width="16" height="4" rx="2" fill="#FFFFFF" />
    </g>

    <!-- Front Leg (Bending forward) -->
    <g transform="translate(68, 130)">
      <path d="M -5,0 L 15,20 L 8,28 L -12,8 Z" fill="#8B5CF6" /> <!-- Shorts -->
      <path d="M 12,20 L 22,38" stroke="#FED7AA" stroke-width="8" stroke-linecap="round" /> <!-- Leg -->
      <!-- Sneaker -->
      <path d="M 16,40 C 16,35 24,32 30,35 L 36,42 C 34,46 20,46 16,40 Z" fill="#4F46E5" />
      <rect x="18" y="43" width="18" height="4" rx="2" fill="#FFFFFF" />
    </g>

    <!-- Torso (Dark Turtleneck + Loose White V-neck Shirt) -->
    <g transform="translate(50, 85)">
      <!-- Navy Turtleneck -->
      <path d="M 8,-6 L 22,-6 L 24,6 L 6,6 Z" fill="#1E293B" />
      <!-- White Overshirt -->
      <path d="M -2,4 Q 15,10 32,4 L 38,40 Q 15,44 -6,40 Z" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
      <!-- V-neck collar cut -->
      <polygon points="10,4 20,4 15,14" fill="#0F172A" />
    </g>

    <!-- Head and Hair Back -->
    {get_killua_hair('running')}

    <!-- Face (Pale skin + anime cheeks) -->
    <path d="M 32,36 C 30,58 38,78 68,78 C 98,78 106,58 104,36 C 104,24 32,24 32,36 Z" fill="#FFF7ED" />
    
    <!-- Anime Blush -->
    <ellipse cx="44" cy="62" rx="6" ry="3" fill="#FDA4AF" opacity="0.7" />
    <ellipse cx="90" cy="62" rx="6" ry="3" fill="#FDA4AF" opacity="0.7" />

    <!-- Eyes (Big energetic determined Chibi Eyes) -->
    <!-- Left Eye -->
    <g transform="translate(45, 42)">
      <ellipse cx="6" cy="10" rx="7" ry="9" fill="url(#blueEye)" />
      <!-- Highlights -->
      <circle cx="4" cy="6" r="3" fill="#FFFFFF" />
      <circle cx="8" cy="13" r="1.5" fill="#BAE6FD" />
      <!-- Eyelash / Eyebrow -->
      <path d="M -2,0 Q 6,-4 14,1" stroke="#0F172A" stroke-width="2.5" fill="none" stroke-linecap="round" />
    </g>
    <!-- Right Eye -->
    <g transform="translate(78, 42)">
      <ellipse cx="6" cy="10" rx="7" ry="9" fill="url(#blueEye)" />
      <!-- Highlights -->
      <circle cx="4" cy="6" r="3" fill="#FFFFFF" />
      <circle cx="8" cy="13" r="1.5" fill="#BAE6FD" />
      <!-- Eyelash / Eyebrow -->
      <path d="M -2,1 Q 6,-4 14,0" stroke="#0F172A" stroke-width="2.5" fill="none" stroke-linecap="round" />
    </g>

    <!-- Determined open running mouth :D -->
    <path d="M 64,66 Q 68,73 73,66 Z" fill="#BE123C" stroke="#881337" stroke-width="0.8" />
    <path d="M 66,67 Q 68,70 71,67 Z" fill="#FDA4AF" />

    <!-- Bangs and Front Locks -->
    {get_killua_bangs()}

    <!-- Little Godspeed / Nen Sparkle -->
    <g transform="translate(112, 28)">
      <path d="M 0,0 L 6,-4 L 3,3 L 8,1 L 2,8 L 3,4 Z" fill="#38BDF8" />
    </g>

    <!-- Arms Holding the Giant Present Forward -->
    <!-- Back Arm -->
    <path d="M 50,95 L 75,108" stroke="#FED7AA" stroke-width="8" stroke-linecap="round" />
  </g>

  <!-- 3. Giant Birthday Present Box (Carried in front) -->
  <g transform="translate(108, 65)" filter="url(#chibiShadow)">
    <!-- Box Body -->
    <rect x="0" y="20" width="85" height="75" rx="6" fill="url(#boxPink)" stroke="#9F1239" stroke-width="2" />
    <!-- Lid -->
    <rect x="-4" y="14" width="93" height="15" rx="4" fill="#FDA4AF" stroke="#9F1239" stroke-width="2" />
    
    <!-- Golden Ribbons Vertical & Horizontal -->
    <rect x="36" y="20" width="14" height="75" fill="url(#goldRibbon)" />
    <rect x="34" y="14" width="18" height="15" fill="url(#goldRibbon)" />
    <rect x="0" y="52" width="85" height="14" fill="url(#goldRibbon)" />

    <!-- Giant Fluffy Ribbon Bow on Top -->
    <g transform="translate(43, 14)">
      <!-- Left Loop -->
      <path d="M 0,0 C -25,-25 -30,5 -2,0 Z" fill="url(#goldRibbon)" stroke="#B45309" stroke-width="1" />
      <!-- Right Loop -->
      <path d="M 0,0 C 25,-25 30,5 2,0 Z" fill="url(#goldRibbon)" stroke="#B45309" stroke-width="1" />
      <!-- Center Knot -->
      <ellipse cx="0" cy="0" rx="6" ry="5" fill="#FEF08A" stroke="#B45309" stroke-width="1" />
      <!-- Ribbon Tails -->
      <path d="M -3,3 Q -15,22 -20,30" stroke="url(#goldRibbon)" stroke-width="4" stroke-linecap="round" fill="none" />
      <path d="M 3,3 Q 15,20 18,28" stroke="url(#goldRibbon)" stroke-width="4" stroke-linecap="round" fill="none" />
    </g>

    <!-- Front Arm Hugging Box -->
    <path d="M -22,48 Q -5,60 12,54" stroke="#FED7AA" stroke-width="8" stroke-linecap="round" fill="none" />
    <circle cx="12" cy="54" r="5" fill="#FED7AA" /> <!-- Hand -->

    <!-- Present Tag: "Para: Fiorela" -->
    <g transform="translate(12, 32) rotate(-8)">
      <rect x="0" y="0" width="28" height="16" rx="2" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1" />
      <circle cx="4" cy="8" r="1.5" fill="#64748B" />
      <text x="7" y="11" font-size="7" font-family="sans-serif" font-weight="bold" fill="#E11D48">✦ 26 ✦</text>
    </g>
  </g>
</svg>'''

def make_killua_trip():
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 220" width="100%" height="100%">
  <defs>
    <filter id="chibiShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.25" />
    </filter>
    <linearGradient id="boxPink" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F43F5E" />
      <stop offset="100%" stop-color="#BE123C" />
    </linearGradient>
    <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FEF08A" />
      <stop offset="50%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>
  </defs>

  <!-- Small stone that tripped him -->
  <ellipse cx="65" cy="195" rx="8" ry="4" fill="#64748B" stroke="#475569" stroke-width="1.5" />
  <path d="M 60,190 L 72,185" stroke="#E2E8F0" stroke-width="2" stroke-linecap="round" />
  
  <!-- Comical shock exclamation marks -->
  <text x="25" y="45" font-family="sans-serif" font-size="28" font-weight="black" fill="#EF4444">!?</text>

  <!-- Killua Tripping / Flying Forward (Tilted 30 degrees) -->
  <g transform="translate(60, 60) rotate(26)" filter="url(#chibiShadow)">
    <!-- Legs Flailing in air -->
    <g transform="translate(20, 110)">
      <path d="M -10,0 L -28,-15 L -20,-22 L 0,-4 Z" fill="#A78BFA" />
      <path d="M -25,-18 L -38,-28" stroke="#FED7AA" stroke-width="8" stroke-linecap="round" />
      <path d="M -48,-32 C -50,-36 -44,-40 -38,-38 L -32,-32 C -32,-28 -44,-26 -48,-32 Z" fill="#6366F1" />

      <path d="M 10,0 L 25,22 L 18,28 L 0,6 Z" fill="#8B5CF6" />
      <path d="M 22,22 L 32,38" stroke="#FED7AA" stroke-width="8" stroke-linecap="round" />
      <path d="M 26,42 C 26,38 34,34 40,36 L 46,42 C 44,46 30,46 26,42 Z" fill="#4F46E5" />
    </g>

    <!-- Torso -->
    <g transform="translate(30, 75)">
      <path d="M 8,-6 L 22,-6 L 24,6 L 6,6 Z" fill="#1E293B" />
      <path d="M -2,4 Q 15,10 32,4 L 36,38 Q 15,44 -6,38 Z" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
      <polygon points="10,4 20,4 15,14" fill="#0F172A" />
    </g>

    <!-- Hair Back -->
    {get_killua_hair('trip')}

    <!-- Face (Pale) -->
    <path d="M 32,36 C 30,58 38,78 68,78 C 98,78 106,58 104,36 C 104,24 32,24 32,36 Z" fill="#FFF7ED" />

    <!-- Anime Sweat Drops -->
    <path d="M 22,35 C 18,30 24,20 28,26 C 30,30 26,38 22,35 Z" fill="#38BDF8" opacity="0.9" />
    <path d="M 108,30 C 104,25 110,15 114,21 C 116,25 112,33 108,30 Z" fill="#38BDF8" opacity="0.9" />

    <!-- Comical Shock Eyes: Spiral / Wide Blank (>o<) -->
    <!-- Left Eye: Spiral of panic -->
    <g transform="translate(48, 46)">
      <circle cx="6" cy="6" r="8" fill="#FFFFFF" stroke="#1E293B" stroke-width="2" />
      <path d="M 6,6 m -4,0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0" fill="none" stroke="#2563EB" stroke-width="1.5" stroke-linecap="round" />
    </g>
    <!-- Right Eye: Spiral of panic -->
    <g transform="translate(78, 46)">
      <circle cx="6" cy="6" r="8" fill="#FFFFFF" stroke="#1E293B" stroke-width="2" />
      <path d="M 6,6 m -4,0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0" fill="none" stroke="#2563EB" stroke-width="1.5" stroke-linecap="round" />
    </g>

    <!-- Comical Anime O-Mouth of Panic (D:) -->
    <ellipse cx="68" cy="68" rx="7" ry="8" fill="#991B1B" stroke="#450A0A" stroke-width="1.5" />
    <ellipse cx="68" cy="72" rx="4" ry="3" fill="#FDA4AF" />

    <!-- Bangs -->
    {get_killua_bangs()}

    <!-- Arms Flailing Up in shock -->
    <path d="M 25,80 Q 5,60 -5,45" stroke="#FED7AA" stroke-width="8" stroke-linecap="round" fill="none" />
    <circle cx="-5" cy="45" r="5" fill="#FED7AA" />
    <path d="M 65,80 Q 85,60 98,48" stroke="#FED7AA" stroke-width="8" stroke-linecap="round" fill="none" />
    <circle cx="98" cy="48" r="5" fill="#FED7AA" />
  </g>

  <!-- The Gift Box Flying / Slipping into air! -->
  <g transform="translate(130, 20) rotate(-18)" filter="url(#chibiShadow)">
    <rect x="0" y="20" width="80" height="70" rx="6" fill="url(#boxPink)" stroke="#9F1239" stroke-width="2" />
    <rect x="-4" y="14" width="88" height="14" rx="4" fill="#FDA4AF" stroke="#9F1239" stroke-width="2" />
    <rect x="34" y="20" width="12" height="70" fill="url(#goldRibbon)" />
    <rect x="0" y="50" width="80" height="12" fill="url(#goldRibbon)" />
    <!-- Flying Ribbon Loops -->
    <ellipse cx="40" cy="14" rx="14" ry="8" fill="url(#goldRibbon)" />
  </g>
</svg>'''

def make_killua_celebrate():
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200" width="100%" height="100%">
  <defs>
    <filter id="chibiShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.25" />
    </filter>
    <linearGradient id="blueEye" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0284C7" />
      <stop offset="40%" stop-color="#2563EB" />
      <stop offset="100%" stop-color="#1E3A8A" />
    </linearGradient>
  </defs>

  <g transform="translate(15, 10)" filter="url(#chibiShadow)">
    <!-- Standing Proud Legs -->
    <g transform="translate(48, 132)">
      <rect x="-12" y="0" width="12" height="22" rx="4" fill="#A78BFA" />
      <rect x="6" y="0" width="12" height="22" rx="4" fill="#8B5CF6" />
      <!-- Legs -->
      <line x1="-6" y1="20" x2="-6" y2="38" stroke="#FED7AA" stroke-width="8" stroke-linecap="round" />
      <line x1="12" y1="20" x2="12" y2="38" stroke="#FED7AA" stroke-width="8" stroke-linecap="round" />
      <!-- Shoes -->
      <path d="M -16,40 C -16,36 -8,34 -2,36 L 2,42 C 0,46 -12,46 -16,40 Z" fill="#6366F1" />
      <rect x="-16" y="43" width="16" height="4" rx="2" fill="#FFFFFF" />
      <path d="M 6,40 C 6,36 14,34 20,36 L 24,42 C 22,46 10,46 6,40 Z" fill="#4F46E5" />
      <rect x="6" y="43" width="16" height="4" rx="2" fill="#FFFFFF" />
    </g>

    <!-- Torso -->
    <g transform="translate(36, 88)">
      <path d="M 8,-6 L 22,-6 L 24,6 L 6,6 Z" fill="#1E293B" />
      <path d="M -4,4 Q 15,8 34,4 L 36,44 Q 15,48 -6,44 Z" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5" />
      <polygon points="10,4 20,4 15,14" fill="#0F172A" />
    </g>

    <!-- Hair Back -->
    {get_killua_hair('celebrate')}

    <!-- Face -->
    <path d="M 32,36 C 30,58 38,78 68,78 C 98,78 106,58 104,36 C 104,24 32,24 32,36 Z" fill="#FFF7ED" />

    <!-- Cute Anime Blush -->
    <ellipse cx="44" cy="62" rx="6" ry="3.5" fill="#FDA4AF" opacity="0.8" />
    <ellipse cx="92" cy="62" rx="6" ry="3.5" fill="#FDA4AF" opacity="0.8" />

    <!-- Beaming Happy Anime Eyes (Happy Arcs / Cat Eyes) -->
    <!-- Left Eye: Happy Arc -->
    <path d="M 44,48 Q 52,40 60,48" stroke="#1E3A8A" stroke-width="3" stroke-linecap="round" fill="none" />
    <path d="M 44,52 Q 52,44 60,52" stroke="#38BDF8" stroke-width="1.5" stroke-linecap="round" fill="none" />
    <!-- Right Eye: Happy Arc -->
    <path d="M 76,48 Q 84,40 92,48" stroke="#1E3A8A" stroke-width="3" stroke-linecap="round" fill="none" />
    <path d="M 76,52 Q 84,44 92,52" stroke="#38BDF8" stroke-width="1.5" stroke-linecap="round" fill="none" />

    <!-- Killua's Famous Cat Smile :3 -->
    <path d="M 60,65 Q 64,68 68,64 Q 72,68 76,65" stroke="#991B1B" stroke-width="2" stroke-linecap="round" fill="none" />

    <!-- Bangs -->
    {get_killua_bangs()}

    <!-- Arms supporting cake on the right -->
    <path d="M 34,96 Q 50,105 75,102" stroke="#FED7AA" stroke-width="8" stroke-linecap="round" fill="none" />
    <circle cx="75" cy="102" r="5" fill="#FED7AA" />
    <!-- Right hand reaching towards cake -->
    <path d="M 65,96 Q 85,100 110,95" stroke="#FED7AA" stroke-width="8" stroke-linecap="round" fill="none" />
    <circle cx="110" cy="95" r="5" fill="#FED7AA" />

    <!-- Sparkle on head -->
    <path d="M 100,10 L 104,2 L 108,10 L 116,14 L 108,18 L 104,26 L 100,18 L 92,14 Z" fill="#FDE047" />
  </g>
</svg>'''

with open(r'd:\Proyectos\aleroif24-web\public\killua_running.svg', 'w', encoding='utf-8') as f:
    f.write(make_killua_running())

with open(r'd:\Proyectos\aleroif24-web\public\killua_trip.svg', 'w', encoding='utf-8') as f:
    f.write(make_killua_trip())

with open(r'd:\Proyectos\aleroif24-web\public\killua_celebrate.svg', 'w', encoding='utf-8') as f:
    f.write(make_killua_celebrate())

print('Saved all Killua SVGs successfully!')
