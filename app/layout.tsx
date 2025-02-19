import { montserrat } from './ui/fonts';
import './ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        {children}

      <footer className='py-10 flex justify-center items-center fixed w-full'>
        Prueba de Ingreso - 💻 Mega Pagos - {new Date().getFullYear()}
      </footer>
      </body>
    </html>
  );
}
