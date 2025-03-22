import { CollectionAfterReadHook, CollectionConfig, FieldHook } from 'payload'
import handleSelectionWorkflow from './hooks/handleSelectionWorkflow'
import { Selection } from '@/payload-types'

const getFeatureImage: FieldHook<Selection> = ({ data }) => {
  if (data && data.media && data.media.mainMedias && data.media.mainMedias.length > 0) {
    return data.media.mainMedias[0]
  }
}
const ensureNotStoreFeatureImage: FieldHook<Selection> = ({ siblingData }) => {
  delete siblingData.featureImage
}

export const Selections: CollectionConfig = {
  slug: 'selections',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    update: () => true,
  },
  hooks: {
    afterChange: [handleSelectionWorkflow],
    // afterRead: [
    //   ({ doc }) => {
    //     // Set mainImage to the first media in mainMedias if it exists
    //     if (doc.media?.mainMedias?.length > 0) {
    //       doc.featureImage = doc.media.mainMedias[0]
    //     }
    //     return doc
    //   },
    // ],
  },
  fields: [
    // {
    //   type: 'tabs',
    //   tabs: [
    //     {
    //       name: 'raw_data',
    //       label: '选品信息',
    //       fields: [
    //         {
    //           name: 'brand_info',
    //           label: '品牌信息',
    //           type: 'relationship',
    //           relationTo: 'suppliers',
    //         },
    //       ],
    //     },
    //     {
    //       name: 'ai_generated',
    //       label: 'AI 生成结果',
    //       fields: [
    //         {
    //           name: 'titleList',
    //           type: 'array',
    //           fields: [
    //             {
    //               name: 'title',
    //               label: '标题',
    //               type: 'text',
    //             },
    //             {},
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
      label: '产品标题',
    },
    {
      name: 'featureImage',
      label: '主图预览',
      type: 'upload',
      relationTo: 'media',
      virtual: true,
      admin: {
        // hidden: true,
        readOnly: true,
        description: '自动显示主图媒体的第一张图片',
        position: 'sidebar',
      },
      hooks: {
        afterRead: [getFeatureImage],
        beforeChange: [ensureNotStoreFeatureImage],
      },
    },
    {
      name: 'status',
      label: '状态',
      type: 'select',
      options: [
        { label: '待处理', value: 'pending' }, // 初始状态，刚录入选品
        { label: '处理中', value: 'processing' }, // 正在调用Dify处理
        { label: '待评审', value: 'reviewing' }, // Dify处理完成，等待您检查
        { label: '已确认', value: 'confirmed' }, // 评审通过，准备创建Products
        { label: '已完成', value: 'completed' }, // 已生成Products，流程结束
        { label: '已废弃', value: 'discarded' }, // 选品被放弃
      ],
      defaultValue: 'pending',
      admin: {
        position: 'sidebar',
      },
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
      name: 'price',
      type: 'number',
      label: '价格',
      required: true,
      admin: {
        width: '20%',
      },
    },
    {
      name: 'supplier',
      type: 'relationship',
      label: '品牌',
      relationTo: 'suppliers',
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
    {
      type: 'collapsible',
      label: '翻译标题列表',
      fields: [
        {
          name: 'translatedTitleList',
          type: 'array',
          label: '翻译标题列表',
          fields: [
            {
              name: 'title',
              label: '标题',
              type: 'text',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'template',
                  label: '模板',
                  type: 'text',
                },
                {
                  name: 'style',
                  label: '风格',
                  type: 'text',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'keywords',
                  label: '关键词',
                  type: 'text',
                  hasMany: true,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'explanation',
                  label: '解释',
                  type: 'textarea',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'sizeChartJson',
      type: 'json',
      label: '尺码表',
      admin: {
        readOnly: true,
      },
    },
    {
      type: 'collapsible',
      label: 'Meta Description',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'metaDescriptionList',
          type: 'array',
          label: 'Meta Description',
          fields: [
            {
              name: 'meta_description',
              label: 'Meta Description',
              type: 'textarea',
              admin: {
                readOnly: true,
              },
            },
            {
              type: 'row',
              admin: {
                readOnly: true,
              },
              fields: [
                {
                  name: 'style',
                  label: '风格',
                  type: 'text',
                  admin: {
                    width: '33%',
                  },
                },
                {
                  name: 'focus',
                  label: '焦点',
                  type: 'text',
                  admin: {
                    width: '33%',
                  },
                },
                {
                  name: 'characters',
                  label: '字符数',
                  type: 'number',
                  admin: {
                    width: '33%',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
