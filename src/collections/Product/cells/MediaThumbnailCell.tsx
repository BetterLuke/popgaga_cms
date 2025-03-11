import { DefaultServerCellComponentProps } from 'payload'
import Image from 'next/image'
import React from 'react'

const MediaThumbnailCell = async (props: DefaultServerCellComponentProps) => {
  const {
    cellData: {
      mainMedias: [firstImageId],
    },
    payload,
  } = props
  // console.log('props', props)

  const media = await payload.findByID({
    collection: 'media',
    id: firstImageId,
  })

  return (
    <div
      style={{
        position: 'relative',
        width: '60px',
        height: '60px',
      }}
    >
      <Image
        src={media.url!}
        alt={media.alt}
        fill
        style={{
          objectFit: 'contain',
        }}
      />
    </div>
  )
}

export default MediaThumbnailCell
