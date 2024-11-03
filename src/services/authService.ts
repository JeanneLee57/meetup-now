import { createClient } from '@/utils/supabase/server';
import { SignUpData, SignInData } from '@/types/interface';

export class AuthService {
  static async signUp({ email, password, name }: SignUpData) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) throw error;
    return data;
  }

  static async signIn({ email, password }: SignInData) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  }

  static async signOut() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
}
