import React, { useEffect, useRef, useState } from 'react';
import { listOfRegions } from '../../../services/MasterService';
import { Link, useNavigate } from 'react-router-dom';

const RegionFilter = () => {
    const [regionMasterId, setRegionMasterId] = useState('');
    const [region, setRegion] = useState([]);
    const [filteredRegions, setFilteredRegions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        inputRef.current.focus();

        listOfRegions()
            .then((response) => {
                setRegion(response.data);
                setFilteredRegions(response.data.slice(0, 20)); // Initially show only the first 15 regions
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        filterRegions();
    }, [regionMasterId]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const totalItems = region.length > 20 ? filteredRegions.length + 3 : filteredRegions.length + 2; // +2 for Create, Back, and +1 for dropdown if it exists

            if (e.key === 'ArrowDown') {
                setSelectedIndex(prevIndex => (prevIndex + 1) % totalItems);
                e.preventDefault();
            } else if (e.key === 'ArrowUp') {
                setSelectedIndex(prevIndex => (prevIndex - 1 + totalItems) % totalItems);
                e.preventDefault();
            } else if (e.key === 'Enter') {
                if (selectedIndex === 0) {
                    navigate('/region');
                    e.preventDefault();
                } else if (selectedIndex === 1) {
                    navigate('/display');
                    e.preventDefault();
                } else if (region.length > 20 && selectedIndex === filteredRegions.length + 2) {
                    dropdownRef.current.focus();
                } else if (filteredRegions[selectedIndex - 2]) {
                    navigate(`/displayRegion/${filteredRegions[selectedIndex - 2].regionMasterId}`);   // Navigate to the selected region
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [filteredRegions, selectedIndex, navigate, region.length]);

    const filterRegions = () => {
        let filtered = [];
        if (regionMasterId === "") {
            filtered = region.slice(0, 20); // Reset to show the first 15 regions
        } else {
            filtered = region.filter(reg => reg.regionMasterId.toLowerCase().includes(regionMasterId.toLowerCase()));
            filtered = filtered.slice(0, 20); // Limit to 15 elements
        }
        setFilteredRegions(filtered);
        setSelectedIndex(2); // Reset selected index to the first element in the filtered list
    };

    const handleDropdownChange = (e) => {
        const selectedRegionId = e.target.value;
        navigate(`/displayRegion/${selectedRegionId}`);
    };

    return (
        <>
    
    <div className='flex justify-evenly'>

        <div className='w-[90%] flex h-screen'>
            <div className='w-1/2 bg-white'>
                
            </div> 

            <div className='w-1/2 bg-slate-100 flex justify-center items-center flex-col'>

            <div className='w-[50%] h-16 flex flex-col justify-center items-center border border-black bg-white border-b-0 '>
                    <p className='text-[13px] font-semibold underline underline-offset-4 decoration-gray-400'>Region Display</p>
                    <input type="text" id='regionMasterId' name='regionMasterId' value={regionMasterId} onChange={(e) => setRegionMasterId(e.target.value)} ref={inputRef} className='w-[250px] ml-2 mt-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none' autoComplete='off' />
                </div>

                <div className='w-[350px] h-[85vh] border border-gray-600 bg-[#def1fc]'>
                    <h2 className='p-1 bg-[#2a67b1] text-white text-left text-[13px]'>List of Region</h2>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                            </tr>
                        </thead>
                        <div className='border border-b-gray-500 w-[347px]'>
                            <Link className={`block text-center text-[13px] ${selectedIndex === 0 ? 'bg-[#FEB941]' : ''}`} to={"/region"}><p className='ml-[285px] text-[13px]'>Create</p></Link>
                            <Link className={`block text-center text-[13px] ${selectedIndex === 1 ? 'bg-[#FEB941]' : ''}`} to={"/display"}><p className='ml-[270px] text-[13px] px-[30px]'>Back</p></Link>
                        </div>
                        <tbody>
                            {filteredRegions.map((reg, index) => (
                                <tr key={reg.regionMasterId} className={selectedIndex === index + 2 ? 'bg-[#FEB941]' : ''}>
                                    <td className='block text-left text-[12.5px] capitalize pl-2'>
                                        <Link to={`/displayRegion/${reg.regionMasterId}`} className='block'>{reg.regionMasterId} - {reg.regionName}</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {region.length > 20 && (
                        <div className='mt-2 bg-[#BBE9FF]'>
                            <label htmlFor="regionDropdown" className="block text-center text-[13px] mb-1"></label>
                            <select id="regionDropdown" ref={dropdownRef} className={`w-full border border-gray-600 bg-[#BBE9FF] p-1 text-[13px] focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none ${selectedIndex === filteredRegions.length + 2 }`} onChange={handleDropdownChange}>
                                <option value="" className='block text-left text-[13px]'>Select Other Regions</option>
                                {region.slice(20).map(reg => (
                                    <option key={reg.regionMasterId} value={reg.regionMasterId} className='block text-left text-[13px]'>
                                        {reg.regionMasterId} - {reg.regionName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </div>

        </div>

    </div>
    
    </>
    );
};

export default RegionFilter;
