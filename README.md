# Crown Dental – Backend API

Node.js · Express · MongoDB · Cloudinary

---

## Quick Start

### 1. Install dependencies
```bash
cd crown-dental-backend
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env with your values (see Configuration below)
```

### 3. Seed the database (first-time setup)
```bash
npm run seed
```
This creates the default admin account and 6 sample treatments.

### 4. Start development server
```bash
npm run dev       # with nodemon (auto-restart)
npm start         # production
```

Server starts at **http://localhost:5000**

---

## Configuration (`.env`)

| Variable | Description | Required |
|---|---|---|
| `MONGO_URI` | MongoDB connection string | ✅ |
| `JWT_SECRET` | Long random string for JWT signing | ✅ |
| `JWT_EXPIRES_IN` | Token expiry e.g. `7d` | optional (default `7d`) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | optional* |
| `CLOUDINARY_API_KEY` | Cloudinary API key | optional* |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | optional* |
| `PORT` | Server port | optional (default `5000`) |
| `CLIENT_URL` | Frontend URL for CORS | optional |
| `ADMIN_EMAIL` | Seed admin email | optional |
| `ADMIN_PASSWORD` | Seed admin password | optional |

> *If Cloudinary vars are missing, images are stored locally in `/uploads/`.

### MongoDB Options
- **Local:** `MONGO_URI=mongodb://localhost:27017/crown-dental`
- **Atlas:** `MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/crown-dental`

---

## API Reference

All admin endpoints require:
```
Authorization: Bearer <token>
```

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | ❌ | Login, returns JWT + user |
| PUT | `/api/auth/change-password` | ✅ | Change password |
| GET | `/api/auth/me` | ✅ | Current logged-in user |

**Login body:**
```json
{ "email": "admin@crowndental.in", "password": "Admin@123" }
```
**Login response:**
```json
{ "token": "eyJ...", "user": { "_id": "...", "email": "...", "role": "admin" } }
```

---

### Treatments
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/treatments` | ❌ | List all active treatments |
| GET | `/api/treatments/:slug` | ❌ | Single treatment by slug |
| GET | `/api/treatments/id/:id` | ✅ | Single treatment by MongoDB ID |
| POST | `/api/treatments` | ✅ | Create treatment |
| PUT | `/api/treatments/:id` | ✅ | Update treatment |
| DELETE | `/api/treatments/:id` | ✅ | Soft-delete treatment |

**Query params (GET list):** `?category=Cosmetic&q=whitening`

**Treatment body:**
```json
{
  "title": "Teeth Whitening",
  "slug": "teeth-whitening",
  "category": "Cosmetic",
  "metaTitle": "...",
  "metaDescription": "...",
  "seoCopy": "...",
  "benefits": ["Instant results", "Safe"],
  "regularPrice": "₹8,000",
  "memberPrice": "₹7,000",
  "heroImage": "https://...",
  "gallery": ["https://..."],
  "faqs": [{ "q": "Question?", "a": "Answer." }]
}
```

---

### Appointments
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/appointments` | ❌ | Book appointment (public) |
| GET | `/api/appointments` | ✅ | List all appointments |
| PUT | `/api/appointments/:id` | ✅ | Update status |
| DELETE | `/api/appointments/:id` | ✅ | Delete appointment |

**Appointment body:**
```json
{
  "name": "Ravi Kumar",
  "email": "ravi@example.com",
  "phone": "9999999999",
  "treatment": "Root Canal Treatment",
  "date": "2025-06-15",
  "time": "11:00"
}
```

---

### Leads
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/leads` | ❌ | Submit lead (public) |
| GET | `/api/leads` | ✅ | List all leads |
| PUT | `/api/leads/:id` | ✅ | Update lead status |
| DELETE | `/api/leads/:id` | ✅ | Delete lead |

---

### Gallery
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/gallery` | ❌ | List all gallery images |
| POST | `/api/gallery` | ✅ | Add image record |
| DELETE | `/api/gallery/:id` | ✅ | Delete image |

---

### Image Upload
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/uploads/image` | ✅ | Upload single image |
| POST | `/api/uploads/images` | ✅ | Upload multiple images |

Form data field: `file` (single) or `files` (multiple)

Response: `{ "url": "https://...", "publicId": "..." }`

---

### Newsletter
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/subscribe` | ❌ | Subscribe email |
| GET | `/api/subscribers` | ✅ | List subscribers |
| GET | `/api/subscribers/export/csv` | ✅ | Download CSV |
| DELETE | `/api/subscribers/:id` | ✅ | Unsubscribe |

---

## Project Structure

```
crown-dental-backend/
├── server.js              # Entry point
├── seed.js                # Database seeder
├── package.json
├── .env.example
├── models/
│   ├── User.js
│   ├── Treatment.js
│   ├── Appointment.js
│   ├── Lead.js
│   ├── Gallery.js
│   └── Subscriber.js
├── routes/
│   ├── auth.js
│   ├── treatments.js
│   ├── appointments.js
│   ├── leads.js
│   ├── gallery.js
│   ├── uploads.js
│   ├── subscribe.js
│   └── subscribers.js
├── middleware/
│   ├── auth.js            # JWT protect middleware
│   └── upload.js          # Multer + Cloudinary config
└── uploads/               # Local image storage (if not using Cloudinary)
```

---

## Deployment

### With PM2 (VPS)
```bash
npm install -g pm2
pm2 start server.js --name crown-dental-api
pm2 save && pm2 startup
```

### Nginx reverse proxy
```nginx
location /api {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

### Serve frontend build from Express (same server)
Add this to `server.js` before the 404 handler:
```js
const path = require('path');
app.use(express.static(path.join(__dirname, '../crown-dental-flat/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../crown-dental-flat/build', 'index.html'));
});
```

---

## Default Admin Credentials

After running `npm run seed`:
- **Email:** `admin@crowndental.in`
- **Password:** `Admin@123`

⚠️ **Change the password immediately after first login.**
