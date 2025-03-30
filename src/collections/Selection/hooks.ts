import { FieldHook } from 'payload'
import { Selection } from '@/payload-types'
import { getDeploymentIdByName, runDeploymentById } from '@/service/prefectService'
import { CollectionAfterChangeHook } from 'payload'

const getFeatureImage: FieldHook<Selection> = ({ data }) => {
  if (data && data.media && data.media.mainMedias && data.media.mainMedias.length > 0) {
    return data.media.mainMedias[0]
  }
}

const ensureNotStoreFeatureImage: FieldHook<Selection> = ({ siblingData }) => {
  delete siblingData.featureImage
}

const handleSelectionWorkflow: CollectionAfterChangeHook<Selection> = async (args) => {
  const { doc, operation } = args

  if (operation === 'create') {
    const deploymentId = await getDeploymentIdByName({
      flowName: 'populate-selection-details',
      deploymentName: 'populate_selection_details_flow_deployment',
    })
    if (deploymentId) {
      console.log('deploymentId', deploymentId)
      const response = await runDeploymentById(deploymentId, { id: doc.id })
      console.log('response', response)
    }
  }
}

export { getFeatureImage, ensureNotStoreFeatureImage, handleSelectionWorkflow }
