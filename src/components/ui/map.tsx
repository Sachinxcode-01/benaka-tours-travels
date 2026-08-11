import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { createPortal } from "react-dom";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// 1. Map Context & Types
interface MapContextType {
  map: maplibregl.Map | null;
  isLoaded: boolean;
}
const MapContext = createContext<MapContextType>({
  map: null,
  isLoaded: false,
});

export interface MapRef {
  easeTo: (options: maplibregl.EaseToOptions) => void;
  flyTo: (options: maplibregl.FlyToOptions) => void;
  getMap: () => maplibregl.Map | null;
}

interface MapProps {
  center: [number, number];
  zoom?: number;
  pitch?: number;
  styles?: {
    light?: string;
    dark?: string;
  };
  className?: string;
  children?: React.ReactNode;
}

export const Map = forwardRef<MapRef, MapProps>(
  ({ center, zoom = 15, pitch = 0, styles, className = "", children }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<maplibregl.Map | null>(null);
    const [mapState, setMapState] = useState<{
      map: maplibregl.Map | null;
      isLoaded: boolean;
    }>({
      map: null,
      isLoaded: false,
    });

    useImperativeHandle(ref, () => ({
      easeTo: (options) => {
        mapInstanceRef.current?.easeTo(options);
      },
      flyTo: (options) => {
        mapInstanceRef.current?.flyTo(options);
      },
      getMap: () => mapInstanceRef.current,
    }));

    useEffect(() => {
      if (!containerRef.current) return;

      // Skip WebGL initialization in headless jsdom unit test environment
      if (
        typeof window === "undefined" ||
        typeof window.Worker === "undefined"
      ) {
        return;
      }

      const styleUrl =
        styles?.dark ||
        styles?.light ||
        "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

      try {
        const MapConstructor = maplibregl.Map;
        if (typeof MapConstructor !== "function") return;

        const map = new MapConstructor({
          container: containerRef.current,
          style: styleUrl,
          center: center,
          zoom: zoom,
          pitch: pitch,
          attributionControl: false,
        });

        const NavControl = maplibregl.NavigationControl;
        if (NavControl) {
          map.addControl(
            new NavControl({
              showCompass: true,
              showZoom: true,
            }),
            "bottom-right",
          );
        }

        mapInstanceRef.current = map;
        map.on("load", () => {
          setMapState({ map, isLoaded: true });
        });
        setMapState({ map, isLoaded: true });

        return () => {
          map.remove();
        };
      } catch (e) {
        console.warn("MapLibre GL skipped in test environment:", e);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handle style changes dynamically
    useEffect(() => {
      if (
        !mapInstanceRef.current ||
        typeof window === "undefined" ||
        typeof window.Worker === "undefined"
      ) {
        return;
      }

      const targetStyle =
        styles?.dark ||
        styles?.light ||
        "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";
      try {
        mapInstanceRef.current.setStyle(targetStyle);
      } catch {
        // Ignore style update errors in test environment
      }
    }, [styles]);

    return (
      <MapContext.Provider value={mapState}>
        <div
          ref={containerRef}
          className={`w-full h-full min-h-[300px] relative ${className}`}
        >
          {children}
        </div>
      </MapContext.Provider>
    );
  },
);

Map.displayName = "Map";

// 2. Marker Context & Subcomponents
interface MapMarkerProps {
  longitude: number;
  latitude: number;
  draggable?: boolean;
  onDrag?: (lngLat: { lng: number; lat: number }) => void;
  children?: React.ReactNode;
}

interface MarkerContextType {
  marker: maplibregl.Marker | null;
  element: HTMLDivElement | null;
}
const MarkerContext = createContext<MarkerContextType>({
  marker: null,
  element: null,
});

export const MapMarker: React.FC<MapMarkerProps> = ({
  longitude,
  latitude,
  draggable = false,
  onDrag,
  children,
}) => {
  const { map } = useContext(MapContext);
  const [markerState, setMarkerState] = useState<MarkerContextType>({
    marker: null,
    element: null,
  });

  useEffect(() => {
    if (
      !map ||
      typeof window === "undefined" ||
      typeof window.Worker === "undefined"
    )
      return;

    try {
      const el = document.createElement("div");
      el.className = "map-marker-container cursor-pointer";

      const MarkerConstructor = maplibregl.Marker;
      if (!MarkerConstructor) return;

      const marker = new MarkerConstructor({
        element: el,
        draggable: draggable,
      })
        .setLngLat([longitude, latitude])
        .addTo(map);

      if (onDrag) {
        marker.on("drag", () => {
          const lngLat = marker.getLngLat();
          onDrag({ lng: lngLat.lng, lat: lngLat.lat });
        });
      }

      setMarkerState({ marker, element: el });

      return () => {
        marker.remove();
      };
    } catch {
      // Safe guard for test environment
    }
  }, [map, longitude, latitude, draggable, onDrag]);

  return (
    <MarkerContext.Provider value={markerState}>
      {children}
    </MarkerContext.Provider>
  );
};

export const MarkerContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { element } = useContext(MarkerContext);
  if (!element) return null;
  return createPortal(children, element);
};

export const MarkerPopup: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { marker } = useContext(MarkerContext);
  const [popupContainer] = useState(() => document.createElement("div"));

  useEffect(() => {
    if (
      !marker ||
      typeof window === "undefined" ||
      typeof window.Worker === "undefined"
    )
      return;
    try {
      const PopupConstructor = maplibregl.Popup;
      if (!PopupConstructor) return;

      const popup = new PopupConstructor({ offset: 25 }).setDOMContent(
        popupContainer,
      );
      marker.setPopup(popup);
    } catch {
      // Safe guard
    }
  }, [marker, popupContainer]);

  return createPortal(children, popupContainer);
};
