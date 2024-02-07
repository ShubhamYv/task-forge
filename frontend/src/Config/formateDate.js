export const formateDate = (input) => {
  let {
    $y: year,
    $M: month,
    $D: day,
    $H: hours,
    $m: minutes,
    $s: seconds,
    $ms: milliseconds,
  } = input;

  const date = new Date(year, month, day, hours, minutes, seconds, milliseconds);
  const formateDate = date.toISOString()
  return formateDate;
}