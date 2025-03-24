import type { CollectionConfig } from 'payload'

export const GeneratedMediaTasks: CollectionConfig = {
  slug: 'generated-media-tasks',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      label: '生成配方',
      name: 'recipe',
      type: 'select',
    //   admin: {
    //     disabled: true,
    //   },
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
        position: 'sidebar',
      },
      options: [
        { label: '待处理', value: 'pending' },
        { label: '处理中', value: 'processing' },
        { label: '已完成', value: 'completed' },
      ],
    },
    {
      name: 'createdAt',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'artifact',
      type: 'upload',
      relationTo: 'media',
      label: '制品',
      admin: {
        readOnly: true,
      },
    },
  ],
}