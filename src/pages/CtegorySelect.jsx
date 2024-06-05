

const CategorySelect = (
	(
		{
			categories,
			value,
			onChange,
			onSelect,
			showList,
			filteredOptions,
			selectIndex,
			handleKeySelect,
		},
		ref
	) => {
		return (
			<div className="text-center border-r bg-white">
				<input
					autoComplete="off"
					type="text"
					name="category"
					value={value}
					onChange={onChange}
					onKeyDown={handleKeySelect}
					onFocus={() => setShowList(true)}
					ref={ref}
					className="w-full outline-0 text-center"
				/>
				{showList && (
					<div className="absolute bg-[#def1fc] w-48 top-5 right-0 text-left h-52">
						<h1 className="bg-[#2a67b1] text-white pl-2">List of Category</h1>
						<ul>
							{filteredOptions.map((cat, catIndex) => (
								<li
									tabIndex="0"
									key={catIndex}
									onClick={() => onSelect(cat)}
									className={`cursor-pointer ${
										selectIndex === catIndex ? "bg-[#ff9a00]" : ""
									} pl-1 text-[13px]`}
								>
									{cat}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		);
	}
);

export default CategorySelect;
