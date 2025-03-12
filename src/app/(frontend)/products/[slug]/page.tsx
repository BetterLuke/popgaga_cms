import PageClient from '@/components/PageClient/PageClient'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cache } from 'react'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Product } from '@/payload-types'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

function SizeChart({
  sizeChart,
}: {
  sizeChart: { sizeData: Product['sizeInfo']['sizeChartJson'] }
}) {
  const { columns, data } = sizeChart

  // 渲染逻辑
  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.Size || index}>
              {columns.map((col) => (
                <td key={col}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const ProductDetails = ({ details }: { details: Product['detail']['productDetail'] }) => {
  // 按 sortOrder 排序
  const sortedDetails = [...details].sort((a, b) => a.sortOrder - b.sortOrder)

  // 解析加粗文本的辅助函数
  const renderFieldValue = (value) => {
    const parts = value.split(/(\*\*.*?\*\*)/) // 分割加粗部分
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>
      }
      return part
    })
  }

  return (
    <div className="product-details">
      <ul>
        {sortedDetails.map((item, index) => (
          <li key={index}>
            {item.displayFieldName ? (
              <>
                <span className="field-name">{item.fieldName}: </span>
                <span className="field-value">{renderFieldValue(item.fieldValue)}</span>
              </>
            ) : (
              <span className="field-value">{renderFieldValue(item.fieldValue)}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const { isEnabled: draft } = await draftMode()
  const product = await queryProductBySlug({ slug })

  return (
    <div className="pt-24 pb-24">
      <PageClient />

      {draft && <LivePreviewListener />}
      <div>
        <h2>{product.title}</h2>
        <p>参数:</p>
        <ProductDetails details={product.detail.productDetail} />
        <SizeChart sizeChart={product.sizeInfo.sizeChartJson} />
      </div>
    </div>
  )
}

const queryProductBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'products',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
