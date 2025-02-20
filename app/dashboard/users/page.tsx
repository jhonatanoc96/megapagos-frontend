import Pagination from '@ui/users/pagination';
import Search from '@ui/search';
import Table from '@ui/users/table';
import { CreateUser } from '@ui/users/buttons';
import { lusitana } from '@ui/fonts';
import { UsersTableSkeleton } from '@ui/skeletons';
import { Suspense } from 'react';
import { ITEMS_PER_PAGE } from '@/app/lib/constants/items-per-page.constant';
import { getTotalUsersByAdmin, getUsersByAdmin } from '@/app/lib/actions/users-actions';
import { Notification } from '@/app/ui/users/notification';
import { redirect } from 'next/navigation';
import { environment } from '@/app/lib/utils';

export default async function UsersPage({
    searchParams
}: {
    searchParams?: Promise<{
        query: string
        page: string
    }>
}) {
    const { ROL } = environment;

    if (ROL === 'usuario') {
        return redirect('/dashboard/projects');
    }

    const params = await searchParams;

    const query = params?.query || '';
    const currentPage = params?.page ? Number(params.page) : 1;

    const users = await getUsersByAdmin(query, currentPage);

    const total_users = await getTotalUsersByAdmin(query, currentPage);
    const totalPages = Math.ceil(total_users / ITEMS_PER_PAGE);

    return (
        <div className="w-full">
            <Notification />
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Usuarios</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Buscar Usuarios..." />
                <CreateUser />
            </div>
            <Suspense key={query + currentPage} fallback={<UsersTableSkeleton />}>
                <Table users={users} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}