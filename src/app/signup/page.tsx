import { signUp } from '@/actions/authActions';

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form action={signUp} className="space-y-4 w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center">회원가입</h1>

        <div>
          <label className="block text-sm font-medium" htmlFor="name">
            이름
          </label>
          <input
            required
            className="mt-1 block w-full rounded-md border p-2"
            id="name"
            name="name"
            type="text"
          />
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="email">
            이메일
          </label>
          <input
            required
            className="mt-1 block w-full rounded-md border p-2"
            id="email"
            name="email"
            type="email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="password">
            비밀번호
          </label>
          <input
            required
            className="mt-1 block w-full rounded-md border p-2"
            id="password"
            name="password"
            type="password"
          />
        </div>

        <button
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          type="submit"
        >
          가입하기
        </button>
      </form>
    </div>
  );
}
