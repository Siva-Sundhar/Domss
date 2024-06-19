import{useState, useEffect, useRef} from "react";

const TodoForm = () => {

    const [category] = useState([
        "Cream",
        "Hair Cream",
        "Body Splash",
        "Perfume",
        "Jelly",
        "Lotion",
        "Powder",
        "Luxury Perfume",
        "Soap",
    ]);
    const [filter, setFilter] = useState('');
    const [filteredCategory, setFilteredCategory] = useState(category);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const listRef = useRef([]);

    useEffect(() => {
        setFilteredCategory(
            category.filter(item => item.toLowerCase().includes(filter.toLowerCase()))
        );
        setSelectedIndex(0); // Reset selection on filter change
    }, [filter, category]);

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowDown') {
            setSelectedIndex((prevIndex) => 
                prevIndex < filteredCategory.length ? prevIndex + 1 : 0
            );
        } else if (event.key === 'ArrowUp') {
            setSelectedIndex((prevIndex) => 
                prevIndex > 0 ? prevIndex - 1 : filteredCategory.length
            );
        }
    };
    const handleKeySelect = (e, item)=>{
        if(e.key === 'Enter'){
            setFilter(item)
        }
    }
    useEffect(() => {
        listRef.current[selectedIndex]?.focus();
    }, [selectedIndex]);

    const displayList = ["End of List", ...filteredCategory];
	return (
    <>
<div onKeyDown={handleKeyDown} tabIndex={0}>
            <input 
                type="text" 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)} 
                placeholder="Filter items..." 
            />
            <ul>
                {displayList.map((item, index) => (
                    <li
                        key={index}
                        ref={(el) => (listRef.current[index] = el)}
                        style={{
                            backgroundColor: index === selectedIndex ? 'lightgray' : 'white',
                            padding: '5px',
                            cursor: 'pointer'
                        }}
                        onKeyDown={(e)=>handleKeySelect(e,item)}
                        tabIndex={-1}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    
    </>
    )
};

export default TodoForm;
