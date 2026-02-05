const FormatNumber = (numberToFormat) => {
  let result = Math.floor(numberToFormat).toString()
  if (numberToFormat < 10) {
    result = (Math.floor(numberToFormat * 10) / 10).toString()
  }
  if (numberToFormat > 10000) {
    result =
      Math.floor(
        Math.pow(10, Math.log10(numberToFormat) - Math.floor(Math.log10(numberToFormat))) * 100,
      ) /
        100 +
      'e' +
      Math.floor(Math.log10(numberToFormat))
  }
  return result
}

const FormatTime = (timeInMs) => {
  let totalSeconds = Math.floor(timeInMs / 1000)
  let minutes = Math.floor(totalSeconds / 60)
  let seconds = String(totalSeconds % 60)
  let milliseconds = String(timeInMs % 1000)
  if (minutes > 0) {
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}:${
      milliseconds < 10
        ? '00' + milliseconds
        : milliseconds < 100
          ? '0' + milliseconds
          : milliseconds
    }`
  }
  return `${seconds}:${
    milliseconds < 10 ? '00' + milliseconds : milliseconds < 100 ? '0' + milliseconds : milliseconds
  }`
}

export {FormatNumber, FormatTime}