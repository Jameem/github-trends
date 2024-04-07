import { Filter } from './components/FIlter';
import { Navbar } from './components/Navbar';
import { Repositories } from './components/repositories/Index';

function App() {
  return (
    <main className='container px-1'>
      <Navbar />
      <Filter />
      <Repositories />
    </main>
  );
}

export default App;
