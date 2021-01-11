import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from '../Routes/Home';
import NotFound from '../Routes/NotFound';
import Result from '../Routes/Result';

const AppRouter = () => {
  return <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/result/:username' component={Result} />
      <Route path='*' component={NotFound} />
    </Switch>
  </BrowserRouter>
}

export default AppRouter;