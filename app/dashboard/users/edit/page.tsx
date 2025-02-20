import Form from '@ui/users/edit-form';
import Breadcrumbs from '@ui/users/breadcrumbs';
import { redirect } from 'next/navigation';

export default async function Page({
    searchParams
}: {
    searchParams?: Promise<{
        id: string
    }>
}) {
    const { NEXT_PUBLIC_ROL } = process.env;

    if (NEXT_PUBLIC_ROL === 'usuario') {
        return redirect('/dashboard/projects');
    }

    const params: any = await searchParams;

    const id = params?.id;

    if (!id) {
        redirect('/dashboard/users');
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Usuarios', href: '/dashboard/users' },
                    {
                        label: 'Editar Usuario',
                        href: '/dashboard/users/edit?id=' + id,
                        active: true,
                    },
                ]}
            />
            <Form id={id} />
        </main>
    );
}