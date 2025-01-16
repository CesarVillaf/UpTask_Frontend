import api from "@lib/axios"
import { handleAxiosError } from "@utils"
import { noteSchema } from "@schemas"
import { Note, NoteFormData, Project, Task } from "@types"

type NoteAPIType = {
    formData: NoteFormData
    projectId: Project['_id']
    taskId: Task['_id']
    noteId: Note['_id']
}

export async function createNote({ projectId, taskId, formData }: Pick<NoteAPIType, 'projectId' | 'taskId' | 'formData'>) {
    try {
        const url = `/v1/projects/${projectId}/tasks/${taskId}/notes`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function getNotes({ projectId, taskId }: Pick<NoteAPIType, 'projectId' | 'taskId'>) {
    try {
        const url = `/v1/projects/${projectId}/tasks/${taskId}/notes`
        const { data } = await api(url)
        const response = noteSchema.safeParse(data)

        if (response.success) {
            return response.data
        }
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function deleteNote({ projectId, taskId, noteId }: Pick<NoteAPIType, 'projectId' | 'taskId' | 'noteId'>) {
    try {
        const url = `/v1/projects/${projectId}/tasks/${taskId}/notes/${noteId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}