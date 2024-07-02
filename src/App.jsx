
import { BrowserRouter, Routes, Route} from "react-router-dom"
import VoucherCreation from "./pages/VoucherCreation"
import DisplayOrder from "./pages/DisplayOrder"
import AlterOrder from "./pages/AlterOrder"
import Header from "./components/Home"
import Voucher from "./pages/Voucher"
import DayBook from "./pages/DayBook"
import Purchase from "./pages/Purchase"
import ReportWithItems from "./pages/ReportWithItems"
import ReportForAccountry from "./pages/ReportForAccountry"

// import TodoForm from "./pages/TodoForm"
// import ProductSubForm from "./pages/ProductSubForm"


const App = () => {
  return (
    <>
      
      {/* <TodoForm /> */}
      {/* <ProductSubForm /> */}
      
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="display" element={<DisplayOrder />} />
          <Route path="/alterOrder/:id" element={<AlterOrder />} />

          <Route path="vouchers" element={<Voucher />} >
            <Route index element={<Purchase />} />
            <Route path="purchase" element={<Purchase />} />
            <Route path="sales" element={<VoucherCreation />} />
            
          </Route>
          <Route path="daybook" element={<DayBook />} />
          <Route path="report" element={<ReportForAccountry />} />
          <Route path="reportItems" element={<ReportWithItems />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
