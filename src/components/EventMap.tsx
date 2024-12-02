'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import { EventData } from '@/types/interface';

interface EventMapProps {
  events: EventData[];
}

// 지도 레벨에 따른 거리 및 셀 크기 계산
const getCellSize = (level: number) => {
  switch (true) {
    case level <= 6:
      return 0.02;
    case level === 7:
      return 0.04;
    case level === 8:
      return 0.08;
    case level === 9:
      return 0.2;
    case level === 10:
      return 0.5;
    case level === 11:
      return 0.8;
    default:
      return 1.6;
  }
};

// 그리드 기반 클러스터링 로직
const clusterMarkers = (markers: EventData[], cellSize: number) => {
  const groups: {
    [key: string]: { latSum: number; lngSum: number; count: number };
  } = {};

  markers.forEach((marker) => {
    const x = Math.floor(marker.longitude / cellSize);
    const y = Math.floor(marker.latitude / cellSize);
    const key = `${x},${y}`;

    if (!groups[key]) {
      groups[key] = { latSum: 0, lngSum: 0, count: 0 };
    }

    groups[key].latSum += marker.latitude;
    groups[key].lngSum += marker.longitude;
    groups[key].count += 1;
  });

  return Object.values(groups).map((group) => ({
    latitude: group.latSum / group.count,
    longitude: group.lngSum / group.count,
    count: group.count,
  }));
};

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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const markers: any[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const overlays: any[] = [];

        // 기존 마커 및 오버레이 제거
        const clearMap = () => {
          markers.forEach((marker) => marker.setMap(null));
          overlays.forEach((overlay) => overlay.setMap(null));
          markers.length = 0; // 배열 초기화
          overlays.length = 0;
        };

        // 마커 및 오버레이 생성
        const createOverlay = (
          latitude: number,
          longitude: number,
          count: number
        ) => {
          const overlay = new window.kakao.maps.CustomOverlay({
            position: new window.kakao.maps.LatLng(latitude, longitude),
            content: `<div style="
                        background: radial-gradient(circle, rgba(255,193,7,1) 0%, rgba(255,193,7,0.8) 50%, rgba(255,193,7,0.4) 100%);
                        padding: 10px;
                        border: 2px solid rgba(255,193,7,0.6);
                        border-radius: 50%;
                        width: 45px;
                        height: 45px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
                        font-weight: bold;
                        color: #664d03;
                      ">
                        ${count}개
                      </div>`,
            clickable: true,
          });

          overlays.push(overlay); // 배열에 추가
          overlay.setMap(map);
        };

        // 마커 및 클러스터링 업데이트
        const updateMarkers = () => {
          clearMap(); // 이전 상태 제거

          const level = map.getLevel();
          const cellSize = getCellSize(level);

          if (level <= 5) {
            events.forEach((event) => {
              const marker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(
                  event.latitude,
                  event.longitude
                ),
              });

              markers.push(marker);
              marker.setMap(map);
            });
          } else {
            const clusters = clusterMarkers(events, cellSize);

            clusters.forEach((cluster) => {
              createOverlay(cluster.latitude, cluster.longitude, cluster.count);
            });
          }
        };

        window.kakao.maps.event.addListener(map, 'idle', updateMarkers);
        updateMarkers();
      });
    }
  }, [mapScript, events]);

  return (
    <div className="relative">
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&libraries=services&autoload=false`}
        strategy="afterInteractive"
        onLoad={() => setMapScript(true)}
      />
      <div className="w-full h-[400px] rounded-lg shadow-md mb-6" id="map" />
    </div>
  );
};

export default EventMap;
