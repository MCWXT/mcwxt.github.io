import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "dayjs/locale/en";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function day(time, lang = "en") {
	dayjs.locale(lang);
	const target = dayjs(time);
	const now = dayjs();
	const diffDay = now.diff(target, "day");
	let displayText;
	if (diffDay <= 28) {
		displayText = "on " + target.fromNow();
	} else {
		displayText = target.format("MMM DD, YYYY");
	}
	const tooltipText = target.format("MMMM DD, YYYY");
	return { displayText, tooltipText };
}
