import { createContext, useContext, useState, FC } from 'react';
import Carousel from './Carousel';
import { Image, Report } from '@/lib/types';

type State = {
  report: Report;
  tile: Image;
  setCarouselInfo({}: { report: Report; tile: Image }): void;
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
    tile: {} as Image
  });

  const close = () => {
    setIsOpen(false);
    setCarousel({ report: {} as Report, tile: {} as Image });
  };

  const setCarouselInfo = ({
    report,
    tile
  }: {
    report: Report;
    tile: Image;
  }) => {
    setCarousel(prev => ({
      report: report ?? prev.report,
      tile: tile ?? prev.tile
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
