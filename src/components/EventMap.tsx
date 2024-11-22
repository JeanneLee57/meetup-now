'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import { EventData } from '@/types/interface';

interface EventMapProps {
  events: EventData[];
}

const EventMap = ({ events }: EventMapProps) => {
  const [mapScript, setMapScript] = useState<boolean>(false);

  useEffect(() => {
    if (window.kakao?.maps) {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 8,
        };

        const map = new window.kakao.maps.Map(container, options);

        events.forEach((event) => {
          const geocoder = new window.kakao.maps.services.Geocoder();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          geocoder.addressSearch(event.address, (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );

              const marker = new window.kakao.maps.Marker({
                map: map,
                position: coords,
              });

              const infowindow = new window.kakao.maps.InfoWindow({
                content: `
                  <div style="padding:5px;font-size:12px;">
                    <strong>${event.title}</strong><br/>
                    ${new Date(event.datetime).toLocaleDateString()}<br/>
                    ${event.location}
                  </div>
                `,
              });

              window.kakao.maps.event.addListener(marker, 'mouseover', () => {
                infowindow.open(map, marker);
              });

              window.kakao.maps.event.addListener(marker, 'mouseout', () => {
                infowindow.close();
              });
            }
          });
        });
      });
    }
  }, [mapScript, events]);

  return (
    <div className="relative">
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_APP_KEY}&libraries=services&autoload=false`}
        strategy="afterInteractive"
        onLoad={() => setMapScript(true)}
      />
      <div className="w-full h-[400px] rounded-lg shadow-md mb-6" id="map" />
    </div>
  );
};

export default EventMap;
