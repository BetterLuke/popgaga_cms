import { CollectionConfig } from 'payload'

export const Styles: CollectionConfig = {
  slug: 'styles',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
      label: '产品标题',
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'raw_data',
          label: '款信息',
          fields: [],
        },
        {
          name: 'ai_generated',
          label: 'AI 生成结果',
          fields: [],
        },
      ],
    },
    {
      name: 'style_info',
      label: '款信息',
      type: 'relationship',
      relationTo: 'selections',
    },
  ],
}
