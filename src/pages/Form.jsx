// import React from 'react'
import { useEffect, useRef, useState } from "react";
import ProductDescription from './ProductDescription';
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
	const [color,setColor] = useState('#EFEFEF')
	const [voucherType, setVoucherType] = useState()
	const [productData] = useState(ProductDescription)
	const [prodFilter, setProdFilter] = useState([])
	const [showProdList, setShowProdList] = useState(false);
	const [showList, setShowList] = useState(false);
	const [filteredOption, setFilteredOption] = useState(category);
	const [selectIndexCat, setSelectIndexCat] = useState(0);
	const [selectIndexProd, setSelectIndexProd] = useState(0);
	const [selectIndex, setSelectIndex] = useState(-1);


	const inputRefs = useRef([])
	const listRefs = useRef([])
	


	
	useEffect(() => {
        if (selectIndex >= 0 && listRefs.current[selectIndex]) {
            listRefs.current[selectIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    }, [selectIndex]);
	const handleFilter = (item) =>{
		const filteredData = productData.filter((prod)=>(
			prod.category.toLowerCase() === item.toLowerCase()
		))
		
		setProdFilter(filteredData)
	}
	const handleSelect = (property, item, index) => {
		const newTableData = [...tableData]; 
		if(property === 'category'){
			newTableData[index][property] = item;
			handleFilter(item)
			setTableData(newTableData);
			setShowList(false)
			setShowProdList(true)
			inputRefs.current[index * 10 + 1].focus()

		} else {
			
			const option = item;
			newTableData[index].code = option.productCode;
			newTableData[index].description = option.description;
			newTableData[index].rate = parseFloat(option.rate).toFixed(2);
			newTableData[index].discount = parseFloat(option.discount).toFixed(2);
			setTableData(newTableData);
			setShowProdList(false)
			inputRefs.current[index * 10 + 2].focus()	
		}


	};
	
	const handleTotal = (e, index) => {
		const {value}  = e.target;
		if(value){
			const total = parseFloat(value * tableData[index].rate).toFixed(2);
			const discount = parseFloat((total * tableData[index].discount) / 100).toFixed(2);
			const price = parseFloat(total - discount).toFixed(2);
			tableData[index].amount = price;
			setTableData([...tableData]);
		}
	};
	
	const handleKeySelect = (e, index, options,property) => {
		
		if(selectIndex < options.length){
			if (e.key === "ArrowUp" && selectIndex > 0) {
				if (property === 'category') {
                    setSelectIndexCat(prev => prev - 1);
                    setSelectIndex(prev => prev - 1);
                } else {
                    setSelectIndexProd(prev => prev - 1);
                    setSelectIndex(prev => prev - 1);
				}
			} else if (e.key === "ArrowDown" && selectIndex < options.length - 1) {
				if (property === 'category') {
                    setSelectIndexCat(prev => prev + 1);
                    setSelectIndex(prev => prev + 1);
                } else {
                    setSelectIndexProd(prev => prev + 1);
                    setSelectIndex(prev => prev + 1);
                }
			} else if (e.key === "Enter" && selectIndexCat >= 0) {
				e.preventDefault()
				handleSelect(property, options[selectIndex], index)
				setTimeout(()=>{
					inputRefs.current[index * 10 + (property === 'category' ? 1 : 2)].focus()
				},0)
				
			} else if(e.key === 'Tab') {
				e.preventDefault();
			}
		} else {
			setSelectIndex(0)
		}
	};
	const handleFocus = (property)=>{
		if(property === 'category'){
			setSelectIndex(selectIndexCat)
			setShowList(true)
		} else {
			setSelectIndex(selectIndexProd)
			setShowProdList(true)
		}
	}
	
	const handleChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...tableData];
			list[index][name] = value;
		setTableData(list);
		if (name === 'category') {
			const filteredList = category.filter((item) =>
				item.toLowerCase().includes(e.target.value.toLowerCase())
			);
				setFilteredOption(filteredList);
		}
		if(name === 'code' && list[index].category){
			
			const filteredList = productData.filter((item) => 
				item.productCode.toLowerCase().includes(e.target.value.toLowerCase()) &&
				item.category === list[index].category
			);
			setProdFilter(filteredList);
		}
	};
	const handleBlur = (e, index)=>{
		const { name, value } = e.target;
		const list = [...tableData];
		if(name === 'orderQty' || name === 'aprdQty'){
			if(!isNaN(value) && value !== ''){	
				list[index][name] = parseFloat(value).toFixed(2);
			}
		}
		setTableData(list)
	}
	const handleKeyPress = (e, rowIndex, colIndex) => {

        if (e.key === "Enter" ) {
            e.preventDefault();
            const nextField = rowIndex * 10 + colIndex + 1;
            if (nextField < inputRefs.current.length && inputRefs.current[nextField]) {
                inputRefs.current[nextField].focus();
            } else {
                addRow();
            }
        }
    };
	const handleVoucher = (e)=>{
		const { value } = e.target;
		if(value === 'Purchase'){
			setColor("#DFF5FF")
			

		} else if(value === 'Purchase Return'){
			setColor("#E0FBE2")
			

		} else {
			setColor("#EFEFEF")
		}
		setVoucherType(value);
		
	}
	
	const addRow = ()=>{
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
				status:"",
			}
		]);
		setTimeout(()=>{
			const newRowIndex = tableData.length;
			inputRefs.current[ newRowIndex * 10].focus();
			setFilteredOption(category)

		},0)
	}
	const handleSubmit = (e) => {
        e.preventDefault();

        // Check if any row has all fields empty
        // const isEmptyRow = (item) => 
        //     !item.category.trim() && 
        //     !item.code.trim() && 
        //     !item.description.trim() && 
        //     !item.orderQty.trim() && 
        //     !item.aprdQty.trim() && 
        //     !item.rate.toString().trim() && 
        //     !item.discount.toString().trim() && 
        //     !item.amount.toString().trim() && 
        //     !item.status.trim();

        // // Filter out completely empty rows
        // const nonEmptyRows = tableData.filter(item => !isEmptyRow(item));

        // // Check if any non-empty row has empty fields
        // const hasEmptyFields = nonEmptyRows.some(item => 
        //     !item.category.trim() || 
        //     !item.code.trim() || 
        //     !item.description.trim() || 
        //     !item.orderQty.trim() || 
        //     !item.aprdQty.trim() || 
        //     !item.rate.toString().trim() || 
        //     !item.discount.toString().trim() || 
        //     !item.amount.toString().trim() || 
        //     !item.status.trim()
        // );

        // if (hasEmptyFields) {
        //     const userConfirmed = window.confirm("There are empty fields. Do you want to submit the form anyway?");
        //     if (!userConfirmed) {
        //         alert('Please fill out all fields before submitting.');
        //         return;
        //     }
        // }

        // const data = nonEmptyRows.map((item) => ({
        //     category: item.category,
        //     code: item.code,
        //     description: item.description,
        //     orderQty: item.orderQty,
        //     aprdQty: item.aprdQty,
        //     rate: item.rate,
        //     discount: item.discount,
        //     amount: item.amount,
        //     status: item.status
        // }));

        // console.log(data);
        //  setError(''); // Clear any previous error messages
        // setTableData(nonEmptyRows); // Update the state to remove any completely empty rows
    };
	return (
		<>
			<form action="" style={{background:color}} className=" h-screen px-0.5" onSubmit={handleSubmit}>
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
								onChange={handleVoucher}
								value={voucherType}
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
				<div className="h-[77vh] overflow-y-scroll border relative ">
					<div
						className="h-[22px] border bg-[#F9F3CC] grid grid-cols-11 text-[13px] font-semibold"
						style={{
							gridTemplateColumns:
							"60px 120px 100px 400px 80px 50px 96px 87px 60px 100px 200px",
						}}
					>
						<div className=" text-center border-r ">S.No</div>
						<div className=" text-center border-r ">Product Category</div>
						<div className=" text-center border-r ">Product Code</div>
						<div className=" text-center border-r ">Product Description</div>
						<div className=" text-center border-r ">Order Qty</div>
						<div className=" text-center border-r ">Uom</div>
						<div className=" text-center border-r ">Aprd Qty</div>
						<div className=" text-center border-r ">Rate</div>
						<div className=" text-center border-r ">Disct %</div>
						<div className=" text-center border-r ">Amount</div>
						<div className=" text-center ">Godown Master</div>
					</div>
					{tableData.map((data, index) => (
						<div
							key={data.id}
							className="border-t-0 border grid grid-cols-11 text-[13px]"
							style={{
								gridTemplateColumns:
								"60px 120px 100px 400px 80px 50px 96px 87px 60px 100px 200px",
							}}
						>
							<div className="text-center border-r bg-white">{index + 1}</div>
							<div className="text-center border-r bg-white">
								<input
									autoComplete="off"
									type="text"
									name="category"
									value={data.category}
									onChange={(e) => handleChange(e, index)}
									onKeyDown={(e)=>handleKeySelect(e, index, filteredOption,'category')}
									onFocus={()=>handleFocus('category')}
									onBlur={()=>setShowList(false)}
									ref={(el) => inputRefs.current[index * 10 + 0] = el}
									className="w-full outline-0 text-center"
								/>
								{showList && (
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
								)}
							</div>
							<div className="text-center border-r bg-white">
								<input
									autoComplete="off"
									type="text"
									name="code"
									value={data.code}
									onChange={(e) => handleChange(e, index)}
									onFocus={()=>handleFocus('code')}
									onBlur={()=>setShowProdList(false)}
									onKeyDown={(e) => handleKeySelect(e, index, prodFilter, 'code')}
									ref={(el) => inputRefs.current[index * 10 + 1] = el}
									className="w-full outline-0 text-center"
								/>{
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
								}
							</div>
							<div className="text-center border-r bg-white">
								<input
									autoComplete="off"
									type="text"
									name="description"
									value={data.description}
									onChange={(e) => handleChange(e, index)}
									className="w-full outline-0 text-center"
								/>
							</div>
							<div className="text-center border-r bg-white">
								<input
									autoComplete="off"
									type="text"
									name="orderQty"
									value={data.orderQty}
									
									onChange={(e) => handleChange(e, index)}
									onBlur={(e)=>handleBlur(e, index)}
									onKeyDown={(e) => handleKeyPress(e, index, 2)}
									ref={(el) => inputRefs.current[index * 10 + 2] = el}
									className="w-full outline-0 text-center"
								/>
							</div>
							<div className="text-center border-r bg-white">
								<input
									autoComplete="off"
									type="text"
									name="uom"
									value={data.uom}
									
									onChange={(e) => handleChange(e, index)}
									onBlur={(e)=>handleBlur(e, index)}
									onKeyDown={(e) => handleKeyPress(e, index, 3)}
									ref={(el) => inputRefs.current[index * 10 + 3] = el}
									className="w-full outline-0 text-center"
								/>
							</div>
							<div className="text-center border-r bg-white">
								<input
									autoComplete="off"
									type="text"
									name="aprdQty"
									step="0.01"
									value={data.aprdQty}
									onChange={(e) => handleChange(e, index)}
									onKeyDown={(e) => handleKeyPress(e, index, 4)}
									onBlur={(e)=>{handleTotal(e,index); handleBlur(e, index)}}
									ref={(el) => inputRefs.current[index * 10 + 4] = el}
									className="w-full outline-0 text-center"
								/>
							</div>
							<div className="text-center border-r bg-white">
								<input
									autoComplete="off"
									type="text"
									name="rate"
									value={data.rate}
									onChange={(e) => handleChange(e, index)}
									
									className="w-full outline-0 text-center"
								/>
								
							</div>
							<div className="flex border-r bg-white">
								<input
									autoComplete="off"	
									type="text"
									name="discount"
									value={data.discount ? `${data.discount}%`:("")}
									onChange={(e) => handleChange(e, index)}
									className="w-full outline-0 text-center"
								/>
							</div>
							<div className="text-center border-r bg-white">
								<input
									autoComplete="off"
									type="text"
									name="amount"
									value={data.amount ?Intl.NumberFormat('en-US',{
										style: 'currency',
										currency: 'USD',
										minimumFractionDigits: 2,
										}).format(data.amount) : ""}
						
									onChange={(e) => handleChange(e, index)}
									className="w-full outline-0 text-right pr-1"
								/>
							</div>
							<div className="">
								<input
									autoCapitalize="on"
									autoComplete="off"
									type="text"
									name="gmaster"
									value={data.gmaster}
									onChange={(e) => handleChange(e, index)}
									onKeyDown={(e) => handleKeyPress(e, index, 5)}
									ref={(el) => inputRefs.current[index * 10 + 5] = el}
									className="w-full outline-0 m-0 text-center"
								/>
							</div>
						</div>
					))}
				</div>

				<div className=" px-1 flex justify-between text-[14px] mt-5">
					<div className="w-[300px]">
						<div className="flex leading-4 mb-1">
							<label htmlFor="" className="w-2/5">
								Created By
							</label>
							<span className="mr-0.5">:</span>
							<input
								type="text"
								className="w-3/5 border border-fuchsia-700 h-[18px] focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
							/>
						</div>
						<div className="flex leading-4">
							<label htmlFor="" className="w-2/5">
								Approved By
							</label>
							<span className="mr-0.5">:</span>
							<input
								type="text"
								className="w-3/5 border border-fuchsia-700 h-[18px] focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
							/>
						</div>
					</div>
					<div className="w-[600px]">
						<div className="flex leading-4 mb-1">
							<label htmlFor="" className="w-1/5">
								Narration
							</label>
							<span className="mr-0.5">:</span>
							<textarea
								rows={2}
								
								type=""
								className="w-4/5 border border-fuchsia-700 h-[36px] focus:bg-[#fee8af] resize-none focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
							/>
						</div>
						
					</div>
					
				</div>
			</form>
		</>
	);
};

export default Form;