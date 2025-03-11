import { CollectionConfig } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { slugField } from '@/fields/slug'

export const Product: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
  },
  defaultPopulate: {
    // medias: true,
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
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'detail',
          label: '产品详情',
          fields: [
            {
              name: 'tags',
              label: '标签',
              type: 'text',
              hasMany: true,
            },
            {
              name: 'productDetail',
              label: '产品参数JSON数据',
              type: 'json',
            },
          ],
        },
        {
          name: 'options',
          label: '变体',
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
              fields: [
                {
                  name: 'colorOption',
                  label: '颜色项',
                  type: 'group',
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
        },
        {
          name: 'medias',
          label: '媒体',
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
                path: '@/cells/media_thumbnail_cell/MediaThumbnailCell',
              },
            },
          },
        },
        {
          name: 'sizeInfo',
          label: '尺寸信息',
          fields: [
            {
              name: 'sizeChartJson',
              label: '尺寸表JSON数据',
              type: 'json',
              required: true,
              admin: {
                description: 'Enter size chart data in JSON format: { columns: [], data: [] }',
              },
            },
          ],
        },

        {
          name: 'meta',
          label: 'SEO Meta',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaDescriptionField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
}
