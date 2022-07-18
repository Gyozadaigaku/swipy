import React from 'react'
import axios from 'axios'

import MediaCard from '../components/MediaCard'
import { BASE_URL } from '../utils'
import { Media } from '../types'
import NoResults from '../components/NoResults'

interface IProps {
  medias: Media[]
}

const Home = ({ medias }: IProps) => {
  console.log(medias)

  return (
    <div className="flex flex-col gap-10 videos h-full">
      {medias.length ? (
        medias?.map((media: Media) => (
          <MediaCard post={media} isShowingOnHome key={media._id} />
        ))
      ) : (
        <NoResults text={`No Medias`} />
      )}
    </div>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/post`)

  return {
    props: { medias: data },
  }
}

export default Home
