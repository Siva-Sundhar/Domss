
import { useEffect } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { Link, Outlet, useLocation, useNavigate} from "react-router-dom";

const Voucher = () => {
    const history = useNavigate()
	const location = useLocation();
	
    useEffect(() => {
			const handleKey = (event) => {
				if (event.key === "Escape") {
					history("/");
				}
			};
			window.addEventListener("keydown", handleKey);
			return () => {
				window.removeEventListener("keydown", handleKey);
			};
		}, [history]);
    
    
    const isActive = (path) =>
		location.pathname === path ||
		(path === "/vouchers/purchase" && location.pathname === "/vouchers");

	return (
		<>
			<div className="flex justify-evenly" >
				<div className=" w-[95%] flex h-screen">
					<Outlet />
				</div>
				<div className="h-screen w-[11%] bg-[#def1fc] border border-blue-300">
					<nav>
						<ul className="">
							<li className="text-[12px] h-6 pl-0.5 bg-white shadow w-[93%] mx-auto my-1 flex justify-between items-center">
								<Link>
									<strong className="mr-0.5 text-[#55a7d8]">F2:</strong>Date
								</Link>
								<div className="border-l border-black h-full my-auto">
									<HiChevronLeft className=" h-full my-auto" />
								</div>
							</li>
							<li className="text-[12px] h-6 pl-0.5 bg-white shadow w-[93%] mx-auto my-1 flex justify-between items-center">
								<Link
									to={"/vouchers/sales"}
									className={`
										${isActive("/vouchers/sales")
											? "text-gray-400 pointer-events-none"
											: ""
									} w-full`}
								>
									<strong
										className={`mr-0.5 ${
											isActive("/vouchers/sales")
												? "text-gray-400"
												: "text-[#55a7d8]"
										}`}
									>
										F8:
									</strong>
									Sale Order
								</Link>
								<div className="border-l border-black h-full my-auto">
									<HiChevronLeft className=" h-full my-auto" />
								</div>
							</li>
							<li className="text-[12px] h-6 pl-0.5 bg-white shadow w-[93%] mx-auto my-1 flex justify-between items-center">
								<Link
									to={"/vouchers/purchase"}
									className={`
										${isActive("/vouchers/purchase")
											? "text-gray-400 pointer-events-none"
											: ""
									} w-full`}
								>
									<strong
										className={`mr-0.5 ${
											isActive("/vouchers/purchase")
												? "text-gray-400"
												: "text-[#55a7d8]"
										}`}
									>
										F9:
									</strong>
									Purchase Order
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

export default Voucher;
