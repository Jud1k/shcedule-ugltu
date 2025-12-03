import { AppProvider } from './provider';
import RoutesProvider from './routes';

export const App = () => {
  return (
    <AppProvider>
      <RoutesProvider />
    </AppProvider>
  );
};

export default App;
