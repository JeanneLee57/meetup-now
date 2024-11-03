'use server';

import { AuthService } from '@/services/authService';
import { SignUpData, SignInData } from '@/types/interface';
import { redirect } from 'next/navigation';

export async function signUp(formData: FormData) {
  try {
    const signUpData: SignUpData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      name: formData.get('name') as string,
    };

    await AuthService.signUp(signUpData);
    redirect('/signin'); // 회원가입 후 로그인 페이지로 이동
  } catch (error) {
    console.error('회원가입 중 오류 발생:', error);
    throw error;
  }
}

export async function signIn(formData: FormData) {
  try {
    const signInData: SignInData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    await AuthService.signIn(signInData);
    redirect('/'); // 로그인 후 메인 페이지로 이동
  } catch (error) {
    console.error('로그인 중 오류 발생:', error);
    throw error;
  }
}
