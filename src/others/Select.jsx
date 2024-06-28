// // import { useState } from "react";
// // import ReactSelect from "react-select";
// // import ProductDescription from "../pages/ProductDescription";

// // const Select = () => {
// // 	const [selectedOption, setSelectedOption] = useState(null);
// // 	const [options] = useState(ProductDescription);
// // 	const handleChange = (selectedOption) => {
// // 		setSelectedOption(selectedOption);
// // 		console.log(`Option selected:`, selectedOption);
// // 	};
// // 	const customStyle = {
// //         control: (styles) => ({ ...styles, boxShadow:"none",
// //         ':focus':{
// //             boxShadow:"none",
// //             outline:"none"
// //         }
// //         }),
// //         input:(styles)=>({
// //             ...styles,
// //             padding:"10px",
// //             boxShadow:"none",
// //             ':focus':{
// //                 boxShadow:"none",
// //                 outline:"none",
// //                 border:'none',

// //             }
// //         }),
// //         option: (styles, { isFocused }) => {
// //             return {
// //                 ...styles,
// //                 backgroundColor: isFocused ? "#f0f0f0" : "#fff",
// //                 color: isFocused ? "#333" : "#333",
// //                 cursor: "pointer",
// //                 ':active':{
// //                     backgroundColor:"#f0f0f0",
// //                     color:"#333"
// //                     }
// //                     };
// //                     },



// // 	};
// // 	return (
// // 		<>
// // 			<ReactSelect
// // 				className="w-72 "
// // 				value={selectedOption}
// // 				styles={customStyle}
// // 				onChange={handleChange}
// // 				placeholder=""
// //                 isSearchable={false}
// // 				options={options.map((opt) => ({
// // 					value: opt.id,

// // 					label: (
// // 						<>
// // 							{" "}
// // 							<span>{opt.productCode}</span> {opt.description}
// // 						</>
// // 					),
// // 				}))}
// // 			/>
// // 		</>
// // 	);
// // };

// // export default Select;






//     const [selectIndexCat, setSelectIndexCat] = useState(0);
// 	const [selectIndexProd, setSelectIndexProd] = useState(0);
//     const [selectIndex, setSelectIndex] = useState(-1);

//     const handleKeySelect = (e, index, options,property) => {
		
//     if(selectIndex < options.length){
//         if (e.key === "ArrowUp" && selectIndex > 0) {
//             if(property === 'category'){
//                 setSelectIndexCat(prev => prev - 1)
//             } else {
//                 setSelectIndexProd(prev => prev - 1)
//             }
//         } else if (e.key === "ArrowDown" && selectIndex < options.length - 1) {
//             if(property === 'category'){
//                 setSelectIndexCat(prev => prev + 1)
//                 setSelectIndex(prev => prev + 1)
//                 } else {
                    
//                     setSelectIndex(prev => prev + 1)
//                     }
//         } else if (e.key === "Enter" && selectIndex >= 0) {
//             e.preventDefault()
//             handleSelect(property, options[selectIndex], index)
//             setTimeout(()=>{
//                 inputRefs.current[index * 10 + (property === 'category' ? 1 : 2)].focus()
//             },0)
//             setSelectIndex(0)
//         } else if(e.key === 'Tab') {
//             e.preventDefault();
//         }
//     } 
// };+


