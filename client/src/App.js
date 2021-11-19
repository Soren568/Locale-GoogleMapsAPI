import LoginForm from './components/logreg/LoginForm';
import RegisterForm from './components/logreg/RegisterForm';
import { Redirect, Router } from '@reach/router';
import Home from './views/Home';
import UserPage from './views/UserPage';

function App() {
  return (
    <Router>
      <Redirect from="/" to="/login" noThrow/>
      <LoginForm path="/login"/>
      <RegisterForm path="/register"/>
      <Home path="/dashboard"/>
      <UserPage path="/account"/>
    </Router>
  );
}

export default App;