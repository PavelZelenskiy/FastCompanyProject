export function generateAuthError(message) {
    switch (message) {
        case 'EMAIL_NOT_FOUND':
            return 'Пользователь c таким email не существует';

        case 'INVALID_PASSWORD':
            return 'Неверный пароль';

        case 'EMAIL_EXISTS':
            return 'Пользователь c таким email уже существует';

        default:
            return 'Слишком много попыток входа, попробуйте позже';
    }
}
