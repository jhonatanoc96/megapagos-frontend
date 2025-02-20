import Form from '@ui/projects/create-form';
import Breadcrumbs from '@ui/projects/breadcrumbs';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function Page() {
    const { ROL } = process.env;

    if (ROL === 'usuario') {
        return redirect('/dashboard/projects');
    }

    return (
        <Suspense>
            <main>
                <Breadcrumbs
                    breadcrumbs={[
                        { label: 'Proyectos', href: '/dashboard/projects' },
                        {
                            label: 'Crear Proyecto',
                            href: '/dashboard/projects/create',
                            active: true,
                        },
                    ]}
                />
                <Form />
            </main>
        </Suspense>
    );
}