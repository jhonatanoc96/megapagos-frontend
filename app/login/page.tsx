import styles from './login.module.css';
import { lusitana } from '@ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@ui/button';
import { handleLogin } from '@lib/actions/login-actions';
import { Notification } from '@ui/users/notification';
import { SignUpButton } from '@ui/sign-up-button';
import { Suspense } from 'react';

export default function LoginForm() {

  return (
    <Suspense>
      <div className={`${styles.container} flex items-center justify-center min-h-screen w-full`}>
        <Notification />
        <form className="space-y-3" action={handleLogin}>
          <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <h1 className={`${lusitana.className} mb-3 text-2xl`}>
              Inicia sesión para continuar.
            </h1>
            <div className="w-full">
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="email"
                >
                  Correo Electrónico
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Ingrese correo electrónico"
                    required
                  />
                  <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Ingrese contraseña"
                    required
                    minLength={6}
                  />
                  <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
            </div>
            <Button type="submit" className="mt-4 w-full">
              Iniciar Sesión <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </Button>
            <SignUpButton />
          </div>
        </form>
      </div>
    </Suspense>
  );
}