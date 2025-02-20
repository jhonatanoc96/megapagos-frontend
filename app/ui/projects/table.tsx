import { formatDate } from '@/app/lib/utils';
import { DeleteProject, UpdateProject } from './buttons';

export default async function UsersTable({
  projects
}: {
  projects: any;
}) {
  const { ROL } = process.env;

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {projects?.map((project: any, index: number) => (
              <div
                key={project.id + '_' + index}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{project.nombre}</p>
                    </div>
                    <p className="text-sm text-gray-500">{project.descripcion}</p>
                  </div>
                </div>
                {ROL === 'administrador' && (
                  <div className="flex w-full items-center justify-between pt-4">
                    <div className="flex justify-end gap-2">
                      <UpdateProject id={project.id} />
                      <DeleteProject id={project.id} />
                    </div>
                  </div>)}
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Nombre
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Descripción
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Fecha de Creación
                </th>
                {ROL === 'administrador' && (
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                  </th>)}
              </tr>
            </thead>
            <tbody className="bg-white">
              {projects?.map((project: any, index: number) => (
                <tr
                  key={project.id + '_' + index}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{project.nombre}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {project.descripcion}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDate(project.createdAt)}
                  </td>
                  {ROL === 'administrador' && (
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateProject id={project.id} />
                        <DeleteProject id={project.id} />
                      </div>
                    </td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}