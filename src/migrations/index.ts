import * as migration_20250311_080119_migration from './20250311_080119_migration';

export const migrations = [
  {
    up: migration_20250311_080119_migration.up,
    down: migration_20250311_080119_migration.down,
    name: '20250311_080119_migration'
  },
];
