import { User } from "@/Domain/Models/user.model"
import { LoginRequestDTO } from "../DTOs/auth.dto"
import useUnAuthAxios from "@/Shared/axios/use-unauth"


export const LoginDataSource = async (data: LoginRequestDTO) : Promise<User> => {
    const response = await useUnAuthAxios<User>("POST", "/login",data);
    if (response.error) throw new Error(response.error.message);
    console.log("check response", response);
    return response.data!;
}