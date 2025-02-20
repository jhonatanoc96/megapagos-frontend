import Form from '@ui/users/create-form';
import Breadcrumbs from '@ui/users/breadcrumbs';

export default async function Page() {
    return (
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
    );
}