// import React from "react";

const FormField = (
	({ label, name, value, onChange, onKeyDown }, ref) => {
		return (
			<div className="text-center border-r bg-white">
				<input
					type="text"
					name={name}
					value={value}
					onChange={onChange}
					onKeyDown={onKeyDown}
					ref={ref}
					className="w-full outline-0 text-center"
				/>
			</div>
		);
	}
);

export default FormField;
