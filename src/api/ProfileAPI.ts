import api from '@lib/axios';
import { handleAxiosError } from '@/utils';
import { UpdateCurrentUSerPasswordForm, UserProfileForm } from '@/types';

export async function updateProfile(formData: UserProfileForm) {
    try {
        const url = `/v1/auth/profile`
        const { data } = await api.put<string>(url, formData)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function changePassword(formData: UpdateCurrentUSerPasswordForm) {
    try {
        const url = `/v1/auth/update-password`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}