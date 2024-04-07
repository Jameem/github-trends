import { AppContainer } from './components/AppContainer';
import { initializeAxios } from './utils/api';

function App() {
  initializeAxios();

  return <AppContainer />;
}

export default App;
