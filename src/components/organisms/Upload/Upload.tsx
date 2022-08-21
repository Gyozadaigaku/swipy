import React, { useEffect, useRef, useState } from 'react'
import { SanityAssetDocument } from '@sanity/client'
import { useRouter } from 'next/router'
import axios from 'axios'

import useAuthStore from '../../../store/authStore'
import { BASE_URL } from '../../../utils'
import { client } from '../../../utils/client'

const Upload = () => {
  const [mediaAsset, setMediaAsset] = useState<
    SanityAssetDocument | undefined
  >()
  const [wrongFileType, setWrongFileType] = useState<Boolean>(false)

  const userProfile: any = useAuthStore((state) => state.userProfile)
  const router = useRouter()

  const fileUploadWrapperRef = useRef<HTMLDivElement>(null)
  const dragover = [
    'bg-gray-100',
    'border-4',
    'border-dashed',
    'border-red-300',
    'opacity-50',
    'bg-gray-100',
  ]
  const onDragEnter = () => {
    fileUploadWrapperRef?.current?.children[0].classList.add(...dragover)
  }
  const onDragLeave = () => {
    fileUploadWrapperRef?.current?.children[0].classList.remove(...dragover)
  }
  const onDrop = () => {
    fileUploadWrapperRef?.current?.children[0].classList.remove(...dragover)
  }

  useEffect(() => {
    if (!userProfile) router.push('/')
  }, [userProfile, router])

  useEffect(() => {
    handlePost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaAsset])

  const uploadMedia = async (e: any) => {
    const selectedFile = e.target.files[0]
    const fileTypes = [
      'image/jpeg',
      'image/png',
      'image/svg+xml',
      'image/webp',
      'video/mp4',
      'video/webm',
      'video/ogg',
    ]

    // uploading asset to sanity
    if (fileTypes.includes(selectedFile.type)) {
      setWrongFileType(false)

      client.assets
        .upload('file', selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setMediaAsset(data)
        })
    } else {
      setWrongFileType(true)
    }
  }

  const handlePost = async () => {
    if (mediaAsset?._id) {
      const doc = {
        _type: 'post',
        media: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: mediaAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id,
        },
      }

      await axios.post(`${BASE_URL}/api/post`, doc)

      router.push('/')
    }
  }

  return (
    <div
      className="w-full h-full left-0 top-36 absolute"
      ref={fileUploadWrapperRef}
    >
      {wrongFileType && (
        <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[260px]">
          Please select an media file
        </p>
      )}
      <div
        className="w-full h-[100%] relative"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <label>
          <input
            aria-label="upload file"
            type="file"
            name="upload-media"
            onChange={(e) => uploadMedia(e)}
            className="absolute cursor-pointer top-0 left-0 opacity-0 w-full h-full"
          />
        </label>
      </div>
    </div>
  )
}

export default Upload
