import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { SignOutButton } from '@/components/SignOutButton';
import logo from '/public/logo.svg';
import Image from 'next/image';
import Button from '@/components/Button';

export async function Header() {
  const supabase = await createClient();
  const { data: session } = await supabase.auth.getUser();

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              className="flex gap-2 text-xl font-bold text-gray-900"
              href="/"
            >
              <Image alt="logo" height={30} src={logo} width={30} />
              meetup-now
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                className="text-gray-600 hover:text-gray-900"
                href="/events"
              >
                이벤트 목록
              </Link>
              <Link className="text-gray-600 hover:text-gray-900" href="/about">
                소개
              </Link>
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {session.user ? (
              <>
                <Link
                  className="text-gray-600 hover:text-gray-900"
                  href="/events/create"
                >
                  이벤트 생성
                </Link>
                <div className="flex items-center gap-4">
                  <Link
                    className="text-gray-600 hover:text-gray-900"
                    href="/dashboard"
                  >
                    {session.user.email}
                  </Link>
                  <SignOutButton />
                </div>
              </>
            ) : (
              <>
                <Link
                  className="text-gray-600 hover:text-gray-900"
                  href="/signin"
                >
                  로그인
                </Link>
                <Link href="/signup">
                  <Button label={'회원가입'} variant={'primary'} />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
