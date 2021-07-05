import { FC, useState } from 'react';
import cn from 'classnames';
import { Visibility } from '@material-ui/icons';
import { Link } from '@material-ui/core';
import Image from 'next/image';
import { Card, CardHeader, CardFooter, CardIcon } from '@/components/ui';
import { useStyles } from './styles';

type CardDataProps = {
  image: StaticImageData;
  title: string;
  content: React.ReactNode;
  sub?: React.ReactNode;
  contentColor?: 'red' | 'normal';
};

const CardData: FC<CardDataProps> = ({
  image,
  title,
  content,
  sub,
  contentColor = 'normal'
}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <Card>
      <CardHeader color="primary" stats icon>
        <CardIcon color="primary">
          <div style={{ width: 60, height: 60 }}>
            <Image src={image.src} width="60" height="60" alt="icon" />
          </div>
        </CardIcon>
        <p className={classes.cardCategory}>{title}</p>
        <div>
          <h3
            className={cn(classes.cardTitle, {
              [classes.cardTitlePorc]: contentColor === 'red'
            })}
          >
            {content}

            {sub && <small> ({sub})</small>}
          </h3>
        </div>
      </CardHeader>
      <CardFooter stats>
        <div className={classes.stats}>
          <Visibility />
          <Link
            underline="none"
            color="textSecondary"
            align="center"
            onClick={() => setOpen(!open)}
            href="#"
          >
            {open ? <span>Ocultar detalle</span> : <span>Ver detalle</span>}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardData;
