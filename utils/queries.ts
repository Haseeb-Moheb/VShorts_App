export const allPostsQuery = () => {
  const query = `*[_type == "post"] | order(_createdAt desc){
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
      postedBy->{
        _id,
        userName,
        image
      },
    likes,
    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

  return query;
};

export const postDetailQuery = (postId: string | string[]) => {
  const query = `*[_type == "post" && _id == '${postId}']{
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
     likes,
    comments[]{
      comment,
      _key,
      postedBy->{
        _ref,
      _id,
    },
    }
  }`;
  return query;
};

export const searchPostsQuery = (searchTerm: string | string[]) => {
  const query = `*[_type == "post" && caption match '${searchTerm}*' || topic match '${searchTerm}*'] {
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
likes,
    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;
  return query;
};

export const singleUserQuery = (userId: string | string[]) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const allUsersQuery = () => {
  const query = `*[_type == "user"]`;
  return query;
};

export const userCreatedPostsQuery = (userId: string | string[]) => {
  const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
 likes,

    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

  return query;
};

export const userLikedPostsQuery = (userId: string | string[]) => {
  const query = `*[_type == 'post' && '${userId}' in likes[]._ref ] | order(_createdAt desc) {
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
 likes,

    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

  return query;
};

export const topicPostsQuery = (topic: string | string[]) => {
  const query = `*[_type == "post" && topic match '${topic}*'] {
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
 likes,

    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

  return query;
};

// New queries for follow functionality
export const checkFollowQuery = (followerId: string, followingId: string) => {
  const query = `*[_type == "follow" && followerId._ref == '${followerId}' && followingId._ref == '${followingId}'][0]`;
  return query;
};

export const userFollowingQuery = (userId: string | string[]) => {
  const query = `*[_type == "follow" && followerId._ref == '${userId}']{
    followingId->{
      _id,
      userName,
      image
    }
  }`;
  return query;
};

export const userFollowersQuery = (userId: string | string[]) => {
  const query = `*[_type == "follow" && followingId._ref == '${userId}']{
    followerId->{
      _id,
      userName,
      image
    }
  }`;
  return query;
};
