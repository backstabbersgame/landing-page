export interface ResponsiveImage {
  src: string;
  width: number;
  height: number;
}

export interface GameImages {
  main: {
    mobile: ResponsiveImage;
    desktop: ResponsiveImage;
  };
}

export interface GameDetail {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
}

export interface GameData {
  id: number;
  name: string;
  images: GameImages;
  details: GameDetail[];
  buttonText: string;
}
