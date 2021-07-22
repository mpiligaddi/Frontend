import {
  createContext,
  FC,
  useContext,
  useMemo,
  useReducer,
  useCallback
} from 'react';

export interface State {
  displaySidebar: boolean;
  displayMiniSidebar: boolean;
}

const initialState = {
  displaySidebar: true,
  displayMiniSidebar: false
};

type Action =
  | {
      type: 'OPEN_SIDEBAR';
    }
  | {
      type: 'CLOSE_SIDEBAR';
    }
  | {
      type: 'OPEN_MINI_SIDEBAR';
    }
  | {
      type: 'CLOSE_MINI_SIDEBAR';
    };

export interface ProviderState extends State {
  toggleSidebar(): void;
  openSidebar(): void;
  closeSidebar(): void;
  toggleMiniSidebar(): void;
}

export const UIContext = createContext<ProviderState>(initialState as any);

UIContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_SIDEBAR': {
      return {
        ...state,
        displaySidebar: true
      };
    }
    case 'CLOSE_SIDEBAR': {
      return {
        ...state,
        displaySidebar: false
      };
    }
    case 'OPEN_MINI_SIDEBAR': {
      return {
        ...state,
        displayMiniSidebar: true
      };
    }
    case 'CLOSE_MINI_SIDEBAR': {
      return {
        ...state,
        displayMiniSidebar: false
      };
    }
  }
}

export const UIProvider: FC = props => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const openSidebar = useCallback(
    () => dispatch({ type: 'OPEN_SIDEBAR' }),
    [dispatch]
  );

  const closeSidebar = useCallback(
    () => dispatch({ type: 'CLOSE_SIDEBAR' }),
    [dispatch]
  );

  const toggleSidebar = useCallback(
    () =>
      state.displaySidebar
        ? dispatch({ type: 'CLOSE_SIDEBAR' })
        : dispatch({ type: 'OPEN_SIDEBAR' }),
    [dispatch, state.displaySidebar]
  );

  const toggleMiniSidebar = useCallback(
    () =>
      state.displayMiniSidebar
        ? dispatch({ type: 'CLOSE_MINI_SIDEBAR' })
        : dispatch({ type: 'OPEN_MINI_SIDEBAR' }),
    [dispatch, state.displayMiniSidebar]
  );

  const value = useMemo(
    () => ({
      ...state,
      toggleSidebar,
      openSidebar,
      closeSidebar,
      toggleMiniSidebar
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error('Need a UI Provider');
  return context;
};
