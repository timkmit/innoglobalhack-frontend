import { rtkApi } from "@/shared/api/rtkApi";
import { SignInDto } from "../model/types/dto/SignInDto";
import { User } from "../model/types/User";

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<User & { accessToken: string }, SignInDto>({
      query: (authData) => ({
        url: "https://api.pepper-coding.ru/login",
        body: authData,
        method: "POST",
      }),
    }),
  }),
});

export const { useSignInMutation } = userApi;
