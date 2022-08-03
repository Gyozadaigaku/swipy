import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import VibrantColorSwatch from './VibrantColorSwatch'

import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { BsPlay } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { Media } from './../types'
import { NextPage } from 'next'

interface IProps {
  post: Media
  isShowingOnHome?: boolean
}

const isVideoExtension = (fileName: string): boolean => {
  fileName = fileName.substring(fileName.lastIndexOf('.'))
  if (fileName.toUpperCase().match(/\.(mp4)$/i)) {
    return true
  }
  return false
}

const convertSizeUnit = (size: number) => {
  const { target, unit } = getTargetUnit(size)
  const newSize =
    target !== null
      ? Math.floor((size / target) * Math.pow(10, 2)) / Math.pow(10, 2)
      : size

  return newSize + unit
}

function getTargetUnit(size: number) {
  const kb = 1024
  const mb = Math.pow(kb, 2)
  const gb = Math.pow(kb, 3)
  const tb = Math.pow(kb, 4)

  const returnData = (target: number | null, unit: string) => ({ target, unit })

  if (size >= tb) return returnData(tb, 'TB')
  if (size >= gb) return returnData(gb, 'GB')
  if (size >= mb) return returnData(mb, 'MB')
  if (size >= kb) return returnData(kb, 'KB')

  return returnData(null, 'byte')
}

const MediaCard: NextPage<IProps> = ({
  post: { caption, media, _id, likes },
  isShowingOnHome,
}) => {
  const [playing, setPlaying] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause()
      setPlaying(false)
    } else {
      videoRef?.current?.play()
      setPlaying(true)
    }
  }

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted
    }
  }, [isVideoMuted])

  if (!isShowingOnHome) {
    return (
      <div>
        <Link href={`/detail/${_id}`}>
          <video
            loop
            src={media.asset.url}
            className="w-[250px] md:w-full rounded-xl cursor-pointer"
          ></video>
        </Link>
        <div className="flex gap-2 -mt-8 items-center ml-4">
          <p className="text-white text-lg font-medium flex gap-1 items-center">
            <BsPlay className="text-2xl" />
            {likes?.length || 0}
          </p>
        </div>
        <Link href={`/detail/${_id}`}>
          <p className="mt-5 text-md text-gray-800 cursor-pointer w-210">
            {caption}
          </p>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col pb-6">
      <div className="flex gap-4 relative">
        {isVideoExtension(media.asset.url) ? (
          <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="rounded-3xl"
          >
            <Link href={`/detail/${_id}`}>
              <video
                loop
                ref={videoRef}
                src={media.asset.url}
                className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
              ></video>
            </Link>

            {isHover && (
              <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:w-[280px] p-3">
                {playing ? (
                  <button onClick={onVideoPress}>
                    <BsFillPauseFill className="text-black text-2xl lg:text-4xl" />
                  </button>
                ) : (
                  <button onClick={onVideoPress}>
                    <BsFillPlayFill className="text-black text-2xl lg:text-4xl" />
                  </button>
                )}
                {isVideoMuted ? (
                  <button onClick={() => setIsVideoMuted(false)}>
                    <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
                  </button>
                ) : (
                  <button onClick={() => setIsVideoMuted(true)}>
                    <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="lg:w-[600px] w-[200px] min-w-[220px] h-[300px] md:h-[400px] lg:h-[528px] relative rounded-3xl">
            <Link href={`/detail/${_id}`}>
              <Image
                layout="fill"
                objectFit="cover"
                className="lg:w-[600px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
                src={media.asset.url}
                alt="user-profile"
              />
            </Link>
          </div>
        )}
      </div>

      <div className="p-2 cursor-pointer font-semibold rounded ">
        <VibrantColorSwatch />
        <Link href={`/detail/${_id}`}>
          <p className="break-words mt-2 font-normal">
            {media.asset.originalFilename}
          </p>
        </Link>
        <Link href={`/detail/${_id}`}>
          <p className="break-words mt-2 font-normal">
            {convertSizeUnit(media.asset.size)}
          </p>
        </Link>
      </div>
    </div>
  )
}

export default MediaCard
