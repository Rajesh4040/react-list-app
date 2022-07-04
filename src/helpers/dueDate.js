const dueDate=(date)=> {
	date = new Date(date);
	var now = new Date();
	var diff = date - now; // In milliseconds

	if (diff > -1000 * 60 * 60 * 24 && diff < 1000 * 60 * 60 * 24 * 31) {
		if (diff > 1000 * 60 * 60 * 24 * 21) return "In a month";
		if (diff > 1000 * 60 * 60 * 24 * 18) return "In 3 weeks";
		if (diff > 1000 * 60 * 60 * 24 * 10) return "In 2 weeks";
		if (diff > 1000 * 60 * 60 * 24 * 6) return "In a week";
		if (diff > 1000 * 60 * 60 * 24 * 1) {
			var dayDiff = Math.ceil(diff / 1000 / 60 / 60 / 24);
			return "In " + dayDiff + " days";
		}
		var tomorrow = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate() + 1
		);
		if (tomorrow.getDate() === date.getDate()) return "Tomorrow";
		if (now.getDate() === date.getDate()) return "within 24 hours";
	}
	return date.toLocaleDateString();
}
const isToday=(date)=> {
	date = new Date(date);
	var now = new Date();
	var diff = date - now;
	if (
		Math.abs(diff) <= 1000 * 60 * 60 * 24 &&
		now.getDate() === date.getDate()
	)
		return true;
	return false;
}
const dueDateCompare=(a, b)=> {
	if (a.dueDate < b.dueDate) {
		return -1;
	}
	if (a.dueDate > b.dueDate) {
		return 1;
	}
	return 0;
}
export { dueDate, isToday, dueDateCompare };
