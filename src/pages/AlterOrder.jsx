
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const AlterOrder = () => {


	const inputRefs = useRef([])
	const tableRefs = useRef([])
	const [order, setOrder] = useState({
	voucherType: 'Sales Order',
    voucherNo: "",
    distributorName: "",
    distributorCode: "",
    voucherDate: "",
    createdBy: "",
    createdDateTime: "",
    approvedBy: "",
    approvedDateTime: "",
    narration: "",
	orderItems: [{
		category: "",
		code: "",
		description: "",
		orderQty: "",
		uom: "",
		approvedQuantity: "",
		rate: "",
		discount: "",
		amount: "",
	}]
	});
	
	
	const {id} = useParams();
	
	const handleChange = (e, rowIndex)=>{
		const {name, value} = e.target;
		const updatedOrderItems = order.orderItems.map((item, idx)=>
			idx === rowIndex ? { ...item, [name]: value } : item
		)
		setOrder((prevOrder)=>({
			...prevOrder,
			orderItems: updatedOrderItems
		}))
	}

	useEffect(()=>{
		loadOrder()
	},[])

	const loadOrder = async()=>{
		const res = await axios.get(`http://localhost:8080/orders/getOrder/${id}`)
		setOrder(res.data)
		
	}

	const convertDateFormat = (dateString) => {
		

		const parts = dateString.split("-");
		const [year, month, day] = parts;

		return `${day}-${month}-${year}`;
	};

	const handleTotal = (e, index) => {
		const { value } = e.target;
		if (value) {

			const rate = parseFloat(order.orderItems[index].rate)
			const discountPercent = parseFloat(order.orderItems[index].discount)
			const total = parseFloat(value * rate).toFixed(2);
			const discount = parseFloat(
				(total * discountPercent) / 100
			).toFixed(2);
			const price = parseFloat(total - discount).toFixed(2);

			const updatedOrderItems = order.orderItems.map((item, idx)=>
				idx === index ? {...item, amount:price} : item)
			console.log(price)
			setOrder((prevOrder)=>({
				...prevOrder,
				orderItems: updatedOrderItems
			}))
			// order.orderItems[index].amount = price;
			// setOrder([...order.orderItems]);
		}
	
	};

	const handleBlur = (e, index) => {
		const { name, value } = e.target;
		const list = [...order.orderItems];
		if (name === "orderQty" || name === "approvedQuantity") {
			if (!isNaN(value) && value !== "") {
				list[index][name] = parseFloat(value).toFixed(2);
			}
		}
		setOrder((prevOrder)=>({
			...prevOrder,
			orderItems: list
		}));
	};

	// const handleSubmit = async () => {
	// 	const voucherDate = convertDateFormat(vDate)
	// 	const orderItems = tableData.filter((item)=>{
	// 		return item.category !== "♦ End of List" 
	// 	}
			
	// 	)
	// 	try {
	// 		// Prepare data to send to the server
	// 		const formData = {
	// 			voucherType,
	// 			voucherNo,
	// 			distributorName,
	// 			voucherDate,
	// 			distributorCode,
	// 			createdBy,
	// 			approvedBy,
	// 			narration,
	// 			orderItems
	// 		};
	// 		// Handle response if needed
	// 		// await axios.put("http://localhost:8080/orders/booking", formData);
	// 		console.log(formData)
	// 	} catch (error) {
			
	// 		console.error("Error:", error);
	// 	}
	// };

    const handleKeyDown = (e)=>{

		if(e.key === 'Enter'){
			e.preventDefault();
			if(e.target.value !== ""){
				const userConfirmed = window.confirm("Do you want confirm order");
				if(userConfirmed)
					// handleSubmit();
				console.log(order)
			}
		}
	}
	return (
		<>
			<form
				className=" h-screen relative bg-[#f3ffe9]"
				onSubmit={(e) => e.preventDefault()}
			>
				<div className="flex justify-between ">
					<div className="flex leading-4 py-2 px-1">
						<label htmlFor="voucherType" className="w-28 text-[14px] ">
							Voucher Type
						</label>
						<div className="mr-0.5">:</div>
						<span
							className="w-36 h-[18px] font-semibold text-[13px] border border-fuchsia-700 outline-0 bg-transparent"
							id="voucherType"
						>
							{order.voucherType}
						</span>
					</div>
					<div className="flex leading-4 py-2 ">
						<label htmlFor="vno" className="w-24 text-[14px]">
							Voucher No
						</label>
						<div className="mr-0.5">:</div>
						<span className="w-32 border border-fuchsia-700 h-[18px] text-[13px] pl-0.5 bg-transparent outline-0 font-semibold">
							{order.voucherNo}
						</span>
					</div>
					<div className="flex leading-4 py-2 px-1">
						<label htmlFor="vdate" className="w-[100px] text-[14px]">
							Voucher Date
						</label>
						<div className="mr-0.5">:</div>
						<span className="w-24 border border-fuchsia-700 h-[18px]  text-[13px] pl-0.5 bg-transparent outline-0 font-semibold">
							{convertDateFormat(order.voucherDate)}
						</span>
					</div>
				</div>

				<div className="flex justify-between mb-3">
					<div className="flex leading-4 px-1">
						<label htmlFor="dn" className="w-28 text-[14px]">
							Ditributor Name
						</label>
						<div className="mr-0.5">:</div>
						<span className="w-72 border border-fuchsia-700 h-[18px] text-[13px] pl-0.5 bg-transparent outline-0 font-semibold">
							{order.distributorName}
						</span>
					</div>

					<div className="flex leading-4 px-1">
						<label htmlFor="dc" className="w-[100px] text-[14px]">
							Ditributor Code
						</label>
						<div className="mr-0.5">:</div>

						<span className="w-24 border border-fuchsia-700 h-[18px] text-[13px] pl-0.5 bg-transparent outline-0 font-semibold">
							{order.distributorCode}
						</span>
					</div>
				</div>

				<div className="h-[81vh] w-full overflow-y-scroll pl-1 border">
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
							{order.orderItems.map((data, rowIndex) => (
								<tr key={rowIndex} className=" text-[13px] h-[17px] leading-4">
									<td className="w-[60px] text-center border border-slate-300 bg-white">
										{rowIndex + 1}
									</td>
									<td className="border border-slate-300 text-[14px] pl-1 bg-white">
										{data.category}
									</td>
									<td className="border border-slate-300 text-[14px] pl-1 text-center bg-white">
										{data.code}
									</td>
									<td className="border border-slate-300 text-[14px] pl-1 bg-white">
										{data.description}
									</td>
									<td className="border border-slate-300 text-[14px] px-1 text-right bg-white">
										{data.orderQty}
									</td>
									<td className="border border-slate-300 text-[14px] text-center bg-white">
										{data.uom}
									</td>
									<td className="w-[96px] text-center border border-slate-300 bg-white">
										<input
											autoComplete="off"
											type="text"
											name="approvedQuantity"
											step="0.01"
											value={data.approvedQuantity}
											onChange={(e) => handleChange(e, rowIndex)}
											ref={(input) =>
												(tableRefs.current[rowIndex * 9 + 0] = input)
											}
											// onKeyDown={(e) => {
											// 	if (e.key === "Enter" && e.target.value !== "") {
											// 		tableRefs.current[(rowIndex * 9 + 1) + 0]
											// 	}
											// }
											// }
											onBlur={(e) => {
												handleTotal(e, rowIndex);
												handleBlur(e, rowIndex);
											}}
											className="w-full outline-0 text-right pr-0.5"
										/>
									</td>
									<td className="w-[87px] text-right pr-0.5 border border-slate-300 bg-white">
										{data.rate}
									</td>
									<td className="w-[60px] text-right pr-0.5 border border-slate-300 bg-white">
										{data.discount ? `${data.discount} %` : ""}
									</td>
									<td className="w-[100px] text-right pr-0.5 border border-slate-300 bg-white">
										{data.amount
											? Intl.NumberFormat("en-NG", {
													style: "currency",
													currency: "NGN",
													minimumFractionDigits: 2,
											  })
													.formatToParts(data.amount)
													.map(({ type, value }) =>
														type === "currency" ? `${value} ` : value
													)
													.join("")
											: ""}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className=" px-1 flex text-[14px] mt-3 w-full justify-between">
					<div className="w-[650px] flex justify-between ">
						<div className="flex leading-4 mb-1 w-[300px]">
							<label htmlFor="" className="w-[35%]">
								Created By
							</label>
							<span className="mr-0.5">:</span>
							<span className="w-3/5 border border-fuchsia-700 h-[18px] focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold">
								{order.createdBy}
							</span>
						</div>

						<div className="flex leading-4 w-[300px]">
							<label htmlFor="" className="w-[35%]">
								Approved By
							</label>
							<span className="mr-0.5">:</span>
							<input
								autoComplete="off"
								name="approvedBy"
								onChange={(e) =>
									setOrder({ ...order, approvedBy: e.target.value })
								}
								value={order.approvedBy}
								type="text"
								ref={(el) => (inputRefs.current[0] = el)}
								onKeyDown={(e) => e.key === 'Enter' && e.target.value !== "" && inputRefs.current[1].focus()}
								className="w-3/5 border border-fuchsia-700 h-[18px] focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
							/>
						</div>
					</div>

					<div className="w-[625px] ">
						<div className="flex leading-4 ">
							<label htmlFor="" className="w-[11%]">
								Narration
							</label>
							<span className="mr-0.5">:</span>
							<textarea
								autoComplete="off"
								name="narration"
								value={order.narration}
								onChange={(e) =>
									setOrder({ ...order, narration: e.target.value })
								}
								rows={1}
								maxLength={75}
								type=""
								onKeyDown={handleKeyDown}
								ref={(el) => (inputRefs.current[1] = el)}
								className="w-[89%] border border-fuchsia-700 h-[18px] focus:bg-[#fee8af] resize-none focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
							/>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

export default AlterOrder;
