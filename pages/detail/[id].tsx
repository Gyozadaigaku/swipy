import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill } from 'react-icons/bs'

import { BASE_URL } from '../../utils'
import { Media } from '../../types'
import axios from 'axios'

interface IProps {
  postDetails: Media
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const mediaRef = useRef<HTMLVideoElement>(null)

  const onVideoClick = () => {
    if (isPlaying) {
      mediaRef?.current?.pause()
      setIsPlaying(false)
    } else {
      mediaRef?.current?.play()
      setIsPlaying(true)
    }
  }

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
        <div className="opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p className="cursor-pointer ">
            <MdOutlineCancel className="text-white text-[35px] hover:opacity-90" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              ref={mediaRef}
              onClick={onVideoClick}
              loop
              src={post?.media?.asset.url}
              className=" h-full cursor-pointer"
            ></video>
          </div>
          <div className="absolute top-[45%] left-[40%]  cursor-pointer">
            {!isPlaying && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const res = await axios.get(`${BASE_URL}/api/post/${id}`)

  return {
    props: { postDetails: res.data },
  }
}

export default Detail
