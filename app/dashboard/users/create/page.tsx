import Form from '@ui/users/create-form';
import Breadcrumbs from '@ui/users/breadcrumbs';
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
                        { label: 'Usuarios', href: '/dashboard/users' },
                        {
                            label: 'Crear Usuario',
                            href: '/dashboard/users/create',
                            active: true,
                        },
                    ]}
                />
                <Form />
            </main>
        </Suspense>
    );
}