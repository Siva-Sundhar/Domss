import { useRef, useState, useEffect } from "react";

const OrderForm = () => {
	// const [isOpen, setIsOpen] = useState(false);
	const [rows, setRows] = useState([["1", "", "", "", "", "", "", "", "", ""]]);
	const [category] = useState([
		"Cream",
		"Hair cream",
		"Body splash",
		"Perfune",
		"Jelly",
		"Lotion",
		"Powder",
		"Luxury perfume",
		"Soap",
	]);
	const [filteredOption, setFilteredOption] = useState(category)
	
    
	const [showList, setShowList] = useState(false);

	const date = new Date();
	let fullDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
	const nextRef = useRef([]);
	const handleChange = (e, rowIndex, colIndex) => {
		const newRows = [...rows];
		newRows[rowIndex][colIndex] = e.target.value;
		setRows(newRows);
		if (colIndex === 1) {
			// Filter category list based on input value
			const filteredList = category.filter((item) =>
				item.toLowerCase().includes(e.target.value.toLowerCase())
			);
				setFilteredOption(filteredList);
		}
	};
	useEffect(() => {
		nextRef.current[0][1].focus();
		setFilteredOption(category)
		
	}, []);

	const handleKeyDown = (e, rowIndex, colIndex) => {
		if (e.key === "Enter") {
			e.preventDefault();
			if (colIndex === rows[rowIndex].length - 1) {
				const newRows = [
					...rows,
					[rows.length + 1, "", "", "", "", "", "", "", "", ""],
				];
				setRows(newRows);
				setTimeout(() => {
					nextRef.current[rowIndex + 1][1].focus();
					
				}, 0);
			} else {
				
				setShowList(false)
				
				nextRef.current[rowIndex][colIndex + 1].focus();
                
			}
		}
	};   

	const handleShowList = () => {
        
		setShowList(true);
	};

	const handleSelect = (item, index) => {
		const newRows = [...rows];
		newRows[index][1] = item;
		setRows(newRows);
		setShowList(false);
		nextRef.current[index][2].focus();
	};
	// console.log(rows)
	return (
		<>
			<div className=" py-2 flex justify-center items-center bg-[#EEEEEE]">
				{/* {isOpen && (
					<div className="flex flex-col items-center">
						<h1 className="text-center text-xl font-semibold">
							Do You Want Book the Order ?
						</h1>
						<div className="mt-5">
							<button
								className="font-semibold px-3 py-0.5 bg-blue-500 text-white"
								onClick={() => setIsOpen(true)}
							>
								Yes
							</button>{" "}
							<button className="font-semibold px-3 py-0.5 bg-red-500 text-white">
								No
							</button>
						</div>
					</div>
				)}
				{isOpen && (
					<div className=" h-80 w-80 border border-blue-500">
						<form>
							<div>
								<label htmlFor="" className="m-2">
									Distributor Mobile No or Email :
								</label>
								<input
									type="text"
									className="w-full p-1  border border-blue-500 outline-0"
								/>
							</div>
							<button> Request OTP</button>
						</form>
					</div>
				)} */}
				<form action="" className="w-full  h-[97vh]">
					<div className="flex justify-between">
						<div className="w-[400px] mb-2">
							<div className="leading-4 flex">
								<label htmlFor="voucherNo" className=" w-[50%] text-sm ">
									Distributor Order Booking
								</label>
								<span className="mr-0.5">:</span>
								<input
									type="text"
									value={"DIST-SO-001-2024-25"}
									className=" w-2/3 border h-[18px] focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
								/>
							</div>
							<div className="leading-4 flex mt-1">
								<label htmlFor="type" className="w-[50%] text-sm ">
									Distributor Name
								</label>
								<span className="mr-0.5">:</span>
								<input
									type="text"
									value={"Dist Order Booking"}
									className="w-2/3 border h-[18px] focus:bg-[#fee8af] font-semibold focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0"
								/>
							</div>
						</div>
						<div className="w-80">
							<div className="mb-1 flex leading-5">
								<label htmlFor="date" className="text-sm w-[36%]">
									Date
								</label>
								<span className="text-sm mx-0.5">:</span>
								<input
									type="text"
									value={"27-05-2024"}
									className=" w-20 border h-[18px] focus:bg-[#fee8af] focus:border-blue-500 font-semibold text-[13px] pl-0.5 bg-transparent outline-0"
								/>
							</div>
							<div className="leading-4 flex">
								<label htmlFor="voucherNo" className=" w-[40%] text-sm">
									Distributor Code
								</label>
								<span className="mr-0.5">:</span>
								<input
									type="text"
									value={"DIST-SO-001-2024-25"}
									className=" w-2/3 border h-[18px] focus:bg-[#fee8af] focus:border-blue-500 font-semibold text-[13px] pl-0.5 bg-transparent outline-0"
								/>
							</div>
						</div>
					</div>
					<hr />
					<div className="mt-1 h-[75vh] w-full overflow-y-scroll border-white border relative">
						<table className="border-collapse border border-slate-300">
							<thead>
								<tr className="bg-[#F9F3CC] text-black sticky top-0">
									<td className=" w-12 font-semibold border border-slate-300 px-2 text-[13px] ">
										S.No
									</td>
									<td className=" w-40 font-semibold text-center border border-slate-300 px-2 text-[13px] ">
										Product Category
									</td>
									<td className=" w-28 font-semibold border border-slate-300 px-2 text-[13px]">
										Product Code
									</td>
									<td className=" w-[400px] font-semibold border text-center border-slate-300 px-2 text-[13px]">
										Product Descriptions
									</td>
									<td className=" w-24 font-semibold border border-slate-300 px-2 text-[13px]">
										Order Qty
									</td>
									<td className=" w-24 font-semibold border border-slate-300 px-2 text-[13px]">
										Aprd Qty
									</td>
									<td className=" w-20 font-semibold border border-slate-300 px-2 text-[13px]">
										Rate
									</td>
									<td className=" w-20 font-semibold border border-slate-300 px-2 text-[13px]">
										Disct %
									</td>
									<td className=" w-20 font-semibold border border-slate-300 px-2 text-[13px]">
										Amount
									</td>
									<td className="w-52 text-center font-semibold border border-slate-300 px-2 text-[13px]">
										Status
									</td>
								</tr>
							</thead>
							<tbody >
								{rows.map((row, rowIndex) => (
									<tr key={rowIndex} className="h-[17px] ">
										{row.map((col, colIndex) => (
											<td
												className="border border-collapse border-slate-300 bg-white text-[13px] leading-4"
												key={colIndex}
											>
												{colIndex === 1 ? (
													<>
														<input
															value={col}
															ref={(input) => {
																if (!nextRef.current[rowIndex]) {
																	nextRef.current[rowIndex] = [];
																}
																nextRef.current[rowIndex][colIndex] = input;
															}}
															type="text"
															onChange={(e) =>
																handleChange(e, rowIndex, colIndex)
															}
															onFocus={handleShowList}
															onKeyDown={(e) => {
																handleKeyDown(e, rowIndex, colIndex);
															}}
															className=" w-full px-1 text-[13px] font-semibold outline-0 text-center"
														/>
														{showList && (
															<div className="absolute bg-[#def1fc] w-48 top-6 right-0">
																<h1 className="bg-[#2a67b1] text-white pl-1">
																	List of Category
																</h1>
																<ul className="" tabIndex={0}>
																	{filteredOption.map((cat) => (
																		<li
																			tabIndex={0}
																			key={cat}
																			onClick={() =>
																				handleSelect(cat, rowIndex)
																			}
																			className="cursor-pointer py-0.5 pl-1 hover:bg-[#FF9A00] text-[13px]"
																		>
																			{cat}
																		</li>
																	))}
																</ul>
															</div>
														)}
													</>
												) : (
													<input
														value={col}
														ref={(input) => {
															if (!nextRef.current[rowIndex]) {
																nextRef.current[rowIndex] = [];
															}
															nextRef.current[rowIndex][colIndex] = input;
														}}
														type="text"
														onChange={(e) =>
															handleChange(e, rowIndex, colIndex)
														}
														onKeyDown={(e) =>
															handleKeyDown(e, rowIndex, colIndex)
														}
														className=" w-full px-1 text-[13px] font-semibold outline-0 text-center"
													/>
												)}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<div className="flex justify-between mt-6 px-2">
						<div className="flex justify-between">
							<div className="w-72">
								<div className="leading-4 flex">
									<label htmlFor="type" className="w-[31%] text-sm ">
										Created By
									</label>
									<span className="mr-0.5">:</span>
									<input
										type="text"
										value={"Jerry"}
										className="w-2/3 border h-[18px] focus:bg-[#fee8af] focus:border-blue-500 text-[13px] font-semibold pl-0.5 bg-transparent outline-0"
									/>
								</div>
								<div className="leading-4 flex">
									<label htmlFor="voucherNo" className=" w-[31%] text-sm ">
										Date
									</label>
									<span className="mr-0.5">:</span>
									<input
										type="text"
										value={"27-05-2024"}
										className=" w-2/3 border h-[18px] focus:bg-[#fee8af] focus:border-blue-500 text-[13px] font-semibold pl-0.5 bg-transparent outline-0"
									/>
								</div>
							</div>
						</div>

						<div className="flex justify-between">
							<div className="w-72">
								<div className="leading-4 flex">
									<label htmlFor="type" className="w-[31%] text-sm">
										Approved By
									</label>
									<span className="mr-0.5">:</span>
									<input
										type="text"
										value={"Tommy"}
										className="w-2/3 border h-[18px] focus:bg-[#fee8af] font-semibold focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0"
									/>
								</div>
								<div className="leading-4 flex">
									<label htmlFor="voucherNo" className=" w-[31%] text-sm ">
										Date
									</label>
									<span className="mr-0.5">:</span>
									<input
										type="text"
										value={fullDate}
										className=" w-2/3 border h-[18px] focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 font-semibold bg-transparent outline-0"
									/>
								</div>
							</div>
						</div>
						<div>
							<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
								Accept
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default OrderForm;
