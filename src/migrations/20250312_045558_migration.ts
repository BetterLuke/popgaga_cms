import { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-mongodb'
import { MongoClient } from 'mongodb'

// TODO: 其实简单的更新字段名称的逻辑可以抽离成工具函数

// MongoDB 连接 URI
const MONGODB_URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/your-database-name'
const DB_NAME = 'payload-blank' // 替换为你的实际数据库名
export async function up({ payload }: MigrateUpArgs): Promise<void> {
  // Migration code
  const client = new MongoClient(MONGODB_URI)
  try {
    await client.connect()
    await client
      .db(DB_NAME)
      .collection('products')
      .updateMany({}, { $rename: { medias: 'media', 'option.color': 'option.colors' } })
  } catch (error) {
    payload.logger.error(`Migration failed: ${error}`)
  }
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
  // Migration code
  const client = new MongoClient(MONGODB_URI)
  try {
    await client.connect()
    await client
      .db(DB_NAME)
      .collection('products')
      .updateMany({}, { $rename: { media: 'medias', 'option.colors': 'option.color' } })
  } catch (error) {
    payload.logger.error(`Migration failed: ${error}`)
  }
}
