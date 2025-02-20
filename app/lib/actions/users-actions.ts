'use server'

import { redirect } from "next/navigation";
import { sendHttpRequest } from "../http-client";
import { ITEMS_PER_PAGE } from "../constants/items-per-page.constant";
import { revalidatePath } from "next/cache";

export async function getUsersByAdmin(query: string = '', currentPage: number = 1) {
    const { TOKEN, USER } = process.env;

    if (!TOKEN || !USER) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect('/login');
    }

    const { id } = JSON.parse(USER);
    let path = '/usuarios/obtener-por-admin/' + id + '?query=' + query + '&page=' + currentPage + '&limit=' + ITEMS_PER_PAGE;

    const response = await sendHttpRequest(path, 'GET', TOKEN);

    const { status, message } = response;

    if (!status || !message) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect('/login');
    }

    if (status !== 200) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect(`/login?status=${status}&message=${message}`);
    }

    const usuarios = response.response.usuarios;
    return usuarios;

}

export async function getUsersByAdminWithProject(admin_id: string, project_id: string) {
    const { TOKEN, USER } = process.env;

    if (!TOKEN || !USER) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect('/login');
    }

    let path = '/usuarios/obtener-por-admin-con-proyecto/' + admin_id + '/' + project_id;

    const response = await sendHttpRequest(path, 'GET', TOKEN);

    const { status, message } = response;

    if (!status || !message) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect('/login');
    }

    if (status !== 200) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect(`/login?status=${status}&message=${message}`);
    }

    const usuarios = response.response.usuarios;

    return usuarios;
}

export async function getUserById(id: string) {
    const { TOKEN, USER } = process.env;

    if (!TOKEN || !USER) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect('/login');
    }

    let path = '/usuarios/obtener-por-id/' + id;

    const response = await sendHttpRequest(path, 'GET', TOKEN);

    const { status, message } = response;

    if (!status || !message) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect('/login');
    }

    if (status !== 200) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect(`/login?status=${status}&message=${message}`);
    }

    const usuario = response.response.usuario;
    return usuario;

}

export async function getTotalUsersByAdmin(query: string = '', currentPage: number = 1) {
    const { TOKEN, USER } = process.env;

    if (!TOKEN || !USER) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect('/login');
    }

    const { id } = JSON.parse(USER);
    let path = '/usuarios/obtener-total-por-admin/' + id + '?query=' + query + '&page=' + currentPage + '&limit=' + ITEMS_PER_PAGE;

    const response = await sendHttpRequest(path, 'GET', TOKEN);

    const { status, message } = response;

    if (!status || !message) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect('/login');
    }

    if (status !== 200) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect(`/login?status=${status}&message=${message}`);
    }

    const usuarios = response.response.usuarios;
    return usuarios;

}

export async function createUser(formdata: FormData) {

    const rawFormData: any = {
        nombre: formdata.get('name'),
        email: formdata.get('email'),
        password: formdata.get('password'),
        password_confirmation: formdata.get('password_confirmation'),
    }

    // Check if any field in rawFormData is empty
    for (const key in rawFormData) {
        if (!rawFormData[key]) {
            const path = '/dashboard/users/create?message=Todos los campos son requeridos&status=400';
            return redirect(path);
        }
    }

    if (rawFormData.password !== rawFormData.password_confirmation) {
        const path = '/dashboard/users/create?message=Las contraseñas no coinciden&status=400';
        return redirect(path);
    }

    const { TOKEN, USER } = process.env;

    if (!TOKEN || !USER) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect('/login');
    }

    const { id } = JSON.parse(USER);

    let path = '/usuarios/registrar';

    let body = {
        nombre: rawFormData.nombre,
        email: rawFormData.email,
        password: rawFormData.password,
        rol: 'usuario',
        administrador_id: id
    };

    const response = await sendHttpRequest(path, 'POST', TOKEN, body);

    const { status, message } = response;

    if (!status || !message) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect('/login');
    }

    if (status !== 200) {
        const path = `/dashboard/users/create?status=${status}&message=${message}`;
        return redirect(path);
    }

    revalidatePath('/dashboard/users');
    redirect('/dashboard/users?status=200&message=' + message);

}

export async function editUser(formdata: FormData) {

    const rawFormData: any = {
        id: formdata.get('id'),
        nombre: formdata.get('name'),
        email: formdata.get('email'),
    }

    const { TOKEN, USER } = process.env;

    if (!TOKEN || !USER) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect('/login');
    }

    let path = '/usuarios/actualizar/' + rawFormData.id;

    let body = {
        data: {
            nombre: rawFormData.nombre,
            email: rawFormData.email
        }
    };

    const response = await sendHttpRequest(path, 'PUT', TOKEN, body);

    const { status, message } = response;

    if (!status || !message) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect('/login');
    }

    if (status !== 200) {
        const path = `/dashboard/users/edit?id=${rawFormData.id}&status=${status}&message=${message}`;
        return redirect(path);
    }

    revalidatePath('/dashboard/users');
    redirect('/dashboard/users?status=200&message=' + message);

}

export async function changePassword(formdata: FormData) {

    const rawFormData: any = {
        id: formdata.get('id'),
        password: formdata.get('password'),
        password_confirmation: formdata.get('password_confirmation'),
    }

    // Check if any field in rawFormData is empty
    for (const key in rawFormData) {
        if (!rawFormData[key]) {
            const path = `/dashboard/users/edit?id=${rawFormData.id}&message=Todos los campos son requeridos&status=400`;
            redirect(path);
            return;
        }
    }

    const { TOKEN, USER } = process.env;

    if (!TOKEN || !USER) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect('/login');
    }

    let path = '/usuarios/actualizar/' + rawFormData.id;

    let body = {
        data: {
            password: rawFormData.password,
            password_confirmation: rawFormData.password_confirmation
        }
    };

    const response = await sendHttpRequest(path, 'PUT', TOKEN, body);

    const { status, message } = response;

    if (!status || !message) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect('/login');
    }

    if (status !== 200) {
        const path = `/dashboard/users?status=${status}&message=${message}`;
        return redirect(path);
    }

    revalidatePath('/dashboard/users');
    redirect('/dashboard/users?status=200&message=' + message);

}

export async function deleteUser(formdata: FormData) {

    const rawFormData: any = {
        id: formdata.get('id')
    }

    // Check if any field in rawFormData is empty
    for (const key in rawFormData) {
        if (!rawFormData[key]) {
            const path = `/dashboard/users?message=Todos los campos son requeridos&status=400`;
            redirect(path);
            return;
        }
    }

    const { TOKEN, USER } = process.env;

    if (!TOKEN || !USER) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect('/login');
    }

    let path = '/usuarios/eliminar/' + rawFormData.id;

    const response = await sendHttpRequest(path, 'DELETE', TOKEN);
    
    const { status, message } = response;

    if (!status || !message) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect('/login');
    }

    if (status !== 200) {
        const path = `/dashboard/users?status=${status}&message=${message}`;
        return redirect(path);
    }

    revalidatePath('/dashboard/users');
    redirect('/dashboard/users?status=200&message=' + message);

}