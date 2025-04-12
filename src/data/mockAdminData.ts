
import { alumniData } from './alumniData';

export const mockAdminData = {
  // Dashboard statistics
  dashboardStats: {
    totalUsers: 150,
    newUsers: 12,
    pendingVerifications: 8,
    activeUsers: 86,
    totalPosts: 327,
    totalEvents: 15,
    totalGalleryItems: 48,
    postsThisMonth: 24,
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
  allUsers: alumniData,
  
  // Pending user verification requests
  pendingUsers: [
    {
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
      uploadedAt: "2023-04-10T10:30:00"
    },
    {
      id: 2,
      url: "https://source.unsplash.com/random/800x600/?graduation",
      title: "Graduation Day 2023",
      description: "Students celebrating their graduation day",
      category: "Events",
      uploadedBy: "Admin",
      uploadedAt: "2023-05-15T14:45:00"
    },
    {
      id: 3,
      url: "https://source.unsplash.com/random/800x600/?library",
      title: "Central Library",
      description: "Students studying in the central library",
      category: "Campus",
      uploadedBy: "Admin",
      uploadedAt: "2023-04-22T11:15:00"
    },
    {
      id: 4,
      url: "https://source.unsplash.com/random/800x600/?classroom",
      title: "Modern Classroom",
      description: "One of our newly renovated smart classrooms",
      category: "Campus",
      uploadedBy: "Admin",
      uploadedAt: "2023-05-05T09:30:00"
    },
    {
      id: 5,
      url: "https://source.unsplash.com/random/800x600/?alumni",
      title: "Alumni Meet 2023",
      description: "Alumni networking during the annual meet",
      category: "Events",
      uploadedBy: "Admin",
      uploadedAt: "2023-05-20T16:00:00"
    },
    {
      id: 6,
      url: "https://source.unsplash.com/random/800x600/?laboratory",
      title: "Research Laboratory",
      description: "State-of-the-art research facilities",
      category: "Campus",
      uploadedBy: "Admin",
      uploadedAt: "2023-04-18T13:20:00"
    }
  ],
  
  // News items
  newsItems: [
    {
      id: 1,
      title: "Annual Alumni Meet Announced",
      content: "We are excited to announce our Annual Alumni Meet scheduled for June 15, 2023. This year's theme is 'Reconnect and Inspire'. Register now to secure your spot!",
      author: "Alumni Committee",
      publishedAt: "2023-05-01T09:00:00",
      image: "https://source.unsplash.com/random/800x600/?meeting",
      category: "Events"
    },
    {
      id: 2,
      title: "Alumni Achievement: Dr. Rajesh Kumar Wins National Award",
      content: "We are proud to announce that our alumnus, Dr. Rajesh Kumar (Batch of 2005, Computer Science) has been awarded the National Science Award for his contributions to Artificial Intelligence.",
      author: "Alumni Office",
      publishedAt: "2023-05-10T11:30:00",
      image: "https://source.unsplash.com/random/800x600/?award",
      category: "Achievements"
    },
    {
      id: 3,
      title: "New Scholarship Fund for Underprivileged Students",
      content: "The Alumni Association has established a new scholarship fund to support underprivileged students. Alumni are encouraged to contribute to this noble cause.",
      author: "Scholarship Committee",
      publishedAt: "2023-05-15T14:45:00",
      image: "https://source.unsplash.com/random/800x600/?scholarship",
      category: "Initiatives"
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
