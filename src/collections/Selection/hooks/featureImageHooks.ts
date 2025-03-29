import { FieldHook } from 'payload'
import { Selection } from '@/payload-types'

const getFeatureImage: FieldHook<Selection> = ({ data }) => {
  if (data && data.media && data.media.mainMedias && data.media.mainMedias.length > 0) {
    return data.media.mainMedias[0]
  }
}
const ensureNotStoreFeatureImage: FieldHook<Selection> = ({ siblingData }) => {
  delete siblingData.featureImage
}

export { getFeatureImage, ensureNotStoreFeatureImage }
