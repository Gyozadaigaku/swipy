import React from 'react'
import axios from 'axios'

import { Media } from '../types'

interface IProps {
  medias: Media[]
}

const Home = ({ medias }: IProps) => {
  console.log(medias)

  return <div className="flex flex-col gap-10 videos h-full">hello!</div>
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/post`)

  return {
    props: { medias: data },
  }
}

export default Home
