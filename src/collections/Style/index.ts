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
          label: '摄影',
          fields: [
            // {
            //   type: 'upload',
            //   name: 'mainMedia',
            //   label: '主图',
            //   relationTo: 'media-assets',
            // },
          ],
        },
        {
          label: '款信息',
          fields: [],
        },
        {
          label: '商品公文维护',
          fields: [],
        },
      ],
    },
  ],
}
