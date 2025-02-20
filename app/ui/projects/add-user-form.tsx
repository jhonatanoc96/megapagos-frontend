import Link from 'next/link';
import { Notification } from '@/app/ui/projects/notification';
import { getUsersByAdminWithProject } from '@/app/lib/actions/users-actions';
import { handleUserProject } from '@/app/lib/actions/users-projects-actions';

export default async function Form({
  id
}: {
  id: string
}) {

  const { NEXT_PUBLIC_USER } = process.env as any;

  const admin_id = JSON.parse(NEXT_PUBLIC_USER).id;

  const users = await getUsersByAdminWithProject(admin_id, id);

  return (

    <div>
      <Notification />
      {users.map((user: any) => (
        <form key={user.id} action={handleUserProject} className="mb-4">
          <input type="hidden" name="proyecto_id" value={id} />
          <input type="hidden" name="asignado" value={user.proyecto ? 'true' : 'false'} />
          <div className="rounded-md bg-gray-50 p-4 md:p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{user.nombre}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="flex items-center">
              <label htmlFor={`selectedUsers-${user.id}`} className="mr-2 text-sm font-medium">Asignado</label>
              <button
                type="submit"
                id={`selectedUsers-${user.id}`}
                name="usuario_id"
                value={user.id}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 ${user.proyecto ? 'bg-indigo-600' : 'bg-gray-200'}`}
              >
                <span className="sr-only">Toggle Asociado</span>
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${user.proyecto ? 'translate-x-5' : 'translate-x-0'}`}
                />
              </button>
            </div>
          </div>
        </form>
      ))
      }
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/projects"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
      </div>
    </div >

  );
}
