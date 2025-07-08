import { AuthRepositoriesImpl } from "@/Data/Repositories/auth.repositories.impl";
import { LoginUseCase } from "@/Domain/UseCases/auth.use_case";

const authRepository = new AuthRepositoriesImpl();
export const loginUseCase = new LoginUseCase(authRepository);