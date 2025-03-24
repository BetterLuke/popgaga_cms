import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'generativeDerivedVariants',
      type: 'array',
      label: '生成式衍生变体',
      admin: {
        position: 'sidebar',
        description:
          '通过“生成式”技术，根据原始图片和不同的“配方”，创造出的一系列“衍生”自原始图片的不同“变体”。',
      },
      fields: [
        {
          label: '生成配方',
          name: 'recipe',
          type: 'select',
          options: [
            {
              label: '透明底图',
              value: 'TRANSPARENTED',
            },
          ],
        },
        {
          name: 'status',
          label: '状态',
          type: 'select',
          admin: {
            readOnly: true,
            condition: (_, siblingData) => siblingData.status,
          },
          options: [
            { label: '待处理', value: 'pending' },
            { label: '处理中', value: 'processing' },
            { label: '已完成', value: 'completed' },
          ],
        },
        // {
        //   name: 'createdAt',
        //   type: 'date',
        //   admin: {
        //     readOnly: true,
        //     condition: (_, siblingData) => !siblingData.id,
        //   },
        // },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: '制品',
          admin: {
            readOnly: true,
            condition: (_, siblingData) => siblingData.image,
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
  // versions: {
  //   drafts: false,
  // },
}
