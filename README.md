# HelpDesk - Ticket Management System

Complete web application for technical support ticket management. This project consumes a Laravel REST API and presents a modern, responsive, and functional interface.

## Table of Contents
- [Objective](#objective)
- [Technologies and Stack](#technologies-and-stack)
- [Technical Decisions](#technical-decisions)
- [Installation and Execution](#installation-and-execution)
- [Project Structure](#project-structure)
- [Implemented Features](#implemented-features)
- [Responsive Design](#responsive-design)
- [Future Improvements](#future-improvements)

## Objective
The objective of this project is to demonstrate **frontend** skills, focusing on best practices, API consumption, global state management, and a polished user experience (UI/UX).

---

## Technologies and Stack

### Core
* **React 19**: Main UI library.
* **TypeScript**: For robust static typing and scalability.
* **Vite**: Build tool for a fast development environment.

### Styling and Design
* **TailwindCSS**: Used for fast and consistent styling.
* **Design**: Based on Clean UI principles, with **Dark Mode** support.
* **Iconography**: Material Icons.

### State and Data Management
* **Zustand**: Chosen for its simplicity and lightness compared to Redux for global state (tickets, filters, pagination).
* **Axios**: HTTP client for API requests.

---

## Technical Decisions

During development, the following decisions were made to ensure quality and maintainability:

1.  **Modular Architecture**: Logic was separated into `hooks`, visual components into `components/ui`, and views into `layout`, facilitating reusability and testing.
2.  **Global State with Zustand**: Zustand was chosen over Redux or pure Context API to avoid excessive boilerplate and improve performance with simple selectors.
3.  **Inline Validations**: To enhance UX, validations occur in real-time or when submitting forms, providing immediate feedback to users via Toasts.
4.  **Custom Hooks**: Business logic (ticket CRUD) was extracted to `useTickets.ts` to keep view components clean.
5.  **Mobile-First Responsive**: Adaptive design that guarantees an optimal experience on mobile devices, tablets, and desktop.

---

## Installation and Execution

Follow these steps to run the project locally.

### Prerequisites
* Node.js (v16 or higher)
* Laravel backend running at `http://127.0.0.1:8000`

### Steps

1.  **Clone the repository and enter the folder:**
```bash
    git clone https://github.com/DevRodox/helpdesk-clauger.git
    cd helpdesk-clauger
```
2.  **Install dependencies:**
```bash
    npm install
```

3.  **Run the development environment:**
```bash
    npm run dev
```

4.  **Open in browser:**
    The application will be available at: `http://localhost:5173`

---

## Project Structure
```text
src/
├── components/
│   ├── ui/              # Reusable base components (Button, Badge, Toast, ThemeSwitch)
│   ├── layout/          # Main structure (Sidebar, Header, Layout)
│   └── tickets/         # Core functionality (TicketsPage, Table, CRUD Modals)
├── hooks/
│   ├── useTickets.ts    # CRUD operations logic and API consumption
│   ├── useModal.ts      # Modal window state management
│   └── useTheme.tsx     # Dark Mode control
├── interfaces/
│   └── index.ts         # TypeScript type definitions and contracts
├── services/
│   └── api.ts           # Axios client configured for Laravel API
├── store/
│   └── ticketStore.ts   # Application global state with Zustand
├── utils/
│   ├── constants.ts     # Enums and constants (Priorities, States)
│   └── helpers.ts       # Utility and formatting functions
├── HelpDeskApp.tsx      # Application root component
└── main.tsx             # React/Vite entry point
```

---

## Implemented Features

### Ticket Management
- **Complete CRUD**: Create, Read, Update, and Delete tickets.
- **Advanced Listing**: Pagination integrated with the backend.
- **Filters and Search**: Filtering by Status, Priority, and Search by Subject (with debounce).

### UI / UX
- **Dark Mode**: Automatic detection and manual switching.
- **User Feedback**: Notification system (Toasts) for success and error states.
- **Loading States**: Visual indicators during API requests.
- **Responsive**: Adaptable to different screen sizes.

---

## Responsive Design

The application is fully optimized for all screen sizes, ensuring an exceptional user experience on any device.

### Implemented Responsive Features

#### Mobile (< 640px)
- **Hidden Sidebar**: Navigation via hamburger menu in the header to maximize content space
- **Card View**: Tickets are displayed in compact card format instead of a table, optimizing readability on small screens
- **Stacked Filters**: Filters are reorganized vertically for better touch usability
- **Full-Width Buttons**: CTAs occupy full width to facilitate tapping and improve accessibility
- **Optimized Modals**: Sticky header and footer with internal scroll to better utilize vertical space

#### Tablet (640px - 1024px)
- **Hybrid Layout**: Balanced combination of mobile and desktop elements
- **Sidebar Toggle**: Sidebar can be hidden/shown based on user preference
- **Filters in Row**: Selectors remain in a single line when space permits
- **Flexible Navigation**: Intelligent menu adaptation based on available space

#### Desktop (>= 1024px)
- **Permanent Sidebar**: Always visible navigation for quick access
- **Complete Table View**: Detailed information in tabular format with all columns
- **Spacious Layout**: Ample padding for better readability and space utilization
- **Advanced Interactions**: Hover states and smooth transitions

### Breakpoints Used
```css
sm: 640px   /* Small devices (mobile landscape) */
md: 768px   /* Tablets */
lg: 1024px  /* Small desktops */
xl: 1280px  /* Large desktops */
```

### Mobile-First Design Principles
- **Touch-Friendly**: Touch areas of at least 44x44px on all interactive elements
- **Progressive Enhancement**: Basic functionality guaranteed on all devices, with incremental improvements
- **Performance**: Asset optimization and conditional loading based on device
- **Accessibility**: Keyboard navigation and screen readers at all resolutions

---

## Future Improvements

*As part of the technical assessment, these are the functionalities and optimizations I would implement with more time to scale the system:*

### Security and Users
- **Authentication System (Login)**: Implement a secure access flow with JWT to protect routes and manage sessions.
- **Role Management**: Differentiate permissions between support administrators and end users.

### Collaboration and Communication
- **Ticket Comments**: Add a comment history section within each ticket to facilitate tracking.
- **Change Notifications**: Implement real-time alerts or emails when a ticket's status is updated.

### System Features
- **Settings Section**: Settings panel for users to customize their profile and system preferences.
- **Attachment Handling**: Allow uploading of images or documents to provide more context in support reports.

### Technical Excellence
- **Robust Testing**: Add **Unit Tests** (Vitest) and **E2E Tests** (Cypress) to ensure stability of critical operations.
- **Cache Optimization**: Integrate **React Query (TanStack Query)** to handle "stale-while-revalidate" states and reduce network latency.
- **Component Documentation**: Implement **Storybook** to document the UI library and facilitate design scalability.