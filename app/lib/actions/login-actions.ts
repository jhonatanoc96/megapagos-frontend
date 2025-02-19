'use server'

import { redirect } from "next/navigation";
import { sendHttpRequest } from "../http-client";

export async function handleLogin(formdata: FormData) {

    const rawFormData = {
        email: formdata.get('email'),
        password: formdata.get('password'),
    };
    
    const response = await sendHttpRequest('/usuarios/autenticar', 'POST', '', rawFormData);

    if (response.status !== 200) {
        return redirect(`/login?status=${response.status}&message=${response.message}`);
    } else {
        const { token, user } = response;

        process.env.TOKEN = token.accessToken;
        process.env.USER = JSON.stringify(user);

        redirect('/dashboard/users');
    }
}
