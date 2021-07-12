import React from 'react';
import { PixiComponent, useApp } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const PixiViewportComponent = PixiComponent('Viewport', {
  create(props: any) {
    const { app, ...viewportProps } = props;

    const viewport = new Viewport({
      ticker: props.app.ticker,
      interaction: props.app.renderer.plugins.interaction,
      ...viewportProps
    });

    (props.plugins || []).forEach((plugin: any) => {
      (viewport as any)[plugin]();
    });

    return viewport;
  },
  applyProps(viewport, _oldProps, _newProps) {
    const {
      plugins: oldPlugins,
      children: oldChildren,
      ...oldProps
    } = _oldProps;
    const {
      plugins: newPlugins,
      children: newChildren,
      ...newProps
    } = _newProps;

    Object.keys(newProps).forEach(p => {
      if (oldProps[p] !== newProps[p]) {
        (viewport as any)[p] = newProps[p];
      }
    });
  },
  didMount() {
    console.log('viewport mounted');
  }
});

const PixiViewport = React.forwardRef<unknown, any>((props, ref: any) => {
  const app = useApp();

  return <PixiViewportComponent ref={ref} app={app} {...props} />;
});

PixiViewport.displayName = 'PixiViewport';

export { PixiViewport, PixiViewportComponent };
