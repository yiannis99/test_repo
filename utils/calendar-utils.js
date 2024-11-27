const isToday = (date) => {
	const today = new Date();
	return (
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()
	);
};

export const generateCalendar = (year, month) => {
	const days = [];
	const firstDayOfMonth = new Date(year, month, 1);
	const lastDayOfMonth = new Date(year, month + 1, 0);

	let startDay = firstDayOfMonth.getDay();
	startDay = startDay === 0 ? 6 : startDay - 1;

	if (startDay !== 0) {
		const prevMonthLastDay = new Date(year, month, 0).getDate();
		for (let i = startDay - 1; i >= 0; i--) {
			days.push({
				date: new Date(year, month - 1, prevMonthLastDay - i),
				isCurrentMonth: false,
			});
		}
	}

	for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
		const currentDate = new Date(year, month, day);
		days.push({
			date: currentDate,
			isCurrentMonth: true,
			isToday: isToday(currentDate),
		});
	}

	const remainingDays = 7 - (days.length % 7);
	if (remainingDays < 7) {
		for (let i = 1; i <= remainingDays; i++) {
			days.push({
				date: new Date(year, month + 1, i),
				isCurrentMonth: false,
			});
		}
	}

	return days;
};
