import { AuthRepositories } from "@/Domain/Repositories/auth.repositories";
import { LoginRequestDTO } from "../DTOs/auth.dto";
import { User } from "@/Domain/Models/user.model";
import { LoginDataSource } from "../DataSources/auth.data_source";

export class AuthRepositoriesImpl implements AuthRepositories{
    async login(data: LoginRequestDTO): Promise<User>{
        return await LoginDataSource(data);
    }

}