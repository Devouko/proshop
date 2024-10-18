import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      {/* Header component */}
      <Header />

      {/* Main content section */}
      <main className='py-3'>
        <Container>
          {/* This renders the child routes */}
          <Outlet />
        </Container>
      </main>

      {/* Footer component */}
      <Footer />
    </>
  );
}

export default App;
