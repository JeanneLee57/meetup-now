'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export function SignOutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <button className="text-red-500 hover:text-red-600" onClick={handleSignOut}>
      로그아웃
    </button>
  );
}
