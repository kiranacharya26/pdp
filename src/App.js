import React from 'react';
import HomePage from './pages/HomePage';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
    return (
      <div className="App p-4 sm:p-4 md:p-8 lg:p-12 bg-ashblack text-ashwhite">
        <Provider store={store}>
          <HomePage/>
        </Provider>
      </div>
    );
};
export default App;