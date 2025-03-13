import { CollectionConfig } from 'payload'

export const Selections: CollectionConfig = {
  slug: 'selections',
  admin: {
    useAsTitle: 'title',
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
      name: 'sourceUrl',
      type: 'text',
      label: '来源网址',
      required: true,
      admin: {
        width: '80%',
      },
    },
    {
      name: 'sizeChartScreenShotImage',
      type: 'upload',
      label: '尺寸表截图',
      required: true,
      relationTo: 'media',
    },
    {
      name: 'productDetailScreenShotImage',
      type: 'upload',
      label: '产品参数截图',
      required: true,
      relationTo: 'media',
    },
    {
      name: 'media',
      label: '媒体',
      type: 'group',
      fields: [
        {
          name: 'mainMedias',
          label: '主图媒体',
          type: 'upload',
          relationTo: 'media',
          required: true,
          hasMany: true,
        },
        {
          name: 'showCaseMedias',
          label: '买家秀',
          type: 'upload',
          relationTo: 'media',
          hasMany: true,
        },
      ],
      admin: {
        components: {
          Cell: {
            path: '@/collections/Product/cells/MediaThumbnailCell',
          },
        },
      },
    },
    {
      name: 'option',
      label: '变体',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'sizes',
              label: '尺码',
              type: 'text',
              hasMany: true,
            },
          ],
        },
        {
          name: 'colors',
          label: '产品颜色',
          type: 'array',
          labels: {
            singular: 'Color',
            plural: 'Colors',
          },
          fields: [
            {
              name: 'name',
              label: '颜色名称',
              type: 'text',
              required: true,
            },
            {
              name: 'image',
              label: '颜色图片',
              type: 'upload',
              relationTo: 'media', // 关联到 media 集合
              required: true,
            },
            {
              name: 'is_need_transparent',
              label: '生成透明底图',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
}
