async function getDeploymentIdByName(parmas: { flowName: string; deploymentName: string }) {
  const { flowName, deploymentName } = parmas
  const url = `${process.env['PREFECT_SERVER_URL'] || 'http://localhost:4200/api'}/deployments/name/${flowName}/${deploymentName}`
  const { id } = await (await fetch(url)).json()
  return id
}

async function runDeployment(deploymentId: string, params: Record<string, any>) {
  const url = `${process.env['PREFECT_SERVER_URL'] || 'http://localhost:4200/api'}/deployments/${deploymentId}/create_flow_run`
  const runDeploymentResponse = await (
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ parameters: params }),
    })
  ).json()

  return runDeploymentResponse
}

export { getDeploymentIdByName, runDeployment }
