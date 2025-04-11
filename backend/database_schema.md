
# GBN Alumni Portal Database Schema

## MongoDB Collections

### Users
```
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  batch: String,
  department: String,
  rollNumber: String,
  graduation: String,
  currentRole: String,
  company: String,
  location: String,
  phone: String,
  bio: String,
  profilePicture: String,
  linkedin: String,
  facebook: String,
  twitter: String,
  isAdmin: Boolean,
  isVerified: Boolean,
  verificationStatus: String,  // 'pending', 'approved', 'rejected'
  rejectionRemarks: String,
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date
}
```

### Posts
```
{
  _id: ObjectId,
  user: ObjectId,  // Reference to User
  content: String,
  images: [String],
  likes: [ObjectId],  // Array of User references
  comments: [
    {
      user: ObjectId,  // Reference to User
      text: String,
      createdAt: Date
    }
  ],
  isBlocked: Boolean,
  blockReason: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Jobs
```
{
  _id: ObjectId,
  user: ObjectId,  // Reference to User
  title: String,
  company: String,
  location: String,
  type: String,  // 'Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'
  description: String,
  requirements: String,
  salary: String,
  contactEmail: String,
  applicationLink: String,
  deadline: Date,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Gallery
```
{
  _id: ObjectId,
  user: ObjectId,  // Reference to User
  title: String,
  description: String,
  imageUrl: String,
  category: String,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### News
```
{
  _id: ObjectId,
  user: ObjectId,  // Reference to User
  title: String,
  content: String,
  imageUrl: String,
  isImportant: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Events
```
{
  _id: ObjectId,
  user: ObjectId,  // Reference to User
  title: String,
  description: String,
  date: Date,
  location: String,
  imageUrl: String,
  registrationLink: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Visits
```
{
  _id: ObjectId,
  user: ObjectId,  // Reference to User (optional)
  visitedAt: Date,
  userAgent: String,
  ipAddress: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Relationships

- User -> Posts (One-to-Many)
- User -> Jobs (One-to-Many)
- User -> Gallery (One-to-Many)
- User -> News (One-to-Many)
- User -> Events (One-to-Many)
- User -> Visits (One-to-Many)
- User -> Post Likes (Many-to-Many)
- User -> Post Comments (One-to-Many)

## Indexes

```javascript
// Users collection
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ verificationStatus: 1 });
db.users.createIndex({ isAdmin: 1 });
db.users.createIndex({ batch: 1, department: 1 });

// Posts collection
db.posts.createIndex({ user: 1 });
db.posts.createIndex({ createdAt: -1 });
db.posts.createIndex({ isBlocked: 1 });

// Jobs collection
db.jobs.createIndex({ user: 1 });
db.jobs.createIndex({ createdAt: -1 });
db.jobs.createIndex({ isActive: 1 });
db.jobs.createIndex({ deadline: 1 });

// Gallery collection
db.gallery.createIndex({ user: 1 });
db.gallery.createIndex({ category: 1 });

// News collection
db.news.createIndex({ createdAt: -1 });
db.news.createIndex({ isImportant: 1 });

// Events collection
db.events.createIndex({ date: 1 });

// Visits collection
db.visits.createIndex({ visitedAt: 1 });
db.visits.createIndex({ user: 1 });
```
