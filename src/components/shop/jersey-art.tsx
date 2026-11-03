import { useId } from 'react'

import { cn } from '@/lib/utils'
import type { JerseyPattern, ProductColors } from '@/types'

const BODY_PATH =
  'M118 92C118 78 130 70 144 66L170 54C188 68 232 68 250 54L276 66C290 70 302 78 302 92L352 128C358 132 360 140 356 147L332 190C328 197 320 199 313 195L300 185L308 402C308 412 300 419 290 421C240 432 180 432 130 421C120 419 112 412 112 402L120 185L107 195C100 199 92 197 88 190L64 147C60 140 62 132 68 128L118 92Z'

const COLLAR_PATH = 'M168 54C180 86 198 96 210 96C222 96 240 86 252 54'

interface JerseyArtProps {
  pattern: JerseyPattern
  colors: ProductColors
  number: string
  view?: 'front' | 'back'
  label: string
  className?: string
}

export function JerseyArt({
  pattern,
  colors,
  number,
  view = 'front',
  label,
  className,
}: JerseyArtProps) {
  const rawId = useId()
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, '')
  const bodyClip = `jersey-body-${uid}`
  const shade = `jersey-shade-${uid}`
  const checks = `jersey-checks-${uid}`

  return (
    <svg
      viewBox="0 0 420 500"
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-auto w-full', className)}
    >
      <defs>
        <clipPath id={bodyClip}>
          <path d={BODY_PATH} />
        </clipPath>
        <linearGradient id={shade} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#0b1526" stopOpacity="0.22" />
        </linearGradient>
        <pattern id={checks} width="54" height="54" patternUnits="userSpaceOnUse">
          <rect width="27" height="27" fill={colors.accent} fillOpacity="0.55" />
          <rect x="27" y="27" width="27" height="27" fill={colors.accent} fillOpacity="0.55" />
        </pattern>
      </defs>

      <ellipse cx="210" cy="462" rx="132" ry="16" fill="#0b1526" opacity="0.12" />

      <g clipPath={`url(#${bodyClip})`}>
        <rect width="420" height="500" fill={colors.base} />
        {pattern === 'stripes' &&
          Array.from({ length: 8 }).map((_, index) => (
            <rect
              key={index}
              x={56 + index * 52}
              y="0"
              width="26"
              height="500"
              fill={colors.accent}
            />
          ))}
        {pattern === 'halves' && <rect x="0" y="0" width="211" height="500" fill={colors.accent} />}
        {pattern === 'sash' && (
          <g transform="rotate(-24 210 240)">
            <rect x="158" y="-80" width="104" height="660" fill={colors.accent} />
            <rect x="126" y="-80" width="10" height="660" fill={colors.trim} opacity="0.65" />
          </g>
        )}
        {pattern === 'checks' && <rect width="420" height="500" fill={`url(#${checks})`} />}
        {pattern === 'retro' &&
          Array.from({ length: 6 }).map((_, index) => (
            <rect
              key={index}
              x="0"
              y={48 + index * 76}
              width="420"
              height="34"
              fill={colors.accent}
            />
          ))}
        <rect width="420" height="500" fill={`url(#${shade})`} />
        <path
          d="M120 185L112 402C112 412 120 419 130 421"
          stroke="#0b1526"
          strokeOpacity="0.12"
          strokeWidth="12"
          fill="none"
        />
        <path
          d="M300 185L308 402C308 412 300 419 290 421"
          stroke="#0b1526"
          strokeOpacity="0.12"
          strokeWidth="12"
          fill="none"
        />
      </g>

      <path d={BODY_PATH} fill="none" stroke="#0b1526" strokeOpacity="0.2" strokeWidth="2" />

      {view === 'front' ? (
        <>
          <path
            d={COLLAR_PATH}
            fill="none"
            stroke={colors.trim}
            strokeLinecap="round"
            strokeWidth="11"
          />
          <path d={COLLAR_PATH} fill="none" stroke="#0b1526" strokeOpacity="0.22" strokeWidth="3" />
          <g transform="translate(138 136) scale(0.56)">
            <path
              d="M0 0H44V30C44 42 34 50 22 56C10 50 0 42 0 30Z"
              fill="#0b1526"
              fillOpacity="0.82"
              stroke={colors.trim}
              strokeWidth="3"
            />
            <text
              x="22"
              y="33"
              textAnchor="middle"
              fill="#ffffff"
              fontFamily="Archivo Variable, Archivo, sans-serif"
              fontSize="20"
              fontWeight="700"
            >
              B
            </text>
          </g>
          <text
            x="210"
            y="238"
            textAnchor="middle"
            fill={colors.trim}
            fontFamily="Archivo Variable, Archivo, sans-serif"
            fontSize="17"
            fontWeight="600"
            letterSpacing="7"
            opacity="0.95"
          >
            BLAUGRANA
          </text>
          <text
            x="210"
            y="362"
            textAnchor="middle"
            fill={colors.trim}
            fontFamily="Archivo Variable, Archivo, sans-serif"
            fontSize="116"
            fontWeight="800"
            letterSpacing="-4"
          >
            {number}
          </text>
        </>
      ) : (
        <>
          <path
            d="M174 58C188 76 232 76 246 58"
            fill="none"
            stroke={colors.trim}
            strokeLinecap="round"
            strokeWidth="9"
          />
          <text
            x="210"
            y="210"
            textAnchor="middle"
            fill={colors.trim}
            fontFamily="Archivo Variable, Archivo, sans-serif"
            fontSize="20"
            fontWeight="600"
            letterSpacing="5"
            opacity="0.95"
          >
            BLAUGRANA
          </text>
          <text
            x="210"
            y="352"
            textAnchor="middle"
            fill={colors.trim}
            fontFamily="Archivo Variable, Archivo, sans-serif"
            fontSize="132"
            fontWeight="800"
            letterSpacing="-6"
          >
            {number}
          </text>
          <text
            x="210"
            y="402"
            textAnchor="middle"
            fill={colors.trim}
            fontFamily="Inter Variable, Inter, sans-serif"
            fontSize="12"
            fontWeight="600"
            letterSpacing="4"
            opacity="0.7"
          >
            26/27
          </text>
        </>
      )}

      <path d="M70 146L92 188" stroke={colors.trim} strokeLinecap="round" strokeWidth="9" />
      <path d="M350 146L328 188" stroke={colors.trim} strokeLinecap="round" strokeWidth="9" />
      <path
        d="M114 400C164 412 256 412 306 400"
        stroke={colors.trim}
        strokeLinecap="round"
        strokeWidth="4"
        opacity="0.55"
      />
    </svg>
  )
}
