# IFSCA Category III Outbound Feeder Fund Portal

Flat GitHub-ready Next.js project for a gated, reverse-inquiry educational portal for UAE-based HNIs and NRIs considering an IFSCA GIFT City Category III AIF outbound feeder fund.

## Important compliance note

This website is designed as an educational and reverse-inquiry gateway only. It should not be used as public solicitation, investment advice, or a public offer. Final legal, tax, SCA, IFSCA, and PPM language must be approved by licensed counsel and regulated advisers before launch.

## Project structure

```text
gift-city-feeder-portal/
├── package.json
├── next.config.mjs
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── middleware.ts
├── .env.example
├── .gitignore
├── README.md
└── src/
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── api/
    │       └── verify/
    │           └── route.ts
    └── components/
        ├── ComplianceGate.tsx
        └── DashboardView.tsx
```

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Set these in Vercel or your hosting platform:

```text
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-secure-password
LEAD_TO_EMAIL=sj@121insure.com
```

## Deployment

1. Upload all files to a new GitHub repository.
2. Connect the repository to Vercel.
3. Add the environment variables.
4. Deploy.

## Built-in flow

1. Visitor lands on educational page.
2. Visitor confirms residency classification.
3. Visitor confirms professional investor qualification.
4. Qualified user sees the gated dashboard.
5. User submits lead details.
6. API sends inquiry email to `sj@121insure.com` or the configured `LEAD_TO_EMAIL`.
