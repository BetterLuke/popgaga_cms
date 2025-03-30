import {
  createFlowRunFromDeploymentDeploymentsIdCreateFlowRunPost,
  readDeploymentByNameDeploymentsNameFlowNameDeploymentNameGet,
} from './../../generated/prefect-client/sdk.gen'

async function getDeploymentIdByName(parmas: { flowName: string; deploymentName: string }) {
  const { flowName, deploymentName } = parmas
  const result = await readDeploymentByNameDeploymentsNameFlowNameDeploymentNameGet({
    path: { flow_name: flowName, deployment_name: deploymentName },
  })

  return result.data?.id
}

async function runDeployment(deploymentId: string, params: Record<string, any>) {
  const result = await createFlowRunFromDeploymentDeploymentsIdCreateFlowRunPost({
    path: { id: deploymentId },
    body: {
      parameters: params,
    },
  })

  return result?.data
}

export { getDeploymentIdByName, runDeployment }
