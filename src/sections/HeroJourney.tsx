import { useEffect, useId, useRef, type CSSProperties, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';
import styles from './HeroJourney.module.css';

/* "Field to glass": the hero's right-hand scene. Six stations down a winding
   line - harvest, distil, age, bottle, distribute, pour - each with its own
   looping motion, while the product travels the line and changes form at
   every stop (piña, spirit, barrel, bottle, crate, cocktail). The traveller
   runs on SMIL so it costs no JavaScript per frame; the stations are CSS.
   Both pause while the hero is off-screen. */

const DUR = 14; // seconds per full journey
const N = 6;
const HOLD = 0.07; // share of the loop spent at each station
const TRAVEL = (1 - N * HOLD) / (N - 1);
const holdStart = (k: number) => k * (HOLD + TRAVEL);

const TOP = 92; // y of the first node
const GAP = 120; // y between nodes
const SPINE_X = 210;
const nodeY = (k: number) => TOP + k * GAP;

const fmt = (n: number) => String(Math.round(n * 10000) / 10000);

// Spine: equal S-curves between nodes, so node k sits at k/5 of the length
const SPINE = Array.from({ length: N - 1 }, (_, k) => {
  const s = k % 2 ? -24 : 24;
  const y = nodeY(k);
  return `C ${SPINE_X + s} ${y + 40} ${SPINE_X + s} ${y + 80} ${SPINE_X} ${y + GAP}`;
}).join(' ');
const SPINE_D = `M ${SPINE_X} ${nodeY(0)} ${SPINE}`;

// Traveller timing: hold at each node, travel between them
const motionTimes: string[] = [];
const motionPoints: string[] = [];
for (let k = 0; k < N; k++) {
  motionTimes.push(fmt(holdStart(k)), k === N - 1 ? '1' : fmt(holdStart(k) + HOLD));
  motionPoints.push(fmt(k / (N - 1)), fmt(k / (N - 1)));
}

/** Discrete opacity window for the traveller's form after station `i`. */
function windowAnim(i: number) {
  if (i === 0) return { values: '1;0', keyTimes: `0;${fmt(holdStart(1))}` };
  if (i === N - 1) return { values: '0;1', keyTimes: `0;${fmt(holdStart(i))}` };
  return { values: '0;1;0', keyTimes: `0;${fmt(holdStart(i))};${fmt(holdStart(i + 1))}` };
}

const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });
const stationDelay = (k: number): CSSProperties => ({ animationDelay: `${holdStart(k) * DUR}s`, animationDuration: `${DUR}s` });

/* ---------------- Station cards ---------------- */

function Card({ k, x, w = 170, h = 104, num, title, children }: {
  k: number; x: number; w?: number; h?: number; num: string; title: string; children: ReactNode;
}) {
  const y = k === N - 1 ? nodeY(k) + 14 : nodeY(k) - h / 2;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="2" y="7" width={w} height={h} rx="18" fill="rgba(28,36,64,0.07)" />
      <rect width={w} height={h} rx="18" fill="#fff" stroke="rgba(232,68,111,0.2)" />
      <rect width={w} height={h} rx="18" fill="none" stroke="#e8446f" strokeWidth="2" className={styles.cardOn} style={stationDelay(k)} />
      <text x="14" y="21" className={styles.num}>{num}</text>
      <text x="33" y="21" className={styles.title}>{title}</text>
      {children}
    </g>
  );
}

const Leaf = ({ d, fill }: { d: string; fill: string }) => <path d={d} fill={fill} />;

function Agave({ x, s, d }: { x: number; s: number; d: number }) {
  return (
    <g transform={`translate(${x} 92) scale(${s})`}>
      <g className={styles.sway} style={delay(d)}>
        <Leaf d="M0 0 C-5 -9 -15 -20 -26 -24 C-15 -15 -7 -7 0 0Z" fill="#5f9c80" />
        <Leaf d="M0 0 C5 -9 15 -20 26 -24 C15 -15 7 -7 0 0Z" fill="#5f9c80" />
        <Leaf d="M0 0 C-3 -12 -9 -26 -13 -36 C-5 -25 -1 -12 0 0Z" fill="#7fb89c" />
        <Leaf d="M0 0 C3 -12 9 -26 13 -36 C5 -25 1 -12 0 0Z" fill="#7fb89c" />
        <Leaf d="M-2.4 0 C-2.4 -15 -1 -30 0 -42 C1 -30 2.4 -15 2.4 0Z" fill="#4f8a6f" />
      </g>
    </g>
  );
}

function Harvest() {
  return (
    <Card k={0} x={14} num="01" title="Harvest">
      <g transform="translate(145 42)">
        <g className={styles.spin}>
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1="0" y1="-11" x2="0" y2="-15" stroke="#ffb35c" strokeWidth="2" strokeLinecap="round" transform={`rotate(${i * 45})`} />
          ))}
        </g>
        <circle r="8" fill="#ffc785" />
      </g>
      <path d="M12 93 H158" stroke="#eadcd2" strokeWidth="2" strokeLinecap="round" />
      <Agave x={38} s={0.9} d={0} />
      <Agave x={112} s={1.05} d={-1.1} />
      <g transform="translate(74 86)">
        <g className={styles.hop}>
          <ellipse rx="10" ry="7.5" fill="#e9c47c" stroke="#c99a4c" strokeWidth="1.2" />
          <path d="M-6 -4 L4 6 M-1 -6 L8 2 M-8 1 L-1 7 M6 -5 L-5 6 M1 -7 L-8 3" stroke="#c99a4c" strokeWidth="0.8" />
          <path d="M-3 -7 L-5 -12 M0 -7.5 L0 -13 M3 -7 L5 -12" stroke="#5f9c80" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>
    </Card>
  );
}

function Distil({ uid }: { uid: string }) {
  return (
    <Card k={1} x={236} num="02" title="Distil">
      <defs>
        <linearGradient id={`${uid}cu`} x1="0" x2="1">
          <stop offset="0" stopColor="#eaa774" />
          <stop offset="1" stopColor="#b5643a" />
        </linearGradient>
        <clipPath id={`${uid}pot`}>
          <ellipse cx="52" cy="72" rx="24" ry="16" />
        </clipPath>
      </defs>
      <g transform="translate(52 96)">
        <path className={styles.flame} d="M-8 0 C-8 -6 -3 -8 -2 -14 C1 -9 6 -8 6 -2 C6 2 3 3 0 3 C-4 3 -8 2 -8 0Z" fill="#ff8a4c" />
        <path className={styles.flame} style={delay(-0.2)} d="M-4 0 C-4 -3 -1 -5 -1 -8 C1 -5 3 -4 3 -1 C3 1 1 2 0 2 C-2 2 -4 1 -4 0Z" fill="#ffd27a" />
      </g>
      <path d="M32 86 L28 99 M72 86 L76 99" stroke="#8a5a3c" strokeWidth="2" strokeLinecap="round" />
      <path d="M54 43 C70 28 100 28 119 47" stroke="#c97a48" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M42 60 C42 48 46 41 52 41 C58 41 62 48 62 60Z" fill="#c97a48" />
      <ellipse cx="52" cy="72" rx="24" ry="16" fill={`url(#${uid}cu)`} />
      <g clipPath={`url(#${uid}pot)`}>
        {[44, 52, 60, 48].map((x, i) => (
          <circle key={i} cx={x} cy="84" r="1.8" fill="#ffe1c4" className={styles.bubble} style={delay(i * -0.45)} />
        ))}
      </g>
      <ellipse cx="45" cy="66" rx="7" ry="3.5" fill="#fff" opacity="0.35" />
      <rect x="110" y="46" width="22" height="38" rx="5" fill="#eef2f8" stroke="#9fb0c6" />
      <path d="M114 52 l14 5 l-14 5 l14 5 l-14 5 l14 5" stroke="#c97a48" strokeWidth="2" fill="none" strokeLinejoin="round" />
      <circle cx="121" cy="40" r="4" fill="#dfe6f0" className={styles.steam} />
      <circle cx="125" cy="40" r="3" fill="#dfe6f0" className={styles.steam} style={delay(-1)} />
      <path d="M121 84 V88" stroke="#9fb0c6" strokeWidth="2" />
      <circle cx="121" cy="89" r="1.8" fill="#e8446f" className={styles.drip} />
      <rect x="113" y="92" width="16" height="9" rx="2" fill="rgba(232,68,111,0.12)" stroke="#e8446f" />
      <rect x="114.5" y="96" width="13" height="4" rx="1" fill="#f06d8f" />
    </Card>
  );
}

function Barrel({ x, y, d }: { x: number; y: number; d: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="17" fill="#b97a48" stroke="#7c4a28" strokeWidth="1.5" />
      <circle r="12.5" fill="none" stroke="#7c4a28" strokeOpacity="0.5" />
      <path d="M-6 -15.5 V15.5 M6 -15.5 V15.5" stroke="#7c4a28" strokeOpacity="0.35" />
      <circle r="2.2" fill="#5a3418" />
      <path className={styles.twinkle} style={delay(d)} d="M10 -10 l1.4 3.4 l3.4 1.4 l-3.4 1.4 l-1.4 3.4 l-1.4 -3.4 l-3.4 -1.4 l3.4 -1.4z" fill="#ffe7b0" />
    </g>
  );
}

function Age() {
  return (
    <Card k={2} x={14} num="03" title="Age">
      <path d="M22 98 H112" stroke="#8a5a3c" strokeWidth="2.5" strokeLinecap="round" />
      <Barrel x={46} y={80} d={0} />
      <Barrel x={86} y={80} d={-1.3} />
      <Barrel x={66} y={50} d={-2.4} />
      <g transform="translate(140 62)">
        <circle r="16" fill="#fff" stroke="#1c2440" strokeWidth="1.6" />
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1="0" y1="-13" x2="0" y2={i % 3 ? -11.5 : -10.5} stroke="#1c2440" strokeWidth="1" transform={`rotate(${i * 30})`} />
        ))}
        <line x1="0" y1="0" x2="0" y2="-7" stroke="#1c2440" strokeWidth="2" strokeLinecap="round" className={styles.hourHand} />
        <line x1="0" y1="0" x2="0" y2="-11" stroke="#e8446f" strokeWidth="1.4" strokeLinecap="round" className={styles.minuteHand} />
        <circle r="1.8" fill="#1c2440" />
        <text y="29" textAnchor="middle" className={styles.tiny}>years in oak</text>
      </g>
    </Card>
  );
}

function Bottle({ x, fill }: { x: number; fill: 'empty' | 'filling' | 'full' }) {
  return (
    <g transform={`translate(${x} 0)`}>
      {fill !== 'empty' && (
        <rect x="-5.8" y="64" width="11.6" height="25" fill="#f06d8f" className={fill === 'filling' ? styles.fillUp : undefined} />
      )}
      <path d="M-7 90 V64 C-7 60 -3 58 -2.5 54 V46 H2.5 V54 C3 58 7 60 7 64 V90 Z" fill="rgba(255,255,255,0.35)" stroke="#1c2440" strokeWidth="1.2" />
      <rect x="-3" y="43" width="6" height="4" rx="1" fill="#e8446f" />
      <rect x="-5" y="71" width="10" height="8" rx="1" fill="#fff" opacity="0.92" />
      <path d="M-3 75 H3" stroke="#e8446f" strokeWidth="1" />
    </g>
  );
}

function BottleLine({ uid }: { uid: string }) {
  return (
    <Card k={3} x={236} num="04" title="Bottle">
      <defs>
        <clipPath id={`${uid}line`}>
          <rect x="10" y="28" width="150" height="70" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${uid}line)`}>
        <g className={styles.conveyor}>
          <Bottle x={-5} fill="empty" />
          <Bottle x={31} fill="empty" />
          <Bottle x={67} fill="filling" />
          <Bottle x={103} fill="full" />
          <Bottle x={139} fill="full" />
          <Bottle x={175} fill="full" />
        </g>
      </g>
      <rect x="79" y="28" width="12" height="9" rx="2" fill="#1c2440" />
      <path d="M82 37 H88 L86 41 H84 Z" fill="#1c2440" />
      <rect x="84.2" y="41" width="1.6" height="13" fill="#f06d8f" className={styles.stream} />
      <rect x="10" y="90" width="150" height="7" rx="3.5" fill="#1c2440" />
      <line x1="12" y1="93.5" x2="158" y2="93.5" stroke="#4a5577" strokeWidth="2" strokeDasharray="4 6" className={styles.belt} />
    </Card>
  );
}

function Tree({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <path d="M0 82 V72" stroke="#8a6a52" strokeWidth="2" />
      <circle cy="66" r="8" fill="#a9d3bc" />
    </g>
  );
}

function Distribute({ uid }: { uid: string }) {
  return (
    <Card k={4} x={14} num="05" title="Distribute">
      <defs>
        <clipPath id={`${uid}road`}>
          <rect x="10" y="28" width="150" height="72" rx="8" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${uid}road)`}>
        <path d="M0 84 C30 66 60 70 90 78 C120 86 150 64 180 74 V84 Z" fill="#fbe6ec" />
        <g className={styles.trees}>
          {[16, 66, 116, 166, 216].map((x) => <Tree key={x} x={x} />)}
        </g>
        <rect x="0" y="84" width="180" height="14" fill="#2b3150" />
        <line x1="0" y1="91" x2="180" y2="91" stroke="#fff" strokeWidth="1.6" strokeDasharray="9 9" className={styles.lane} />
        <g className={styles.speed}>
          <path d="M26 60 H38 M20 68 H36 M28 76 H40" stroke="#e8446f" strokeWidth="1.6" strokeLinecap="round" />
        </g>
        <g className={styles.truck}>
          <rect x="46" y="54" width="56" height="28" rx="3" fill="#fff" stroke="#1c2440" strokeWidth="1.4" />
          <rect x="46.7" y="71" width="54.6" height="4" fill="#e8446f" />
          <text x="74" y="66" textAnchor="middle" className={styles.truckText}>3Two1</text>
          <path d="M102 82 V61 H116 L125 70 V82 Z" fill="#e8446f" stroke="#1c2440" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M106 64 H115 L120 70 H106 Z" fill="#dff0ff" />
          {[58, 90, 116].map((cx) => (
            <g key={cx} transform={`translate(${cx} 84)`}>
              <circle r="5.5" fill="#1c2440" />
              <g className={styles.wheel}>
                <circle r="2.4" fill="#c9cfdf" />
                <path d="M-4 0 H4" stroke="#c9cfdf" strokeWidth="1.2" />
              </g>
            </g>
          ))}
        </g>
      </g>
    </Card>
  );
}

function Pour({ uid }: { uid: string }) {
  return (
    <Card k={5} x={14} w={392} h={102} num="06" title="Pour - bars, clubs & restaurants">
      <defs>
        <clipPath id={`${uid}coupe`}>
          <path d="M-12 -26 H12 C12 -15 7 -11 0 -11 C-7 -11 -12 -15 -12 -26Z" />
        </clipPath>
        <clipPath id={`${uid}club`}>
          <rect x="137" y="32" width="118" height="62" rx="10" />
        </clipPath>
        <linearGradient id={`${uid}eq`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#e8446f" />
          <stop offset="1" stopColor="#ffb199" />
        </linearGradient>
      </defs>

      {/* Bar */}
      <rect x="12" y="32" width="118" height="62" rx="10" fill="#fff4f6" />
      <text x="20" y="52" className={styles.neonGlow}>BAR</text>
      <text x="20" y="52" className={styles.neon}>BAR</text>
      <path d="M20 76 H74" stroke="#e7cdd4" strokeWidth="1.5" />
      {[24, 33, 42, 51, 60, 69].map((x, i) => (
        <rect key={x} x={x - 2} y={i % 2 ? 66 : 62} width="4.5" height={i % 2 ? 10 : 14} rx="1.5" fill={['#e8446f', '#c99a4c', '#5f9c80', '#9b1d3f', '#ffb35c', '#7fb89c'][i]} opacity="0.85" />
      ))}
      <rect x="12" y="82" width="118" height="12" rx="0" fill="#1c2440" />
      <g transform="translate(104 82)">
        <g clipPath={`url(#${uid}coupe)`}>
          <rect x="-12" y="-26" width="24" height="15" fill="#f06d8f" className={styles.coupeFill} />
        </g>
        <path d="M-12 -26 H12 C12 -15 7 -11 0 -11 C-7 -11 -12 -15 -12 -26Z" fill="none" stroke="#1c2440" strokeWidth="1.3" />
        <path d="M0 -11 V-1 M-6 0 H6" stroke="#1c2440" strokeWidth="1.3" strokeLinecap="round" />
      </g>
      <g transform="translate(118 40)">
        <g className={styles.pourBottle}>
          <path d="M-5 -14 V4 C-5 6 -2 7 -2 9 V14 H2 V9 C2 7 5 6 5 4 V-14 Z" fill="#5f9c80" stroke="#1c2440" strokeWidth="1" transform="rotate(-125)" />
        </g>
      </g>
      <path d="M109 46 C107 48 105 52 104.5 57" stroke="#f06d8f" strokeWidth="1.8" fill="none" strokeLinecap="round" className={styles.pourStream} />

      {/* Club */}
      <rect x="137" y="32" width="118" height="62" rx="10" fill="#1c2440" />
      <g clipPath={`url(#${uid}club)`}>
        <polygon points="196,38 160,96 176,96" fill="rgba(232,68,111,0.38)" className={styles.beam} />
        <polygon points="196,38 188,96 206,96" fill="rgba(255,177,153,0.32)" className={styles.beam} style={delay(-0.9)} />
        <polygon points="196,38 218,96 236,96" fill="rgba(140,180,255,0.32)" className={styles.beam} style={delay(-1.7)} />
        {[149, 162, 175, 188, 201, 214, 227, 240].map((x, i) => (
          <rect key={x} x={x - 4} y="68" width="8" height="22" rx="2" fill={`url(#${uid}eq)`} className={styles.eq} style={delay(i * -0.17)} />
        ))}
        {[[150, 44], [242, 48], [228, 40], [160, 52]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.4" fill="#fff" className={styles.twinkle} style={delay(i * -0.6)} />
        ))}
      </g>
      <g transform="translate(196 38)">
        <circle r="6" fill="#d9def0" />
        <g className={styles.ballSpin}>
          <path d="M-6 0 H6 M0 -6 V6 M-4.2 -4.2 L4.2 4.2" stroke="#8d96b5" strokeWidth="0.7" />
        </g>
      </g>

      {/* Restaurant */}
      <rect x="262" y="32" width="118" height="62" rx="10" fill="#fff8f0" />
      <g>
        {Array.from({ length: 6 }, (_, i) => (
          <path key={i} d={`M${262 + i * 19.67} 32 h19.67 v10 a9.83 6 0 0 1 -19.67 0 z`} fill={i % 2 ? '#fff' : '#e8446f'} opacity={i % 2 ? 1 : 0.85} />
        ))}
      </g>
      <path d="M272 84 H372 M282 84 V94 M362 84 V94" stroke="#8a5a3c" strokeWidth="2" strokeLinecap="round" />
      <g transform="translate(300 84)">
        <g className={styles.clinkL}>
          <path d="M-6 -24 H6 C6 -15 3 -12 0 -12 C-3 -12 -6 -15 -6 -24Z" fill="#fff" stroke="#1c2440" strokeWidth="1.1" />
          <path d="M-5.6 -19 H5.6 C5.4 -14.5 3 -12.6 0 -12.6 C-3 -12.6 -5.4 -14.5 -5.6 -19Z" fill="#9b1d3f" />
          <path d="M0 -12 V-1 M-4 0 H4" stroke="#1c2440" strokeWidth="1.1" strokeLinecap="round" />
        </g>
      </g>
      <g transform="translate(320 84)">
        <g className={styles.clinkR}>
          <path d="M-6 -24 H6 C6 -15 3 -12 0 -12 C-3 -12 -6 -15 -6 -24Z" fill="#fff" stroke="#1c2440" strokeWidth="1.1" />
          <path d="M-5.6 -19 H5.6 C5.4 -14.5 3 -12.6 0 -12.6 C-3 -12.6 -5.4 -14.5 -5.6 -19Z" fill="#9b1d3f" />
          <path d="M0 -12 V-1 M-4 0 H4" stroke="#1c2440" strokeWidth="1.1" strokeLinecap="round" />
        </g>
      </g>
      <path d="M310 52 l1.5 3.5 l3.5 1.5 l-3.5 1.5 l-1.5 3.5 l-1.5 -3.5 l-3.5 -1.5 l3.5 -1.5z" fill="#ffc785" className={styles.clinkSpark} />
      <g transform="translate(352 84)">
        <path d="M-12 0 A12 12 0 0 1 12 0 Z" fill="#dfe3ec" stroke="#1c2440" strokeWidth="1.1" />
        <circle cy="-13" r="1.8" fill="#1c2440" />
        <path d="M-14 0 H14" stroke="#1c2440" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M-4 -18 c-2 -3 2 -5 0 -8 M3 -18 c-2 -3 2 -5 0 -8" stroke="#c4cad8" strokeWidth="1.2" fill="none" strokeLinecap="round" className={styles.wisp} />
      </g>
    </Card>
  );
}

/* ---------------- Traveller forms ---------------- */

const FORMS: ReactNode[] = [
  // 0: piña, fresh from the field
  <g key="pina">
    <ellipse rx="6.5" ry="5.5" fill="#e9c47c" stroke="#c99a4c" />
    <path d="M-2 -5 L-3.5 -8.5 M0 -5.5 L0 -9.5 M2 -5 L3.5 -8.5" stroke="#5f9c80" strokeWidth="1.6" strokeLinecap="round" />
  </g>,
  // 1: spirit off the still
  <path key="drop" d="M0 -8 C3 -3 5.5 0 5.5 2.8 A5.5 5.5 0 0 1 -5.5 2.8 C-5.5 0 -3 -3 0 -8Z" fill="#f06d8f" />,
  // 2: resting in oak
  <g key="barrel">
    <rect x="-6" y="-7" width="12" height="14" rx="4" fill="#b97a48" stroke="#7c4a28" />
    <path d="M-6 -3 H6 M-6 3 H6" stroke="#7c4a28" />
  </g>,
  // 3: bottled
  <g key="bottle">
    <path d="M-4 8 V0 C-4 -2 -1.5 -3 -1.5 -5 V-8 H1.5 V-5 C1.5 -3 4 -2 4 0 V8 Z" fill="#f06d8f" stroke="#1c2440" />
    <rect x="-1.5" y="-9.5" width="3" height="2" fill="#e8446f" />
  </g>,
  // 4: boxed for the truck
  <g key="crate">
    <rect x="-7" y="-6" width="14" height="12" rx="1.5" fill="#d9a46a" stroke="#8a5a3c" />
    <path d="M-7 -1 H7 M0 -6 V6" stroke="#8a5a3c" strokeWidth="0.9" />
  </g>,
  // 5: in the glass
  <g key="glass">
    <path d="M-7 -6 H7 C7 0 3.5 2 0 2 C-3.5 2 -7 0 -7 -6Z" fill="#f06d8f" stroke="#1c2440" />
    <path d="M0 2 V7 M-3.5 7.5 H3.5" stroke="#1c2440" strokeLinecap="round" />
  </g>,
];

export default function HeroJourney() {
  const uid = `hj${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const wrap = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();

  // Run only while the hero is on screen (and never for reduced motion)
  useEffect(() => {
    const el = wrap.current;
    const s = svg.current;
    if (!el || !s) return;
    // SMIL time counts from page load, CSS animations from when they start
    // (a frame after mount): put the traveller on the stations' clock so it
    // reaches each one as that station lights up.
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => {
        const t = el.querySelector(`.${styles.cardOn}`)?.getAnimations()[0]?.currentTime;
        s.setCurrentTime(typeof t === 'number' ? t / 1000 : 0);
      });
    });
    const set = (on: boolean) => {
      el.classList.toggle(styles.paused, !on);
      if (on) s.unpauseAnimations(); else s.pauseAnimations();
    };
    if (reduced) { set(false); return () => cancelAnimationFrame(raf); }
    const io = new IntersectionObserver(([e]) => set(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [reduced]);

  return (
    <div ref={wrap} className={styles.wrap} aria-hidden="true">
      <svg ref={svg} viewBox="0 0 420 816" className={styles.svg}>
        <defs>
          <linearGradient id={`${uid}flow`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffb199" />
            <stop offset="1" stopColor="#e8446f" />
          </linearGradient>
        </defs>

        <text x="210" y="22" textAnchor="middle" className={styles.caption}>FIELD TO GLASS</text>
        <text x="210" y="38" textAnchor="middle" className={styles.subcaption}>The journey behind every pour</text>

        {/* The line the product travels */}
        <path id={`${uid}spine`} d={SPINE_D} fill="none" stroke="#f7d6df" strokeWidth="4" strokeLinecap="round" />
        <path d={SPINE_D} fill="none" stroke={`url(#${uid}flow)`} strokeWidth="2.6" strokeLinecap="round" strokeDasharray="1 11" className={styles.flow} />

        {/* Connectors from the line to each card */}
        {Array.from({ length: N - 1 }, (_, k) => (
          <path key={k} d={k % 2 ? `M${SPINE_X} ${nodeY(k)} H236` : `M184 ${nodeY(k)} H${SPINE_X}`} stroke="#f2bccb" strokeWidth="2" strokeDasharray="2 4" />
        ))}
        <path d={`M${SPINE_X} ${nodeY(N - 1)} V${nodeY(N - 1) + 14}`} stroke="#f2bccb" strokeWidth="2" strokeDasharray="2 4" />

        <Harvest />
        <Distil uid={uid} />
        <Age />
        <BottleLine uid={uid} />
        <Distribute uid={uid} />
        <Pour uid={uid} />

        {/* Nodes light up as the product arrives */}
        {Array.from({ length: N }, (_, k) => (
          <g key={k} transform={`translate(${SPINE_X} ${nodeY(k)})`}>
            <circle r="7" fill="none" stroke="#e8446f" strokeWidth="2" className={styles.ring} style={stationDelay(k)} />
            <circle r="6" fill="#fff" stroke="#e8446f" strokeWidth="2" />
            <circle r="2.6" fill="#e8446f" />
          </g>
        ))}

        {/* The traveller: one product, six forms */}
        <g>
          <animateMotion dur={`${DUR}s`} repeatCount="indefinite" calcMode="linear" keyPoints={motionPoints.join(';')} keyTimes={motionTimes.join(';')}>
            <mpath href={`#${uid}spine`} />
          </animateMotion>
          <circle r="17" fill="rgba(232,68,111,0.16)" className={styles.halo} />
          <circle r="12.5" fill="#fff" stroke="#e8446f" strokeWidth="1.6" />
          {FORMS.map((f, i) => {
            const w = windowAnim(i);
            return (
              <g key={i} opacity={i === 0 ? 1 : 0}>
                <animate attributeName="opacity" dur={`${DUR}s`} repeatCount="indefinite" calcMode="discrete" values={w.values} keyTimes={w.keyTimes} />
                {f}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
