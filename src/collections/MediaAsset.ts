import type { CollectionConfig } from 'payload'

export const MediaAssets: CollectionConfig = {
  slug: 'media-assets',
  timestamps: true,
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    // {
    //   name: 'originalImage',
    //   type: 'upload',
    //   relationTo: 'media',
    //   required: true,
    //   label: '原始图片',
    //   hasMany: false,
    // },
    {
      name: 'generationConfig',
      type: 'group',
      label: '生成配置',
      fields: [
        {
          name: 'generateTransparent',
          type: 'select',
          label: '生成透明背景',
          options: [
            {
              label: '是',
              value: '1',
            },
            {
              label: '否',
              value: '2',
            },
          ],
          defaultValue: '2',
        },
      ],
    },
    {
      name: 'generatedImages',
      type: 'array',
      label: '生成的图片',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            {
              label: '透明背景版本',
              value: 'TRANSPARENTED',
            },
            {
              label: '其他处理版本',
              value: 'other',
            },
          ],
        },
        {
          name: 'createdAt',
          type: 'date',
          admin: {
            readOnly: true,
          },
        },
      ],
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
    ],
  },
}
