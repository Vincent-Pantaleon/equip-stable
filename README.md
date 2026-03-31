Equip: University Resource Booking System


    Equip is a full-stack booking platform designed for Father Saturnino Urios University (FSUU). It streamlines the process of reserving university equipment and facilities, replacing manual or fragmented systems with a centralized, real-time solution.

🚀 Overview

    Managing university resources often involves scheduling conflicts and paperwork. Equip provides a seamless interface for students and staff to check availability, book items, and manage reservations, all while ensuring data integrity and administrative oversight.

Key Features
    Real-time Availability: Instant feedback on whether equipment is currently booked or available.

    User Authentication: Secure login for students and faculty using Supabase Auth.

    Admin Dashboard: Centralized control for managing inventory and approving/denying requests.

    Responsive Design: Optimized for both desktop and mobile use for students on the go.

🛠️ Tech Stack
    Frontend: Next.js (React Framework)

    Styling: Tailwind CSS

    UI Components: shadcn

    Backend/Database: Supabase (PostgreSQL & Go)

    State Management: [TanStack Query / Context API] (Update this based on your actual code)

📐 Architecture
    
    The application follows a modern serverless architecture to ensure high availability and low latency.

🧪 Technical Challenges & Solutions
    
    1. Handling Concurrency
        Problem: Preventing "Double-Bookings" where two users attempt to reserve the same item at the same millisecond.
        Solution: Implemented PostgreSQL transactions and row-level security (RLS) in Supabase to ensure that a booking is only finalized if the resource state remains "available" during the write operation.

    2. Scalable Data Fetching
        Problem: Loading large lists of equipment without slowing down the UI.
        Solution: Utilized Next.js Server Components and optimized Supabase queries to fetch only necessary data, significantly reducing the initial page load time.

📦 Getting Started
    Clone the repository:

    Bash
        git clone https://github.com/your-username/equip.git
        cd equip
        Install dependencies:

    Bash
        npm install
        Set up environment variables:
        Create a .env.local file and add your Supabase credentials:

    Code snippet
        NEXT_PUBLIC_SUPABASE_URL=your_url
        NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
        Run the development server:

    Bash
        npm run dev

👨‍💻 Author
Vincent Michael N. Pantaleon Computer Science Student @ Father Saturnino Urios University Graduating May 2026