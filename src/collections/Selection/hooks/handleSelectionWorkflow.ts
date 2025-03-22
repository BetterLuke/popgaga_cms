import { Selection } from '@/payload-types'
import { CollectionAfterChangeHook } from 'payload'

export default function handleSelectionWorkflow(
  args: Parameters<CollectionAfterChangeHook<Selection>>[0],
): ReturnType<CollectionAfterChangeHook<Selection>> {
  const { doc, operation } = args

  if (doc.status === 'pending' && operation === 'create') {
    // prefect workflow to generate content
  }
}
