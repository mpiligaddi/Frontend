import { useEffect, useRef, useState, FC } from 'react';
import { styled } from '@material-ui/core';
import { useCarousel } from './CarouselProvider';
import CarouselItem from './CarouselItem';
import dynamic from 'next/dynamic';

const EditMode = dynamic(() => import('./EditMode'), {
  ssr: false
});

const Wrapper = styled('div')({
  zIndex: 1201,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  position: 'fixed',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  WebkitTapHighlightColor: 'transparent',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  color: 'white'
});

const CarouselDiv = styled('div')({
  display: 'flex',
  flexWrap: 'nowrap',
  height: '100%',
  maxWidth: '100vw',
  WebkitOverflowScrolling: 'touch',
  scrollSnapType: 'y mandatory',
  scrollBehavior: 'smooth',
  position: 'relative'
});

const CloseButton = styled('a')({
  position: 'absolute',
  zIndex: 20,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: 'white',
  textDecoration: 'none',
  opacity: 0.6,
  fontSize: '20px',
  top: '10px',
  right: '10px',

  ':hover': {
    opacity: 1,
    color: 'white'
  }
});

const SliderButton = styled('a')<unknown, { left?: boolean; right?: boolean }>({
  position: 'absolute',
  width: '50px',
  height: '50px',
  zIndex: 10,
  left: props => (props.left ? '50px' : 'unset'),
  right: props => (props.right ? '50px' : 'unset'),
  bottom: '50px',
  cursor: 'pointer',
  transform: 'translateY(-50%)',
  opacity: '0.5',
  transition: 'opacity 0.5s ease',
  color: 'white !important',
  fontSize: '50px',
  '&:hover': {
    opacity: 1
  }
});

type CarouselProps = {
  close(): void;
};

const Carousel: FC<CarouselProps> = ({ close }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isEdit, setEdit] = useState(false);
  let mainPanel = document.querySelector('#mainpanel');
  let lastScroll = 0;

  const {
    report,
    tileInfo: { tile, catIndex }
  } = useCarousel();

  let category = report.categories[catIndex];

  const hotKeys = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        close();
        break;
      case 'ArrowLeft':
        if (!isEdit) lastSlide();
        break;
      case 'ArrowRight':
        if (!isEdit) nextSlide();
        break;
      default:
        break;
    }
  };

  const scrollBehaviour = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.scrollTop = lastScroll;
  };

  useEffect(() => {
    if (!mainPanel) return;
    //Handle events
    if (tile) {
      lastScroll = mainPanel.scrollTop;
      mainPanel.scrollTop = lastScroll;
      mainPanel.addEventListener('scroll', scrollBehaviour);
      document.addEventListener('keyup', hotKeys);
    }

    //Sleep ZZzzzz
    return () => {
      document.removeEventListener('keyup', hotKeys);
      mainPanel?.removeEventListener('scroll', scrollBehaviour);
    };
  }, []);

  useEffect(() => {
    //Handle slide
    if (tile && !isEdit) {
      let index = category.images.indexOf(tile);
      let refElem = carouselRef.current.children[index < 0 ? 0 : index];
      carouselRef.current.insertBefore(refElem, carouselRef.current.firstChild);
    }
  }, [report, isEdit]);

  const toggleEditMode = () => {
    setEdit(prev => !prev);
  };

  const nextSlide = () => {
    if (carouselRef?.current?.children?.length! > 1) {
      const firtsElement = carouselRef.current!.firstElementChild;

      carouselRef.current!.style.transition = `500ms ease-out all`;

      carouselRef.current!.style.transform = `translateX(-${
        (firtsElement as any).offsetWidth
      }px)`;

      const nextTransition = () => {
        carouselRef.current!.style.transition = 'none';
        carouselRef.current!.style.transform = `translateX(0)`;
        carouselRef.current?.appendChild(firtsElement as Node);
        carouselRef.current?.removeEventListener(
          'transitionend',
          nextTransition
        );
      };

      carouselRef.current!.addEventListener('transitionend', nextTransition);
    }
  };

  const lastSlide = () => {
    if (carouselRef.current && carouselRef.current.children.length > 1) {
      const lastChild = carouselRef.current.lastElementChild;

      carouselRef.current.insertBefore(
        lastChild!,
        carouselRef.current.firstChild
      );

      carouselRef.current.style.transition = 'none';
      carouselRef.current.style.transform = `translateX(-${lastChild.offsetWidth}px)`;

      setTimeout(() => {
        carouselRef.current!.style.transition = `500ms ease-out all`;
        carouselRef.current!.style.transform = `translateX(0)`;
      }, 30);
    }
  };

  return (
    <Wrapper>
      <CloseButton onClick={close}>
        <i className="fas fa-times"></i>
      </CloseButton>
      {isEdit ? (
        <EditMode close={toggleEditMode} />
      ) : (
        <>
          <CarouselDiv ref={carouselRef}>
            {category.images.map((tile: any, index: number) => (
              <CarouselItem
                tile={tile}
                toggleEdit={toggleEditMode}
                key={index}
              />
            ))}
          </CarouselDiv>
          {category.images.length > 1 && (
            <>
              <SliderButton onClick={lastSlide} left>
                <i className="fas fa-angle-left"></i>
              </SliderButton>
              <SliderButton onClick={nextSlide} right>
                <i className="fas fa-angle-right"></i>
              </SliderButton>
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Carousel;
