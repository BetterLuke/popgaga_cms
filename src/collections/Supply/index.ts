import { CollectionConfig } from 'payload'

export const Suppliers: CollectionConfig = {
  slug: 'suppliers',
  admin: {
    useAsTitle: 'brandName',
  },
  fields: [
    {
      name: 'brandName',
      type: 'text',
      required: true,
      unique: true,
      label: '品牌名称',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
    },
    {
      name: '渠道',
      type: 'array',
      fields: [
        {
          name: 'type',
          label: '类型',
          type: 'select',
          required: true,
          options: [
            { label: '淘宝', value: 'TAO_BAO' },
            { label: '小红书', value: 'XIAO_HONG_SHU' },
            { label: '独立站', value: 'INDEPENDENT_STATION' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          label: '链接地址',
          required: true,
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: '备注',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
