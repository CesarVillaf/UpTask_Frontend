import api from '@lib/axios'
import { Project, Task, TaskFormData } from '@types'
import { taskSchema } from '@/schemas'
import { handleAxiosError } from '@/utils'

type TaskAPIType = {
    formData: TaskFormData,
    projectId: Project['_id']
    taskId: Task['_id']
    status: Task['status']
}

export async function createTask({ projectId, formData }: Pick<TaskAPIType, 'formData' | 'projectId'>) {
    try {
        const url = `/v1/projects/${projectId}/tasks`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function getTaskById({ projectId, taskId }: Pick<TaskAPIType, 'projectId' | 'taskId'>) {
    try {
        const url = `/v1/projects/${projectId}/tasks/${taskId}`
        const { data } = await api(url)
        const response = taskSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function updateTask({ projectId, taskId, formData }: Pick<TaskAPIType, 'formData' | 'projectId' | 'taskId'>) {
    try {
        const url = `/v1/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.put<string>(url, formData)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function updateStatus({ projectId, taskId, status }: Pick<TaskAPIType, 'projectId' | 'taskId' | 'status'>) {
    try {
        const url = `/v1/projects/${projectId}/tasks/${taskId}/status`
        const { data } = await api.post<string>(url, { status })
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function deleteTask({ projectId, taskId }: Pick<TaskAPIType, 'projectId' | 'taskId'>) {
    try {
        const url = `/v1/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}