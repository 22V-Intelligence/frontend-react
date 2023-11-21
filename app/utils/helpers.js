export function formatDuration(milliseconds) {
	// Calculate hours, minutes, and seconds
	const hours = Math.floor(milliseconds / (1000 * 60 * 60));
	const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

	// Construct the formatted string
	let formattedDuration = '';

	if (hours > 0) {
		formattedDuration += `${hours}hr `;
	}

	if (minutes > 0 || (hours === 0 && seconds === 0)) {
		formattedDuration += `${minutes}min `;
	}

	if (seconds > 0 || (hours === 0 && minutes === 0)) {
		formattedDuration += `${seconds}sec`;
	}

	return formattedDuration.trim(); // Trim to remove trailing space
}
