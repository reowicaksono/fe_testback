export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type ActionReturn <T> = {
    data: T | null,
    error? : {
        code : string,
        message : string
    }
}