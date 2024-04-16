// get current time function for chat and return {date, time}

import { Time } from "@/constants/types/chat/message";

function getTime(): Time {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    // keep 3 as 03
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const time = `${hours}:${minutesStr}`;
    const dateStr = `${day}/${month}/${year}`;
    return { date: dateStr, time };
}
export default getTime;