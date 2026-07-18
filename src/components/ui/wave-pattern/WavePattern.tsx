const wavePatternTop = encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 80' width='200' height='80'>
    <defs>
      <linearGradient id='waveGradient' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stop-color='#B8E9EB' stop-opacity='1' />
        <stop offset='100%' stop-color='#B8E9EB' stop-opacity='0.6' />
      </linearGradient>
    </defs>
    <path d='M0 80 V30 Q50 -10 100 30 T200 30 V80 z' fill='url(#waveGradient)' opacity='0.3'/>
    <path d='M0 80 V45 Q50 15 100 45 T200 45 V80 z' fill='url(#waveGradient)'/>
  </svg>
`);

const wavePatternBottom = encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 80' width='200' height='80'>
    <defs>
      <linearGradient id='waveGradient' x1='0' y1='1' x2='0' y2='0'>
        <stop offset='0%' stop-color='#B8E9EB' stop-opacity='1' />
        <stop offset='100%' stop-color='#B8E9EB' stop-opacity='0.6' />
      </linearGradient>
    </defs>
    <path d='M0 0 V50 Q50 90 100 50 T200 50 V0 z' fill='url(#waveGradient)' opacity='0.3'/>
    <path d='M0 0 V35 Q50 65 100 35 T200 35 V0 z' fill='url(#waveGradient)'/>
  </svg>
`);

export function WavePatternTop() {
  return(
    <div 
        className="absolute bottom-0 left-0 z-0 h-[4rem] w-full md:h-[6rem]"
        style={{
          backgroundImage: `url("data:image/svg+xml,${wavePatternTop}")`,
          backgroundRepeat: "repeat-x", 
          backgroundSize: "auto 100%", 
          backgroundPosition: "bottom"
        }}
      ></div>
  )
}

export function WavePatternBottom() {
  return(
    <div 
        className="absolute left-0 top-0 z-0 h-[4rem] w-full md:h-[6rem]"
        style={{
          backgroundImage: `url("data:image/svg+xml,${wavePatternBottom}")`,
          backgroundRepeat: "repeat-x", 
          backgroundSize: "auto 100%", 
          backgroundPosition: "top"
        }}
      ></div>
  )
}