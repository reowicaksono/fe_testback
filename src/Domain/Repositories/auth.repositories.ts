import { LoginRequestDTO } from "@/Data/DTOs/auth.dto";
import { User } from "@/Domain/Models/user.model";


export interface AuthRepositories{
    login(data: LoginRequestDTO): Promise<User>;
}