import { FC } from 'react';

import MaterialLinearProgress, {
  LinearProgressProps as LNProps
} from '@material-ui/core/LinearProgress';

import { useStyles } from './styles';

type LinearProgressProps = LNProps & {
  color?:
    | 'primary'
    | 'warning'
    | 'danger'
    | 'success'
    | 'info'
    | 'rose'
    | 'gray';
};

const LinearProgress: FC<LinearProgressProps> = ({
  color = 'primary',
  ...rest
}) => {
  const classes = useStyles();
  return (
    <MaterialLinearProgress
      {...rest}
      classes={{
        root: classes.root + ' ' + (classes as any)[color + 'Background'],
        bar: classes.bar + ' ' + classes[color]
      }}
    />
  );
};

export default LinearProgress;
