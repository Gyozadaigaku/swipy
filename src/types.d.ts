export interface Media {
  caption: string
  media: {
    asset: {
      _id: string
      url: string
      originalFilename: string
      size: number
    }
  }
  _id: string
  postedBy: {
    _id: string
    userName: string
    image: string
  }
  likes: {
    postedBy: {
      _id: string
      userName: string
      image: string
    }
  }[]
  comments: {
    comment: string
    _key: string
    postedBy: {
      _ref: string
    }
  }[]
  userId: string
}

export interface IUser {
  _id: string
  _type: string
  userName: string
  image: string
}
