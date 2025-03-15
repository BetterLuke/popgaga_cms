import { DefaultServerCellComponentProps } from 'payload'
import Image from 'next/image'
import React from 'react'

const MediaThumbnailCell = async (props: DefaultServerCellComponentProps) => {
  const { cellData, payload } = props

  console.log('logo', props.cellData)

  const media = await payload.findByID({
    collection: 'media',
    id: cellData,
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
        alt={media.url!}
        fill
        style={{
          objectFit: 'contain',
        }}
      />
    </div>
  )
}

export default MediaThumbnailCell
