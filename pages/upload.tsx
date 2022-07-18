import React, { useState } from 'react'
import { SanityAssetDocument } from '@sanity/client'
import { FaCloudUploadAlt } from 'react-icons/fa'
import axios from 'axios'

import { client } from '../utils/client'

const Upload = () => {
  const [loading, setLoading] = useState<Boolean>(false)
  const [mediaAsset, setmediaAsset] = useState<
    SanityAssetDocument | undefined
  >()
  const [wrongFileType, setWrongFileType] = useState(false)

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
      setLoading(true)

      client.assets
        .upload('file', selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setmediaAsset(data)
          setLoading(false)
        })
    } else {
      setLoading(false)
      setWrongFileType(true)
    }
  }

  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] lg:top-[70px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
      <div className=" bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-center items-center p-14 pt-6">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload Media</p>
            <p className="text-md text-gray-400 mt-1">
              Post a media to your account
            </p>
          </div>
          <div className=" border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none mt-10 w-[260px] h-[458px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
            {loading ? (
              <p className="text-center text-3xl text-red-400 font-semibold">
                Uploading...
              </p>
            ) : (
              <div>
                {mediaAsset ? (
                  <>
                    <video
                      className="rounded-xl h-[462px] mt-16 bg-black"
                      controls
                      loop
                      src={mediaAsset.url}
                    />
                  </>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col justify-center items-center">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className="text-xl font-semibold">
                          Select media to upload
                        </p>
                      </div>

                      <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                        MP4 or WebM or ogg <br />
                        720x1280 resolution or higher <br />
                        Up to 10 minutes <br />
                        Less than 2 GB
                      </p>
                      <p className="bg-[#F51997] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none">
                        Select file
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-media"
                      onChange={(e) => uploadMedia(e)}
                      className="w-0 h-0"
                    />
                  </label>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upload
