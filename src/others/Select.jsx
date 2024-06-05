import { useState } from "react";
import ReactSelect from "react-select";
import ProductDescription from "../pages/ProductDescription";

const Select = () => {
	const [selectedOption, setSelectedOption] = useState(null);
	const [options] = useState(ProductDescription)
	const handleChange = (selectedOption) => {
		setSelectedOption(selectedOption);
		console.log(`Option selected:`, selectedOption);
	};
	const customStyle = {
		dropdownIndicator: (provided, state) => ({
			...provided,
			display: "none", // Hides the dropdown indicator (caret)
		}),
		indicatorSeparator: (provided, state) => ({
			...provided,
			display: "none", // Hides the separator next to the dropdown indicator
		}),
		menu: (provided, state) => ({
			...provided,
			marginLeft: "100%", // Adjust the left margin to push the menu to the right
            minWidth: "700px"
		}),
		menuList: (provided, state) => ({
			...provided,
			minWidth: "200px", // Adjust the width as needed
		}),
	};
	return (
		<>
			<ReactSelect
				className="w-72"
				value={selectedOption}
				styles={customStyle}
				onChange={handleChange}
				options={options.map((opt)=>(
                    {
                        value: opt.id,

                        label: <> <span>{opt.productCode}</span> {opt.description}</>

                    }
                ))}
			/>
		</>
	);
};

export default Select;
