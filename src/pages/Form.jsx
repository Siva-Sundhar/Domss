// import React from 'react'
import { useEffect, useRef, useState } from "react";
import axios from "axios";
const Form = () => {
	const [tableData, setTableData] = useState([
		{
			id: 1,
			category: "",
			code: "",
			description: "",
			orderQty: "",
			uom: "",
			aprdQty: "",
			rate: "",
			discount: "",
			amount: "",
			gmaster: "",
		},
	]);
	const [category] = useState([
		"Cream",
		"Hair Cream",
		"Body Splash",
		"Perfume",
		"Jelly",
		"Lotion",
		"Powder",
		"Luxury Perfume",
		"Soap",
	]);
	const [color, setColor] = useState("#EFEFEF");

	const [voucherType, setVoucherType] = useState("Order Booking");
	const [distributorName, setDistributorName] = useState("");
	const [voucherNo, setVoucherNo] = useState("");
	const [voucherDate, setVoucherDate] = useState("");
	const [distributorCode, setDistributorCode] = useState("");
	const [createdBy, setCreatedBy] = useState("")
	const [createdDate, setCreatedDate] = useState("")
	const [approvedBy, setApprovedBy] = useState("")
	const [approvedDate, setApprovedDate] = useState("")
	const [narration, setNarration] = useState("");

	const [productData, setProductData] = useState([]);
	const [prodFilter, setProdFilter] = useState([]);
	const [showProdList, setShowProdList] = useState(false);
	const [showList, setShowList] = useState(false);
	const [filteredOption, setFilteredOption] = useState(category);
	const [selectIndexCat, setSelectIndexCat] = useState(0);
	const [selectIndexProd, setSelectIndexProd] = useState(0);
	const [selectIndex, setSelectIndex] = useState(-1);
	const inputRefs = useRef([]);
	const listRefs = useRef([]);

	useEffect(() => {
		loadCategory();
	}, []);

	const loadCategory = async () => {
		const response = await axios.get("http://localhost:8080/get");
		setProductData(response.data);
	};

	useEffect(() => {
		if (selectIndex >= 0 && listRefs.current[selectIndex]) {
			listRefs.current[selectIndex].scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			});
		}
	}, [selectIndex]);

	const handleFilter = (item) => {
		const filteredData = productData.filter(
			(prod) => prod.stockGroup.toLowerCase() === item.toLowerCase()
		);

		setProdFilter(filteredData);
	};

	const handleSelect = (property, item, index) => {
		const newTableData = [...tableData];
		if (property === "category") {
			newTableData[index][property] = item;
			handleFilter(item);
			setTableData(newTableData);
			setShowList(false);
			setShowProdList(true);
			inputRefs.current[index * 10 + 1].focus();
		} else if (property === "code") {
			const option = item;
			newTableData[index].code = option.productCode;
			newTableData[index].description = option.stockItemName;
			newTableData[index].uom = option.uom;
			newTableData[index].rate = parseFloat(option.rate).toFixed(2);
			newTableData[index].discount = parseFloat(option.discount).toFixed(2);
			setTableData(newTableData);
			setShowProdList(false);
			inputRefs.current[index * 10 + 2].focus();
		}
	};

	const handleTotal = (e, index) => {
		const { value } = e.target;
		if (value) {
			const total = parseFloat(value * tableData[index].rate).toFixed(2);
			const discount = parseFloat(
				(total * tableData[index].discount) / 100
			).toFixed(2);
			const price = parseFloat(total - discount).toFixed(2);
			tableData[index].amount = price;
			setTableData([...tableData]);
		}
	};

	const handleKeySelect = (e, index, options, property) => {
		if (selectIndex < options.length) {
			if (e.key === "ArrowUp" && selectIndex > 0) {
				if (property === "category") {
					setSelectIndexCat((prev) => prev - 1);
					setSelectIndex((prev) => prev - 1);
				} else {
					setSelectIndexProd((prev) => prev - 1);
					setSelectIndex((prev) => prev - 1);
				}
			} else if (e.key === "ArrowDown" && selectIndex < options.length - 1) {
				if (property === "category") {
					setSelectIndexCat((prev) => prev + 1);
					setSelectIndex((prev) => prev + 1);
				} else {
					setSelectIndexProd((prev) => prev + 1);
					setSelectIndex((prev) => prev + 1);
				}
			} else if (e.key === "Enter" && selectIndexCat >= 0) {
				e.preventDefault();
				handleSelect(property, options[selectIndex], index);
				setTimeout(() => {
					inputRefs.current[
						index * 10 +
							(property === "category" ? 1 : 2 )
					].focus();
				}, 0);
			} else if (e.key === "Tab") {
				e.preventDefault();
			}
		} else {
			setSelectIndex(0);
		}
	};

	const handleFocus = (property) => {
		if (property === "category") {
			setSelectIndex(selectIndexCat);
			setShowList(true);
		} else if (property === "code") {
			setSelectIndex(selectIndexProd);
			setShowProdList(true);
		}
	};

	const handleChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...tableData];
		list[index][name] = value;
		setTableData(list);
		if (name === "category") {
			const filteredList = category.filter((item) =>
				item.toLowerCase().includes(e.target.value.toLowerCase())
			);
			setFilteredOption(filteredList);
		}
		if (name === "code" && list[index].category) {
			const filteredList = productData.filter(
				(item) =>
					item.productCode
						.toLowerCase()
						.includes(e.target.value.toLowerCase()) &&
					item.stockGroup === list[index].category
			);
			setProdFilter(filteredList);
		}
		
	};

	const handleBlur = (e, index) => {
		const { name, value } = e.target;
		const list = [...tableData];
		if (name === "orderQty" || name === "aprdQty") {
			if (!isNaN(value) && value !== "") {
				list[index][name] = parseFloat(value).toFixed(2);
			}
		}
		setTableData(list);
	};

	const handleKeyPress = (e, rowIndex, colIndex) => {
		if (e.key === "Enter" && e.target.value !== "") {
			e.preventDefault();
			const nextField = rowIndex * 10 + colIndex + 1;
			if (
				nextField < inputRefs.current.length &&
				inputRefs.current[nextField]
			) {
				inputRefs.current[nextField].focus();
			} else {
				addRow();
			}
		}
	};

	const handleVoucher = (e) => {
		const { value } = e.target;
		if (value === "Purchase") {
			setVoucherType("Purchase");
			setColor("#DFF5FF");
		} else if (value === "Purchase Return") {
			setColor("#E0FBE2");
			setVoucherType("Purchase Return");
		} else {
			setColor("#EFEFEF");
			setVoucherType("Orderbooking");
		}
		setVoucherType(value);
	};

	const addRow = () => {
		setTableData((prevData) => [
			...prevData,
			{
				id: prevData.length + 1,
				category: "",
				code: "",
				description: "",
				orderQty: "",
				aprdQty: "",
				rate: "",
				discount: "",
				amount: "",
				status: "",
			},
		]);
		setTimeout(() => {
			const newRowIndex = tableData.length;
			inputRefs.current[newRowIndex * 10].focus();
			setFilteredOption(category);
		}, 0);
	};
	
	const handleSubmit = async () => {

        try {
            // Prepare data to send to the server
            const formData = {
							voucherType,
							voucherNo,
							distributorName,
							voucherDate,
							distributorCode,
							createdBy,
							approvedBy,
							createdDate,
							approvedDate,
							narration,
							// reportData: {
							// 	// Include common form fields
							// 	// Include table data with common fields

							// 	tableData: tableData.map(({id, ...item}) => ({
							// 		voucherType,
							// 		voucherNo,
							// 		distributorName,
							// 		voucherDate,
							// 		...item,
							// 		// Add other common fields to each table item
							// 		createdBy,
							// 		approvedBy,
							// 		createdDate,
							// 		approvedDate,
							// 		narration,
							// 	})),
							// },
						};

						// Send data to the backend

						// Handle response if needed
						await axios.post("http://localhost:8080/orders/booking", formData)

        } catch (error) {
            // Handle error
            console.error("Error:", error);
        }
    };

	const handleKeyDown = (e)=>{

		if(e.key === 'Enter'){
			e.preventDefault();
			if(e.target.value !== ""){
				const userConfirmed = window.confirm("Do you want confirm order");
				if(userConfirmed)
					handleSubmit();
			}
		}
	}
	return (
		<>
			<form
				action=""
				style={{ background: color }}
				className=" h-screen px-0.5 relative"
				onSubmit={handleSubmit}
			>
				<div className="flex justify-between ">
					<div className=" w-[400px] py-3 px-1">
						<div className="flex leading-4 mb-1">
							<label htmlFor="dob" className="w-1/2 text-[14px]">
								Voucher Type
							</label>
							<div className="mr-0.5">:</div>
							<select
								className="w-3/4 h-[18px] font-semibold text-[13px] border border-fuchsia-700 outline-0 bg-transparent"
								id="voucherType"
								onChange={handleVoucher}
								value={voucherType}
							>
								<option value="Order Booking">Order Booking</option>
								<option value="Purchase">Purchase</option>
								<option value="Purchase Return">Purchase Return</option>
							</select>
						</div>
						<div className="flex leading-4 ">
							<label htmlFor="dn" className="w-2/4 text-[14px]">
								Ditributor Name
							</label>
							<div className="mr-0.5">:</div>
							<input
								autoComplete="off"
								onChange={(e) => setDistributorName(e.target.value)}
								value={distributorName}
								type="text"
								id="dn"
								className=" w-3/4 border border-fuchsia-700 h-[18px] focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
							/>
						</div>
					</div>
					<div className="flex leading-4 py-3 w-[300px]">
							<label htmlFor="vno" className="w-1/3 text-[14px]">
								Voucher No
							</label>
							<div className="mr-0.5">:</div>
							<input
								autoComplete="off"
								onChange={(e) => setVoucherNo(e.target.value)}
								name="voucherNo"
								value={voucherNo}
								type="text"
								id="vno"
								className=" w-2/3 border border-fuchsia-700 h-[18px] focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
							/>
						</div>
					<div className=" w-[300px] py-3 px-1">
						<div className="flex leading-4 mb-1">
							<label htmlFor="vdate" className="w-1/2 text-[14px]">
								Voucher Date
							</label>
							<div className="mr-0.5">:</div>
							<input
								autoComplete="off"
								name="voucherDate"
								onChange={(e) => setVoucherDate(e.target.value)}
								onKeyDown={(e) => e.key === "Enter"}
								value={voucherDate}
								type="text"
								id="date"
								className=" w-2/3 border border-fuchsia-700 h-[18px] focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
							/>
						</div>
						<div className="flex leading-4">
							<label htmlFor="dc" className="w-1/2 text-[14px]">
								Ditributor Code
							</label>
							<div className="mr-0.5">:</div>
							<input
								autoComplete="off"
								name="distributorCode"
								value={distributorCode}
								onChange={(e) => setDistributorCode(e.target.value)}
								type="text"
								id="dc"
								className=" w-2/3 border border-fuchsia-700 h-[18px] focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
							/>
						</div>
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
								<td className="w-[400px] text-center border border-slate-300">
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
								<td className="w-[200px] text-center border border-slate-300">
									Godown Master
								</td>
							</tr>
						</thead>
						<tbody>
							{tableData.map((data, index) => (
								<tr key={data.id} className=" text-[13px] h-[17px] leading-4">
									<td className="w-[60px] text-center border border-slate-300 bg-white">
										{index + 1}
									</td>
									<td className="w-[120px] text-left border border-slate-300 bg-white ">
										<input
											autoComplete="off"
											type="text"
											name="category"
											value={data.category}
											onChange={(e) => handleChange(e, index)}
											onKeyDown={(e) =>
												handleKeySelect(e, index, filteredOption, "category")
											}
											onFocus={() => handleFocus("category")}
											onBlur={() => setShowList(false)}
											ref={(el) => (inputRefs.current[index * 10 + 0] = el)}
											className="w-full outline-0 "
										/>
										{showList && (
											<div className="absolute bg-[#def1fc] w-48 top-[84px] right-2 text-left h-52">
												<h1 className="bg-[#2a67b1] text-white pl-2">
													List of Category
												</h1>
												<ul
													className=""
													tabIndex="-1"
													onMouseDown={(e) => e.preventDefault()}
												>
													{filteredOption.map((cat, catIndex) => (
														<li
															tabIndex="0"
															key={catIndex}
															onClick={() =>
																handleSelect("category", cat, index)
															}
															ref={(el) => (listRefs.current[catIndex] = el)}
															className={`cursor-pointer ${
																selectIndex === catIndex ? "bg-[#ff9a00]" : ""
															} pl-1  text-[13px]`}
														>
															{cat}
														</li>
													))}
												</ul>
											</div>
										)}
									</td>
									<td className="w-[100px] text-center border border-slate-300 bg-white">
										<input
											autoComplete="off"
											type="text"
											name="code"
											value={data.code}
											onChange={(e) => handleChange(e, index)}
											onFocus={() => handleFocus("code")}
											onBlur={() => setShowProdList(false)}
											onKeyDown={(e) =>
												handleKeySelect(e, index, prodFilter, "code")
											}
											ref={(el) => (inputRefs.current[index * 10 + 1] = el)}
											className="w-full outline-0 text-center"
										/>
										{showProdList && (
											<div className="absolute bg-[#def1fc] w-96 top-[84px] right-2 text-left h-[450px] overflow-y-scroll">
												<h1 className="bg-[#2a67b1] text-white pl-2 sticky top-0">
													List of Porduct
												</h1>
												<ul
													className=""
													tabIndex="-1"
													onMouseDown={(e) => e.preventDefault()}
												>
													{prodFilter.map((prod, prodIndex) => (
														<li
															tabIndex="0"
															key={prodIndex}
															onClick={() => handleSelect("code", prod, index)}
															ref={(el) => (listRefs.current[prodIndex] = el)}
															className={`cursor-pointer ${
																selectIndex === prodIndex ? "bg-[#ff9a00]" : ""
															} pl-1  text-[13px]  border-b border-[#fff]`}
														>
															<>
																<span>{prod.productCode} </span>
															</>{" "}
															<>
																<span className="ml-1">
																	{" "}
																	- {prod.stockItemName}
																</span>
															</>
														</li>
													))}
												</ul>
											</div>
										)}
									</td>
									<td className="w-[400px] pl-0.5 text-left border border-slate-300 bg-white">
										{data.description}
									</td>
									<td className="w-[80px] text-center border border-slate-300 bg-white">
										<input
											autoComplete="off"
											type="text"
											name="orderQty"
											value={data.orderQty}
											onChange={(e) => handleChange(e, index)}
											onBlur={(e) => {
												handleBlur(e, index);
											}}
											onKeyDown={(e) => handleKeyPress(e, index, 2)}
											ref={(el) => (inputRefs.current[index * 10 + 2] = el)}
											className="w-full outline-0 text-right pr-0.5"
										/>
									</td>
									<td className="w-[50px] text-center border border-slate-300 bg-white ">
										{data.uom}
									</td>
									<td className="w-[96px] text-center border border-slate-300 bg-white">
										<input
											autoComplete="off"
											type="text"
											name="aprdQty"
											step="0.01"
											value={data.aprdQty}
											onChange={(e) => handleChange(e, index)}
											onKeyDown={(e) => handleKeyPress(e, index, 3)}
											onBlur={(e) => {
												handleTotal(e, index);
												handleBlur(e, index);
											}}
											ref={(el) => (inputRefs.current[index * 10 + 3] = el)}
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
											}).formatToParts(data.amount).map(({type, value})=> (type === "currency" 
											? `${value} ` : value)).join('')
											: ""}
									</td>
									<td className="w-[200px] text-center border border-slate-300 bg-white">
										{data.gmaster}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className=" px-1 flex justify-between text-[14px] mt-5">
					<div className="w-[300px]">
						<div className="flex leading-4 mb-1">
							<label htmlFor="" className="w-2/4">
								Created By
							</label>
							<span className="mr-0.5">:</span>
							<input
								autoComplete="off"
								name="createdBy"
								onChange={(e)=> setCreatedBy(e.target.value)}
								value={createdBy}
								type="text"
								className="w-3/5 border border-fuchsia-700 h-[18px] focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
							/>
						</div>
						<div className="flex leading-4">
							<label htmlFor="" className="w-2/4">
								Approved By
							</label>
							<span className="mr-0.5">:</span>
							<input
								autoComplete="off"
								name="approvedBy"
								onChange={(e)=> setApprovedBy(e.target.value)}
								value={approvedBy}
								type="text"
								className="w-3/5 border border-fuchsia-700 h-[18px] focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
							/>
						</div>
					</div>
					<div className="w-[400px]">
						<div className="flex leading-4 mb-1">
							<label htmlFor="" className="w-[40%]">
								Created Date & Time
							</label>
							<span className="w-[2%]">:</span>
							<input
								autoComplete="off"
								name="createdDate"
								onChange={(e)=> setCreatedDate(e.target.value)}
								value={createdDate}
								type="text"
								className="w-44 border border-fuchsia-700 h-[18px] focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
							/>
						</div>
						<div className="flex leading-4 ">
							<label htmlFor="" className="w-[40%]">
								Approved Date & Time
							</label>
							<span className=" w-[2%]" >:</span>
							<input
								autoComplete="off"
								name="approvedDate"
								onChange={(e)=> setApprovedDate(e.target.value)}
								value={approvedDate}
								type="text"
								className=" w-44 border border-fuchsia-700 h-[18px] focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
							/>
						</div>
					</div>
					<div className="w-[500px]">
						<div className="flex leading-4 mb-1">
							<label htmlFor="" className="w-1/5">
								Narration
							</label>
							<span className="mr-0.5">:</span>
							<textarea
								autoComplete="off"
								name="narration"
								value={narration}
								onChange={(e)=> setNarration(e.target.value)}
								rows={2}
								maxLength={132}
								type=""
								onKeyDown={handleKeyDown}
								className="w-4/5 border border-fuchsia-700 h-[44px] focus:bg-[#fee8af] resize-none focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
							/>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

export default Form;
