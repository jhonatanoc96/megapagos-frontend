import { deleteProject } from '@/app/lib/actions/projects-actions';
import { PencilIcon, PlusIcon, TrashIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateProject() {
  return (
    <Link
      href="/dashboard/projects/create"
      className="create_button flex h-10 items-center rounded-lg primary_bg px-4 text-sm font-medium text-white transition-colors hover:primary_bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Crear Proyecto</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function AddUser({ id }: { id: string }) {
  const href = `/dashboard/projects/add?id=${id}`;
  return (
    <Link
      href={href}
      className="add_button rounded-md border p-2 hover:bg-gray-100"
    >
      <UserPlusIcon className="w-5" />
    </Link>
  );
}

export function UpdateProject({ id }: { id: string }) {
  const href = `/dashboard/projects/edit?id=${id}`;
  return (
    <Link
      href={href}
      className="edit_button rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteProject({ id }: { id: string }) {
  return (
    <>
      <form action={deleteProject}>
      <input type="hidden" name="id" value={id} />
        <button type="submit" className="trash_button rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Eliminar</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}
