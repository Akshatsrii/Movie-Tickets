const timeformat = (minutes) => {
    if (minutes < 60) {
        return `${minutes} min read`;
    }

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    const hourString = (hours === 1) ? 'hr' : 'hrs';
    const minString = (mins === 1) ? 'min' : 'mins';

    // Format minutes to be two digits (e.g., 05 instead of 5)
    const paddedMins = String(mins).padStart(2, '0');

    if (mins === 0) {
        return `${hours} ${hourString} read`;
    }

    return `${hours} ${hourString} ${paddedMins} ${minString} read`;
};

export default timeformat;