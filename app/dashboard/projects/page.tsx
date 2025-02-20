import Pagination from '@ui/projects/pagination';
import Search from '@ui/search';
import Table from '@ui/projects/table';
import { CreateProject } from '@ui/projects/buttons';
import { lusitana } from '@ui/fonts';
import { ProjectsTableSkeleton } from '@ui/skeletons';
import { Suspense } from 'react';
import { ITEMS_PER_PAGE } from '@/app/lib/constants/items-per-page.constant';
import { Notification } from '@/app/ui/projects/notification';
import { getProjectsByAdmin, getTotalProjectsByAdmin } from '@/app/lib/actions/projects-actions';
import { getProjectsByUserID } from '@/app/lib/actions/users-projects-actions';

export default async function UsersPage({
    searchParams
}: {
    searchParams?: Promise<{
        query: string
        page: string
    }>
}) {
    const params = await searchParams;

    const query = params?.query || '';
    const currentPage = params?.page ? Number(params.page) : 1;

    const { ROL, USER } = process.env as any;

    let projects: any[] = [];
    let total_projects = 0;

    if (ROL === 'administrador') {
        projects = await getProjectsByAdmin(query, currentPage);
        total_projects = await getTotalProjectsByAdmin(query, currentPage);

    } else {
        const id = JSON.parse(USER).id;
        projects = await getProjectsByUserID(id);
    }

    const totalPages = Math.ceil(total_projects / ITEMS_PER_PAGE);

    return (
        <div className="w-full">
            <Notification />
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Proyectos</h1>
            </div>
            {ROL === 'administrador' && (
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <Search placeholder="Buscar Proyectos..." />
                    <CreateProject />
                </div>
            )}
            <Suspense key={query + currentPage} fallback={<ProjectsTableSkeleton />}>
                <Table projects={projects} />
            </Suspense>
            {ROL === 'administrador' && (
                <div className="mt-5 flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div>)}
        </div>
    );
}