import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/your-database-name'
const DB_NAME = 'payload-blank' // 替换为你的实际数据库名

/**
 * 通用 MongoDB 字段重命名工具函数
 * @param collectionName - 集合名称
 * @param renameMap - 需要重命名的字段映射 { oldFieldName: newFieldName }
 */
export async function renameFields(collectionName: string, renameMap: Record<string, string>) {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    const db = client.db(DB_NAME)
    const collection = db.collection(collectionName)

    const result = await collection.updateMany({}, { $rename: renameMap })

    console.log(
      `Renamed fields in collection '${collectionName}': ${JSON.stringify(renameMap)} - Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`,
    )
  } catch (error) {
    console.error(`Failed to rename fields in '${collectionName}':`, error)
    throw error
  } finally {
    await client.close()
  }
}
