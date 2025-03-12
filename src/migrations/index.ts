import * as migration_20250311_153539_migration from './20250311_153539_migration'

export const migrations = [
  {
    up: migration_20250311_153539_migration.up,
    down: migration_20250311_153539_migration.down,
    name: '20250311_153539_migration',
  },
]
