export default {
    name: 'follow',
    type: 'document',
    title: 'Follow',
    fields: [
      { title: 'Follower', name: 'followerId', type: 'reference', to: [{type: 'user'}] },
      { title: 'Following', name: 'followingId', type: 'reference', to: [{type: 'user'}] },
    ],
  };
  