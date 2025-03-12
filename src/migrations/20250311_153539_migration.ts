import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-mongodb'
import { MongoClient, ObjectId } from 'mongodb'

// MongoDB 连接 URI
const MONGODB_URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/your-database-name'
const DB_NAME = 'payload-blank' // 替换为你的实际数据库名

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    payload.logger.info('Connected to MongoDB')

    const db = client.db(DB_NAME)
    const productsCollection = db.collection('products')

    const productsResult = await payload.find({
      collection: 'products',
      limit: 0,
      pagination: false,
    })

    const products = productsResult.docs
    payload.logger.info(`Found ${products.length} products to migrate`)

    for (const product of products) {
      if (product.options) {
        try {
          // 转换旧的 options 结构到新的 option 结构
          const newOption = {
            sizes: product.options.sizes,
            color:
              product.options.colors?.map((colorItem: any) => ({
                name: colorItem.colorOption.name,
                image: colorItem.colorOption.image.toString(),
                is_need_transparent: colorItem.colorOption.is_need_transparent,
              })) || [],
          }

          // 使用 payload.update 更新值
          await payload.update({
            collection: 'products',
            id: product.id,
            data: { option: newOption },
          })
          payload.logger.info(`Updated product ${product.id} with new option`)

          // 使用 MongoDB 客户端删除 options 字段
          const result = await productsCollection.updateOne(
            { _id: new ObjectId(product.id as string) },
            { $unset: { options: '' } },
          )

          if (result.modifiedCount > 0) {
            payload.logger.info(`Deleted options field for product ${product.id}`)
          } else {
            payload.logger.warn(`No options field deleted for product ${product.id}`)
          }
        } catch (error) {
          payload.logger.error(`Failed to migrate product ${product.id}: ${error.message}`)
          throw error
        }
      } else {
        payload.logger.info(`Product ${product.id} has no options, skipping`)
      }
    }
  } catch (error) {
    payload.logger.error(`Migration failed: ${error.message}`)
    throw error
  } finally {
    await client.close()
    payload.logger.info('Disconnected from MongoDB')
  }
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    payload.logger.info('Connected to MongoDB')

    const db = client.db(DB_NAME)
    const productsCollection = db.collection('products')

    const productsResult = await payload.find({
      collection: 'products',
      limit: 0,
      pagination: false,
      depth: 9, //  确保获取关联字段的数据
    })

    const products = productsResult.docs
    payload.logger.info(`Found ${products.length} products to rollback`)

    for (const product of products) {
      if (product.option) {
        try {
          // 恢复旧的 options 结构
          const oldOptions = {
            sizes: product.option.sizes,
            colors:
              product.option.color?.map((colorItem: any) => {
                return {
                  colorOption: {
                    name: colorItem.name,
                    image: new ObjectId(colorItem.image?.id as string), // 使用关联字段的 ID 或 null
                    is_need_transparent: colorItem.is_need_transparent,
                  },
                }
              }) || [],
          }

          payload.logger.info(`Updated product ${product.id} with old options`)

          // 使用 MongoDB 客户端删除 option 字段
          const result = await productsCollection.updateOne(
            { _id: new ObjectId(product.id as string) },
            { $set: { options: oldOptions }, $unset: { option: '' } },
          )

          if (result.modifiedCount > 0) {
            payload.logger.info(`Deleted option field for product ${product.id}`)
          } else {
            payload.logger.warn(`No option field deleted for product ${product.id}`)
          }
        } catch (error) {
          payload.logger.error(`Failed to rollback product ${product.id}: ${error.message}`)
          throw error
        }
      } else {
        payload.logger.info(`Product ${product.id} has no option, skipping`)
      }
    }
  } catch (error) {
    payload.logger.error(`Rollback failed: ${error.message}`)
    throw error
  } finally {
    await client.close()
    payload.logger.info('Disconnected from MongoDB')
  }
}
