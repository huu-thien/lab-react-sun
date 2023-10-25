import Header from '@/components/Header';
import Sidebar from './components/Sidebar';
import ProductList from './components/ProductList';

function App() {
  return (
    <div>
      <Header />
      <div className='w-full max-w-7xl mx-auto flex items-start gap-12'>
        <Sidebar />
        <ProductList />
      </div>
    </div>
  );
}

export default App;
