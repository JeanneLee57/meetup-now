import { createEvent } from '@/actions/eventActions';
import Button from '@/components/Button';
import LocationSearch from '@/components/LocationSearch';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = await createClient();
  const { data: session } = await supabase.auth.getUser();

  if (!session.user) {
    redirect('/signin');
  }

  return (
    <div>
      <main className="p-4">
        <h1 className="text-center mb-6">새 이벤트를 계획해 보세요!</h1>
        <form action={createEvent} className="max-w-2xl mx-auto p-6 space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="title"
            >
              이벤트 제목
            </label>
            <input
              required
              className="w-full p-3 rounded-md border border-border focus:outline-none"
              id="title"
              name="title"
              type="text"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="datetime"
            >
              날짜 및 시간
            </label>
            <input
              required
              className="w-full p-3 rounded-md border border-border focus:outline-none"
              id="datetime"
              name="datetime"
              type="datetime-local"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="location"
            >
              장소
            </label>
            <LocationSearch />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="organizer"
            >
              주최자
            </label>
            <input
              required
              className="w-full p-3 rounded-md border border-border focus:outline-none"
              id="organizer"
              name="organizer"
              type="text"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="image"
            >
              사진
            </label>
            <input
              accept="image/*"
              className="w-full p-3 rounded-md border border-border focus:outline-none"
              id="image"
              name="image"
              type="file"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="description"
            >
              설명
            </label>
            <textarea
              required
              className="w-full p-3 rounded-md border border-border focus:outline-none"
              id="description"
              name="description"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              참가자 공개 설정
            </label>
            <div className="mt-2">
              <div className="flex items-center">
                <input
                  className="mr-2"
                  id="public"
                  name="visibility"
                  type="radio"
                  value="public"
                />
                <label htmlFor="public">공개</label>
              </div>
              <div className="flex items-center mt-2">
                <input
                  className="mr-2"
                  id="private"
                  name="visibility"
                  type="radio"
                  value="private"
                />
                <label htmlFor="private">비공개</label>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              className="w-full bg-primary font-bold py-2 px-4 rounded-md hover:bg-secondary transition-colors"
              label={'이벤트 생성하기'}
              type="submit"
              variant={'primary'}
            />
          </div>
        </form>
      </main>
    </div>
  );
}
