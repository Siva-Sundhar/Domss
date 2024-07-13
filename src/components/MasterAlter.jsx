import { useParams } from "react-router-dom"
import VoucherTypeAlter from "../pages/master/voucher_type_master/VoucherTypeAlter";
import AlterLedgerMaster from "../pages/master/ledger_master/AlterLedgerMaster";
import AlterDistributorMaster from "../pages/master/distributor_master/AlterDistributorMaster";
import AlterRegionMaster from "../pages/master/region_master/AlterRegionMaster";
import AlterProductMaster from "../pages/master/product_master/AlterProductMaster";
import AlterGodownMaster from "../pages/master/godown_master/AlterGodownMaster";
import AlterExecutiveMaster from "../pages/master/executive_master/AlterExecutiveMaster";

const MasterAlter = () => {
    const {type} = useParams();

    const renderComponent = ()=>{
        switch(type){
            case 'voucherTypeAlter':
                return <VoucherTypeAlter />
            case 'ledgerAlter':
                return <AlterLedgerMaster />
            case 'distributorAlter':
                return <AlterDistributorMaster />
            case 'regionAlter':
                return <AlterRegionMaster />
            case 'productAlter':
                return <AlterProductMaster />
            case 'godownAlter':
            return <AlterGodownMaster />
            case 'executiveAlter':
                return <AlterExecutiveMaster />
            default:
                return "NOT Available..."

    }
}

  return (
    <>{renderComponent()}</>
  )
}
export default MasterAlter