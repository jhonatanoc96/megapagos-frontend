import Form from '@ui/projects/edit-form';
import Breadcrumbs from '@ui/projects/breadcrumbs';
import { redirect } from 'next/navigation';

export default async function Page({
    searchParams
}: {
    searchParams?: {
        id: string;
    }
}) {
    const params: any = await searchParams;

    const id = params?.id;

    if (!id) {
        redirect('/dashboard/projects');
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Proyectos', href: '/dashboard/projects' },
                    {
                        label: 'Editar Proyecto',
                        href: '/dashboard/projects/edit?id=' + id,
                        active: true,
                    },
                ]}
            />
            <Form id={id} />
        </main>
    );
}