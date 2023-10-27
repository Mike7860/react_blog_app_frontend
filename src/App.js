import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './hocs/Layout';
import Home from './components/Home';
import BlogDetail from './components/BlogDetail';
import Category from './components/Category';

const App = () => (
    <Router>
        <Layout>
            <Route>
                <Route exact path='/blog' component={Home} />
                <Route exact path='/blog/category/:id' component={Category} />
                <Route exact path='/blog/:id' component={BlogDetail} />
            </Route>
        </Layout>
    </Router>
);

export default App;