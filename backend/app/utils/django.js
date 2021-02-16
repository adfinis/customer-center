import moment from 'moment';

export function parseDuration(duration) {
  let re = new RegExp(/^(-?\d+)?\s?(\d{2}):(\d{2}):(\d{2})(\.\d{6})?$/);

  let [, days, hours, minutes, seconds, microseconds] = duration
    .match(re)
    .map((m) => Number(m) || 0);

  return moment.duration({
    days,
    hours,
    minutes,
    seconds,
    milliseconds: microseconds * 1000,
  });
}
