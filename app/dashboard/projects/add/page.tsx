import Form from '@ui/projects/add-user-form';
import Breadcrumbs from '@ui/projects/breadcrumbs';

export default async function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Proyectos', href: '/dashboard/projects' },
                    {
                        label: 'Agregar Usuario',
                        href: '/dashboard/projects/add',
                        active: true,
                    },
                ]}
            />
            <Form />
        </main>
    );
}