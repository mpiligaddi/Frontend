import { createContext, useContext, useState, FC } from 'react';
import Carousel from './Carousel';
import { Image, Report } from '@/lib/types';

type State = {
  report: Report;
  tileInfo: {
    tile: Image;
    catIndex: number;
  };
  setCarouselInfo({}: {
    report: Report;
    tileInfo: { tile: Image; catIndex: number };
  }): void;
  disableAction?: boolean;
};

const CarouselContext = createContext({} as State);

export const useCarousel = () => useContext(CarouselContext);

const CarouselProvider: FC<{ disableAction?: boolean }> = ({
  children,
  disableAction = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [carousel, setCarousel] = useState({
    report: {} as Report,
    tileInfo: {} as { tile: Image; catIndex: number }
  });

  const close = () => {
    setIsOpen(false);
    setCarousel({ report: {} as Report, tileInfo: {} as any });
  };

  const setCarouselInfo = ({
    report,
    tileInfo
  }: {
    report: Report;
    tileInfo: { tile: Image; catIndex: number };
  }) => {
    setCarousel(prev => ({
      report: report ?? prev.report,
      tileInfo: tileInfo ?? prev.tileInfo
    }));
    setIsOpen(true);
  };

  return (
    <CarouselContext.Provider
      value={{
        ...carousel,
        setCarouselInfo,
        disableAction
      }}
    >
      {isOpen && <Carousel close={close} />}
      {children}
    </CarouselContext.Provider>
  );
};

export default CarouselProvider;
