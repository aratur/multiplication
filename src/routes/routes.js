import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../features/Questions/Questions';

import Loader from '../components/Loader/Loader';
import Multiplication from '../pages/Multiplication';

const ResultsTableLazy = lazy(() => import('../features/Results/Results'));

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Multiplication />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/results',
        element: (
          <Suspense fallback={<Loader />}>
            <ResultsTableLazy />
          </Suspense>
        ),
      },
    ],
  },
]);

export default routes;
