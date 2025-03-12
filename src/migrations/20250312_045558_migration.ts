import { renameFields } from '@/utilities/rename-field'
import { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-mongodb'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  try {
    await renameFields('products', {
      medias: 'media',
      'option.color': 'option.colors',
    })
    payload.logger.info('Migration up completed successfully')
  } catch (error) {
    payload.logger.error(`Migration up failed: ${error}`)
  }
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  try {
    await renameFields('products', {
      media: 'medias',
      'option.colors': 'option.color',
    })
    payload.logger.info('Migration down completed successfully')
  } catch (error) {
    payload.logger.error(`Migration down failed: ${error}`)
  }
}
