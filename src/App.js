import React from 'react';
import HomePage from './pages/HomePage';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
    return (
        <div className="App p-12 lg:p-12 md:p-8 sm:p-4">
            <Provider store={store}>
        <HomePage />
    </Provider>
        </div>
    );
};

export default App;