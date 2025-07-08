import { AuthRepositories } from "@/Domain/Repositories/auth.repositories";
import { LoginRequestDTO, RegisterRequestDTO } from "../DTOs/auth.dto";
import { User } from "@/Domain/Models/user.model";
import { LoginDataSource, RegisterDataSource } from "../DataSources/auth.data_source";

export class AuthRepositoriesImpl implements AuthRepositories{
    async login(data: LoginRequestDTO): Promise<User>{
        return await LoginDataSource(data);
    }

    async register(data: RegisterRequestDTO): Promise<User> {
        return await RegisterDataSource(data);
    }

}