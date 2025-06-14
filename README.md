# 🏥 Doctor Appointment Booking App

A Next.js-based web application that allows users to easily book real-time appointments with doctors. The platform helps patients find doctors by specialty, location, or hospital, and schedule appointments instantly—no calls, no queues, no confusion.

## 🚀 Features

- 🔍 **Search and Filter**: Locate doctors by specialization, symptoms, or hospital.  
- 📅 **Real-Time Availability**: View up-to-date doctor schedules and available slots.  
- ⚡ **Instant Booking**: Schedule appointments in just a few clicks.  
- 👩‍⚕️ **Doctor Profiles**: Browse doctor credentials, experience, and patient reviews.  
- 🔐 **Secure Authentication**: Sign in securely via email/password (Supabase Auth).  
- 📱 **Responsive UI**: Clean, mobile-friendly design built with Tailwind CSS.

## 🧱 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)  
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)  
- **Auth & Backend**: [Supabase](https://supabase.com/)  
- **Database**: PostgreSQL (via Supabase)  
- **UI Components**: ShadCN UI, Lucide Icons

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/doctor-appointment-app.git
cd doctor-appointment-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a .env.local file in the root directory and add the following:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Run the Development Server

```bash
npm run dev
```
Visit http://localhost:3000 to view the app in your browser.

### 🗂️ Project Structure

- /components      → Reusable UI components (Navbar, DoctorCard, etc.)
- /pages           → Next.js routing pages (index.js, about.js, etc.)
- /styles          → Global and Tailwind styles
- /utils           → Helper functions (Supabase client, date utilities)
- /public          → Static assets (images, icons)
- /lib             → Auth or API integration files

### 🔐 License

This project is licensed under the MIT License.