import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TicketDetail from './TicketDetail';
import SellTicket from './SellTicket';
import VerificationSuccess from './VerificationSuccess';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ticket/:id" element={<TicketDetail />} />
        <Route path="/sell-ticket" element={<SellTicket />} />
        <Route path="/verification-success" element={<VerificationSuccess />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
