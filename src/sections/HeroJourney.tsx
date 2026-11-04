import { useEffect, useId, useRef, type CSSProperties, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';
import styles from './HeroJourney.module.css';

/* "Bottle to bar": the hero's right-hand scene. Five stations down a winding
   line - filled at the factory, shipped to Australia, New Zealand and the
   Pacific, received at our warehouses, delivered by truck, poured in bars,
   clubs, hotels and restaurants - each with its own looping motion, while
   the product travels the line and changes form at every stop (bottle,
   container, crate, truck, glass). The traveller runs on SMIL so it costs no
   JavaScript per frame; the stations are CSS. Both pause off-screen. */

const DUR = 13; // seconds per full journey
const N = 5;
const HOLD = 0.07; // share of the loop spent at each station (stationOn keyframes match)
const TRAVEL = (1 - N * HOLD) / (N - 1);
const holdStart = (k: number) => k * (HOLD + TRAVEL);

const TOP = 92; // y of the first node
const GAP = 120; // y between nodes
const SPINE_X = 210;
const nodeY = (k: number) => TOP + k * GAP;

const fmt = (n: number) => String(Math.round(n * 10000) / 10000);

// Spine: equal S-curves between nodes, so node k sits at k/(N-1) of the length
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

function Card({ k, x, w = 170, h = 104, num, title, note, children }: {
  k: number; x: number; w?: number; h?: number; num: string; title: string; note?: string; children: ReactNode;
}) {
  const y = k === N - 1 ? nodeY(k) + 14 : nodeY(k) - h / 2;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="2" y="7" width={w} height={h} rx="18" fill="rgba(28,36,64,0.07)" />
      <rect width={w} height={h} rx="18" fill="#fff" stroke="rgba(232,68,111,0.2)" />
      <rect width={w} height={h} rx="18" fill="none" stroke="#e8446f" strokeWidth="2" className={styles.cardOn} style={stationDelay(k)} />
      <text x="14" y="21" className={styles.num}>{num}</text>
      <text x="33" y="21" className={styles.title}>{title}</text>
      {note && <text x={w - 12} y="21" textAnchor="end" className={styles.note}>{note}</text>}
      {children}
    </g>
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

/* 01 - the factory fills the bottles */
function Fill({ uid }: { uid: string }) {
  return (
    <Card k={0} x={14} num="01" title="Fill" note="at the factory">
      <defs>
        <clipPath id={`${uid}line`}>
          <rect x="62" y="28" width="98" height="70" />
        </clipPath>
      </defs>
      {/* Factory: sawtooth roof, lit windows, smoking chimney */}
      <rect x="19" y="36" width="8" height="18" fill="#9fb0c6" />
      <circle cx="23" cy="32" r="4" fill="#e6eaf1" className={styles.smoke} />
      <circle cx="26" cy="31" r="3" fill="#e6eaf1" className={styles.smoke} style={delay(-1.1)} />
      <path d="M12 96 V58 L24 50 V58 L36 50 V58 L48 50 V58 L58 52 V96 Z" fill="#f4eef0" stroke="#1c2440" strokeWidth="1.3" strokeLinejoin="round" />
      {[[18, 64], [30, 64], [42, 64], [18, 76], [42, 76]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="7" height="7" rx="1" fill="#ffd27a" className={styles.window} style={delay(i * -0.7)} />
      ))}
      <rect x="29" y="80" width="9" height="16" fill="#1c2440" />

      {/* Filling line: steps one slot per cycle under the nozzle */}
      <g clipPath={`url(#${uid}line)`}>
        <g className={styles.conveyor}>
          <Bottle x={36} fill="empty" />
          <Bottle x={66} fill="empty" />
          <Bottle x={96} fill="filling" />
          <Bottle x={126} fill="full" />
          <Bottle x={156} fill="full" />
          <Bottle x={186} fill="full" />
        </g>
      </g>
      <rect x="105" y="28" width="12" height="9" rx="2" fill="#1c2440" />
      <path d="M108 37 H114 L112 41 H110 Z" fill="#1c2440" />
      <rect x="110.2" y="41" width="1.6" height="13" fill="#f06d8f" className={styles.stream} />
      <rect x="62" y="90" width="98" height="7" rx="3.5" fill="#1c2440" />
      <line x1="64" y1="93.5" x2="158" y2="93.5" stroke="#4a5577" strokeWidth="2" strokeDasharray="4 6" className={styles.belt} />
    </Card>
  );
}

/* 02 - by sea to Australia, New Zealand and the Pacific */
function Ship({ uid }: { uid: string }) {
  // Long enough to slide one 40px period left and still cover the card
  const wave = (y: number) => `M-40 ${y} q10 -4 20 0${' t20 0'.repeat(13)}`;
  return (
    <Card k={1} x={236} num="02" title="Ship" note="AU · NZ · Pacific">
      <defs>
        <clipPath id={`${uid}sea`}>
          <rect x="1" y="26" width="168" height="77" rx="17" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${uid}sea)`}>
        {/* Destination coast with a pin */}
        <path d="M128 76 C134 64 150 60 172 66 V80 H128 Z" fill="#cfe8d8" />
        <path d="M150 64 V54 M150 54 C146 52 143 54 141 56 M150 54 C154 51 157 53 159 55 M150 54 C148 50 149 47 151 46" stroke="#5f9c80" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <g transform="translate(138 52)">
          <g className={styles.pin}>
            <path d="M0 0 C-4 -4 -5 -7 -5 -9 A5 5 0 0 1 5 -9 C5 -7 4 -4 0 0Z" fill="#e8446f" />
            <circle cy="-9" r="1.8" fill="#fff" />
          </g>
        </g>
        <path d="M30 40 C60 30 100 32 132 46" stroke="#f2bccb" strokeWidth="1.4" strokeDasharray="2 4" fill="none" />

        {/* Sea */}
        <rect x="0" y="74" width="170" height="30" fill="#dcefff" />
        <path d={wave(78)} stroke="#a9d4f0" strokeWidth="1.6" fill="none" className={styles.wave} />
        <path d={wave(88)} stroke="#c2e1f5" strokeWidth="1.6" fill="none" className={styles.waveSlow} />

        {/* The ship rides the swell; the sea moves past */}
        <g className={styles.ship}>
          <circle cx="94" cy="38" r="3.5" fill="#e6eaf1" className={styles.smoke} />
          <circle cx="97" cy="37" r="2.6" fill="#e6eaf1" className={styles.smoke} style={delay(-1.2)} />
          <rect x="91" y="42" width="7" height="9" fill="#e8446f" />
          <rect x="84" y="50" width="16" height="20" rx="1.5" fill="#fff" stroke="#1c2440" strokeWidth="1.1" />
          <path d="M87 55 H97 M87 60 H97" stroke="#9fb0c6" strokeWidth="1.6" />
          {[[24, 58, '#e8446f'], [40, 58, '#5a6a9a'], [56, 58, '#ffb199'], [32, 48, '#9fb0c6'], [48, 48, '#e8446f'], [64, 48, '#1c2440']].map(([x, y, c], i) => (
            <rect key={i} x={x as number} y={y as number} width="15" height="10" rx="1" fill={c as string} stroke="rgba(28,36,64,0.35)" strokeWidth="0.6" />
          ))}
          <path d="M16 70 H108 L100 84 H26 Z" fill="#1c2440" />
          <path d="M19 74 H105" stroke="#e8446f" strokeWidth="2" />
          <text x="62" y="81.5" textAnchor="middle" className={styles.hullText}>3TWO1</text>
        </g>
        <g className={styles.wake}>
          <path d="M8 82 H18 M4 87 H16" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      </g>
    </Card>
  );
}

/* 03 - received into our warehouses */
function Warehouse() {
  return (
    <Card k={2} x={14} num="03" title="Warehouse">
      <text x="14" y="33" className={styles.tiny}>Sydney · Melbourne · Perth · Auckland</text>
      <path d="M8 96 H162" stroke="#d9cfd3" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 96 V52 L58 39 L106 52 V96 Z" fill="#f4eef0" stroke="#1c2440" strokeWidth="1.3" strokeLinejoin="round" />
      <rect x="26" y="60" width="64" height="36" fill="#2b3150" />
      {/* Racking with stock */}
      <path d="M28 73 H88 M28 85 H88" stroke="#5a6a9a" strokeWidth="1.4" />
      {[[30, 64], [42, 64], [54, 64], [72, 64], [34, 76], [50, 76], [66, 76], [78, 76], [38, 88], [62, 88]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="9" height={i > 7 ? 7 : 8} rx="0.8" fill={i % 3 === 0 ? '#e8446f' : '#d9a46a'} />
      ))}
      <path d="M26 60 H90" stroke="#9fb0c6" strokeWidth="2.4" />
      <text x="58" y="55.5" textAnchor="middle" className={styles.sign}>WAREHOUSE</text>

      {/* Forklift ferrying a crate in and out */}
      <g className={styles.forklift}>
        <g transform="translate(120 0)">
          <rect x="4" y="74" width="18" height="12" rx="2" fill="#ffb35c" stroke="#1c2440" strokeWidth="1" />
          <path d="M8 74 V66 H18 V74" stroke="#1c2440" strokeWidth="1.2" fill="none" />
          <path d="M2 62 V92 M2 90 H-8" stroke="#1c2440" strokeWidth="1.6" strokeLinecap="round" />
          <rect x="-9" y="79" width="10" height="10" rx="1" fill="#d9a46a" stroke="#8a5a3c" strokeWidth="0.8" />
          <path d="M-9 84 H1" stroke="#8a5a3c" strokeWidth="0.8" />
          <circle cx="8" cy="91" r="3.5" fill="#1c2440" />
          <circle cx="19" cy="91" r="3.5" fill="#1c2440" />
        </g>
      </g>
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

/* 04 - out on our trucks */
function Deliver({ uid }: { uid: string }) {
  return (
    <Card k={3} x={236} num="04" title="Deliver" note="to every venue">
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

/* 05 - poured in bars, clubs, hotels and restaurants */
function Venues({ uid }: { uid: string }) {
  return (
    <Card k={4} x={14} w={392} h={102} num="05" title="Bars, clubs, hotels & restaurants">
      <defs>
        <clipPath id={`${uid}coupe`}>
          <path d="M-11 -24 H11 C11 -14 6.5 -10 0 -10 C-6.5 -10 -11 -14 -11 -24Z" />
        </clipPath>
        <clipPath id={`${uid}club`}>
          <rect x="106" y="32" width="88" height="62" rx="10" />
        </clipPath>
        <linearGradient id={`${uid}eq`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#e8446f" />
          <stop offset="1" stopColor="#ffb199" />
        </linearGradient>
      </defs>

      {/* Bar */}
      <rect x="12" y="32" width="88" height="62" rx="10" fill="#fff4f6" />
      <text x="19" y="50" className={styles.neonGlow}>BAR</text>
      <text x="19" y="50" className={styles.neon}>BAR</text>
      <path d="M18 76 H58" stroke="#e7cdd4" strokeWidth="1.5" />
      {[22, 30, 38, 46, 54].map((x, i) => (
        <rect key={x} x={x - 2} y={i % 2 ? 66 : 62} width="4.5" height={i % 2 ? 10 : 14} rx="1.5" fill={['#e8446f', '#c99a4c', '#5f9c80', '#9b1d3f', '#ffb35c'][i]} opacity="0.85" />
      ))}
      <rect x="12" y="82" width="88" height="12" fill="#1c2440" />
      <g transform="translate(76 82)">
        <g clipPath={`url(#${uid}coupe)`}>
          <rect x="-11" y="-24" width="22" height="14" fill="#f06d8f" className={styles.coupeFill} />
        </g>
        <path d="M-11 -24 H11 C11 -14 6.5 -10 0 -10 C-6.5 -10 -11 -14 -11 -24Z" fill="none" stroke="#1c2440" strokeWidth="1.3" />
        <path d="M0 -10 V-1 M-6 0 H6" stroke="#1c2440" strokeWidth="1.3" strokeLinecap="round" />
      </g>
      <g transform="translate(90 40)">
        <g className={styles.pourBottle}>
          <path d="M-5 -14 V4 C-5 6 -2 7 -2 9 V14 H2 V9 C2 7 5 6 5 4 V-14 Z" fill="#5f9c80" stroke="#1c2440" strokeWidth="1" transform="rotate(-125)" />
        </g>
      </g>
      <path d="M81 46 C79 48 77 52 76.5 57" stroke="#f06d8f" strokeWidth="1.8" fill="none" strokeLinecap="round" className={styles.pourStream} />

      {/* Club */}
      <rect x="106" y="32" width="88" height="62" rx="10" fill="#1c2440" />
      <g clipPath={`url(#${uid}club)`}>
        <polygon points="150,38 118,96 132,96" fill="rgba(232,68,111,0.38)" className={styles.beam} />
        <polygon points="150,38 142,96 158,96" fill="rgba(255,177,153,0.32)" className={styles.beam} style={delay(-0.9)} />
        <polygon points="150,38 168,96 184,96" fill="rgba(140,180,255,0.32)" className={styles.beam} style={delay(-1.7)} />
        {[116, 128, 140, 152, 164, 176, 188].map((x, i) => (
          <rect key={x} x={x - 4} y="68" width="8" height="22" rx="2" fill={`url(#${uid}eq)`} className={styles.eq} style={delay(i * -0.17)} />
        ))}
        {[[114, 44], [186, 48], [176, 40], [122, 52]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.4" fill="#fff" className={styles.twinkle} style={delay(i * -0.6)} />
        ))}
      </g>
      <g transform="translate(150 38)">
        <circle r="6" fill="#d9def0" />
        <g className={styles.ballSpin}>
          <path d="M-6 0 H6 M0 -6 V6 M-4.2 -4.2 L4.2 4.2" stroke="#8d96b5" strokeWidth="0.7" />
        </g>
      </g>

      {/* Hotel: rooms lighting up through the evening */}
      <rect x="200" y="32" width="88" height="62" rx="10" fill="#f3f5fb" />
      <rect x="218" y="40" width="52" height="54" fill="#fff" stroke="#1c2440" strokeWidth="1.2" />
      <rect x="226" y="35" width="36" height="9" rx="2" fill="#1c2440" />
      <text x="244" y="41.8" textAnchor="middle" className={styles.hotelSign}>HOTEL</text>
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={224 + (i % 3) * 15} y={49 + Math.floor(i / 3) * 11} width="9" height="7" rx="1" fill="#ffd27a" className={styles.room} style={delay(i * -0.53)} />
      ))}
      <path d="M238 94 V84 H250 V94" fill="#e8446f" />
      <path d="M232 84 H256" stroke="#e8446f" strokeWidth="2.4" strokeLinecap="round" />

      {/* Restaurant */}
      <rect x="294" y="32" width="88" height="62" rx="10" fill="#fff8f0" />
      {Array.from({ length: 5 }, (_, i) => (
        <path key={i} d={`M${294 + i * 17.6} 32 h17.6 v9 a8.8 5.5 0 0 1 -17.6 0 z`} fill={i % 2 ? '#fff' : '#e8446f'} opacity={i % 2 ? 1 : 0.85} />
      ))}
      <path d="M300 84 H376 M306 84 V94 M370 84 V94" stroke="#8a5a3c" strokeWidth="2" strokeLinecap="round" />
      {[[318, styles.clinkL], [336, styles.clinkR]].map(([x, cls]) => (
        <g key={x as number} transform={`translate(${x} 84)`}>
          <g className={cls as string}>
            <path d="M-6 -24 H6 C6 -15 3 -12 0 -12 C-3 -12 -6 -15 -6 -24Z" fill="#fff" stroke="#1c2440" strokeWidth="1.1" />
            <path d="M-5.6 -19 H5.6 C5.4 -14.5 3 -12.6 0 -12.6 C-3 -12.6 -5.4 -14.5 -5.6 -19Z" fill="#9b1d3f" />
            <path d="M0 -12 V-1 M-4 0 H4" stroke="#1c2440" strokeWidth="1.1" strokeLinecap="round" />
          </g>
        </g>
      ))}
      <path d="M327 51 l1.5 3.5 l3.5 1.5 l-3.5 1.5 l-1.5 3.5 l-1.5 -3.5 l-3.5 -1.5 l3.5 -1.5z" fill="#ffc785" className={styles.clinkSpark} />
      <g transform="translate(362 84)">
        <path d="M-10 0 A10 10 0 0 1 10 0 Z" fill="#dfe3ec" stroke="#1c2440" strokeWidth="1.1" />
        <circle cy="-11" r="1.6" fill="#1c2440" />
        <path d="M-12 0 H12" stroke="#1c2440" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M-3 -16 c-2 -3 2 -5 0 -8 M3 -16 c-2 -3 2 -5 0 -8" stroke="#c4cad8" strokeWidth="1.2" fill="none" strokeLinecap="round" className={styles.wisp} />
      </g>
    </Card>
  );
}

/* ---------------- Traveller forms ---------------- */

const FORMS: ReactNode[] = [
  // 0: a filled bottle leaves the factory
  <g key="bottle">
    <path d="M-4 8 V0 C-4 -2 -1.5 -3 -1.5 -5 V-8 H1.5 V-5 C1.5 -3 4 -2 4 0 V8 Z" fill="#f06d8f" stroke="#1c2440" />
    <rect x="-1.5" y="-9.5" width="3" height="2" fill="#e8446f" />
  </g>,
  // 1: in a shipping container off the ship
  <g key="container">
    <rect x="-8" y="-5.5" width="16" height="11" rx="1" fill="#e8446f" stroke="#1c2440" strokeWidth="0.9" />
    <path d="M-4.5 -4 V4 M-1.5 -4 V4 M1.5 -4 V4 M4.5 -4 V4" stroke="#fff" strokeWidth="0.8" opacity="0.8" />
  </g>,
  // 2: a crate out of the warehouse
  <g key="crate">
    <rect x="-7" y="-6" width="14" height="12" rx="1.5" fill="#d9a46a" stroke="#8a5a3c" />
    <path d="M-7 -1 H7 M0 -6 V6" stroke="#8a5a3c" strokeWidth="0.9" />
  </g>,
  // 3: on the delivery truck
  <g key="truck">
    <rect x="-9" y="-5" width="11" height="8" rx="1" fill="#fff" stroke="#1c2440" strokeWidth="0.9" />
    <path d="M2 3 V-2 H6 L9 1 V3 Z" fill="#e8446f" stroke="#1c2440" strokeWidth="0.9" strokeLinejoin="round" />
    <circle cx="-5" cy="4.5" r="1.8" fill="#1c2440" />
    <circle cx="5" cy="4.5" r="1.8" fill="#1c2440" />
  </g>,
  // 4: in the glass
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
      <svg ref={svg} viewBox="0 0 420 700" className={styles.svg}>
        <defs>
          <linearGradient id={`${uid}flow`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffb199" />
            <stop offset="1" stopColor="#e8446f" />
          </linearGradient>
        </defs>

        <text x="210" y="22" textAnchor="middle" className={styles.caption}>BOTTLE TO BAR</text>
        <text x="210" y="38" textAnchor="middle" className={styles.subcaption}>How every bottle reaches your venue</text>

        {/* The line the product travels */}
        <path id={`${uid}spine`} d={SPINE_D} fill="none" stroke="#f7d6df" strokeWidth="4" strokeLinecap="round" />
        <path d={SPINE_D} fill="none" stroke={`url(#${uid}flow)`} strokeWidth="2.6" strokeLinecap="round" strokeDasharray="1 11" className={styles.flow} />

        {/* Connectors from the line to each card */}
        {Array.from({ length: N - 1 }, (_, k) => (
          <path key={k} d={k % 2 ? `M${SPINE_X} ${nodeY(k)} H236` : `M184 ${nodeY(k)} H${SPINE_X}`} stroke="#f2bccb" strokeWidth="2" strokeDasharray="2 4" />
        ))}
        <path d={`M${SPINE_X} ${nodeY(N - 1)} V${nodeY(N - 1) + 14}`} stroke="#f2bccb" strokeWidth="2" strokeDasharray="2 4" />

        <Fill uid={uid} />
        <Ship uid={uid} />
        <Warehouse />
        <Deliver uid={uid} />
        <Venues uid={uid} />

        {/* Nodes light up as the product arrives */}
        {Array.from({ length: N }, (_, k) => (
          <g key={k} transform={`translate(${SPINE_X} ${nodeY(k)})`}>
            <circle r="7" fill="none" stroke="#e8446f" strokeWidth="2" className={styles.ring} style={stationDelay(k)} />
            <circle r="6" fill="#fff" stroke="#e8446f" strokeWidth="2" />
            <circle r="2.6" fill="#e8446f" />
          </g>
        ))}

        {/* The traveller: one product, a new form at every station */}
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
