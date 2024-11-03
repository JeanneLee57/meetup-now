import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { SignOutButton } from '@/components/SignOutButton';

export async function Header() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link className="text-xl font-bold text-gray-900" href="/">
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
            {session ? (
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
                <Link
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  href="/signup"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
