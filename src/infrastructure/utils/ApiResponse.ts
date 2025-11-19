export class ApiResponse {
    static success(message: string, data?: any) {
        return {
            success: true,
            message,
            data: data ?? null,
        };
    }

    static error(message: string, errors?: any) {
        return {
            success: false,
            message,
            errors: errors ?? null,
        };
    }

    static created(message: string, data?: any) {
        return {
            success: true,
            message,
            data: data ?? null,
        };
    }

    static validationError(errors: any) {
        return {
            success: false,
            message: "Errores de validación",
            errors,
        };
    }
}
