import React, { useState, useEffect } from 'react'
import Vibrant from 'node-vibrant'

const VibrantColorSwatch = ({ src }) => {
  const [paletteData, setPaletteData] = useState([])

  const handlePostRequest = async (src: string) => {
    const palette = await Vibrant.from(src).getPalette()
    for (const swatch in palette) {
      if (palette.hasOwnProperty(swatch) && palette[swatch]) {
        console.log(swatch, palette[swatch].getHex())
        setPaletteData([...paletteData, palette[swatch].getHex()])
      }
    }
  }

  useEffect(() => {
    handlePostRequest(src)
  }, [])

  return <div>{paletteData[0]}</div>
}

export default VibrantColorSwatch
