import api from "@/lib/axios";
import { teamMemberSchema, teamMembersSchema } from "@/schemas";
import { Project, TeamMember, TeamMemberFormData } from "@/types";
import { handleAxiosError } from '@/utils';


export async function findMemberById({ formData, projectId }: { formData: TeamMemberFormData, projectId: Project['_id'] }) {
    try {
        const url = `/v1/projects/${projectId}/team/find`
        const { data } = await api.post(url, formData)
        const response = teamMemberSchema.safeParse(data)

        if (response.success) {
            return response.data
        }
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function addMemberById({ id, projectId }: { id: TeamMember['_id'], projectId: Project['_id'] }) {
    try {
        const url = `/v1/projects/${projectId}/team`
        const { data } = await api.post<string>(url, { id })
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function getProjectTeam(projectId: Project['_id']) {
    try {
        const url = `/v1/projects/${projectId}/team`
        const { data } = await api(url)
        const response = teamMembersSchema.safeParse(data)

        if (response.success) {
            return response.data
        }
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function removeMemberById({ id, projectId }: { id: TeamMember['_id'], projectId: Project['_id'] }) {
    try {
        const url = `/v1/projects/${projectId}/team/${id}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}