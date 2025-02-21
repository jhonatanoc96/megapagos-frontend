import { deleteUser } from '@/app/lib/actions/users-actions';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateUser() {
  return (
    <Link
      href="/dashboard/users/create"
      className="create_button flex h-10 items-center rounded-lg primary_bg px-4 text-sm font-medium text-white transition-colors hover:primary_bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Crear Usuario</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateUser({ id }: { id: string }) {
  const href = `/dashboard/users/edit?id=${id}`;
  return (
    <Link
      href={href}
      className="edit_button rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteUser({ id }: { id: string }) {
  return (
    <>
      <form action={deleteUser}>
      <input type="hidden" name="id" value={id} />
        <button type="submit" className="trash_button rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Eliminar</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}
