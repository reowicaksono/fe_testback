import { destroyCookie, parseCookies, setCookie } from "nookies"
import axiosInstance from "./api-instance";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ActionReturn, HttpMethod } from "./actios";


const useAuthAxios = () => {
    const cookies = parseCookies();
    const router = useRouter();

    // TO-DO -> interceptor to add cookies
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = cookies["access-token"]
            if (token) config.headers.Authorization = `Bearers ${token}`
            return config
        },
        (error) => {
            return Promise.reject(error);
        }
    )

    // handle 401 unauth
    axiosInstance.interceptors.request.use(
        (response) => response,
        async (error) => {
            const originalReq = error.config;
            if(
                error.response &&
                error.response.status == 401 &&
                !originalReq._retry
            ){
                originalReq._retry = true;

                try{
                    const refreshToken = cookies["refresh-token"]

                    const res = await axios.post("/refresh-token",{
                        "refresh_token" : refreshToken,
                        "client" : "web"
                    })

                    const access_token = res.data.data.access_token;

                     setCookie(null, "access-token", access_token, {
                        path: "/",
                     });

                     originalReq.headers.Authorization = `Bearer ${access_token}`

                     return axiosInstance(originalReq)
                }catch(error){
                    destroyCookie(null, "access_token");
                    destroyCookie(null, "refresh_token");
                    router.push("/login");
                    return Promise.reject(error);
                }
            }

            return Promise.reject(error);
        }
    )
    
    // handle request 
    const request = async<T>(httpMethod: HttpMethod, endpoint: string, body? : any): Promise<ActionReturn<T>> => {
        try{
            const config = {
                httpMethod,
                url : endpoint,
                ...(body ? {data:body} : {})   
            }

            const res = await axiosInstance(config)
            return {data: res?.data?.data}
        }catch(error){
            return {
                data: null,
                error: isAxiosError(error) ?
                {
                    code: error.response?.status.toString() || "UNKNOWN ERROR",
                    message: error.response?.data["message"] ?? error.response?.data
                } :
                {
                    code: "UNKNOWN ERROR",
                    message: (error as Error).message
                }
            }
        }
    }

    return {axiosInstance,request}
}

export default useAuthAxios;