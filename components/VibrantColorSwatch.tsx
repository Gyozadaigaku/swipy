import React, { useState, useEffect } from 'react'
import Vibrant from 'node-vibrant'
import { Palette } from 'node-vibrant/lib/color'

export type SwatchLabel =
  | 'Vibrant'
  | 'Muted'
  | 'DarkVibrant'
  | 'DarkMuted'
  | 'LightVibrant'
  | 'LightMuted'

export type ColorSwatch = {
  swatch: SwatchLabel
  color: string
}

export type VibrantColorSwatchProps = {
  swatch: ColorSwatch
}

const VibrantColorSwatch: React.FC<VibrantColorSwatchProps> = ({ src }) => {
  const [paletteData, setPaletteData] = useState<ColorSwatch[]>([])

  const handlePostRequest = async (src: string) => {
    const palette: Palette = await Vibrant.from(src).getPalette()
    const newPaletteData = Object.keys(palette).map((p: string): any => {
      if (palette.hasOwnProperty(p) && palette[p]) {
        return { swatch: p, color: palette[p]?.getHex() }
      }
    })
    setPaletteData(newPaletteData)
  }

  useEffect(() => {
    handlePostRequest(src)
  }, [src])

  return (
    <ul className="flex h-8 w-full">
      {paletteData.map((palette: ColorSwatch) => {
        return (
          <li
            className="w-full"
            key={palette.swatch}
            style={{ background: `${palette.color}` }}
          ></li>
        )
      })}
    </ul>
  )
}

export default VibrantColorSwatch
