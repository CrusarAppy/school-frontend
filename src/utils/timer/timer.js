import { getNepaliNumber } from "../nepaliInput/nepaliNumerization";

function timer(timestamp, language) {
  var adbs = require("ad-bs-converter");

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
  if (language === "en") {
    date =
      month[today.getMonth()] +
      " " +
      today.getDate() +
      "," +
      " " +
      today.getFullYear();
  } else {
    var nepDate = adbs.ad2bs(
      today.toISOString().split("T")[0].replaceAll("-", "/")
    );
    date =
      nepDate.ne.strMonth +
      " " +
      getNepaliNumber(nepDate.ne.day) +
      "," +
      " " +
      getNepaliNumber(nepDate.ne.year);
  }

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
    time = time.slice(1); // Remove full string match value
    if (language === "en") {
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
    } else {
      time[5] = +time[0] < 12 ? " बिहान" : " बेलुका"; // Set AM/PM
    }
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  if (language === "en") {
    return time.join("");
  } else {
    return getNepaliNumber(time.join(""));
  }
}

export { timer, convertTo12hrs };
