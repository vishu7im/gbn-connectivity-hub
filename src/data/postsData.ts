
export interface Post {
  id: number;
  userId: number;
  userName: string;
  content: string;
  image?: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: number;
  userId: number;
  userName: string;
  content: string;
  createdAt: string;
}

export const postsData: Post[] = [
  {
    id: 1,
    userId: 1,
    userName: "Rajiv Kumar",
    content: "Just got promoted to Senior Software Engineer at TCS! Thank you to all my professors at GBN Polytechnic who prepared me so well for the industry.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    createdAt: "2023-05-15T14:30:00",
    likes: 24,
    comments: [
      {
        id: 1,
        userId: 2,
        userName: "Priya Singh",
        content: "Congratulations! Well deserved!",
        createdAt: "2023-05-15T15:45:00"
      },
      {
        id: 2,
        userId: 3,
        userName: "Amit Sharma",
        content: "Amazing achievement! So proud of you.",
        createdAt: "2023-05-15T16:20:00"
      }
    ]
  },
  {
    id: 2,
    userId: 2,
    userName: "Priya Singh",
    content: "Looking for recommendations for good electrical engineering books for beginners. Any suggestions from fellow alumni?",
    createdAt: "2023-05-10T09:15:00",
    likes: 7,
    comments: [
      {
        id: 3,
        userId: 5,
        userName: "Vikram Patel",
        content: "I'd recommend 'Practical Electronics for Inventors' by Paul Scherz. It was very helpful for me when I was starting out.",
        createdAt: "2023-05-10T10:30:00"
      }
    ]
  },
  {
    id: 3,
    userId: 6,
    userName: "Sunita Mishra",
    content: "Hosting a tech meetup for GBN alumni next month in Bangalore. DM me if you're interested in attending or speaking!",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    createdAt: "2023-05-05T18:45:00",
    likes: 42,
    comments: [
      {
        id: 4,
        userId: 1,
        userName: "Rajiv Kumar",
        content: "Sounds great! I'd love to attend.",
        createdAt: "2023-05-05T19:20:00"
      },
      {
        id: 5,
        userId: 11,
        userName: "Rahul Verma",
        content: "I can do a short presentation on the latest in data science if you're interested.",
        createdAt: "2023-05-06T10:15:00"
      }
    ]
  }
];
