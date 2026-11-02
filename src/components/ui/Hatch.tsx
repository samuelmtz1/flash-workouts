import { useId } from 'react';
import Svg, { Defs, Line, Pattern, Rect } from 'react-native-svg';

// Trama diagonal: en toda la app significa "parcial o secundario"
// (músculo secundario, semana de descarga, día de descanso, algo pendiente).
export function Hatch({
  width,
  height,
  color,
  spacing = 6,
  strokeWidth = 1.25,
  radius = 0,
}: {
  width: number | `${number}%`;
  height: number | `${number}%`;
  color: string;
  spacing?: number;
  strokeWidth?: number;
  radius?: number;
}) {
  const id = useId().replace(/:/g, '');
  return (
    <Svg width={width} height={height} aria-hidden>
      <Defs>
        <Pattern id={id} patternUnits="userSpaceOnUse" width={spacing} height={spacing} patternTransform="rotate(45)">
          <Line x1={0} y1={0} x2={0} y2={spacing} stroke={color} strokeWidth={strokeWidth} />
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" rx={radius} fill={`url(#${id})`} />
    </Svg>
  );
}
