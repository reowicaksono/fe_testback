export interface LoginRequestDTO{
    username: string,
    password: string,
    client : string
}

export interface RegisterRequestDTO{
    name: string,
    email: string,
    username: string,
    password: string,
}