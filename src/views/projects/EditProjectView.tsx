import { Navigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProjectById } from '@api/ProjectAPI'
import EditProjectForm from '@components-projects/EditProjectForm'
import { Project } from '@types'

export default function EditProjectView() {
  const params = useParams()
  const projectId: Project['_id'] = params.projectId!

  const { data, isError, isLoading } = useQuery({
    queryKey: ['editProject', projectId],
    queryFn: () => getProjectById(projectId),
    retry: false
  })

  if (isLoading) return 'Cargando...'
  if (isError) return <Navigate  to={'/404'} />
  if (data) return <EditProjectForm data={data} projectId={projectId} />
}
