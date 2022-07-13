import React from 'react'
import axios from 'axios'
import MediaCard from '../components/MediaCard'
import NoResults from '../components/NoResults'
import { Media } from '../types'

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
  const { data } = await axios.get(`http://localhost:3000/api/post`)

  return {
    props: { medias: data },
  }
}

export default Home
