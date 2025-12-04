export function isoDateConvert(dateString: Date) {
  const date = new Date(dateString);

  const day = date.getDate();
  
  const month = date.toLocaleString("en-US", { month: "long" });

  const year = date.getFullYear();

  const time = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: 'short'
  });

  return `${day} ${month} ${year}, ${time}`;
}
