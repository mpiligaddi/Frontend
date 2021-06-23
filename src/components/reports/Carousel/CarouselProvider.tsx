import { createContext, useContext, useState, FC } from 'react';
import Carousel from './Carousel';
import { Report } from '@/lib/types';

const CarouselContext = createContext({
  report: {} as Report,
  tileInfo: {} as any,
  setCarouselInfo: ({}: { report: Report; tileInfo: any }) => {},
  disableAction: false
});

export const useCarousel = () => useContext(CarouselContext);

const CarouselProvider: FC<{ disableAction?: boolean }> = ({
  children,
  disableAction = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [carousel, setCarousel] = useState({
    report: {} as Report,
    tileInfo: {}
  });

  const close = () => {
    setIsOpen(false);
    setCarousel({ report: {} as Report, tileInfo: {} });
  };

  const setCarouselInfo = ({
    report,
    tileInfo
  }: {
    report: Report;
    tileInfo: any;
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
