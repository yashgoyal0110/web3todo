import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import Wallet from './pages/Wallet.jsx';
import ViewTask from './pages/ViewTask.jsx';
import ViewAllTask from './pages/ViewAllTask.jsx';
import DeleteTask from './pages/DeleteTask.jsx';
import CreateTask from './pages/CreateTask.jsx';
import UpdateTask from './pages/UpdateTask.jsx';
import Navigation from './pages/Navigation.jsx';

function App() {

  const[state, setState] = useState({
    web3: null,
    account: null,
    contract: null,
  });

  const saveState  = ({web3, account, contract}) => {
    setState({web3: web3, account: account, contract: contract});
  }

  const router = createBrowserRouter([
    { path: '/', element: <Wallet saveState={saveState}/> },
    { path: '/view-task', element: <ViewTask /> },
    { path: '/view-all', element: <ViewAllTask /> },
    { path: '/delete-task', element: <DeleteTask state={state}/> },
    { path: '/create-task', element: <CreateTask state={state}/> },
    { path: '/update-task', element: <UpdateTask state={state}/> },
  ]);

  return (
  <RouterProvider router={router} />
  
  )
}

export default App;