import { LoginRequestDTO } from "@/Data/DTOs/auth.dto";
import { AuthRepositories } from "../Repositories/auth.repositories";
import { User } from "../Models/user.model";

export class LoginUseCase{
    constructor(private authRepo: AuthRepositories) {}

    async execute(data: LoginRequestDTO): Promise<User>{
        return await this.authRepo.login(data);
    }
}