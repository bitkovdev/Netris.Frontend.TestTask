export const TimestampToTimeCode = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  return (
    date.getUTCMinutes() +
    ":" +
    date.getUTCSeconds() +
    ":" +
    date.getUTCMilliseconds()
  )
}
