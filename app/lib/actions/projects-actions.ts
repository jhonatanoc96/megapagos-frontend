'use server'

import { redirect } from "next/navigation";
import { sendHttpRequest } from "../http-client";
import { ITEMS_PER_PAGE } from "../constants/items-per-page.constant";
import { revalidatePath } from "next/cache";

export async function getProjectsByAdmin(query: string = '', currentPage: number = 1) {
    const { TOKEN, USER } = process.env;

    if (!TOKEN || !USER) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect('/login');
    }

    const { id } = JSON.parse(USER);
    let path = '/proyectos/obtener-por-admin/' + id + '?query=' + query + '&page=' + currentPage + '&limit=' + ITEMS_PER_PAGE;

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

    const proyectos = response.response.proyectos;
    return proyectos;

}

export async function getProjectById(id: string) {
    const { TOKEN, USER } = process.env;

    if (!TOKEN || !USER) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect('/login');
    }

    let path = '/proyectos/obtener-por-id/' + id;

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

    const proyecto = response.response.proyecto;
    return proyecto;

}

export async function getTotalProjectsByAdmin(query: string = '', currentPage: number = 1) {
    const { TOKEN, USER } = process.env;

    if (!TOKEN || !USER) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect('/login');
    }

    const { id } = JSON.parse(USER);
    let path = '/proyectos/obtener-total-por-admin/' + id + '?query=' + query + '&page=' + currentPage + '&limit=' + ITEMS_PER_PAGE;

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

    const proyectos = response.response.proyectos;
    return proyectos;

}

export async function createProject(formdata: FormData) {

    const rawFormData: any = {
        nombre: formdata.get('name'),
        descripcion: formdata.get('description'),
    }

    // Check if any field in rawFormData is empty
    for (const key in rawFormData) {
        if (!rawFormData[key]) {
            const path = '/dashboard/projects/create?message=Todos los campos son requeridos&status=400';
            return redirect(path);
        }
    }

    const { TOKEN, USER } = process.env;

    if (!TOKEN || !USER) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect('/login');
    }

    const { id } = JSON.parse(USER);

    let path = '/proyectos/crear';

    let body = {
        nombre: rawFormData.nombre,
        descripcion: rawFormData.descripcion,
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
        const path = `/dashboard/projects/create?status=${status}&message=${message}`;
        return redirect(path);
    }

    revalidatePath('/dashboard/projects');
    redirect('/dashboard/projects?status=200&message=' + message);

}

export async function editProject(formdata: FormData) {

    const rawFormData: any = {
        id: formdata.get('id'),
        nombre: formdata.get('name'),
        descripcion: formdata.get('description')
    }

    const { TOKEN, USER } = process.env;

    if (!TOKEN || !USER) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect('/login');
    }

    let path = '/proyectos/actualizar/' + rawFormData.id;

    const { id } = JSON.parse(USER);

    let body = {
        data: {
            nombre: rawFormData.nombre,
            descripcion: rawFormData.descripcion,
            administrador_id: id
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
        const path = `/dashboard/projects/edit?id=${rawFormData.id}&status=${status}&message=${message}`;
        return redirect(path);
    }

    revalidatePath('/dashboard/projects');
    redirect('/dashboard/projects?status=200&message=' + message);

}

export async function deleteProject(formdata: FormData) {

    const rawFormData: any = {
        id: formdata.get('id')
    }

    // Check if any field in rawFormData is empty
    for (const key in rawFormData) {
        if (!rawFormData[key]) {
            const path = `/dashboard/projects?message=Todos los campos son requeridos&status=400`;
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

    let path = '/proyectos/eliminar/' + rawFormData.id;

    const response = await sendHttpRequest(path, 'DELETE', TOKEN);

    const { status, message } = response;

    if (!status || !message) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect('/login');
    }

    if (status !== 200) {
        const path = `/dashboard/projects?status=${status}&message=${message}`;
        return redirect(path);
    }

    revalidatePath('/dashboard/projects');
    redirect('/dashboard/projects?status=200&message=' + message);

}