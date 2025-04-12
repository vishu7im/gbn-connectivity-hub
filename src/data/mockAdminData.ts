
import { alumniData } from './alumniData';

// Define type interfaces for all the data structures
export interface UserType {
  _id: string;
  id?: number;
  name: string;
  email: string;
  batch: string;
  department: string;
  status?: string;
  phone?: string;
  rollNumber?: string;
  createdAt?: string;
  verificationDocuments?: string[];
  rejectionReason?: string;
  lastActive?: string;
  blockReason?: string;
  blockedAt?: string;
  isVerified?: boolean;
  currentRole?: string;
  company?: string;
}

export interface GalleryImageType {
  id: number;
  url?: string;
  image_path?: string;
  title: string | null;
  description: string | null;
  category?: string;
  uploadedBy?: string;
  user_id?: number;
  uploaded_by?: string;
  uploadedAt?: string;
  created_at: string;
}

export interface NewsItemType {
  _id: string;
  title: string;
  content: string;
  author?: string;
  publishedAt?: string;
  image?: string;
  category?: string;
  isImportant?: boolean;
  imageUrl?: string;
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
  date: string;
  endDate?: string;
  location: string;
  registrationLink?: string;
  image?: string;
  organizer?: string;
  event_date?: string;
  registration_link?: string;
}

export interface DashboardStatsType {
  totalUsers: number;
  newUsers: number;
  pendingUsers: number;
  rejectedUsers: number;
  activeUsers: number;
  totalPosts: number;
  totalEvents: number;
  totalGalleryImages: number;
  totalJobs: number;
  totalNews: number;
  postsThisMonth: number;
  postsByMonth: { month: string; count: number }[];
  dailyVisits: { date: string; count: number }[];
  analytics?: {
    userGrowth: { month: string; users: number }[];
    engagement: { category: string; value: number }[];
  };
}

export const mockAdminData = {
  // Dashboard statistics
  dashboardStats: {
    totalUsers: 150,
    newUsers: 12,
    pendingUsers: 8,
    rejectedUsers: 2,
    activeUsers: 86,
    totalPosts: 327,
    totalEvents: 15,
    totalGalleryImages: 48,
    totalJobs: 25,
    totalNews: 18,
    postsThisMonth: 24,
    postsByMonth: [
      { month: 'Jan', count: 25 },
      { month: 'Feb', count: 30 },
      { month: 'Mar', count: 28 },
      { month: 'Apr', count: 35 },
      { month: 'May', count: 42 }
    ],
    dailyVisits: [
      { date: '2023-05-01', count: 120 },
      { date: '2023-05-02', count: 145 },
      { date: '2023-05-03', count: 132 },
      { date: '2023-05-04', count: 156 },
      { date: '2023-05-05', count: 142 },
      { date: '2023-05-06', count: 106 },
      { date: '2023-05-07', count: 98 },
      { date: '2023-05-08', count: 132 },
      { date: '2023-05-09', count: 124 },
      { date: '2023-05-10', count: 165 },
      { date: '2023-05-11', count: 178 },
      { date: '2023-05-12', count: 156 }
    ],
    analytics: {
      userGrowth: [
        { month: 'Jan', users: 110 },
        { month: 'Feb', users: 120 },
        { month: 'Mar', users: 130 },
        { month: 'Apr', users: 140 },
        { month: 'May', users: 150 }
      ],
      engagement: [
        { category: 'Posts', value: 327 },
        { category: 'Comments', value: 945 },
        { category: 'Events', value: 15 },
        { category: 'Gallery', value: 48 }
      ]
    }
  },
  
  // All registered users
  allUsers: alumniData.map(user => ({
    ...user,
    email: `${user.name.toLowerCase().replace(/\s/g, '.')}@example.com`,
    isVerified: true
  })),
  
  // Pending user verification requests
  pendingUsers: [
    {
      _id: "p101",
      id: 101,
      name: "Rakesh Kumar",
      email: "rakesh.kumar@example.com",
      phone: "+91 98765 43210",
      batch: "2015",
      department: "Computer Science",
      rollNumber: "CS-2015-42",
      createdAt: "2023-05-10T15:30:00",
      verificationDocuments: ["degree_certificate.pdf", "id_proof.pdf"]
    },
    {
      _id: "p102",
      id: 102,
      name: "Sunita Patel",
      email: "sunita.patel@example.com",
      phone: "+91 87654 32109",
      batch: "2018",
      department: "Electronics",
      rollNumber: "EC-2018-21",
      createdAt: "2023-05-12T09:15:00",
      verificationDocuments: ["degree_certificate.pdf"]
    },
    {
      _id: "p103",
      id: 103,
      name: "Vikram Singh",
      email: "vikram.singh@example.com",
      phone: "+91 76543 21098",
      batch: "2016",
      department: "Mechanical",
      rollNumber: "ME-2016-33",
      createdAt: "2023-05-14T11:45:00",
      verificationDocuments: ["student_id.pdf", "degree_certificate.pdf"]
    }
  ],
  
  // Rejected users
  rejectedUsers: [
    {
      _id: "r201",
      id: 201,
      name: "Karan Malhotra",
      email: "karan.malhotra@example.com",
      batch: "2019",
      department: "Civil Engineering",
      rollNumber: "CE-2019-15",
      createdAt: "2023-04-25T10:30:00",
      rejectionReason: "Unable to verify student records. Please provide additional documentation."
    },
    {
      _id: "r202",
      id: 202,
      name: "Neha Sharma",
      email: "neha.sharma@example.com",
      batch: "2017",
      department: "Computer Science",
      rollNumber: "CS-2017-56",
      createdAt: "2023-04-28T14:20:00",
      rejectionReason: "Submitted documents do not match our records. Please contact the admin office."
    }
  ],
  
  // Blocked users
  blockedUsers: [
    {
      _id: "b301",
      id: 301,
      name: "Rohit Joshi",
      email: "rohit.joshi@example.com",
      batch: "2014",
      department: "Electrical Engineering",
      lastActive: "2023-05-02T16:45:00",
      blockReason: "Inappropriate content and behavior. Multiple violations of community guidelines.",
      blockedAt: "2023-05-03T09:30:00"
    }
  ],
  
  // Gallery images
  galleryImages: [
    {
      id: 1,
      url: "https://source.unsplash.com/random/800x600/?campus",
      title: "Campus Main Building",
      description: "A view of our beautiful campus main building during spring",
      category: "Campus",
      uploadedBy: "Admin",
      uploadedAt: "2023-04-10T10:30:00",
      created_at: "2023-04-10T10:30:00"
    },
    {
      id: 2,
      url: "https://source.unsplash.com/random/800x600/?graduation",
      title: "Graduation Day 2023",
      description: "Students celebrating their graduation day",
      category: "Events",
      uploadedBy: "Admin",
      uploadedAt: "2023-05-15T14:45:00",
      created_at: "2023-05-15T14:45:00"
    },
    {
      id: 3,
      url: "https://source.unsplash.com/random/800x600/?library",
      title: "Central Library",
      description: "Students studying in the central library",
      category: "Campus",
      uploadedBy: "Admin",
      uploadedAt: "2023-04-22T11:15:00",
      created_at: "2023-04-22T11:15:00"
    },
    {
      id: 4,
      url: "https://source.unsplash.com/random/800x600/?classroom",
      title: "Modern Classroom",
      description: "One of our newly renovated smart classrooms",
      category: "Campus",
      uploadedBy: "Admin",
      uploadedAt: "2023-05-05T09:30:00",
      created_at: "2023-05-05T09:30:00"
    },
    {
      id: 5,
      url: "https://source.unsplash.com/random/800x600/?alumni",
      title: "Alumni Meet 2023",
      description: "Alumni networking during the annual meet",
      category: "Events",
      uploadedBy: "Admin",
      uploadedAt: "2023-05-20T16:00:00",
      created_at: "2023-05-20T16:00:00"
    },
    {
      id: 6,
      url: "https://source.unsplash.com/random/800x600/?laboratory",
      title: "Research Laboratory",
      description: "State-of-the-art research facilities",
      category: "Campus",
      uploadedBy: "Admin",
      uploadedAt: "2023-04-18T13:20:00",
      created_at: "2023-04-18T13:20:00"
    }
  ],
  
  // News items
  newsItems: [
    {
      _id: "n1",
      title: "Annual Alumni Meet Announced",
      content: "We are excited to announce our Annual Alumni Meet scheduled for June 15, 2023. This year's theme is 'Reconnect and Inspire'. Register now to secure your spot!",
      author: "Alumni Committee",
      publishedAt: "2023-05-01T09:00:00",
      image: "https://source.unsplash.com/random/800x600/?meeting",
      category: "Events",
      isImportant: true,
      createdAt: "2023-05-01T09:00:00",
      user: {
        name: "Admin User",
        email: "admin@example.com"
      }
    },
    {
      _id: "n2",
      title: "Alumni Achievement: Dr. Rajesh Kumar Wins National Award",
      content: "We are proud to announce that our alumnus, Dr. Rajesh Kumar (Batch of 2005, Computer Science) has been awarded the National Science Award for his contributions to Artificial Intelligence.",
      author: "Alumni Office",
      publishedAt: "2023-05-10T11:30:00",
      image: "https://source.unsplash.com/random/800x600/?award",
      category: "Achievements",
      isImportant: false,
      createdAt: "2023-05-10T11:30:00",
      user: {
        name: "Admin User",
        email: "admin@example.com"
      }
    },
    {
      _id: "n3",
      title: "New Scholarship Fund for Underprivileged Students",
      content: "The Alumni Association has established a new scholarship fund to support underprivileged students. Alumni are encouraged to contribute to this noble cause.",
      author: "Scholarship Committee",
      publishedAt: "2023-05-15T14:45:00",
      image: "https://source.unsplash.com/random/800x600/?scholarship",
      category: "Initiatives",
      isImportant: true,
      createdAt: "2023-05-15T14:45:00",
      user: {
        name: "Admin User",
        email: "admin@example.com"
      }
    }
  ],
  
  // Events
  events: [
    {
      id: 1,
      title: "Annual Alumni Meet 2023",
      description: "Join us for a day of networking, reminiscing, and celebration with fellow alumni.",
      date: "2023-06-15T09:00:00",
      endDate: "2023-06-15T18:00:00",
      location: "Main Campus Auditorium",
      registrationLink: "https://example.com/register",
      image: "https://source.unsplash.com/random/800x600/?event",
      organizer: "Alumni Association"
    },
    {
      id: 2,
      title: "Career Guidance Webinar",
      description: "Industry experts and successful alumni share insights on career opportunities and professional growth.",
      date: "2023-06-25T15:00:00",
      endDate: "2023-06-25T17:00:00",
      location: "Online (Zoom)",
      registrationLink: "https://example.com/register-webinar",
      image: "https://source.unsplash.com/random/800x600/?webinar",
      organizer: "Career Development Cell"
    },
    {
      id: 3,
      title: "Alumni Sports Tournament",
      description: "Annual sports competition featuring cricket, football, basketball, and more.",
      date: "2023-07-08T08:00:00",
      endDate: "2023-07-09T18:00:00",
      location: "Campus Sports Complex",
      registrationLink: "https://example.com/register-sports",
      image: "https://source.unsplash.com/random/800x600/?sports",
      organizer: "Alumni Sports Committee"
    }
  ]
};
