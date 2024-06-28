// import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<>
			<div className='flex justify-evenly'>
            <div className=" w-[90%] flex h-screen">

                {/* left side */}
                <div className=" w-1/2 bg-white">

                </div>

                {/* right side */}
                <div className=" w-1/2 bg-slate-100 flex justify-center items-center">
                    <div className=" w-[300px] h-96 border border-blue-400 text-sm bg-[#def1fc]">
                        <h2 className=" text-center text-bold text-white bg-[#2a67b1] px-4">Gtaeway of Imperio</h2>
                        <ul>
                            <li className=" py-3 ml-20 text-[10px] text-[#2a67b1]"><h2 >MASTERS</h2></li>
                            <Link to={"create"} ><li className="w-full hover:bg-yellow-500 pl-20 cursor-pointer">Create</li></Link>
                            <Link  to={"alter"}><li className="w-full hover:bg-yellow-500 text-left pl-20 p-0">Alter</li></Link>
                            <Link to={"display"} ><li className="w-full hover:bg-yellow-500 pl-20 cursor-pointer">Display</li></Link>
                            
                        </ul>   
                        <div >
                            <h2 className=" py-3 ml-20 text-[10px] text-[#2a67b1]">TRANSACTIONS</h2>
                            <ul>

                            <Link to={"vouchers"} ><li className="w-full hover:bg-yellow-500 pl-20 cursor-pointer">Vouchers</li></Link>
                            <Link to={"daybook"} ><li className="w-full hover:bg-yellow-500 pl-20 cursor-pointer">Day Book</li></Link>

                            </ul>
                        </div>
                        {/* <div >
                            <h2 className=" py-5 ml-20 text-xs text-blue-400">REPORTS</h2>
                            <button className="w-full hover:bg-yellow-500 text-left pl-20 p-0">Balance Sheet</button>
                            <button className="w-full hover:bg-yellow-500 text-left pl-20 p-0">Profit & Loss A/c</button>
                            <button className="w-full hover:bg-yellow-500 text-left pl-20 mb-6">Stock Summary</button>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className='h-screen w-[10%] bg-[#def1fc] border border-blue-400'>
                
            </div>
            </div>
		</>
	);
};

export default Home;
