// The code in this file was purely made as a way to record demo videos
// without accessing Firebase as the number of read operations got exceeded
// To save time, ChatGPT generated a lot of these JSON objects for the dummy data
// and these object were then later edited to match the current implemented schema.

export const getAllContent = async () => {
    const contentData = {
        "contentId": "cont12345",
        "avgRating": 7.3,
        "title": "Inception",
        "director": "Christopher Nolan",
        "releaseYear": 2010,
        "genre": "Science Fiction",
        "type": "movie",
        "synopsis": "A skilled thief uses dream-sharing technology to perform corporate espionage but faces challenges as his own subconscious complicates the mission.",
        "photoUrl": "https://filmfisher.com/wp-content/uploads/2014/03/inception_ver12_xlg-600x885.jpg"
      };

      return contentData;

};

export const getRecommendedContent = async () => {
    const contentData = [
        {
            "contentId": "cont12345",
            "avgRating": 7.3,
            "title": "Inception",
            "director": "Christopher Nolan",
            "releaseYear": 2010,
            "genre": "Science Fiction",
            "type": "movie",
            "synopsis": "A skilled thief uses dream-sharing technology to perform corporate espionage but faces challenges as his own subconscious complicates the mission.",
            "photoUrl": "https://filmfisher.com/wp-content/uploads/2014/03/inception_ver12_xlg-600x885.jpg"
        },
        {
          "contentId": "cont67890",
          "avgRating": 8.0,
          "title": "It",
          "director": "Andy Muschietti",
          "releaseYear": 2017,
          "genre": "Horror",
          "type": "movie",
          "synopsis": "In the summer of 1989, a group of bullied kids band together to destroy a shape-shifting monster, which disguises itself as a clown and preys on the children of Derry, their small Maine town.",
          "photoUrl": "https://m.media-amazon.com/images/M/MV5BZGZmOTZjNzUtOTE4OS00OGM3LWJiNGEtZjk4Yzg2M2Q1YzYxXkEyXkFqcGc@._V1_SX300.jpg"
        },
        {
          "contentId": "cont13579",
          "avgRating": 9.0,
          "title": "The Office",
          "director": "Greg Daniels",
          "releaseYear": 2005,
          "genre": "Comedy",
          "type": "tv_show",
          "synopsis": "A mockumentary-style sitcom that follows the lives of employees working at the Dunder Mifflin Paper Company in Scranton, Pennsylvania.",
          "photoUrl": "https://upload.wikimedia.org/wikipedia/en/2/24/TheOfficeUSSeason3Cover.jpg"
        }
      ];
      
      return contentData;

};

export const getAllUsers = async() => {

    const users = [
        {
          "userId": "u1000",
          "username": "user1",
          "firstName": "john",
          "lastName": "doe",
          "email": "user1@example.com",
          "passwordHash": "bac03d7c69146d3714e15230952a99fc2c40e19716c1e2a9b62e4e4453fdb12d", //StrongPassword1
          "salt": "e492aa0955614bdec1b6b7c4d1ec47fd"
        },
        {
          "userId": "u1001",
          "username": "user2",
          "firstName": "jon",
          "lastName": "doe",
          "email": "user2@example.com",
          "passwordHash": "571885aaa57aa7129570b727543b02822ab8ccf248806eb67802df84d704731f", //MySecretPass2
          "salt": "4479813d4f151c7c6e08c73874ddf78a"
        },
        {
          "userId": "u1002",
          "username": "user3",
          "firstName": "alex",
          "lastName": "doe",
          "email": "user3@example.com",
          "passwordHash": "a90a5f6bc90217abf02282dcc1d0641b1f06e3786394ffb3cbe1da39a6a21372", //UltraSecureKey3
          "salt": "e5a70c37c4c2d7d8ce3191b0f7e0e650"
        }
      ];

      return users;

};

export const getUserLists = async (userId) => {
    const mockLists = [
      {
        listId: "list101",
        userId: userId,
        name: "My Favorite Movies",
        description: "A collection of my all-time favorite movies.",
        createdAt: "2024-12-01T10:15:00Z",
        content: [
          { contentId: "cont12345", addedAt: "2024-12-01T11:00:00Z" },
          { contentId: "cont67890", addedAt: "2024-12-01T12:00:00Z" },
        ],
        images: [
          {
            imageUrl: "https://example.com/my-favorites-thumbnail.jpg",
            type: "thumbnail",
            uploadedAt: "2024-12-01T09:30:00Z",
          },
        ],
      },
    ];
    return mockLists;
  };
  
  export const getSimilarMoviesByGenre = async (genre, limit = 5) => {
    const mockMovies = [
      {
        contentId: "cont67890",
        title: "Interstellar",
        director: "Christopher Nolan",
        releaseYear: 2014,
        genre: genre,
        type: "movie",
        synopsis: "Explorers venture through a wormhole in space in an attempt to ensure humanity's survival.",
        images: [
          {
            imageUrl: "https://example.com/interstellar-thumbnail.jpg",
            type: "thumbnail",
            uploadedAt: "2024-12-01T13:45:00Z",
          },
        ],
      },
    ];
    return mockMovies.slice(0, limit);
  };
  
  export const getUserDetails = async (userId) => {
    const mockUsers = {
      u1000: {
        userId: "u1000",
        username: "user1",
        email: "user1@example.com",
      },
      u1001: {
        userId: "u1001",
        username: "user2",
        email: "user2@example.com",
      },
    };
    return mockUsers[userId] || null;
  };
  
  export const getTitleDetails = async (titleId) => {
    const mockTitles = {
      cont12345: {
        contentId: "cont12345",
        title: "Inception",
        director: "Christopher Nolan",
        releaseYear: 2010,
        genre: "Science Fiction",
        type: "movie",
        synopsis: "A skilled thief uses dream-sharing technology to perform corporate espionage.",
        images: [
          {
            imageUrl: "https://filmfisher.com/wp-content/uploads/2014/03/inception_ver12_xlg-600x885.jpg",
            type: "thumbnail",
            uploadedAt: "2024-12-01T14:23:00Z",
          },
        ],
      },
    };
    return mockTitles[titleId] || null;
  };
  
  export const getAllLists = async () => {
    const mockAllLists = [
      {
        listId: "list101",
        userId: "u1000",
        name: "Favorite Movies",
        description: "My all-time favorite movies",
        createdAt: "2024-12-01T10:15:00Z",
        content: [
          { contentId: "cont12345", addedAt: "2024-12-01T11:00:00Z" },
        ],
        images: [],
      },
      {
        listId: "list102",
        userId: "u1001",
        name: "Sci-Fi Collection",
        description: "Top sci-fi movies and shows",
        createdAt: "2024-12-02T09:30:00Z",
        content: [
          { contentId: "cont67890", addedAt: "2024-12-02T10:00:00Z" },
        ],
        images: [],
      },
    ];
    return mockAllLists;
  };
  
  export const getMyLists = async (userId) => {
    const mockLists = [
      {
        listId: "list101",
        userId: userId,
        name: "My Favorite Movies",
        description: "A collection of my all-time favorite movies.",
        createdAt: "2024-12-01T10:15:00Z",
        content: [
          { contentId: "cont12345", addedAt: "2024-12-01T11:00:00Z" },
        ],
        movieImage: "https://filmfisher.com/wp-content/uploads/2014/03/inception_ver12_xlg-600x885.jpg"
      },
    ];
    return mockLists.filter((list) => list.userId === userId);
  };  