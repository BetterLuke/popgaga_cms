import { CollectionConfig } from 'payload'
import { ensureNotStoreFeatureImage, getFeatureImage, handleSelectionWorkflow } from './hooks'

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
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '建款信息',
          admin: {
            description:
              'TODO: 添加产品属性截图，建款方式目前为淘宝，后面可以添加其他方式，配置一个选择字段，这个字段就可以区分',
          },
          fields: [
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
              name: 'title',
              type: 'text',
              required: true,
              unique: true,
              label: '产品标题',
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
                      type: 'row',
                      fields: [
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
                          admin: {
                            style: {
                              marginTop: '28px',
                            },
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: '商品信息维护',
          admin: {
            description:
              '商品信息维护,审核与确定商品标题，meta-description,尺寸表，todo:商品的熟悉信息也在这个单元维护',
          },
          fields: [
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
        },
        {
          label: '款信息',
          admin: {
            description:
              '产品属性 ｜ 供应商信息 ｜ 产品图片 ｜ 开发信息：品牌小红书对于款的描述呀｜是否为套装 ｜ 可售尺码 ',
          },
          fields: [],
        },
        {
          label: '尺寸信息',
          admin: {
            description: '尺寸表的数据，用于生成尺寸表组件',
          },
          fields: [
            {
              name: 'sizeChartJson',
              type: 'json',
              label: '尺寸表Json数据',
              // admin: {
              //   readOnly: true,
              // },
            },
          ],
        },
        {
          label: '核价信息',
          admin: {
            description: '核价信息',
          },
          fields: [],
        },
        { label: '企划信息', fields: [] },
        {
          label: '上新上架',
          admin: {
            description:
              'SEO相关信息，用于优化搜索引擎，商品信息维护完成之后，这里会自动生成。上架状态，站点，期望上架时间，预计上架时间，企划，自动上架',
          },
          fields: [
            {
              type: 'tabs',
              tabs: [
                {
                  label: '上新公文',
                  fields: [],
                },
                {
                  label: '上架管理',
                  admin: { description: '关于各种日期与交互的按钮' },
                  fields: [],
                },
              ],
            },
          ],
        },
        {
          label: '下单信息',
          admin: {
            description: '下单信息，维护履约下单',
          },
          fields: [],
        },
      ],
    },
    {
      name: 'featureImage',
      label: '选款图',
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
        readOnly: true,
      },
    },
  ],
}
