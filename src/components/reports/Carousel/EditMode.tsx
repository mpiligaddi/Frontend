// import { useCallback, useEffect, useRef, useState, FC, useMemo } from 'react';
// import {
//   Container,
//   Graphics,
//   Sprite,
//   Stage,
//   Text,
//   PixiRef,
//   _ReactPixi
// } from '@inlet/react-pixi';
// import { Backdrop, CircularProgress } from '@material-ui/core';
// import { makeStyles, styled } from '@material-ui/core/styles';
// import { TextStyle } from '@pixi/text';
// import firebase from 'firebase/app';
// import { PixiViewport } from '@/components/ui/Pixi/ViewBox';
// import { useCarousel } from './CarouselProvider';

// const useStyles = makeStyles(theme => ({
//   backdrop: {
//     zIndex: theme.zIndex.drawer + 4,
//     color: '#fff'
//   },
//   canvas: {
//     width: 'calc(100vw * (9 / 16)) !important',
//     height: 'calc(100vh - 17rem) !important',
//     backgroundColor: '#fff',
//     backgroundImage: `linear-gradient(#efefef 1px, transparent 1px),
//     linear-gradient(to right, #efefef 1px, #fff 1px)`,
//     backgroundSize: '20px 20px',
//     borderRadius: '18px',
//     margin: '20px auto'
//   }
// }));

// const Wrapper = styled('div')({
//   width: '100vw',
//   height: '100vh',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center'
// });

// const EditActions = styled('div')({
//   display: 'flex',
//   width: 'fit-content',
//   padding: '8px 4px',
//   margin: '20px auto',
//   flexDirection: 'row',
//   justifyContent: 'center',
//   alignItems: 'center',
//   background: '#2c2b2b',
//   borderRadius: '8px'
// });

// const EditAction = styled('a')<
//   unknown,
//   { active?: boolean; disabled?: boolean }
// >({
//   color: 'white',
//   fontSize: '14px',
//   background: props => {
//     if (props.active) return '#1d1c1c';
//     if (props.disabled) return 'transparent !important';
//     return 'transparent';
//   },
//   margin: 'auto 5px',
//   padding: '8px',
//   borderRadius: '4px',
//   fontWeight: 'bold',
//   userSelect: 'none',
//   opacity: props => (props.disabled ? 0.3 : 1),
//   i: {
//     marginRight: '5px',
//     lineHeight: '50%'
//   },
//   ':hover': {
//     background: '#494848',
//     color: 'white',
//     cursor: 'pointer'
//   }
// });

// const Canvas = styled(Stage)({});

// type RotationSliderProps = _ReactPixi.IGraphics & {
//   x: number;
//   y: number;
//   rotation: number;
//   width: number;
//   height: number;
// };

// const RotationSlider: FC<RotationSliderProps> = ({
//   width,
//   height,
//   rotation,
//   x,
//   y,
//   ...props
// }) => {
//   const draw = useCallback(
//     g => {
//       g.clear();
//       g.beginFill(0x000000, 0.2);
//       g.drawRoundedRect(x, y, width, height, 16);
//       g.endFill();

//       g.beginFill(0x000000, 0.55);
//       g.drawRoundedRect(10, y + 5, 10, height - 15, 16);
//       g.endFill();

//       g.lineStyle(2, 0x0000000, 0.5);
//       g.beginFill(0xffffffff);
//       g.drawCircle(15, rotation, 8);
//       g.endFill();
//     },
//     [width, height, rotation, x, y]
//   );

//   return <Graphics interactive={true} {...props} x={x} y={y} draw={draw} />;
// };

// type EditModeProps = {
//   close(): void;
// };

// const EditMode: FC<EditModeProps> = ({ close }) => {
//   const classes = useStyles();

//   const [editMode, setMode] = useState(0);
//   const [transform, setTransform] = useState({ width: -1, height: -1 });
//   const [isInteractive, setInteractive] = useState(false);
//   const [save, setSave] = useState(false);
//   const { report, tile } = useCarousel();
//   const viewportRef = useRef<any>(null);
//   const imageRef = useRef<PixiRef<typeof Sprite>>(null);

//   const _width = document.body.getBoundingClientRect().width * (9 / 16);
//   const _height = document.body.getBoundingClientRect().height - 16 * 17;
//   const [rotation, setRotation] = useState(0);
//   const [rotationDelta, setRotationDelta] = useState(0);

//   const handleSlideDown = () => {
//     setInteractive(true);
//   };

//   const handleSlideUp = () => {
//     setInteractive(false);
//   };

//   const handleSlideMove = (e: any) => {
//     if (isInteractive) {
//       let globalY = e.data.global.y;

//       setRotation(globalY);
//       calculateRotation();
//     }
//   };

//   const handleSaveImage = () => {
//     setSave(true);
//     let app: any = viewportRef.current?.app;
//     setTimeout(() => {
//       app.renderer.plugins.extract.canvas(app.stage).toBlob(async (b: Blob) => {
//         const ref = firebase
//           .storage()
//           .ref(`reports/${report.createdBy}/${tile.name}`);
//         ref.put(b).then(async task => {
//           const nuri = await task.ref.getDownloadURL();

//           const categories = report.realCategories!.map(category => {
//             if (!category.images) return category;

//             const images = category.images.map(image =>
//               image.name === tile.name
//                 ? {
//                     ...image,
//                     uri: nuri
//                   }
//                 : image
//             );

//             return {
//               ...category,
//               images
//             };
//           });

//           await firebase
//             .firestore()
//             .collection('reports')
//             .doc(report.id)
//             .update({
//               categories
//             });

//           // setReportsXClient(reports =>
//           //   reports.map(r => (r.id === report.id ? { ...r, categories } : r))
//           // );

//           setSave(false);
//         });
//       });
//     }, 30);
//   };

//   const calculateRotation = () => {
//     let theta = Math.floor(rotation - rotation / (_height + 20)) / 2;
//     setRotationDelta((theta * Math.PI) / 180);
//   };

//   useEffect(() => {
//     if (imageRef.current) {
//       let sprite = imageRef.current;
//       let width = sprite.texture.width;
//       let height = sprite.texture.height;

//       if (transform.width > 1) {
//         sprite.width = transform.width;
//         sprite.height = transform.height;
//         return;
//       }

//       if (width > height) {
//         if (width > _width) {
//           width = _width;
//           height *= _width / width;
//         }
//       } else {
//         if (height > _height) {
//           width *= _height / height;
//           height = _height;
//         }
//       }

//       sprite.width = width;
//       sprite.height = height;
//       setTransform({ width: width, height: height });
//     }
//   }, [_width, _height, transform]);

//   return (
//     <Wrapper>
//       <Stage
//         width={_width}
//         height={_height}
//         className={classes.canvas}
//         options={{
//           antialias: true,
//           autoDensity: true,
//           backgroundAlpha: 0
//         }}
//         style={{
//           width: _width,
//           height: _height
//         }}
//       >
//         <Container
//           width={_width}
//           height={_height}
//           interactive={true}
//           pointermove={handleSlideMove}
//         />
//         <PixiViewport
//           ref={viewportRef}
//           screenWidth={_width}
//           screenHeight={_height}
//           worldWidth={_width}
//           worldHeight={_height}
//           plugins={['drag', 'pinch', 'wheel', 'decelerate']}
//         >
//           <Sprite
//             scale={{ x: 1, y: 1 }}
//             anchor={0.5}
//             ref={imageRef}
//             image={tile.uri}
//             rotation={rotationDelta}
//             x={_width / 2}
//             y={_height / 2}
//           />
//         </PixiViewport>
//         {!save && editMode == 1 && (
//           <>
//             <RotationSlider
//               rotation={rotation}
//               pointerdown={handleSlideDown}
//               pointerupoutside={handleSlideUp}
//               pointerout={handleSlideUp}
//               pointerup={handleSlideUp}
//               x={0}
//               y={0}
//               width={100}
//               height={_height}
//             />
//             <Text
//               text={Math.floor((rotationDelta * 180) / Math.PI) + ' ??'}
//               x={30}
//               y={rotation - 10}
//               style={
//                 new TextStyle({
//                   align: 'center',
//                   fontFamily: 'Roboto, Helvetica, "Sans serif"',
//                   fontSize: 20,
//                   fill: '#ffffff', // gradient
//                   stroke: '#191919',
//                   strokeThickness: 3,
//                   wordWrap: true,
//                   wordWrapWidth: 440
//                 })
//               }
//             />
//           </>
//         )}
//       </Stage>
//       <EditActions>
//         <EditAction disabled>
//           <i className="fas fa-hand-paper"></i> Mover
//         </EditAction>
//         <EditAction
//           onClick={() => setMode(editMode == 1 ? 0 : 1)}
//           active={editMode == 1}
//         >
//           <i className="fas fa-sync-alt"></i> Rotar
//         </EditAction>
//         <EditAction disabled>
//           <i className="fas fa-crop"></i>Recortar
//         </EditAction>
//         <EditAction onClick={handleSaveImage}>
//           <i className="fas fa-save"></i>Guardar
//         </EditAction>
//         <EditAction onClick={close}>
//           <i className="fas fa-angle-left"></i>Volver
//         </EditAction>
//       </EditActions>
//       <Backdrop className={classes.backdrop} open={save}>
//         <CircularProgress color="primary" />
//       </Backdrop>
//     </Wrapper>
//   );
// };

// export default EditMode;
const EditMode = () => <h1>Hello World</h1>;

export default EditMode;
