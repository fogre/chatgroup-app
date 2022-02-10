//Helpers for parsing date to correct form

/*parses date to message.parsedDate string form depending if the message date is:
  - Today
  - Yesterday
  - Earlier
*/
export const toMessageDateString = (messageISODateStr, dateNow = null, dateYesterday = null) => {
  const messageDate = new Date(messageISODateStr)
  const currentDate = dateNow || new Date()
  const yesterday = dateYesterday || new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() -1
  )
  const timeOptions = {
    hour: '2-digit',
    minute:'2-digit'
  }
  const fullDateOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    ...timeOptions
  }

  if (currentDate.toDateString() === messageDate.toDateString()) {
    return `Today at ${messageDate.toLocaleTimeString([], timeOptions)}`
  }

  if (yesterday.toDateString() === messageDate.toDateString()) {
    return `Yesterday at ${messageDate.toLocaleTimeString([], timeOptions)}`
  }
  
  return messageDate.toLocaleString([], fullDateOptions)
}

//loops through messages and parses the dates
export const parseMessagesByDate = messages => {
  const sortedMessages = []
  const dateNow = new Date()
  const dateYesterday = new Date(
    dateNow.getFullYear(),
    dateNow.getMonth(),
    dateNow.getDate() -1
  )

  for (const message of messages) {
    message.parsedDate = toMessageDateString(message.createdAt, dateNow, dateYesterday)
    sortedMessages.push(message)
  }

  return sortedMessages
}