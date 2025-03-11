import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    tokenExpiration: 1000 * 60 * 60 * 24 * 365, // 1 year
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
