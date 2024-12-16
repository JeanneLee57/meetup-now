'use client';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

import { useState, useEffect } from 'react';
import SearchInput from './SearchInput';
import Script from 'next/script';

interface Place {
  place_name: string;
  address_name: string;
  road_address_name: string;
}

const LocationSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [places, setPlaces] = useState<Place[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [mapScript, setMapScript] = useState<boolean>(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  useEffect(() => {
    if (window.kakao?.maps) {
      window.kakao.maps.load(() => {});
    }
  }, [mapScript]);

  useEffect(() => {
    if (!keyword.trim() || selectedPlace) {
      setPlaces([]);
      return;
    }

    const searchPlaces = () => {
      if (!window.kakao?.maps?.services) return;

      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(keyword, (data: Place[], status: unknown) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setPlaces(data);
        } else {
          setPlaces([]);
        }
        setIsSearching(false);
      });
    };

    const debounceTimer = setTimeout(() => {
      setIsSearching(true);
      searchPlaces();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [keyword, selectedPlace]);

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    setPlaces([]);
    setKeyword(place.place_name);
  };

  const handleReset = () => {
    setSelectedPlace(null);
    setKeyword('');
    setPlaces([]);
  };

  return (
    <div className="relative">
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&libraries=services&autoload=false`}
        strategy="afterInteractive"
        onLoad={() => setMapScript(true)}
      />
      <div
        className="my-2.5 rounded-lg shadow-md"
        id="map"
        style={{ width: '500px', height: '400px', display: 'none' }}
      />

      {selectedPlace ? (
        <div className="flex items-center p-2 bg-gray-50 border rounded-lg">
          <div className="flex-1">
            <div className="font-medium">{selectedPlace.place_name}</div>
            <div className="text-sm text-gray-500">
              {selectedPlace.road_address_name || selectedPlace.address_name}
            </div>
          </div>
          <button
            className="p-1 ml-2 text-gray-500 hover:text-gray-700"
            onClick={handleReset}
          >
            ✕
          </button>
        </div>
      ) : (
        <SearchInput
          className="w-full"
          placeholder="장소를 검색하세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      )}

      {isSearching && (
        <div className="absolute w-full mt-1 text-sm text-gray-500">
          검색중...
        </div>
      )}

      {places.length > 0 && !selectedPlace && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          {places.map((place, index) => (
            <div
              key={index}
              className="p-3 cursor-pointer hover:bg-gray-50"
              onClick={() => handlePlaceSelect(place)}
            >
              <div className="font-medium">{place.place_name}</div>
              <div className="text-sm text-gray-500">
                {place.road_address_name || place.address_name}
              </div>
            </div>
          ))}
        </div>
      )}

      <input
        id="location"
        name="location"
        type="hidden"
        value={selectedPlace?.place_name || ''}
      />
      <input
        id="address"
        name="address"
        type="hidden"
        value={
          selectedPlace?.road_address_name || selectedPlace?.address_name || ''
        }
      />
    </div>
  );
};

export default LocationSearch;
