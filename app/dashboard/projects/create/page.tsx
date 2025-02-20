import Form from '@ui/projects/create-form';
import Breadcrumbs from '@ui/projects/breadcrumbs';

export default async function Page() {
    return (
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
    );
}