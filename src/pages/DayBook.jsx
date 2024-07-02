import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { HiChevronLeft, HiXMark } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
const DayBook = () => {
	const navigate = useNavigate();
	const listRefs = useRef([]);
	const [selectIndex, setSelectIndex] = useState(0);
	const [orders, setOrders] = useState([]);
	console.log(orders)
	useEffect(() => {
		const handleKeyDown = (ev) => {
			if (ev.key === "Escape") {
				navigate("/");
			} 
				else if (ev.key === "ArrowUp" && selectIndex > 0) {
					setSelectIndex((prev) => prev - 1);
				} else if (ev.key === "ArrowDown" && selectIndex < orders.length - 1) {
					setSelectIndex((prev) => prev + 1);
				} else if (ev.key === "Enter") {
					navigate(`/alterOrder/${orders[selectIndex].orderId}`);
					
				} 
			
		};

		
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [selectIndex, orders, navigate]);

	useEffect(()=>{
		loadOrder()
	},[])
	const loadOrder = async()=>{
		const response = await axios.get("http://localhost:8080/orders/getAllOrders")
		setOrders(response.data);
		console.log(response.data)
	}

	return (
		<>
			<div className="flex justify-evenly">
				<div className=" w-[95%] flex flex-col h-screen">
					<div className="bg-[#88bee6] w-full h-4 flex justify-between">
						<h1 className="text-[11px] pl-2 font-semibold">Day Book</h1>
						<HiXMark
							className="text-[12px] text-base cursor-pointer"
							onClick={() => navigate("/")}
						/>
					</div>
					<div className="flex justify-between items-center  w-full h-[50px] text-[13px] font-semibold px-2  border-b">
						<h1>Day Book</h1>
						<div className="text-right">27-06-2024</div>
					</div>
					<div className="w-full ">
						<table className="">
							<thead className=" text-[13px] border border-slate-300 font-semibold sticky top-0">
								<tr className="border border-collapse border-slate-300 h-7 ">
									<td className=" text-center w-24 font-normal">Date</td>
									<td className=" w-32 font-normal">Dist Code</td>
									<td className=" w-[550px] ">Particulars</td>
									<td className=" w-52 font-normal">Voucher Type</td>
									<td className=" w-52 font-normal">Voucher No.</td>
									<td className=" w-40">Amount</td>
								</tr>
							</thead>
							<tbody className="">
								<tr className="h-[17px] leading-3 "></tr>
								{orders.map((item, index) => (
									<tr
										className={`h-[17px] leading-3 ${
											index === selectIndex ? "bg-amber-300" : ""
										}`}
										ref={(el) => (listRefs.current[index] = el)}
										key={index}
									>
										<td className=" text-[13px] pl-2 w-24">{item.voucherDate} </td>
										<td className=" text-[13px] w-24 font-semibold">{item.distributorCode}</td>
										<td className=" text-[13px] w-[510px] font-semibold">
											{item.distributorName}
										</td>
										<td className=" text-[13px] w-52 font-semibold">{item.voucherType}</td>
										<td className=" text-[13px] w-52">{item.voucherNo}</td>
										<td className=" text-[13px] w-40 font-semibold">{item.amount}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<div className="h-screen w-[11%] bg-[#def1fc] border border-blue-300">
					<nav>
						<ul className="">
							<li className="text-[13px] h-6 pl-0.5 bg-white shadow w-[93%] mx-auto my-1 flex justify-between items-center">
								<Link className="w-full">
									<strong className="mr-0.5 text-[#55a7d8]">F2:</strong>Date
								</Link>
								<div className="border-l border-black h-full my-auto">
									<HiChevronLeft className=" h-full my-auto" />
								</div>
							</li>
							<li className="text-[13px] h-6 pl-0.5 bg-white shadow w-[93%] mx-auto my-1 flex justify-between items-center">
								<Link className="w-full">
									<strong className="mr-0.5 text-[#55a7d8]">F3:</strong>Period
								</Link>
								<div className="border-l border-black h-full my-auto">
									<HiChevronLeft className=" h-full my-auto" />
								</div>
							</li>
							<li className="text-[13px] h-6 pl-0.5 bg-white shadow w-[93%] mx-auto my-1 flex justify-between items-center">
								<Link to={""} className="w-full">
									<strong className="mr-0.5 text-[#55a7d8]">F4:</strong>
									Voucher Type
								</Link>
								<div className="border-l border-black h-full my-auto">
									<HiChevronLeft className=" h-full my-auto" />
								</div>
							</li>
							<li className="text-[13px] h-6 pl-0.5 bg-white shadow w-[93%] mx-auto my-1 flex justify-between items-center">
								<Link to={""} className="w-full">
									<strong className="mr-0.5 text-[#55a7d8]">F5:</strong>
									Apply Filter
								</Link>
								<div className="border-l border-black h-full my-auto">
									<HiChevronLeft className=" h-full my-auto" />
								</div>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</>
	);
};

export default DayBook;
