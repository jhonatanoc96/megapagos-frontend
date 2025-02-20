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

    console.log("rawFormData -----> ", rawFormData);

    // Check if any field in rawFormData is empty
    for (const key in rawFormData) {
        if (!rawFormData[key]) {
            const path = '/dashboard/projects/add?message=Todos los campos son requeridos&status=400';
            return redirect(path);
        }
    }

    const { TOKEN, USER } = process.env;

    if (!TOKEN || !USER) {
        process.env.TOKEN = '';
        process.env.USER = '';
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

    const response = await sendHttpRequest(path, method, TOKEN, body);

    const { status, message } = response;

    if (!status || !message) {
        process.env.TOKEN = '';
        process.env.USER = '';
        return redirect('/login');
    }

    if (status !== 200) {
        const path = `/dashboard/projects?id=${rawFormData.proyecto_id}&status=${status}&message=${message}`;
        return redirect(path);
    }

    revalidatePath('/dashboard/projects');
    redirect(`/dashboard/projects?id=${rawFormData.proyecto_id}&status=200&message=${message}`);
}
