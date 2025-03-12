import * as migration_20250311_153539_migration from './20250311_153539_migration';
import * as migration_20250312_045558_migration from './20250312_045558_migration';

export const migrations = [
  {
    up: migration_20250311_153539_migration.up,
    down: migration_20250311_153539_migration.down,
    name: '20250311_153539_migration',
  },
  {
    up: migration_20250312_045558_migration.up,
    down: migration_20250312_045558_migration.down,
    name: '20250312_045558_migration'
  },
];
