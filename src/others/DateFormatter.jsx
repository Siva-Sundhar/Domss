// import React from 'react'

const DateFormatter = () => {
	const convertDateFormat = (dateString) => {
		const formattedDate = dateString.replace(/[./]/g, "-");

		const parts = formattedDate.split("-");
		const date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);

		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");

		return `${year}-${month}-${day}`;
	};

	const convertDateTime = (dateTimeString) => {
		// Replace "." or "/" to "-" date part
		const formattedDateTime = dateTimeString.replace(/[./]/g, "-");

		// Split date and time parts
		const [datePart, timePart] = formattedDateTime.split(" ");
		const [day, month, year] = datePart.split("-");
		const [time, period] = timePart.split(" ");

		let [hours, minutes] = time.split(":");
		hours = parseInt(hours, 10);
		minutes = parseInt(minutes, 10);

		if (period === "PM" && hours < 12) {
			hours += 12;
		} else if (period === "AM" && hours === 12) {
			hours = 0;
		}

		//  Return formatted date and time dd-mm-yyy hh:mm AM/PM
		return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${String(
			hours
		).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
	};
	return (
		<>
			<div className="flex leading-4 mb-1 w-[400px] ">
				<label htmlFor="" className="w-[40%]">
					Created Date & Time
				</label>
				<span className="w-[2%]">:</span>
				<input
					autoComplete="off"
					name="ctdDateTime"
					// onChange={(e) => setCtdDateTime(e.target.value)}
					// value={ctdDateTime}
					// ref={(el) => (inputRefs.current[5] = el)}
					// onKeyDown={(e) => handleKeyPress(e, 5, null, false)}
					type="text"
					placeholder="DD-MM-YYYY HH:mm "
					className="w-44 border border-fuchsia-700 h-[18px] focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
				/>
			</div>

            <div className="flex leading-4 mb-1 w-[400px]">
								<label htmlFor="" className="w-[40%]">
									Approved Date & Time
								</label>
								<span className=" w-[2%]">:</span>
								<input
									autoComplete="off"
									name="appDateTime"
									// onChange={(e) => setAppdDateTime(e.target.value)}
									// value={appDateTime}
									// ref={(el) => (inputRefs.current[7] = el)}
									// onKeyDown={(e) => handleKeyPress(e, 7, null, false)}
									type="text"
									placeholder="DD-MM-YYYY HH:mm "
									className=" w-44 border border-fuchsia-700 h-[18px] focus:bg-[#fee8af] focus:border-blue-500 text-[13px] pl-0.5 bg-transparent outline-0 font-semibold"
								/>
							</div>
		</>
	);
};

export default DateFormatter;
