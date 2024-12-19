export default {
    name: 'like',
    title: 'Like',
    type: 'document',
    fields: [
      {
        name: 'user',
        title: 'User',
        type: 'reference',
        to: [{ type: 'user' }],
      },
      {
        name: 'post',
        title: 'Post',
        type: 'reference',
        to: [{ type: 'post' }],
      },
      {
        name: 'createdAt',
        title: 'Created At',
        type: 'datetime',
        options: {
          dateFormat: 'YYYY-MM-DD',
          timeFormat: 'HH:mm',
          calendarTodayLabel: 'Today',
        },
      },
    ],
  };
  