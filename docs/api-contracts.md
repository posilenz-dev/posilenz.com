# API Contracts

## Authentication

- **POST** `/api/auth/signin/github`: GitHub OAuth sign-in endpoint for CMS access.

## Keystatic CMS

- **GET/POST** `/api/keystatic/[...params]`: Route handlers for the Keystatic admin dashboard.

## Server Actions

Defined in `app/actions.ts`:
- **Submit Application**: Handles career application form submissions, processing data and triggering email notifications.

## Email Services

- **Resend/Nodemailer Integration**: Handles email dispatch for contact forms and job applications.

