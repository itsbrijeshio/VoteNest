const getDay = (day: number, short: boolean = false) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day]?.slice(0, short ? 3 : undefined);
};

const getMonth = (month: number, short: boolean = false) => {
  const months = [
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
  return months[month]?.slice(0, short ? 3 : undefined);
};

const timeFormatter = (time: string) => {
  const coreDate = new Date();
  const date = new Date(time);

  if (coreDate.getDate() === date.getDate()) {
    return `Today, ${date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  if (coreDate.getDay() <= date.getDay() + 7) {
    return `${getDay(date.getDay())}, ${date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  if (coreDate.getMonth() === date.getMonth() + 1) {
    return `${getMonth(date.getMonth())} ${date.getDate()}`;
  }

  return `${getMonth(
    date.getMonth()
  )} ${date.getDate()}, ${date.getFullYear()}`;
};

export default timeFormatter;
