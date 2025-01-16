import { isAxiosError } from "axios";

export function formatDate(isoString: string): string {
    const date = new Date(isoString)
    const formatter = new Intl.DateTimeFormat('es-Es', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    return formatter.format(date)
}

export function formatFullDate(isoString: string): string {
    const date = new Date(isoString)
    const formatter = new Intl.DateTimeFormat('es-Es', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric', 
        hour12: true
    })
    return formatter.format(date)
}

export const handleAxiosError = (error: unknown) => {
    if (isAxiosError(error)) {
        if (error.response) { // Manejar errores de validación específicos del middleware handleInputErrors 
            if (error.response.status === 400) {
                const validationErrors = error.response.data.errors;
                throw new Error(validationErrors.map((err: { msg: string }) => err.msg).join(', '));
            } // Otros errores de respuesta del servidor 
            throw new Error(error.response.data.error || 'Error de servidor');
        } else if (error.request) { // Errores de solicitud (sin respuesta del servidor) 
            throw new Error('No se recibió respuesta del servidor');
        } else { // Otros errores de Axios 
            throw new Error('Error en la configuración de la solicitud');
        }
    } else { // Errores no relacionados con Axios 
        throw new Error('Error desconocido');
    }
}