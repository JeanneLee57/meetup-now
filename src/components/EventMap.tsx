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

        const clusterer = new window.kakao.maps.MarkerClusterer({
          map: map, // 클러스터러 적용할 지도
          averageCenter: true,
          minLevel: 6,
          gridSize: 240, // 클러스터 포함 범위
        });

        const markers: any[] = [];

        events.forEach((event) => {
          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(
              event.latitude,
              event.longitude
            ),
          });

          markers.push(marker);
        });

        clusterer.addMarkers(markers);
      });
    }
    return () => {
      //window.kakao.maps.event.removeAllListeners();
    };
  }, [mapScript, events]);

  return (
    <div className="relative">
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&libraries=services,clusterer&autoload=false`}
        strategy="afterInteractive"
        onLoad={() => setMapScript(true)}
      />
      <div className="w-full h-[400px] rounded-lg shadow-md mb-6" id="map" />
    </div>
  );
};

export default EventMap;
