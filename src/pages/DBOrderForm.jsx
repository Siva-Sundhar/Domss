import {useRef, useState} from 'react'

const DBOrderForm = () => {

    const [tableData, setTableData] = useState([
		{
			id: 1,
			category: "",
			code: "",
			description: "",
			orderQty: "",
			uom: "",
			
		},
	]);
    const inputRefs = useRef([])

    // const[showList, setShowList] = useState(false)
  return (
    <form action="" className=" h-screen px-0.5" onSubmit={e=>e.preventDefault()}>
				<div className="flex justify-between ">
					<div className=" w-[300px] py-3 px-1">
						<div className="flex leading-4 mb-1">
							<label htmlFor="dob" className="w-1/2 text-[14px]">
								Voucher Type
							</label>
							<div className="mr-0.5">:</div>
								<select 
								className="w-2/3 h-[18px] font-semibold text-[13px] border border-fuchsia-700 outline-0 bg-transparent"
								id="voucherType"
								
								>
									<option value="Order Booking">Order Booking</option>
									<option value="Purchase">Purchase</option>
									<option value="Purchase Return">Purchase Return</option>
									
								</select>
						</div>
						<div className="flex leading-4 ">
							<label htmlFor="dn" className="w-1/2 text-[14px]">
								Ditributor Name
							</label>
							<div className="mr-0.5">:</div>
							<input
								type="text"
								id="dn"
								className=" w-2/3 border border-fuchsia-700 h-[18px] focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
							/>
						</div>
					</div>
					<div className=" w-[300px] py-3 px-1">
						<div className="flex leading-4 mb-1">
							<label htmlFor="date" className="w-1/2 text-[14px]">
								Date
							</label>
							<div className="mr-0.5">:</div>
							<input
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
								type="text"
								id="dc"
								className=" w-2/3 border border-fuchsia-700 h-[18px] focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
							/>
						</div>
					</div>
				</div>
				<div className="h-[77vh] w-[818px] overflow-y-scroll border relative mx-auto">
					<div
						className="h-[22px] border bg-[#F9F3CC] grid grid-cols-5 text-[13px] font-semibold"
						style={{
							gridTemplateColumns:
							"60px 120px 100px 400px 80px 50px",
						}}
					>
						<div className=" text-center border-r ">S.No</div>
						<div className=" text-center border-r ">Product Category</div>
						<div className=" text-center border-r ">Product Code</div>
						<div className=" text-center border-r ">Product Description</div>
						<div className=" text-center border-r ">Order Qty</div>
						<div className=" text-center border-r ">Uom</div>
						
					</div>
					{tableData.map((data, index) => (
						<div
							key={data.id}
							className="border-t-0 border grid grid-cols-11 text-[13px]"
							style={{
								gridTemplateColumns:
								"60px 120px 100px 400px 80px 50px ",
							}}
						>
							<div className="text-center border-r bg-white">{index + 1}</div>
							<div className="text-center border-r bg-white">
								<input
									autoComplete="off"
									type="text"
									name="category"
									value={data.category}
									
									className="w-full outline-0 text-center"
								/>
								{/* {showList && (
									<div className="absolute bg-[#def1fc] w-48 top-5 right-0 text-left h-52">
										<h1 className="bg-[#2a67b1] text-white pl-2">
											List of Category
										</h1>
										<ul className="" tabIndex="-1" onMouseDown={(e)=>e.preventDefault()}>
											{filteredOption.map((cat, catIndex) => (
												<li
													tabIndex="0"
													key={catIndex}
													onClick={() => handleSelect('category',cat, index)}
													ref={(el) => listRefs.current[catIndex] = el}
													className={`cursor-pointer ${selectIndex === catIndex ? "bg-[#ff9a00]" : ""} pl-1  text-[13px]`}
												>
													{cat}
												</li>
											))}
										</ul>
									</div>
								)} */}
							</div>
							<div className="text-center border-r bg-white">
								<input
									autoComplete="off"
									type="text"
									name="code"
									value={data.code}
									
									className="w-full outline-0 text-center"
								/>
                                {/* {
									showProdList && (
										<div className="absolute bg-[#def1fc] w-96 top-5 right-0 text-left h-[450px] overflow-y-scroll">
										<h1 className="bg-[#2a67b1] text-white pl-2">
											List of Porduct 
										</h1>
										<ul className="" tabIndex="-1" onMouseDown={(e)=>e.preventDefault()} >
											{prodFilter.map((prod, prodIndex) => (
												<li
													tabIndex="0"
													key={prodIndex}
													onClick={()=>handleSelect('code', prod, index)}
													ref={(el) => listRefs.current[prodIndex] = el}
													className={`cursor-pointer ${selectIndex === prodIndex ? "bg-[#ff9a00]" : ""} pl-1  text-[13px]  border-b border-[#fff]`}
												>
													<><span >{prod.productCode} </span></> <><span className="ml-1"> - {prod.description}</span></>
												</li>
											))}
										</ul>
									</div>
									)
								} */}
							</div>
							<div className="text-center border-r bg-white">
								<input
									autoComplete="off"
									type="text"
									name="description"
									value={data.description}
									
									className="w-full outline-0 text-center"
								/>
							</div>
							<div className="text-center border-r bg-white">
								<input
									autoComplete="off"
									type="text"
									name="orderQty"
									value={data.orderQty}
									
									
									className="w-full outline-0 text-center"
								/>
							</div>
							<div className="text-center border-r bg-white">
								<input
									autoComplete="off"
									type="text"
									name="uom"
									value={data.uom}
									
									
									className="w-full outline-0 text-center"
								/>
							</div>
							
						</div>
					))}
				</div>
                </form>
  )
}

export default DBOrderForm