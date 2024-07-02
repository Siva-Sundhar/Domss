// import React from "react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	const [activeIndex, setActiveIndex] = useState(
		parseInt(localStorage.getItem("activeIndex")) || 0
	);

	const menuItem = [
		{ Label: "Create", path: "create", highlightChar: "c" },
		{ Label: "Alter", path: "alter", highlightChar: "a" },
		{ Label: "Display", path: "display", highlightChar: "d" },
		{ Label: "Vouchers", path: "vouchers", highlightChar: "v" },
		{ Label: "Day BooK", path: "daybook", highlightChar: "k" },
		{ Label: "RePort For Accountry", path: "report", highlightChar: "p" },
		{ Label: "Report With Items", path: "reportItems", highlightChar: "w" },
	];

	useEffect(() => {
		window.addEventListener("beforeunload", () => {
			localStorage.clear();
		});
	}, []);

	useEffect(() => {
		localStorage.setItem("activeIndex", activeIndex);
	}, [activeIndex]);

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "ArrowUp" && activeIndex > 0) {
				setActiveIndex((prev) => prev - 1);
			} else if (
				event.key === "ArrowDown" &&
				activeIndex < menuItem.length - 1
			) {
				setActiveIndex((prev) => prev + 1);
			} else if (event.key === "Enter") {
				navigate(menuItem[activeIndex].path);
			} else if (/^[cC]$/.test(event.key)) {
				
				navigate("create");
			} else if (/^[aA]$/.test(event.key)) {
				navigate("alter");
			} else if (/^[dD]$/.test(event.key)) {
				navigate("display");
			} else if (/^[vV]$/.test(event.key)) {
				navigate("vouchers");
			} else if (/^[kK]$/.test(event.key)) {
				navigate("daybook");
			} else if (/^[wW]$/.test(event.key)){
				navigate("reportItems");
			} else if (/^[pP]$/.test(event.key)){
				navigate("report");
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [activeIndex, navigate]);

	return (
		<>
			<div className="flex justify-evenly">
				<div className=" w-[90%] flex h-screen">
					{/* left side */}
					<div className=" w-1/2 bg-gradient-to-t to-blue-500 from-[#ccc]"></div>

					{/* right side */}
					<div className=" w-1/2 bg-slate-100 flex justify-center items-center">
						<div className=" w-[300px] h-96 border border-blue-400 text-sm bg-[#def]">
							<h2 className=" text-center text-bold text-white bg-[#2a67b1] px-4">
								Gtaeway of Imperio
							</h2>
							<div>
								<h2 className=" py-3 ml-20 text-[10px] text-[#2a67b1]">
									MASTERS
								</h2>

								<ul>
									{menuItem.slice(0, 3).map((item, index) => (
										<li
											key={item.path}
											className={`${
												activeIndex === index ? "bg-yellow-500 text-black" : ""
											}  cursor-pointer w-full text-[13px] text-black h-[17px]`}
										>
											<Link
												to={item.path}
												className="w-full flex items-center pl-20"
											>
												{item.Label.split("").map((char, idx) => (
													<React.Fragment key={idx}>
														{char !== " " ? (
															<span
																className={` ${
																	char.toLowerCase() === item.highlightChar
																		? activeIndex === index
																			? "text-black font-bold"
																			: "text-[#2a67b1] font-bold"
																		: "text-black"
																} `}
															>
																{char}
															</span>
														) : (
															<span>&nbsp;</span>
														)}
													</React.Fragment>
												))}
												{/* <strong className={` ${activeIndex === index ? "text-black" : "text-[#2a67b1]"} font-bold`}>{item.Label[0]}</strong>{item.Label.slice(1)} */}
											</Link>
										</li>
									))}
								</ul>
							</div>
							<div>
								<h2 className=" py-3 ml-20 text-[10px] text-[#2a67b1]">
									TRANSACTIONS
								</h2>
								<ul>
									{menuItem.slice(3, 5).map((item, index) => (
										<li
											key={item.path}
											className={`${
												activeIndex === index + 3 ? "bg-yellow-500" : ""
											}  cursor-pointer w-full text-[13px] h-[17px] `}
										>
											<Link
												to={item.path}
												className="w-full flex items-center pl-20"
											>
												{item.Label.split("").map((char, idx) => (
													<React.Fragment key={idx}>
														{char !== " " ? (
															<span
																className={` ${
																	char.toLowerCase() === item.highlightChar
																		? activeIndex === index +  3
																			? "text-black font-bold"
																			: "text-[#2a67b1] font-bold"
																		: "text-black"
																} `}
															>
																{char}
															</span>
														) : (
															<span>&nbsp;</span>
														)}
													</React.Fragment>
												))}
											</Link>
										</li>
									))}
								</ul>
							</div>
							<div>
								<h2 className=" py-3 ml-20 text-[10px] text-[#2a67b1]">
									DOMSS REPORT
								</h2>
								<ul>
									{menuItem.slice(5).map((item, index) => (
										<li
											key={item.path}
											className={`${
												activeIndex === index + 5 ? "bg-yellow-500" : ""
											}  cursor-pointer w-full text-[13px] h-[18px] `}
										>
											<Link
												to={item.path}
												className="w-full flex items-center pl-20"
											>
												{item.Label.split("").map((char, idx) => (
													<React.Fragment key={idx}>
														{char !== " " ? (
															<span
																className={` ${
																	char.toLowerCase() === item.highlightChar
																		? activeIndex === index + 5
																			? "text-black font-bold"
																			: "text-[#2a67b1] font-bold"
																		: "text-black"
																} `}
															>
																{char}
															</span>
														) : (
															<span>&nbsp;</span>
														)}
													</React.Fragment>
												))}
												
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="h-screen w-[10%] bg-[#def1fc] border border-blue-400"></div>
			</div>
		</>
	);
};

export default Home;
