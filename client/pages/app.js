import React from 'react';

import Quiz from '../components/quiz';
import Join from '../components/Join';

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/quiz" component={Quiz} />
    </Router>
  );
}

export default App;