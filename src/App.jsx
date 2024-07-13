import { BrowserRouter, Route, Routes } from "react-router-dom"
import Gateway from "./components/Gateway"
import Master from "./components/Master"
import MasterForm from "./components/create/MasterForm"
import MasterAlterFilter from "./components/alter/MasterAlterFilter"
import MasterDisplayFilter from "./components/display/MasterDisplayFilter"
import DisplayRegionMaster from './pages/master/region_master/DisplayRegionMaster'
import DisplayExecutiveMaster from './pages/master/executive_master/DisplayExecutiveMaster'
import DisplayDistributorMaster from './pages/master/distributor_master/DisplayDistributorMaster'
import DisplayProductMaster from './pages/master/product_master/DisplayProductMaster'
import DisplayGodownMaster from './pages/master/godown_master/DisplayGodownMaster'
import DisplayVoucherTypeMaster from './pages/master/voucher_type_master/DisplayVoucherTypeMaster'
import DisplayLedgerMaster from './pages/master/ledger_master/DisplayLedgerMaster'
import MasterAlter from "./components/MasterAlter"


function App() {
  

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Gateway />} />
          <Route path=":type" element = {<Master />} />
          <Route path="create/:type" element={<MasterForm />} />
          <Route path="/:type/filter" element={<MasterAlterFilter />} />
          <Route path="alter/:type" element={<MasterAlter />} />

          <Route path="/display/:type" element={<MasterDisplayFilter />} />

          <Route path="displayRegion/:regionMasterId" element = {<DisplayRegionMaster />} />

          <Route path="displayExecutive/:executiveCode" element = {<DisplayExecutiveMaster />} />
          <Route path="displayDistributor/:distributorCode" element={<DisplayDistributorMaster />} />
          <Route path="displayProduct/:productCode" element={<DisplayProductMaster />} />
          <Route path="displayGodown/:godownCode" element = {<DisplayGodownMaster />} />
          <Route path="displayVoucherTypeName/:voucherTypeName" element = {<DisplayVoucherTypeMaster />} />
          <Route path="displayVoucherType/:voucherType" element = {<DisplayVoucherTypeMaster />} />
          <Route path="displayLedger/:ledgerCode" element={<DisplayLedgerMaster />} />

        </Routes>
      </BrowserRouter>
      
      

    </>
  )
}

export default App