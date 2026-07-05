import { action, api, app, job, page, query, route } from "@wasp.sh/spec";

// Pages
import App from "./src/client/App" with { type: "ref" };
import LandingPage from "./src/landing-page/LandingPage" with { type: "ref" };
import Login from "./src/auth/LoginPage" with { type: "ref" };
import { Signup } from "./src/auth/SignupPage" with { type: "ref" };
import { RequestPasswordResetPage } from "./src/auth/email-and-pass/RequestPasswordResetPage" with { type: "ref" };
import { PasswordResetPage } from "./src/auth/email-and-pass/PasswordResetPage" with { type: "ref" };
import { EmailVerificationPage } from "./src/auth/email-and-pass/EmailVerificationPage" with { type: "ref" };
import Account from "./src/user/AccountPage" with { type: "ref" };
import PricingPage from "./src/payment/PricingPage" with { type: "ref" };
import CheckoutResultPage from "./src/payment/CheckoutResultPage" with { type: "ref" };
import FileUpload from "./src/file-upload/FileUploadPage" with { type: "ref" };
import AnalyticsDashboardPage from "./src/admin/dashboards/analytics/AnalyticsDashboardPage" with { type: "ref" };
import AdminUsers from "./src/admin/dashboards/users/UsersDashboardPage" with { type: "ref" };
import AdminSettings from "./src/admin/elements/settings/SettingsPage" with { type: "ref" };
import { NotFoundPage } from "./src/client/components/NotFoundPage" with { type: "ref" };
import AssessorPage from "./src/compass/AssessorPage" with { type: "ref" };
import ReportsPage from "./src/compass/ReportsPage" with { type: "ref" };
import ReportDetailPage from "./src/compass/ReportDetailPage" with { type: "ref" };
import InsightsPage from "./src/compass/InsightsPage" with { type: "ref" };
import PortfolioHealthPage from "./src/compass/PortfolioHealthPage" with { type: "ref" };
import FacultyDashboard from "./src/compass/FacultyDashboard" with { type: "ref" };
import DevPortalPage from "./src/compass/DevPortalPage" with { type: "ref" };
import DevPortalComparePage from "./src/compass/DevPortalComparePage" with { type: "ref" };

// Auth / server / db functions
import {
  getVerificationEmailContent,
  getPasswordResetEmailContent,
} from "./src/auth/email-and-pass/emails" with { type: "ref" };
import { getEmailUserFields } from "./src/auth/userSignupFields" with { type: "ref" };
import { seedMockUsers } from "./src/server/scripts/dbSeeds" with { type: "ref" };
import { serverEnvValidationSchema } from "./src/env" with { type: "ref" };

// Operations
import {
  getPaginatedUsers,
  updateIsUserAdminById,
} from "./src/user/operations" with { type: "ref" };
import {
  getCustomerPortalUrl,
  generateCheckoutSession,
} from "./src/payment/operations" with { type: "ref" };
import {
  paymentsWebhook,
  paymentsMiddlewareConfigFn,
} from "./src/payment/webhook" with { type: "ref" };
import {
  createFileUploadUrl,
  addFileToDb,
  getAllFilesByUser,
  getDownloadFileSignedURL,
  deleteFile,
} from "./src/file-upload/operations" with { type: "ref" };
import { getDailyStats } from "./src/analytics/operations" with { type: "ref" };
import { calculateDailyStats } from "./src/analytics/stats" with { type: "ref" };
import {
  assessProgram,
  getAssessmentJobs,
  getAssessmentJob,
  getSyllabusMap,
  updateCourseIntervention,
  getCourseInterventions,
  uploadAlumniData,
  getValidationSignals,
  getCompetitiveEvents,
  getMarketWindowStatus,
  generateApiKey,
  revokeApiKey,
  listApiKeys,
} from "./src/compass/operations" with { type: "ref" };
import { scanMarketDrift } from "./src/compass/marketDrift" with { type: "ref" };

// FacultyComparisonRoute and FacultyDetailRoute render the same page.
const facultyDashboardPage = page(FacultyDashboard);

export default app({
  name: "OpenSaaS",
  title: "Evidura – Degree Future-Viability Assessor",
  wasp: {
    version: "^0.24.0",
  },

  head: [
    "<link rel='icon' href='/favicon.ico' sizes='32x32' />",
    "<link rel='icon' type='image/svg+xml' href='/favicon.svg' />",

    "<link rel='preconnect' href='https://fonts.googleapis.com' />",
    "<link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&family=Source+Code+Pro:wght@400;500;600&display=swap' />",

    "<meta name='description' content='Degree Future-Viability Assessor — evaluate university program resilience against AI-driven labour market change.' />",
    "<meta name='author' content='University of Melbourne SXD' />",
    "<meta name='keywords' content='degree viability, program assessment, curriculum design, AI readiness, university, future of work' />",

    "<meta property='og:type' content='website' />",
    "<meta property='og:title' content='Evidura — Degree Future-Viability Assessor' />",
    "<meta property='og:site_name' content='Evidura' />",
    "<meta property='og:url' content='https://evidura.ai' />",
    "<meta property='og:description' content='Evaluate university program resilience against AI-driven labour market change.' />",
    "<meta property='og:image' content='https://evidura.ai/public-banner.webp' />",
    "<meta name='twitter:image' content='https://evidura.ai/public-banner.webp' />",
    "<meta name='twitter:image:width' content='800' />",
    "<meta name='twitter:image:height' content='400' />",
    "<meta name='twitter:card' content='summary_large_image' />",
  ],

  // 🔐 Auth out of the box! https://wasp.sh/docs/auth/overview
  auth: {
    userEntity: "User",
    methods: {
      email: {
        fromField: {
          name: "COMPASS",
          email: "compass@unimelb.edu.au",
        },
        emailVerification: {
          clientRoute: "EmailVerificationRoute",
          getEmailContentFn: getVerificationEmailContent,
        },
        passwordReset: {
          clientRoute: "PasswordResetRoute",
          getEmailContentFn: getPasswordResetEmailContent,
        },
        userSignupFields: getEmailUserFields,
      },
      // Social auth (Google/GitHub/Discord) can be re-added here; see
      // https://wasp.sh/docs/auth/social-auth/overview
    },
    onAuthFailedRedirectTo: "/login",
    onAuthSucceededRedirectTo: "/assess",
  },

  db: {
    // Run `wasp db seed` to seed the database with mock users.
    seeds: [seedMockUsers],
  },

  client: {
    rootComponent: App,
  },

  server: {
    envValidationSchema: serverEnvValidationSchema,
  },

  emailSender: {
    // NOTE: "Dummy" provider is just for local development purposes.
    //   Check the server logs for the email confirmation url. deploy.sh/CI
    //   flip this to SMTP for production builds.
    provider: "Dummy",
    defaultFrom: {
      name: "COMPASS",
      email: "compass@unimelb.edu.au",
    },
  },

  spec: [
    route("LandingPageRoute", "/", page(LandingPage)),

    //#region Auth Pages
    route("LoginRoute", "/login", page(Login)),
    route("SignupRoute", "/signup", page(Signup)),
    route(
      "RequestPasswordResetRoute",
      "/request-password-reset",
      page(RequestPasswordResetPage),
    ),
    route("PasswordResetRoute", "/password-reset", page(PasswordResetPage)),
    route(
      "EmailVerificationRoute",
      "/email-verification",
      page(EmailVerificationPage),
    ),
    //#endregion

    //#region User
    route("AccountRoute", "/account", page(Account, { authRequired: true })),
    query(getPaginatedUsers, { entities: ["User"] }),
    action(updateIsUserAdminById, { entities: ["User"] }),
    //#endregion

    //#region Payment
    route("PricingPageRoute", "/pricing", page(PricingPage)),
    route(
      "CheckoutResultRoute",
      "/checkout",
      page(CheckoutResultPage, { authRequired: true }),
    ),
    query(getCustomerPortalUrl, { entities: ["User"] }),
    action(generateCheckoutSession, { entities: ["User"] }),
    api("POST", "/payments-webhook", paymentsWebhook, {
      entities: ["User"],
      middlewareConfigFn: paymentsMiddlewareConfigFn,
    }),
    //#endregion

    //#region File Upload
    route(
      "FileUploadRoute",
      "/file-upload",
      page(FileUpload, { authRequired: true }),
    ),
    action(createFileUploadUrl, { entities: ["User", "File"] }),
    action(addFileToDb, { entities: ["User", "File"] }),
    query(getAllFilesByUser, { entities: ["User", "File"] }),
    query(getDownloadFileSignedURL, { entities: ["User", "File"] }),
    action(deleteFile, { entities: ["User", "File"] }),
    //#endregion

    //#region Analytics
    query(getDailyStats, { entities: ["User", "DailyStats"] }),
    job(calculateDailyStats, {
      executor: "PgBoss",
      schedule: {
        cron: "0 * * * *", // every hour. useful in production
      },
      entities: ["User", "DailyStats", "Logs", "PageViewSource"],
    }),
    //#endregion

    //#region Admin Dashboard
    route(
      "AdminRoute",
      "/admin",
      page(AnalyticsDashboardPage, { authRequired: true }),
    ),
    route(
      "AdminUsersRoute",
      "/admin/users",
      page(AdminUsers, { authRequired: true }),
    ),
    route(
      "AdminSettingsRoute",
      "/admin/settings",
      page(AdminSettings, { authRequired: true }),
    ),
    route("NotFoundRoute", "*", page(NotFoundPage)),
    //#endregion

    //#region COMPASS
    route("AssessRoute", "/assess", page(AssessorPage, { authRequired: true })),
    route("ReportsRoute", "/reports", page(ReportsPage)),
    route("ReportDetailRoute", "/reports/:reportSlug", page(ReportDetailPage)),
    route("InsightsRoute", "/insights", page(InsightsPage)),
    route(
      "PortfolioHealthRoute",
      "/insights/portfolio",
      page(PortfolioHealthPage),
    ),
    route("FacultyComparisonRoute", "/insights/faculty", facultyDashboardPage),
    route(
      "FacultyDetailRoute",
      "/insights/faculty/:facultySlug",
      facultyDashboardPage,
    ),

    action(assessProgram, { entities: ["AssessmentJob", "User"] }),
    query(getAssessmentJobs, { entities: ["AssessmentJob"] }),
    query(getAssessmentJob, { entities: ["AssessmentJob"] }),
    query(getSyllabusMap, { entities: ["AssessmentJob"] }),
    action(updateCourseIntervention, {
      entities: ["CourseInterventionOwner", "AssessmentJob"],
    }),
    query(getCourseInterventions, {
      entities: ["CourseInterventionOwner", "AssessmentJob"],
    }),
    action(uploadAlumniData, { entities: ["User", "AlumniDestination"] }),
    query(getValidationSignals, { entities: ["MarketValidationSignal"] }),
    query(getCompetitiveEvents, { entities: ["CompetitiveEvent"] }),
    query(getMarketWindowStatus, { entities: ["MarketWindowSnapshot"] }),
    job(scanMarketDrift, {
      executor: "PgBoss",
      schedule: {
        cron: "0 0 * * 0",
      },
      entities: ["AssessmentJob", "Logs"],
    }),

    // API Key Management + Developer Portal (feat-009)
    action(generateApiKey, { entities: ["ApiKey", "Institution", "User"] }),
    action(revokeApiKey, { entities: ["ApiKey"] }),
    query(listApiKeys, { entities: ["ApiKey"] }),
    route("DevPortalRoute", "/developers", page(DevPortalPage)),
    route(
      "DevPortalCompareRoute",
      "/developers/compare",
      page(DevPortalComparePage),
    ),
    //#endregion
  ],
});
