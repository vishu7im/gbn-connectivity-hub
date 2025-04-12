
// Mock data for admin panel

export interface DashboardStatsType {
  totalUsers: number;
  pendingUsers: number;
  rejectedUsers: number;
  activeUsers: number;
  totalPosts: number;
  totalJobs: number;
  totalGalleryImages: number;
  totalEvents: number;
  totalNews: number;
  dailyVisits: { date: string; count: number }[];
  postsByMonth: { month: string; count: number }[];
}

export interface UserType {
  _id: string;
  name: string;
  email: string;
  batch: string;
  department: string;
  createdAt: string;
  status?: 'pending' | 'approved' | 'rejected' | 'blocked';
}

export interface GalleryImageType {
  id: number;
  title: string | null;
  description: string | null;
  image_path: string;
  user_id: number;
  uploaded_by: string;
  created_at: string;
}

export interface NewsItemType {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  isImportant: boolean;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}

export interface EventType {
  id: number;
  title: string;
  description: string;
  event_date: string;
  location: string;
  registration_link: string | null;
  image: string | null;
  organizer_name: string;
}

export interface MockAdminDataType {
  dashboardStats: DashboardStatsType;
  pendingUsers: UserType[];
  rejectedUsers: UserType[];
  blockedUsers: UserType[];
  galleryImages: GalleryImageType[];
  newsItems: NewsItemType[];
  events: EventType[];
}

// Mock dashboard stats
const dashboardStats: DashboardStatsType = {
  totalUsers: 1245,
  pendingUsers: 32,
  rejectedUsers: 18,
  activeUsers: 823,
  totalPosts: 456,
  totalJobs: 57,
  totalGalleryImages: 278,
  totalEvents: 35,
  totalNews: 89,
  dailyVisits: [
    { date: "2025-04-01", count: 145 },
    { date: "2025-04-02", count: 132 },
    { date: "2025-04-03", count: 167 },
    { date: "2025-04-04", count: 156 },
    { date: "2025-04-05", count: 123 },
    { date: "2025-04-06", count: 110 },
    { date: "2025-04-07", count: 143 },
    { date: "2025-04-08", count: 155 },
    { date: "2025-04-09", count: 168 },
    { date: "2025-04-10", count: 172 },
    { date: "2025-04-11", count: 163 },
    { date: "2025-04-12", count: 147 },
  ],
  postsByMonth: [
    { month: "Nov 2024", count: 34 },
    { month: "Dec 2024", count: 42 },
    { month: "Jan 2025", count: 51 },
    { month: "Feb 2025", count: 48 },
    { month: "Mar 2025", count: 65 },
    { month: "Apr 2025", count: 73 },
  ],
};

// Mock pending users
const pendingUsers: UserType[] = [
  {
    _id: "p1",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    batch: "2020",
    department: "Computer Science",
    createdAt: "2025-04-02T10:23:45.000Z",
    status: "pending",
  },
  {
    _id: "p2",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    batch: "2019",
    department: "Electrical Engineering",
    createdAt: "2025-04-03T09:15:22.000Z",
    status: "pending",
  },
  {
    _id: "p3",
    name: "Arjun Singh",
    email: "arjun.singh@example.com",
    batch: "2021",
    department: "Mechanical Engineering",
    createdAt: "2025-04-05T14:45:11.000Z",
    status: "pending",
  },
  {
    _id: "p4",
    name: "Sneha Gupta",
    email: "sneha.gupta@example.com",
    batch: "2018",
    department: "Civil Engineering",
    createdAt: "2025-04-08T16:30:05.000Z",
    status: "pending",
  },
  {
    _id: "p5",
    name: "Vikram Reddy",
    email: "vikram.reddy@example.com",
    batch: "2022",
    department: "Electronics",
    createdAt: "2025-04-10T11:20:33.000Z",
    status: "pending",
  },
];

// Mock rejected users
const rejectedUsers: UserType[] = [
  {
    _id: "r1",
    name: "Fake Name",
    email: "fake.name@example.com",
    batch: "2020",
    department: "Computer Science",
    createdAt: "2025-03-15T10:23:45.000Z",
    status: "rejected",
  },
  {
    _id: "r2",
    name: "Invalid User",
    email: "invalid.user@example.com",
    batch: "2018",
    department: "Mechanical Engineering",
    createdAt: "2025-03-22T14:33:12.000Z",
    status: "rejected",
  },
  {
    _id: "r3",
    name: "Not Alumni",
    email: "not.alumni@example.com",
    batch: "2019",
    department: "Electronics",
    createdAt: "2025-04-01T09:45:30.000Z",
    status: "rejected",
  },
];

// Mock blocked users
const blockedUsers: UserType[] = [
  {
    _id: "b1",
    name: "Spam User",
    email: "spam.user@example.com",
    batch: "2017",
    department: "Computer Science",
    createdAt: "2025-01-10T08:12:45.000Z",
    status: "blocked",
  },
  {
    _id: "b2",
    name: "Inappropriate Posts",
    email: "inappropriate@example.com",
    batch: "2016",
    department: "Civil Engineering",
    createdAt: "2025-02-05T16:44:22.000Z",
    status: "blocked",
  },
];

// Mock gallery images
const galleryImages: GalleryImageType[] = [
  {
    id: 1,
    title: "Annual Alumni Meet 2025",
    description: "Highlights from our annual alumni gathering",
    image_path: "/placeholder.svg",
    user_id: 1,
    uploaded_by: "Admin User",
    created_at: "2025-03-12T14:22:35.000Z",
  },
  {
    id: 2,
    title: "Technology Symposium",
    description: "Alumni presenting at the tech symposium",
    image_path: "/placeholder.svg",
    user_id: 1,
    uploaded_by: "Admin User",
    created_at: "2025-03-15T11:34:12.000Z",
  },
  {
    id: 3,
    title: "Campus Tour",
    description: "Alumni visiting the renovated campus",
    image_path: "/placeholder.svg",
    user_id: 1,
    uploaded_by: "Admin User",
    created_at: "2025-03-20T10:15:45.000Z",
  },
  {
    id: 4,
    title: "Awards Ceremony",
    description: "Distinguished alumni awards ceremony",
    image_path: "/placeholder.svg",
    user_id: 1,
    uploaded_by: "Admin User",
    created_at: "2025-04-02T16:55:30.000Z",
  },
  {
    id: 5,
    title: "Sports Tournament",
    description: "Inter-batch cricket tournament",
    image_path: "/placeholder.svg",
    user_id: 1,
    uploaded_by: "Admin User",
    created_at: "2025-04-05T09:23:41.000Z",
  },
  {
    id: 6,
    title: "Graduation Day 2025",
    description: "Convocation ceremony for the batch of 2025",
    image_path: "/placeholder.svg",
    user_id: 1,
    uploaded_by: "Admin User",
    created_at: "2025-04-10T15:42:18.000Z",
  },
];

// Mock news items
const newsItems: NewsItemType[] = [
  {
    _id: "n1",
    title: "Alumni Association Launches New Mentorship Program",
    content: "The Alumni Association is proud to announce the launch of a new mentorship program that connects current students with alumni from their field of study. This initiative aims to provide valuable guidance, networking opportunities, and professional development for our students.",
    imageUrl: "/placeholder.svg",
    isImportant: true,
    createdAt: "2025-04-05T10:15:00.000Z",
    user: {
      name: "Admin User",
      email: "admin@example.com"
    }
  },
  {
    _id: "n2",
    title: "Annual Alumni Meet Scheduled for June 15th",
    content: "We're excited to announce that our Annual Alumni Meet will take place on June 15th, 2025. This event will feature networking sessions, panel discussions, and a gala dinner. Registration is now open on our website.",
    imageUrl: "/placeholder.svg",
    isImportant: true,
    createdAt: "2025-04-02T14:30:00.000Z",
    user: {
      name: "Admin User",
      email: "admin@example.com"
    }
  },
  {
    _id: "n3",
    title: "Alumni Donations Fund New Research Center",
    content: "Thanks to the generous donations from our alumni, we are pleased to announce the establishment of a new Advanced Research Center that will focus on cutting-edge technologies and innovation. The center is expected to open in September 2025.",
    imageUrl: "/placeholder.svg",
    isImportant: false,
    createdAt: "2025-03-28T09:45:00.000Z",
    user: {
      name: "Admin User",
      email: "admin@example.com"
    }
  },
  {
    _id: "n4",
    title: "Alumni Achievement: Dr. Rajan Kumar Wins Prestigious Award",
    content: "We are proud to announce that our alumnus, Dr. Rajan Kumar (Batch of 2010), has been awarded the National Science Award for his groundbreaking research in renewable energy. This recognition highlights the excellence of our alumni community.",
    imageUrl: "/placeholder.svg",
    isImportant: false,
    createdAt: "2025-03-22T16:20:00.000Z",
    user: {
      name: "Admin User",
      email: "admin@example.com"
    }
  },
];

// Mock events
const events: EventType[] = [
  {
    id: 1,
    title: "Annual Alumni Meet 2025",
    description: "Join us for a day of networking, reminiscing, and celebrating our alma mater. The event will include keynote speeches, panel discussions, and opportunities to reconnect with old friends and faculty members.",
    event_date: "2025-06-15T09:00:00.000Z",
    location: "University Main Auditorium",
    registration_link: "https://example.com/register/alumni-meet-2025",
    image: "/placeholder.svg",
    organizer_name: "Alumni Association"
  },
  {
    id: 2,
    title: "Career Counseling Workshop",
    description: "A special workshop for current students with alumni from various industries providing guidance on career paths, job market trends, and professional development opportunities.",
    event_date: "2025-05-10T14:00:00.000Z",
    location: "Engineering Block, Room 305",
    registration_link: "https://example.com/register/career-workshop",
    image: "/placeholder.svg",
    organizer_name: "Alumni Career Cell"
  },
  {
    id: 3,
    title: "Technology Symposium",
    description: "A technology symposium featuring presentations from alumni working in cutting-edge tech companies and research institutions. Learn about the latest trends and innovations in technology.",
    event_date: "2025-07-05T10:00:00.000Z",
    location: "Computer Science Department",
    registration_link: "https://example.com/register/tech-symposium",
    image: "/placeholder.svg",
    organizer_name: "Tech Alumni Chapter"
  },
  {
    id: 4,
    title: "Alumni Sports Tournament",
    description: "An inter-batch sports tournament featuring cricket, football, and basketball. Come participate or cheer for your batch in this fun-filled event.",
    event_date: "2025-08-20T08:00:00.000Z",
    location: "University Sports Complex",
    registration_link: "https://example.com/register/sports-tournament",
    image: "/placeholder.svg",
    organizer_name: "Sports Committee"
  },
  {
    id: 5,
    title: "Entrepreneurship Summit",
    description: "A summit for aspiring entrepreneurs featuring talks and mentoring sessions from successful alumni entrepreneurs. Learn about starting and scaling businesses from those who've done it.",
    event_date: "2025-09-12T11:00:00.000Z",
    location: "Business School Auditorium",
    registration_link: "https://example.com/register/entrepreneurship-summit",
    image: "/placeholder.svg",
    organizer_name: "Entrepreneurship Cell"
  },
];

export const mockAdminData: MockAdminDataType = {
  dashboardStats,
  pendingUsers,
  rejectedUsers,
  blockedUsers,
  galleryImages,
  newsItems,
  events,
};
