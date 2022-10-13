export const messageErrors = (minLength: string | number, maxLength: string | number, minErrorMessage: string | null): { [key: string]: string } => ({
    required: 'Este campo es requerido',
    phoneInvalid: 'Número de teléfono inválido',
    invalidNit: 'Nit inválido',
    validationCui: 'DPI inválido',
    email: 'Campo inválido',
    minlength: minErrorMessage || `El mínimo de caracteres es: ${minLength}`,
    maxlength: `El máximo de caracteres es: ${maxLength}`
})