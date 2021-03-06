import React, { useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import { BsPlay } from 'react-icons/bs'

import { Media } from './../types'

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

const MediaCard: NextPage<IProps> = ({
  post: { caption, postedBy, media, _id, likes },
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
    <div>
      <div className="flex gap-4 relative">
        {isVideoExtension(media.asset.url) ? (
          <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="lg:w-[600px] min-h-[120px] w-[200px] relative rounded-3xl"
          >
            <Link href={`/detail/${_id}`}>
              <video
                loop
                ref={videoRef}
                src={media.asset.url}
                className="lg:w-[600px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
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
          <div className="lg:w-[600px] min-h-[120px] w-[200px] relative rounded-3xl">
            <Link href={`/detail/${_id}`}>
              <Image
                layout="fill"
                objectFit="contain"
                className="lg:w-[600px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
                src={media.asset.url}
                alt="user-profile"
              />
            </Link>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 p-2 cursor-pointer font-semibold rounded ">
        <div className="w-6 h-6">
          <Link href={`/profile/${postedBy?._id}`}>
            <Image
              width={24}
              height={24}
              className="rounded-full"
              src={postedBy?.image}
              alt="user-profile"
              layout="responsive"
            />
          </Link>
        </div>
        <div>
          <Link href={`/detail/${_id}`}>
            <p className="mt-2 font-normal ">{caption}</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MediaCard
