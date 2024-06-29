// import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
	const [activeIndex, setActiveIndex] = useState(0)
    
	
    const menuItem = [
        {Label:"Create", path:"create"},
        {Label:"Alter", path:"alter"},
        {Label:"Display", path:"display"},
        {Label:"Vouchers", path:"vouchers"},
        {Label:"Day Book", path:"daybook"},
        {Label:"Report 1", path:"report1"},
        {Label:"Report 2", path:"report2"}
    ]


    useEffect(()=>{

        const handleKeyDown =(event)=>{
            if(event.key === "ArrowUp" && activeIndex > 0){
                setActiveIndex((prev)=> prev - 1)
            } else if(event.key === "ArrowDown" && activeIndex < menuItem.length - 1){
                setActiveIndex((prev)=> prev + 1)
            } else if(event.key === "Enter"){
					navigate(menuItem[activeIndex].path)
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return ()=>{
            window.removeEventListener('keydown', handleKeyDown)
        }
    },[activeIndex])

	
	return (
		<>
			<div className="flex justify-evenly">
				<div className=" w-[90%] flex h-screen">
					{/* left side */}
					<div className=" w-1/2 bg-white"></div>

					{/* right side */}
					<div className=" w-1/2 bg-slate-100 flex justify-center items-center">
						<div className=" w-[300px] h-96 border border-blue-400 text-sm bg-[#def1fc]">
							<h2 className=" text-center text-bold text-white bg-[#2a67b1] px-4">
								Gtaeway of Imperio
							</h2>
							<div>
                            <h2 className=" py-3 ml-20 text-[10px] text-[#2a67b1]">
									MASTERS
								</h2>
								
                                <ul>
								{
                                    menuItem.slice(0,3).map((item, index) => (
                                        <Link to={item.path} key={item.path}>
									<li className={`w-full ${activeIndex === index ? "bg-yellow-500" : ""} pl-20 cursor-pointer`}>
										{item.Label}
									</li>
								</Link>
                                ))}
							</ul>
                            </div>
							<div>
								<h2 className=" py-3 ml-20 text-[10px] text-[#2a67b1]">
									TRANSACTIONS
								</h2>
								<ul>
                                {
                                    menuItem.slice(3,5).map((item, index) => (
                                        <Link to={item.path} key={item.path}>
									<li className={`w-full ${activeIndex === index + 3 ? "bg-yellow-500" : ""} pl-20 cursor-pointer`}>
										{item.Label}
									</li>
								</Link>
                                ))}
								</ul>
							</div>
							<div >
                            <h2 className=" py-3 ml-20 text-[10px] text-[#2a67b1]">
									DOMSS REPORT
								</h2>
								<ul>
                                {
                                    menuItem.slice(5).map((item, index) => (
                                        <Link to={item.path} key={item.path}>
									<li className={`w-full ${activeIndex === index + 5 ? "bg-yellow-500" : ""} pl-20 cursor-pointer`}>
										{item.Label}
									</li>
								</Link>
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

