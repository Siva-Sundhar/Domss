import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// from "react";import axios from "axios";
const DisplayOrder = () => {
	const navigate = useNavigate()
	
	// const convertDateFormat = (dateString) => {
	// 	const formattedDate = dateString.replace(/[./]/g, "-");
	// 	const parts = formattedDate.split("-");
	// 	if (parts.length === 3) {
	// 		const [year, month, day] = parts;
	// 		return `${day}-${month}-${year}`;
	// 	} else {
	// 		return dateString;
	// 	}
	// };
	useEffect(() => {
		const handleKeyDown = (e)=>{
			if (e.key === "Escape") {
				navigate("/")
			}
		}

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [navigate]);

	return (
		<>
			<div className="bg-[#fff4fc]">
				<div className="flex justify-between ">
					<div className="flex leading-4 py-2 px-1">
						<label htmlFor="voucherType" className="w-28 text-[14px] ">
							Voucher Type
						</label>
						<div className="mr-0.5">:</div>
						<span
							className="w-36 h-[18px] font-semibold text-[13px] border border-fuchsia-700 outline-0 bg-transparent"
							id="voucherType"
						></span>
					</div>
					<div className="flex leading-4 py-2 ">
						<label htmlFor="vno" className="w-24 text-[14px]">
							Voucher No
						</label>
						<div className="mr-0.5">:</div>
						<span className="w-32 border border-fuchsia-700 h-[18px] text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"></span>
					</div>
					<div className="flex leading-4 py-2 px-1">
						<label htmlFor="vdate" className="w-[100px] text-[14px]">
							Voucher Date
						</label>
						<div className="mr-0.5">:</div>
						<span className="w-24 border border-fuchsia-700 h-[18px]  text-[13px] pl-0.5 bg-transparent outline-0 font-semibold">
							{/* {convertDateFormat(date)} */}
						</span>
					</div>
				</div>

				<div className="flex justify-between mb-3">
					<div className="flex leading-4 px-1">
						<label htmlFor="dn" className="w-28 text-[14px]">
							Ditributor Name
						</label>
						<div className="mr-0.5">:</div>
						<span className="w-72 border border-fuchsia-700 h-[18px] text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"></span>
					</div>

					<div className="flex leading-4 px-1">
						<label htmlFor="dc" className="w-[100px] text-[14px]">
							Ditributor Code
						</label>
						<div className="mr-0.5">:</div>

						<span className="w-24 border border-fuchsia-700 h-[18px] text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"></span>
					</div>
				</div>
				<div className="h-[77vh] w-full overflow-y-scroll pl-1 border">
					<table className="border-collapse border border-slate-300 ">
						<thead className=" bg-[#F9F3CC] text-[13px] border border-slate-300 font-semibold sticky top-0">
							<tr className="h-[17px] leading-4 border border-slate-300">
								<td className="w-[60px] text-center border border-slate-300">
									S.No
								</td>
								<td className="w-[120px] text-center border border-slate-300">
									Product Category
								</td>
								<td className="w-[100px] text-center border border-slate-300">
									Product Code
								</td>
								<td className="w-[500px] text-center border border-slate-300">
									Product Description
								</td>
								<td className="w-[80px] text-center border border-slate-300">
									Order Qty
								</td>
								<td className="w-[50px] text-center border border-slate-300">
									Uom
								</td>
								<td className="w-[96px] text-center border border-slate-300">
									Aprd Qty
								</td>
								<td className="w-[87px] text-center border border-slate-300">
									Rate
								</td>
								<td className="w-[60px] text-center border border-slate-300">
									Disct %
								</td>
								<td className="w-[100px] text-center border border-slate-300">
									Amount
								</td>
							</tr>
						</thead>
						<tbody>
							<tr className="h-[17px] leading-4 border border-slate-300">
								<td className="border border-slate-300 text-[13px] text-center">
									1
								</td>
								<td className="border border-slate-300 text-[14px] pl-1">
									Category
								</td>
								<td className="border border-slate-300 text-[14px] pl-1 text-center">
									Code
								</td>
								<td className="border border-slate-300 text-[14px] pl-1">
									Description
								</td>
								<td className="border border-slate-300 text-[14px] px-1 text-right">
									Order Qty
								</td>
								<td className="border border-slate-300 text-[14px] text-center">
									Uom
								</td>
								<td className="border border-slate-300 text-[14px] px-1 text-right">
									Aprd Qty
								</td>
								<td className="border border-slate-300 text-[14px] px-1 text-right">
									Rate
								</td>
								<td className="border border-slate-300 text-[14px] px-1 text-right">
									Disct %
								</td>
								<td className="border border-slate-300 text-[14px] px-1 text-right">
									Amount
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className=" px-1 flex flex-col text-[14px] mt-3">
					<div className="w-[650px] flex justify-between ">
						<div className="flex leading-4 mb-1 w-[300px]">
							<label htmlFor="" className="w-[35%]">
								Created By
							</label>
							<span className="mr-0.5">:</span>
							<span className="w-3/5 border border-fuchsia-700 h-[18px] focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"></span>
						</div>

						<div className="flex leading-4 w-[300px]">
							<label htmlFor="" className="w-[35%]">
								Approved By
							</label>
							<span className="mr-0.5">:</span>
							<span className="w-3/5 border border-fuchsia-700 h-[18px] focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"></span>
						</div>
					</div>

					<div className="w-[700px] ">
						<div className="flex leading-4 mt-1">
							<label htmlFor="" className="w-[15%]">
								Narration
							</label>
							<span className="mr-0.5">:</span>
							<span className="w-[76%] border border-fuchsia-700 h-[34px] focus:bg-[#fee8af] resize-none focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"></span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DisplayOrder;
