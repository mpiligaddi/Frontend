import { FC } from 'react';

interface Page extends FC {
  Layout?: FC;
  getLayout?(page: JSX.Element): JSX.Element;
}
