import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../features/Navbar/Navbar';

const Multiplication = () => (
  <div className="container">
    <header className="row">
      <nav className="col-md-6 col-md-pull-3 col-md-push-3 col-sm-8 col-sm-pull-2 col-sm-push-2 ">
        <Navbar />
      </nav>
    </header>
    <main className="row">
      <div className="col-md-6 col-md-pull-3 col-md-push-3 col-sm-8 col-sm-pull-2 col-sm-push-2 text-center">
        <Outlet />
      </div>
    </main>
  </div>
);

export default Multiplication;
