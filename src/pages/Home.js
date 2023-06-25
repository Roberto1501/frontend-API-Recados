import React from 'react';
import Home from '../components/Home';
import DenseAppBar from '../components/Appbar';

function HomePage() {
  return (
    <React.Fragment>
      <DenseAppBar />
     <Home />
    </React.Fragment>
  );
}

export default HomePage;
