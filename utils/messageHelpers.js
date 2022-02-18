//Helpers for message and especially in parsing date to presentable form.

//options for toLocale(Time)String
const timeOptions = {
  hour: '2-digit',
  minute:'2-digit'
}
const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}
const dateTimeOptions = {
  ...dateOptions,
  ...timeOptions
}

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

  if (currentDate.toDateString() === messageDate.toDateString()) {
    return `Today at ${messageDate.toLocaleTimeString([], timeOptions)}`
  }

  if (yesterday.toDateString() === messageDate.toDateString()) {
    return `Yesterday at ${messageDate.toLocaleTimeString([], timeOptions)}`
  }
  
  return messageDate.toLocaleString([], dateTimeOptions)
}

/*
  Parses a single array list of messages into an array
  of messages by sent date: [{ dateStr, messages }].
  Also adds the message.parsedDate to each message.
  Used to show the messages in the MessageList UI.
*/
export const messagesToArrayByDate = messages => {
  const sortedMessages = []
  const dateNow = new Date()
  const dateYesterday = new Date(
    dateNow.getFullYear(),
    dateNow.getMonth(),
    dateNow.getDate() -1
  )

  for (const message of messages) {
    const messageDate = new Date(message.createdAt)
    const messageDateStr = messageDate.toLocaleString([], dateOptions)
    const index = sortedMessages.findIndex(i => i.dateStr === messageDateStr)

    message.parsedDate = toMessageDateString(message.createdAt, dateNow, dateYesterday)
    
    if (index > -1) {
      sortedMessages[index].messages.push(message)
    } else {
      const newItem = {
        dateStr: messageDateStr,
        messages: []
      }
      newItem.messages.push(message)
      sortedMessages.push(newItem)
    }
  }

  return sortedMessages
}

/*
  Parses message arrays by date back into a single array list:[message]
  Used to update members and if the date changes
*/
export const messagesToSingleArray = messageArrayByDate => {
  const newMessages = []

  messageArrayByDate.forEach(mList => {
    mList.messages.forEach(m => {
      newMessages.push(m)
    })
  })
  return newMessages
}

export const checkIfDayChaged = (mostRecentDate, newDate) => {
  const dateFromString1 = new Date(mostRecentDate)
  const dateFromString2 = new Date(newDate)
  const d1 = new Date(
    dateFromString1.getFullYear(),
    dateFromString1.getMonth(),
    dateFromString1.getDate()
  )
  const d2 = new Date(
    dateFromString2.getFullYear(),
    dateFromString2.getMonth(),
    dateFromString2.getDate()
  )

  return d2 - d1
}