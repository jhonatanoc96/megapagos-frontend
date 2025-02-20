'use server'

import { redirect } from "next/navigation";
import { sendHttpRequest } from "../http-client";
import { revalidatePath } from "next/cache";

export async function handleUserProject(formdata: FormData) {
    const rawFormData: any = {
        usuario_id: formdata.get('usuario_id'),
        proyecto_id: formdata.get('proyecto_id'),
        asignado: formdata.get('asignado'),
    }

    // Check if any field in rawFormData is empty
    for (const key in rawFormData) {
        if (!rawFormData[key]) {
            const path = '/dashboard/projects/add?message=Todos los campos son requeridos&status=400';
            return redirect(path);
        }
    }

    const { NEXT_PUBLIC_TOKEN, NEXT_PUBLIC_USER } = process.env;

    if (!NEXT_PUBLIC_TOKEN || !NEXT_PUBLIC_USER) {
        process.env.NEXT_PUBLIC_TOKEN = '';
        process.env.NEXT_PUBLIC_USER = '';
        return redirect('/login');
    }

    const body = {
        usuario_id: rawFormData.usuario_id,
        proyecto_id: rawFormData.proyecto_id
    }

    let path = '';
    let method: 'GET' | 'POST' | 'PUT' | 'DELETE';

    if (rawFormData.asignado === 'true') {
        path = '/usuario-proyectos/eliminar';
        method = 'DELETE';
    } else {
        path = '/usuario-proyectos/crear';
        method = 'POST';
    }

    const response = await sendHttpRequest(path, method, NEXT_PUBLIC_TOKEN, body);

    const { status, message } = response;

    if (!status || !message) {
        process.env.NEXT_PUBLIC_TOKEN = '';
        process.env.NEXT_PUBLIC_USER = '';
        return redirect('/login');
    }

    if (status !== 200) {
        const path = `/dashboard/projects?id=${rawFormData.proyecto_id}&status=${status}&message=${message}`;
        return redirect(path);
    }

    revalidatePath('/dashboard/projects');
    redirect(`/dashboard/projects?id=${rawFormData.proyecto_id}&status=200&message=${message}`);
}

export async function getProjectsByUserID(id: string) {
    const { NEXT_PUBLIC_TOKEN, NEXT_PUBLIC_USER } = process.env;

    if (!NEXT_PUBLIC_TOKEN || !NEXT_PUBLIC_USER) {
        process.env.NEXT_PUBLIC_TOKEN = '';
        process.env.NEXT_PUBLIC_USER = '';
        return redirect('/login');
    }

    let path = '/usuario-proyectos/obtener-por-usuario/' + id;

    const response = await sendHttpRequest(path, 'GET', NEXT_PUBLIC_TOKEN);

    const { status, message } = response;

    if (!status || !message) {
        process.env.NEXT_PUBLIC_TOKEN = '';
        process.env.NEXT_PUBLIC_USER = '';
        return redirect('/login');
    }

    if (status !== 200) {
        process.env.NEXT_PUBLIC_TOKEN = '';
        process.env.NEXT_PUBLIC_USER = '';
        return redirect(`/login?status=${status}&message=${message}`);
    }

    const proyectos = response.response.proyectos;

    return proyectos;
}
