import { Navigate, useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "@api/TaskAPI";
import { Task } from "@types";
import EditTaskModal from "@/components/tasks/EditTaskModal";

export default function EditTaskData() {
  const params = useParams()
  const projectId = params.projectId!

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)
  const taskId: Task['_id'] = queryParams.get('editTaskId')!

  const { data, isError } = useQuery({
    queryKey: ['editTask', taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    enabled: !!taskId
  })

  if (isError) return <Navigate to={'/404'} />

  if (data) return <EditTaskModal data={data}  taskId={taskId} />
}
