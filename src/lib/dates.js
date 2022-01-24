const getDateTimeParts = () => {
  const nowISODate = new Date().toISOString()

  return {
    date: nowISODate.slice(0, 10),
    time: nowISODate.slice(11, 19)
  }
}

module.exports = {
  getDateTimeParts
}
