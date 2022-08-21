import React from 'react'
import axios from 'axios'

import MediaCard from '../components/molecules/MediaCard'
import { BASE_URL } from '../utils'
import { Media } from '../types'
import NoResults from '../components/molecules/NoResults'

interface IProps {
  medias: Media[]
}

const Home = ({ medias }: IProps) => {
  console.log(medias)

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,_1fr))] gap-10 videos h-full">
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

export default Home

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string }
}) => {
  let response = await axios.get(`${BASE_URL}/api/post`)

  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`)
  }

  return {
    props: { medias: response.data },
  }
}
