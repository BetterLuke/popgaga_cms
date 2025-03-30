import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: 'http://192.168.0.123:4200/openapi.json',
  output: 'generated/prefect-client',
  plugins: ['@hey-api/client-fetch'],
})
