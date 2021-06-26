import { FC, useRef, useEffect } from 'react';
import PerfectScrollbar from 'perfect-scrollbar';

type SidebarWrapperProps = {
  className?: string;
  user?: JSX.Element;
  headerLinks?: JSX.Element;
  links?: JSX.Element;
};

let ps: PerfectScrollbar;

const SidebarWrapper: FC<SidebarWrapperProps> = ({
  className,
  user,
  headerLinks,
  links
}) => {
  const sidebarWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(sidebarWrapper.current!, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }

    return () => {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
      }
    };
  }, []);

  return (
    <div className={className} ref={sidebarWrapper}>
      {user}
      {headerLinks}
      {links}
    </div>
  );
};

export default SidebarWrapper;
