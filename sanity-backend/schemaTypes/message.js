export default {
    name: 'message',
    title: 'Message',
    type: 'document',
    fields: [
      {
        name: 'sender',
        title: 'Sender',
        type: 'reference',
        to: [{ type: 'user' }],
      },
      {
        name: 'recipient',
        title: 'Recipient',
        type: 'reference',
        to: [{ type: 'user' }],
      },
      {
        name: 'content',
        title: 'Content',
        type: 'text',
      },
      {
        name: 'timestamp',
        title: 'Timestamp',
        type: 'datetime',
        options: {
          dateFormat: 'YYYY-MM-DD',
          timeFormat: 'HH:mm',
          timeStep: 15,
          calendarTodayLabel: 'Today',
        },
      },
    ],
  };
  