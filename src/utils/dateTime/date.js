const getDateFromTimestamp = (timestamp) => {
  return new Date(timestamp).toISOString().split("T")[0];
};

function getDateString(timestamp) {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let today = new Date(timestamp);

  if (today.toString() === "Invalid Date") {
    return "--,--,--";
  }

  let date;
  date =
    month[today.getMonth()] +
    " " +
    today.getDate() +
    "," +
    " " +
    today.getFullYear();

  return date;
}

function convertTo12hrs(time, language) {
  // Check correct time format and split into components
  if (!time) {
    return "--:--:--";
  }
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1);
    time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM

    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join("");
}

export { getDateFromTimestamp, getDateString, convertTo12hrs };
