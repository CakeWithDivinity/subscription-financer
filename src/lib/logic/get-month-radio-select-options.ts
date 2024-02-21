export function getMonthRadioSelectOptions(): { name: string; value: number }[] {
	const currentMonth = wrapMonth(new Date().getMonth() + 1);

	return [
		{ name: 'monthRadioSelect.previous', value: wrapMonth(currentMonth - 1) },
		{ name: 'monthRadioSelect.current', value: currentMonth },
		{ name: 'monthRadioSelect.next', value: wrapMonth(currentMonth + 1) }
	];
}

function wrapMonth(month: number) {
	if (month < 0) {
		return 0 + Math.abs(month);
	}

	if (month > 12) {
		return month - 12;
	}

	return month;
}
