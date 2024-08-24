### README.md for Hospital Appointment Booking and Management System (HABMS)

# Hospital Appointment Booking and Management System (HABMS)

Welcome to the Hospital Appointment Booking and Management System (HABMS), a web application designed to streamline the process of booking, managing, and optimizing hospital appointments. This project leverages modern web technologies to deliver a robust, scalable, and user-friendly experience for both hospital staff and patients.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Database Schema](#database-schema)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The HABMS project aims to improve the efficiency and user experience of hospital appointment management by providing a digital platform where patients can book, cancel, and reschedule appointments. Hospital staff can manage schedules, view doctor availability, and optimize resources. The system integrates real-time email notifications, ensuring that all parties are informed promptly about their appointments.

## Features

- **Patient Interface**: Book, reschedule, and cancel appointments online with an intuitive interface.
- **Hospital Staff Dashboard**: Manage appointments, view doctor availability, and handle patient data efficiently.
- **Real-Time Email Notifications**: Send automatic appointment confirmations, reminders, and updates using React Email with Resend.
- **Responsive Design**: Accessible on desktops, tablets, and smartphones with a responsive UI built using Tailwind CSS and ShadCN UI.
- **Secure User Authentication**: Secure login and session management powered by Lucia.
- **Scalable Data Management**: Efficient data storage and querying using Drizzle ORM with Turso DB.
- **Error Handling and Data Validation**: Robust schema validation using Zod, ensuring data integrity across the application.

## Tech Stack

### Frontend

- **React.js**: JavaScript library for building user interfaces.
- **Next.js**: Framework for server-side rendering and static site generation.
- **TypeScript**: Strongly typed programming language, enhancing code quality and maintainability.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **ShadCN UI & Radix UI**: Accessible and customizable UI components.
- **React Hook Form**: Manage forms and form validation efficiently.
- **Sonner**: For managing notifications within the application.
- **Lucide React & React Icons**: Scalable icons for enhancing UI.

### Backend

- **Next.js**: Used for server-side logic and API routes.
- **Drizzle ORM**: TypeScript-first ORM for interacting with the SQLite database.
- **Turso DB**: SQLite cloud database for scalable and fast data operations.
- **Lucia**: Authentication library for secure user logins and session management.
- **Resend**: Service for sending transactional emails (e.g., appointment confirmations).
- **Zod**: Schema declaration and validation library to ensure data integrity.
- **Dotenv**: Manage environment variables securely.
- **OSLO**: Utility library for various helper functions.

## System Architecture

The system follows a multi-tier architecture, separating the application into presentation, business logic, and data layers. This design improves maintainability, scalability, and separation of concerns.

- **Presentation Layer**: Developed with React.js and TypeScript, ensuring a responsive and maintainable UI.
- **Business Logic Layer**: Implemented using Next.js, handling core functionalities like appointment scheduling, user authentication, and data processing.
- **Data Layer**: Managed by Turso DB and Drizzle ORM, ensuring secure and efficient data operations.

## Database Schema

The database is designed to manage all data related to patients, doctors, appointments, and hospital resources. Here is an overview of the database tables:

- **usersTable**: Stores user (hospital staff and patients) information.
- **doctorsTable**: Manages doctor details, including availability and specialty.
- **weeklyAvailabilityTable**: Tracks the weekly availability of doctors.
- **overridesTable**: Stores data for doctor schedule overrides.
- **certificationTable**: Manages certifications for doctors.
- **workExperienceTable**: Records the work experience of doctors.
- **appointmentSettingsTable**: Configures appointment-related settings.
- **appointmentFormFieldsTable**: Defines custom fields for appointment forms.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- PNPM (v6 or higher)
- Git

### Clone the Repository

```bash
git clone https://github.com/destinydinam/hab-ms.git
cd hab-ms
```

### Install Dependencies

```bash
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```
NEXT_PUBLIC_APP_URL=<The base URL of the application.>
RESEND_API_KEY=<API key for Resend to send emails.>
RESEND_SENDER_EMAIL=<The sender email address for transactional emails.>
TURSO_DATABASE_URL=<Connection string for Turso DB.>
TURSO_AUTH_TOKEN=<Auth token for Turso DB.>
DEFAULT_DURATION=<Default Duration for an appointment.>
DEFAULT_BUFFER_TIME=<Default Buffer time for an appointment.>
NEXT_PUBLIC_SYNCFUSION_KEY=<Api key for syncfusion.>
```

### Run the Application

Start the development server:

```bash
pnpm dev
```

## Usage

- Access the application in your browser at `http://localhost:3000`.
- Use the patient interface to book, reschedule, or cancel appointments.
- Log in as hospital staff to access the admin dashboard and manage appointments.

## Project Structure

```
├── components        # Reusable React components
├── db                # Database schema and migrations
├── pages             # Next.js pages
├── public            # Static files
├── styles            # Global styles (CSS)
├── utils             # Utility functions and constants
├── .env.local        # Environment variables
└── README.md         # Project documentation
```

## Environment Variables

Ensure that the following environment variables are set in your `.env.local` file:

- `NEXT_PUBLIC_APP_URL`: The base URL of the application.
- `RESEND_API_KEY`: API key for Resend to send emails.
- `RESEND_SENDER_EMAIL`: The sender email address for transactional emails.
- `TURSO_DATABASE_URL`: Connection string for Turso DB.
- `TURSO_AUTH_TOKEN`: Auth token for Turso DB.
- `DEFAULT_DURATION`: Default Duration for an appointment.
- `DEFAULT_BUFFER_TIME`: Default Buffer time for an appointment.
- `NEXT_PUBLIC_SYNCFUSION_KEY`: Api key for syncfusion.

## Scripts

- `pnpm dev`: Start the development server.
- `pnpm build`: Build the application for production.
- `pnpm start`: Start the production server.
- `pnpm lint`: Run ESLint to check for code quality issues.
- `pnpm migrations:generate`: Generate a new migration file using Drizzle Kit.
- `pnpm migrations:migrate`: Apply migrations to the database.
- `pnpm migrations:drop`: Drop the database schema.
- `pnpm migrations:push`: Push migrations to the database.
- `pnpm migrations:introspect`: Introspect the database schema.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for contributing to HABMS! If you have any questions, feel free to open an issue or contact us.
