import { useState, useRef, useEffect } from 'react';

const TodoForm = () => {
    const [voucherType, setVoucherType] = useState("Order Booking");
    const [distributorName, setDistributorName] = useState("");
    const [voucherNo, setVoucherNo] = useState("");
    const [vDate, setVDate] = useState("");
    const [distributorCode, setDistributorCode] = useState("");
    const [tableData, setTableData] = useState([
        {
            id: 1,
            "category": "",
            "code": "",
            "description": "",
            orderQty: "",
            uom: "",
            aprdQty: "",
            rate: ",
        discount: "",
            amount: "",
            gmaster: "",
        },
    ]);
    const [createdBy, setCreatedBy] = useState("");
    const [ctdDateTime, setCtdDateTime] = useState("");
    const [approvedBy, setApprovedBy] = useState("");
    const [appDateTime, setAppdDateTime] = useState("");
    const [narration, setNarration] = useState("");
    const [filter, setFilter] = useState('');
    const [filteredCategory, setFilteredCategory] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const inputRefs = useRef({});
    const listRefs = useRef([]);
    const tableRefs = useRef([]);

    const "category" = [
        "Cream",
        "Hair Cream",
        "Body Splash",
        "Perfume",
        "Jelly",
        "Lotion",
        "Powder",
        "Luxury Perfume",
        "Soap",
    ];

    useEffect(() => {
        const filteredItems = "category".filter(item => item.toLowerCase().includes(filter.toLowerCase()));
        setFilteredCategory(filteredItems);
        setSelectedIndex(0); // Reset selection on filter change
    }, [filter, "category"]);

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowDown') {
            setSelectedIndex((prevIndex) => 
                prevIndex < filteredCategory.length ? prevIndex + 1 : 0
            );
        } else if (event.key === 'ArrowUp') {
            setSelectedIndex((prevIndex) => 
                prevIndex > 0 ? prevIndex - 1 : filteredCategory.length
            );
        } else if (event.key === 'Enter' && filteredCategory[selectedIndex] === "End of List") {
            inputRefs.current['createdBy'].focus();
        }
    };

    useEffect(() => {
        if (selectedIndex >= 0 && listRefs.current[selectedIndex]) {
            listRefs.current[selectedIndex].scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    }, [selectedIndex]);

    const handleTableChange = (id, field, value) => {
        setTableData(prevData => 
            prevData.map(row => 
                row.id === id ? { ...row, [field]: value } : row
            )
        );
    };

    const handleKeyPress = (e, rowIndex, colIndex, isTable) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            e.preventDefault();

            if (isTable) {
                const nextField = rowIndex * 10 + colIndex + 1;
                if (
                    nextField < tableRefs.current.length &&
                    tableRefs.current[nextField]
                ) {
                    tableRefs.current[nextField].focus();
                } else {
                    if (rowIndex === tableData.length - 1) addRow();
                    else {
                        tableRefs.current[(rowIndex + 1) * 10].focus();
                    }
                }
            } else {
                const fieldIndex = rowIndex + 1;
                if (fieldIndex < Object.keys(inputRefs.current).length) {
                    inputRefs.current[Object.keys(inputRefs.current)[fieldIndex]].focus();
                } else {
                    tableRefs.current[0]?.focus();
                }
            }
        }
    };

    const handleBackKey = (event, field, index) => {
        if (event.key === 'Backspace' && event.target.selectionStart === 0) {
            const fields = Object.keys(inputRefs.current);
            const currentIndex = fields.indexOf(field);

            if (currentIndex > 0) {
                const previousField = fields[currentIndex - 1];
                inputRefs.current[previousField].focus();
            } else if (index > 0) {
                const previousRow = tableData[index - 1];
                const previousRowFields = Object.keys(previousRow);
                const previousField = previousRowFields[previousRowFields.length - 1];
                tableRefs.current[`${previousField}-${index - 1}`].focus();
            }
        }
    };

    const addRow = () => {
        const newRow = {
            id: tableData.length + 1,
            "category": "",
            "code": "",
            "description": "",
            orderQty: "",
            uom: "",
            aprdQty: "",
            rate: ",
        discount: "",
            amount: "",
            gmaster: "",
        };
        setTableData([...tableData, newRow]);
    };

    const displayList = filteredCategory.length > 0 ? ["End of List", ...filteredCategory] : filteredCategory;

    return (
        <div>
            <div>
                <label>Voucher Type:</label>
                <input 
                    type="text" 
                    value={voucherType} 
                    onChange={(e) => setVoucherType(e.target.value)}
                    ref={el => inputRefs.current['voucherType'] = el}
                    onKeyDown={(e) => {
                        handleBackKey(e, 'voucherType');
                        handleKeyPress(e, 0, 0, false);
                    }}
                />
                <label>Distributor Name:</label>
                <input 
                    type="text" 
                    value={distributorName} 
                    onChange={(e) => setDistributorName(e.target.value)}
                    ref={el => inputRefs.current['distributorName'] = el}
                    onKeyDown={(e) => {
                        handleBackKey(e, 'distributorName');
                        handleKeyPress(e, 1, 0, false);
                    }}
                />
                <label>Voucher No:</label>
                <input 
                    type="text" 
                    value={voucherNo} 
                    onChange={(e) => setVoucherNo(e.target.value)}
                    ref={el => inputRefs.current['voucherNo'] = el}
                    onKeyDown={(e) => {
                        handleBackKey(e, 'voucherNo');
                        handleKeyPress(e, 2, 0, false);
                    }}
                />
                <label>Date:</label>
                <input 
                    type="text" 
                    value={vDate} 
                    onChange={(e) => setVDate(e.target.value)}
                    ref={el => inputRefs.current['vDate'] = el}
                    onKeyDown={(e) => {
                        handleBackKey(e, 'vDate');
                        handleKeyPress(e, 3, 0, false);
                    }}
                />
                <label>Distributor Code:</label>
                <input 
                    type="text" 
                    value={distributorCode} 
                    onChange={(e) => setDistributorCode(e.target.value)}
                    ref={el => inputRefs.current['distributorCode'] = el}
                    onKeyDown={(e) => {
                        handleBackKey(e, 'distributorCode');
                        handleKeyPress(e, 4, 0, false);
                    }}
                />
            </div>

            <div>
                <ul onKeyDown={handleKeyDown} tabIndex={0}>
                    <input 
                        type="text" 
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)} 
                        placeholder="Filter items..." 
                    />
                    {displayList.map((item, index) => (
                        <li
                            key={index}
                            ref={(el) => (listRefs.current[index] = el)}
                            style={{
                                backgroundColor: index === selectedIndex ? 'lightgray' : 'white',
                                padding: '5px',
                                cursor: 'pointer'
                            }}
                            tabIndex={-1}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Order Qty</th>
                        <th>UOM</th>
                        <th>Aprd Qty</th>
                        <th>Rate</th>
                        <th>Discount</th>
                        <th>Amount</th>
                        <th>Gmaster</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, rowIndex) => (
                        <tr key={row.id}>
                            <td>
                                <input
                                    type="text"
                                    value={row."category"}
                                    onChange={(e) => handleTableChange(row.id, '"category"', e.target.value)}
                                    ref={el => tableRefs.current[`"category"-${rowIndex}`] = el}
                                    onKeyDown={(e) => {
                                        handleBackKey(e, `"category"-${rowIndex}`, rowIndex);
                                        handleKeyPress(e, rowIndex, 0, true);
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row."code"}
                                    onChange={(e) => handleTableChange(row.id, '"code"', e.target.value)}
                                    ref={el => tableRefs.current[`"code"-${rowIndex}`] = el}
                                    onKeyDown={(e) => {
                                        handleBackKey(e, `"code"-${rowIndex}`, rowIndex);
                                        handleKeyPress(e, rowIndex, 1, true);
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row."description"}
                                    onChange={(e) => handleTableChange(row.id, '"description"', e.target.value)}
                                    ref={el => tableRefs.current[`"description"-${rowIndex}`] = el}
                                    onKeyDown={(e) => {
                                        handleBackKey(e, `"description"-${rowIndex}`, rowIndex);
                                        handleKeyPress(e, rowIndex, 2, true);
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.orderQty}
                                    onChange={(e) => handleTableChange(row.id, 'orderQty', e.target.value)}
                                    ref={el => tableRefs.current[`orderQty-${rowIndex}`] = el}
                                    onKeyDown={(e) => {
                                        handleBackKey(e, `orderQty-${rowIndex}`, rowIndex);
                                        handleKeyPress(e, rowIndex, 3, true);
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.uom}
                                    onChange={(e) => handleTableChange(row.id, 'uom', e.target.value)}
                                    ref={el => tableRefs.current[`uom-${rowIndex}`] = el}
                                    onKeyDown={(e) => {
                                        handleBackKey(e, `uom-${rowIndex}`, rowIndex);
                                        handleKeyPress(e, rowIndex, 4, true);
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.aprdQty}
                                    onChange={(e) => handleTableChange(row.id, 'aprdQty', e.target.value)}
                                    ref={el => tableRefs.current[`aprdQty-${rowIndex}`] = el}
                                    onKeyDown={(e) => {
                                        handleBackKey(e, `aprdQty-${rowIndex}`, rowIndex);
                                        handleKeyPress(e, rowIndex, 5, true);
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.rate}
                                    onChange={(e) => handleTableChange(row.id, 'rate', e.target.value)}
                                    ref={el => tableRefs.current[`rate-${rowIndex}`] = el}
                                    onKeyDown={(e) => {
                                        handleBackKey(e, `rate-${rowIndex}`, rowIndex);
                                        handleKeyPress(e, rowIndex, 6, true);
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.discount}
                                    onChange={(e) => handleTableChange(row.id, 'discount', e.target.value)}
                                    ref={el => tableRefs.current[`discount-${rowIndex}`] = el}
                                    onKeyDown={(e) => {
                                        handleBackKey(e, `discount-${rowIndex}`, rowIndex);
                                        handleKeyPress(e, rowIndex, 7, true);
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.amount}
                                    onChange={(e) => handleTableChange(row.id, 'amount', e.target.value)}
                                    ref={el => tableRefs.current[`amount-${rowIndex}`] = el}
                                    onKeyDown={(e) => {
                                        handleBackKey(e, `amount-${rowIndex}`, rowIndex);
                                        handleKeyPress(e, rowIndex, 8, true);
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.gmaster}
                                    onChange={(e) => handleTableChange(row.id, 'gmaster', e.target.value)}
                                    ref={el => tableRefs.current[`gmaster-${rowIndex}`] = el}
                                    onKeyDown={(e) => {
                                        handleBackKey(e, `gmaster-${rowIndex}`, rowIndex);
                                        handleKeyPress(e, rowIndex, 9, true);
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <label>Created By:</label>
                <input
                    type="text"
                    value={createdBy}
                    onChange={(e) => setCreatedBy(e.target.value)}
                    ref={el => inputRefs.current['createdBy'] = el}
                    onKeyDown={(e) => {
                        handleBackKey(e, 'createdBy');
                        handleKeyPress(e, 0, 0, false);
                    }}
                />
                <label>Creation DateTime:</label>
                <input
                    type="text"
                    value={ctdDateTime}
                    onChange={(e) => setCtdDateTime(e.target.value)}
                    ref={el => inputRefs.current['ctdDateTime'] = el}
                    onKeyDown={(e) => {
                        handleBackKey(e, 'ctdDateTime');
                        handleKeyPress(e, 0, 0, false);
                    }}
                />
                <label>Approved By:</label>
                <input
                    type="text"
                    value={approvedBy}
                    onChange={(e) => setApprovedBy(e.target.value)}
                    ref={el => inputRefs.current['approvedBy'] = el}
                    onKeyDown={(e) => {
                        handleBackKey(e, 'approvedBy');
                        handleKeyPress(e, 0, 0, false);
                    }}
                />
                <label>Approval DateTime:</label>
                <input
                    type="text"
                    value={appDateTime}
                    onChange={(e) => setAppdDateTime(e.target.value)}
                    ref={el => inputRefs.current['appDateTime'] = el}
                    onKeyDown={(e) => {
                        handleBackKey(e, 'appDateTime');
                        handleKeyPress(e, 0, 0, false);
                    }}
                />
                <label>Narration:</label>
                <input
                    type="text"
                    value={narration}
                    onChange={(e) => setNarration(e.target.value)}
                    ref={el => inputRefs.current['narration'] = el}
                    onKeyDown={(e) => {
                        handleBackKey(e, 'narration');
                        handleKeyPress(e, 0, 0, false);
                    }}
                />
            </div>
        </div>
    );
};

export default TodoForm;
