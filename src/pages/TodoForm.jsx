import { useRef, useState } from "react";

const TodoForm = () => {
	const [items, setItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);
	const [newItem, setNewItem] = useState("");
	const [newItem1, setNewItem1] = useState("");
	const [isUlFocused, setIsUlFocused] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const listRef = useRef(null);
    const handleInputBlur = ()=>{
        setIsUlFocused(false)
    }
    const handleInputFocus = ()=>{
        setIsUlFocused(true)
    }
    const handleInputKeyDown = (e)=>{
        if(isUlFocused && (e.key === 'ArrowUp' || e.key === 'ArrowDown')){
            e.preventDefault();
            const lastIndex = items.length - 1;
            let newIndex;
            if(e.key === 'ArrowUp'){ 
                newIndex = selectedIndex > 0 ? selectedIndex - 1 : 0;
            } else {
                newIndex = selectedIndex < lastIndex -1 ? selectedIndex + 1: lastIndex;
            }
            setSelectedIndex(newIndex);
            listRef.current.childNodes[newIndex].focus();
        }
    }
	return (
		<>
			<div className="flex justify-around">
				<div>
					<input
						type="text"
                        readOnly
                        value={newItem}
						onFocus={handleInputFocus}
						onBlur={handleInputBlur}
						onKeyDown={handleInputKeyDown}
					/>
					<ul className="border p-4" ref={listRef} tabIndex="-1">
						{items.map((item, index) => (
							<li 
                                tabIndex="0"
								key={index}
								onClick={() => {
									setNewItem(item);
								}}
								className={`hover:bg-indigo-400 hover:text-white ${
									selectedIndex === index ? "bg-indigo-400 text-white" : ""
								}`}
							>
								{item}
							</li>
						))}
					</ul>
				</div>
				<div>
                <input
						type="text"
                        readOnly
                        value={newItem1}
						onFocus={handleInputFocus}
						onBlur={handleInputBlur}
						onKeyDown={handleInputKeyDown}
					/>
					<ul className="border p-4" ref={listRef} >
						{items.map((item, index) => (
							<li
								key={index}
								onClick={() => setNewItem1(item)}
								className="hover:bg-indigo-400 hover:text-white"
							>
								{item}
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default TodoForm;
