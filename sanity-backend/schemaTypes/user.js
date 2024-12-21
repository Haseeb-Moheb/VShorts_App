export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      {
        name: 'userName',
        title: 'UserName',
        type: 'string',
      },
      {
        name: 'image',
        title: 'Image',
        type: 'string',
      },
      { 
        name: 'totalLikes', 
        type: 'number', 
        title: 'Total Likes', 
        initialValue: 0,
      },
    ],
  };
  