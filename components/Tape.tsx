/** The measuring-tape strip across the top of every page. Inch marks with 1/8 in ticks. */
export function Tape() {
  const inches = 48;
  const px = 48; // one inch on screen
  const ticks = [];
  for (let i = 0; i <= inches * 8; i++) {
    const x = i * (px / 8);
    const h = i % 8 === 0 ? 14 : i % 4 === 0 ? 10 : i % 2 === 0 ? 7 : 4;
    ticks.push(<line key={i} x1={x + 0.5} x2={x + 0.5} y1={0} y2={h} />);
  }
  const nums = [];
  for (let i = 1; i < inches; i++)
    nums.push(
      <text key={i} x={i * px} y={26} textAnchor="middle">
        {i}
      </text>,
    );
  return (
    <div className="tape" aria-hidden="true">
      <svg width={inches * px} height={30} viewBox={`0 0 ${inches * px} 30`}>
        {ticks}
        {nums}
      </svg>
    </div>
  );
}
