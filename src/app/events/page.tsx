import React from 'react';
import { getEvent } from '@/actions/eventActions';
import { EventData } from '@/types/interface';

const EventsPage = async () => {
  const data: EventData[] = await getEvent();
  console.log(data);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">이벤트 목록</h1>
      <ul>
        {data.map((event) => (
          <li key={event.id} className="border-b py-4">
            <div className="flex items-center">
              {event.image_url && (
                <img
                  alt={event.title}
                  className="w-16 h-16 mr-4 rounded"
                  src={event.image_url}
                />
              )}
              <div>
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p className="text-sm text-gray-600">
                  {new Date(event.datetime).toLocaleString()}
                </p>
                <p className="text-sm">{event.location}</p>
                <p className="text-sm text-gray-800">{event.organizer}</p>
                <p className="text-sm mt-2">{event.description}</p>
                <p
                  className={`text-sm mt-2 ${event.is_public ? 'text-green-600' : 'text-red-600'}`}
                >
                  {event.is_public ? '공개 이벤트' : '비공개 이벤트'}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsPage;
