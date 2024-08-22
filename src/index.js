import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import allReducers from './reducers';
import { createStore } from "redux"
import {Provider} from "react-redux"
import ContextMenu from './components/ContextMenu/ContextMenu';
import Modal from './components/Modal/Modal';

const store = createStore(allReducers)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ContextMenu />
        <Modal />
      </BrowserRouter>
    </Provider>
);

reportWebVitals();
