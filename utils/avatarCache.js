import { Cache, Storage } from 'aws-amplify'

export const setAvatarUrlToCache = (avatarUrl, imageUrl) => {
  if (avatarUrl && imageUrl) {
    const expiration = (new Date).getTime() + 900000
    Cache.setItem(avatarUrl, imageUrl, { expires: expiration })
  }  
}

export const getUserAvatarUrl = async user => {
  if (user.avatarUrl) {
    const imageUrl = await Storage.get(`${user.id}-avatar.png`, {
      level: 'protected',
      identityId: user.avatarUrl
    })
    setAvatarUrlToCache(user.avatarUrl, imageUrl)
    return imageUrl
  }
  return null  
}

export const getCachedAvatarUrl = async user => {
  const cachedImageUrl = Cache.getItem(user.avatarUrl)

  if (cachedImageUrl) {
    return cachedImageUrl
  }

  return await getUserAvatarUrl(user)
}
