import { isAxiosError } from "axios";
import { ActionReturn, HttpMethod } from "./actios";
import axiosInstance from "./api-instance";


const useUnAuthAxios = async<T> (method:HttpMethod, endpoint: string, body ? : any) : Promise<ActionReturn<T>> => {
    try{
        const config = {
            method,
            url: endpoint,
            ...(body ? {data:body} : {})
        }

        const res = await axiosInstance(config);
        return {data: res?.data?.data}
    } catch (error) {
        return {
        data: null,
        error: isAxiosError(error)
            ? {
                code: error.response?.status.toString() || "UNKNOWN_ERROR",
                message: error.response?.data["errors"] ?? error.response?.data,
            }
            : {
                code: "UNKNOWN_ERROR",
                message: (error as Error).message,
            },
        };
    }
}

export default useUnAuthAxios;