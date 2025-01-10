import './App.css';
import Accounts from './components/Accounts/Accounts';
import AccountsDetails from './components/AccountById/AccountDetails';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Transactions from './components/Transactions/Transactions';
import Beneficiaries from './components/Beneficiaries/Beneficiaries';
import Balances from './components/Balances/Balances';
import DirectDebits from './components/DirectDebits/DirectDebits';
import StandingOrders from './components/StandingOrder/StandingOrders';
import Product from './components/Product/Product';
import ScheduledPayments from './components/ScheduledPayments/ScheduledPayments';
import Statements from './components/Statements/Statements';
import Offers from './components/Offers/Offers';
import BankSelector from './components/BankSelector/BankSelector';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BankSelector />}></Route>
        <Route path='accounts/' element={<Accounts />}></Route>
        <Route path='/account_details' element={<AccountsDetails/>}></Route>
        <Route path='/transactions' element={<Transactions />}></Route>
        <Route path='/beneficiaries' element={<Beneficiaries />}></Route>
        <Route path='/balances' element={<Balances />}></Route>
        <Route path='/direct_debits' element={<DirectDebits />}></Route>
        <Route path='/standing_orders' element={<StandingOrders />}></Route>
        <Route path='/product' element={<Product />}></Route>
        <Route path='/scheduled_payments' element={<ScheduledPayments />}></Route>
        <Route path='/statements' element={<Statements />}></Route>
        <Route path='/offers' element={<Offers />}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
