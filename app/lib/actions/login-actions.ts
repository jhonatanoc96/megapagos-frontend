'use server'

import { redirect } from "next/navigation";
import { sendHttpRequest } from "../http-client";
import { revalidatePath } from "next/cache";

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


export async function handleSignup(formdata: FormData) {

    const rawFormData: any = {
        nombre: formdata.get('name'),
        email: formdata.get('email'),
        password: formdata.get('password'),
        password_confirmation: formdata.get('password_confirmation'),
    }

    // Check if any field in rawFormData is empty
    for (const key in rawFormData) {
        if (!rawFormData[key]) {
            const path = '/sign-up?message=Todos los campos son requeridos&status=400';
            return redirect(path);
        }
    }

    if (rawFormData.password !== rawFormData.password_confirmation) {
        const path = '/sign-up?message=Las contraseñas no coinciden&status=400';
        return redirect(path);
    }


    let path = '/usuarios/registrar';

    let body = {
        nombre: rawFormData.nombre,
        email: rawFormData.email,
        password: rawFormData.password,
        rol: 'administrador',
    };

    const response = await sendHttpRequest(path, 'POST', '', body);

    console.log("Response: ", response);

    const { status, message } = response;

    if (!status || !message) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect('/login');
    }

    if (status !== 200) {
        const path = `/sign-up?status=${status}&message=${message}`;
        return redirect(path);
    }

    revalidatePath('/login');
    redirect('/login?status=200&message=' + message);

}
