import { simppaPalette } from "./colors"
import { PixelCanvas, PixelLayer } from "./pixel-art"
import { MOTION } from "./motion"
import { HEADS, REST_FRAME, SPRITE, type Frame } from "./sprites"

export function SimppaSprite({
  frame = REST_FRAME,
  blink = false,
  className,
}: {
  frame?: Frame
  blink?: boolean
  className?: string
}) {
  return (
    <PixelCanvas
      width={SPRITE.width}
      height={SPRITE.height}
      scale={MOTION.scale}
      className={className}
    >
      <PixelLayer grid={frame.body} palette={simppaPalette} />
      <PixelLayer
        grid={blink ? HEADS.blink : HEADS.open}
        palette={simppaPalette}
        x={frame.head.x}
        y={frame.head.y}
      />
    </PixelCanvas>
  )
}
