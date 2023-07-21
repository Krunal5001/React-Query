import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import ParallelQueriesPage from './components/ ParallelQueriesPage';
import { DependentQueriesPage } from './components/DependentQueriesPage';
import { DynamicParallelQueriesPage } from './components/DynamicParallelQueriesPage';
import HomePage from './components/homePage';
import { InfiniteQueryPage } from './components/InfiniteQueryPage';
import { PaginatedQueryPage } from './components/PaginatedQueryPage';
import RqSuperheroPage from './components/RqSuperheroPage';
import RQSuperherosPage from './components/RqSuperherosPage';
import SuperherosPage from './components/superherosPage';
import { ToastContainer } from 'react-toastify';

const App = () => {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link style={{ color: 'white', textDecoration: 'none' }} to='/'>Home</Link>
              </li>
              <li>
                <Link style={{ color: 'white', textDecoration: 'none' }} to='/super-heroes'>Traditional Super Heroes</Link>
              </li>
              <li>
                <Link style={{ color: 'white', textDecoration: 'none' }} to='/rq-super-heroes'>RQ Super Heroes</Link>
              </li>
              <li>
                <Link style={{ color: 'white', textDecoration: 'none' }} to='/rq-parallelQueries'>RQ Parallel Queries</Link>
              </li>
              <li>
                <Link style={{ color: 'white', textDecoration: 'none' }} to='/rq-dynamic-parallelQueries'>RQ Dynamic Parallel Queries</Link>
              </li>
              <li>
                <Link style={{ color: 'white', textDecoration: 'none' }} to='/rq-dependentQueries'>RQ Dependent Queries</Link>
              </li>
              <li>
                <Link style={{ color: 'white', textDecoration: 'none' }} to='/rq-paginatedQuery'>RQ Paginated Queries</Link>
              </li>
              <li>
                <Link style={{ color: 'white', textDecoration: 'none' }} to='/rq-infiniteQuery'>RQ Infinite Queries</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/super-heroes" element={<SuperherosPage />} />
            <Route path="/rq-super-heroes" element={<RQSuperherosPage />} />
            <Route path="/rq-super-heroes/:heroId" element={<RqSuperheroPage />} />
            <Route path="/rq-parallelQueries" element={<ParallelQueriesPage />} />
            <Route path="/rq-dynamic-parallelQueries" element={<DynamicParallelQueriesPage heroIds={[1, 2]} />} />
            <Route path="/rq-dependentQueries" element={<DependentQueriesPage email='bk@gmail.com' />} />
            <Route path="/rq-paginatedQuery" element={<PaginatedQueryPage />} />
            <Route path="/rq-infiniteQuery" element={<InfiniteQueryPage />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default App