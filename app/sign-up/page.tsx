import styles from './sign-up.module.css';
import { lusitana } from '@ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@ui/button';
import { handleSignup } from '@lib/actions/login-actions';
import { Notification } from '@ui/users/notification';
import { LoginButton } from '@ui/login-button';
import { Suspense } from 'react';

export default function LoginForm() {

  return (
    <Suspense>
      <div className={`${styles.container} flex items-center justify-center min-h-screen w-full`}>
        <Notification />
        <form className="space-y-3" action={handleSignup}>
          <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <h1 className={`${lusitana.className} mb-3 text-2xl`}>
              Registrarse
            </h1>
            <div className="w-full">
              <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Nombre */}
                <div className="mb-4">
                  <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                    Nombre
                  </label>
                  <div className="relative mt-2 rounded-md">
                    <div className="relative">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Ingrese el nombre"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        required
                      />
                      <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                  </div>
                </div>

                {/* Correo */}
                <div className="mb-4">
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Correo
                  </label>
                  <div className="relative mt-2 rounded-md">
                    <div className="relative">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Ingrese el correo electrónico"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        required
                      />
                      <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                  </div>
                </div>

                {/* Contraseña */}
                <div className="mb-4">
                  <label htmlFor="password" className="mb-2 block text-sm font-medium">
                    Contraseña
                  </label>
                  <div className="relative mt-2 rounded-md">
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Ingrese la contraseña"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        required
                      />
                      <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                  </div>
                </div>

                {/* Confirmar Contraseña */}
                <div className="mb-4">
                  <label htmlFor="password_confirmation" className="mb-2 block text-sm font-medium">
                    Confirmar Contraseña
                  </label>
                  <div className="relative mt-2 rounded-md">
                    <div className="relative">
                      <input
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        placeholder="Confirme la contraseña"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        required
                      />
                      <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button type="submit" className="mt-4 w-full">
              Registrarse <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </Button>
            <LoginButton />
          </div>
        </form>
      </div>
    </Suspense>
  );
}