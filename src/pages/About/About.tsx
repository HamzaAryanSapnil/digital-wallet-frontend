import { role } from "@/constants/role";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Shield, Users, BarChart3, Rocket } from "lucide-react";
import { Link } from "react-router";

export default function About() {
  const { data } = useUserInfoQuery(undefined);
  return (
    <section className="container mx-auto my-16 max-w-7xl px-4 space-y-20">
      {/* Header */}
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-bold">About — Digital Wallet</h1>
        <p className="text-lg max-w-3xl mx-auto text-accent-foreground">
          Digital Wallet is a fast, secure, and user-friendly e-wallet platform
          that makes everyday money management effortless. Send, receive,
          deposit, and withdraw funds through a modern, role-based interface
          designed for Users, Agents, and Admins.
        </p>
      </div>

      {/* Mission */}
      <div className="space-y-5 text-center">
        <h2 className="text-3xl font-semibold">Our Mission</h2>
        <p className="text-accent-foreground max-w-3xl mx-auto">
          We exist to simplify digital payments for everyone. Our mission is to
          provide a safe, reliable, and intuitive platform that empowers
          individuals and agents to perform financial transactions quickly and
          confidently.
        </p>
      </div>

      {/* Why Choose */}
      <div className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">
          Why Choose Digital Wallet
        </h2>
        <ul className="grid md:grid-cols-2 gap-6 text-gray-700">
          <li className="p-5 rounded-2xl shadow-md bg-white">
            ⚡ Instant transactions — Send and receive money with minimal delay.
          </li>
          <li className="p-5 rounded-2xl shadow-md bg-white">
            🛡 Robust security — JWT authentication, encrypted transport, and
            role-based access.
          </li>
          <li className="p-5 rounded-2xl shadow-md bg-white">
            📊 Clear insights — Dashboards, charts, and KPIs for balance &
            activity.
          </li>
          <li className="p-5 rounded-2xl shadow-md bg-white">
            📱 Responsive design — Works on mobile, tablet, and desktop.
          </li>
          <li className="p-5 rounded-2xl shadow-md bg-white">
            ⚙ Extensible & modular — Reusable components and clean APIs.
          </li>
        </ul>
      </div>

      {/* Key Features */}
      <div className="space-y-10">
        <h2 className="text-3xl font-semibold text-center">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-accent shadow-md">
            <Users className="w-10 h-10 mb-4 text-indigo-600" />
            <h3 className="text-xl font-bold">Users</h3>
            <p className="text-accent-foreground text-sm">
              Wallet balance, send/receive, deposit via agents, withdraw, and
              transaction history with filters & pagination.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white  dark:bg-accent shadow-md">
            <Shield className="w-10 h-10 mb-4 text-green-600" />
            <h3 className="text-xl font-bold">Agents</h3>
            <p className="text-accent-foreground text-sm">
              Cash-in/cash-out flows for customers, commission history, and
              agent-specific activity logs.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white  dark:bg-accent shadow-md">
            <BarChart3 className="w-10 h-10 mb-4 text-rose-600" />
            <h3 className="text-xl font-bold">Admins</h3>
            <p className="text-accent-foreground text-sm">
              Global overview, manage users & agents, review transactions, and
              system-level analytics.
            </p>
          </div>
        </div>
      </div>

      {/* Transactions & Reporting */}
      <div className="space-y-5">
        <h2 className="text-3xl font-semibold">Transactions & Reporting</h2>
        <ul className="list-disc list-inside text-accent-foreground space-y-2">
          <li>
            Searchable, filterable transaction lists (type, status, date-range,
            amount).
          </li>
          <li>
            Time-series charts for daily transaction count and total volume.
          </li>
          <li>Exportable reports (future enhancement).</li>
        </ul>
      </div>

      {/* Usability & UX */}
      <div className="space-y-5">
        <h2 className="text-3xl font-semibold">Usability & UX</h2>
        <ul className="list-disc list-inside text-accent-foreground space-y-2">
          <li>Clean UI with light/dark modes.</li>
          <li>Guided tour for new users with restart option.</li>
          <li>
            Toast notifications & inline validations for instant feedback.
          </li>
        </ul>
      </div>

      {/* Security */}
      <div className="space-y-5">
        <h2 className="text-3xl font-semibold">Security & Privacy</h2>
        <p className="text-accent-foreground">We take security seriously:</p>
        <ul className="list-disc list-inside text-accent-foreground space-y-2">
          <li>Authentication via JWT and secure token storage.</li>
          <li>All API calls occur over HTTPS.</li>
          <li>
            Role-based access controls to prevent unauthorized operations.
          </li>
          <li>
            Field-level validation and server-side checks for every transaction.
          </li>
        </ul>
      </div>

      {/* How it works */}
      <div className="space-y-5">
        <h2 className="text-3xl font-semibold">
          How It Works — Quick Overview
        </h2>
        <ol className="list-decimal list-inside text-accent-foreground space-y-2">
          <li>Signup / Login — Create an account as a User or an Agent.</li>
          <li>
            Fund & transact — Agents add funds, Users send/withdraw money.
          </li>
          <li>Monitor & manage — Admins/Agents manage dashboards & actions.</li>
        </ol>
      </div>

      {/* Contact */}
      <div className="space-y-5">
        <h2 className="text-3xl font-semibold">Contact & Support</h2>
        <p className="text-accent-foreground">
          If you need help or want to offer feedback:
        </p>
        <ul className="list-disc list-inside text-accent-foreground space-y-2">
          <li>
            Email:{" "}
            <a
              href="mailto:support@digitalwallet.example"
              className="text-indigo-600"
            >
              support@digitalwallet.example
            </a>
          </li>
          <li>
            Docs & API:{" "}
            <span className="text-gray-500">Link to your API docs</span>
          </li>
          <li>
            Report bugs:{" "}
            <span className="text-gray-500">
              Open an issue on the repository
            </span>
          </li>
        </ul>
      </div>

      {/* Roadmap */}
      <div className="space-y-5">
        <h2 className="text-3xl font-semibold">Roadmap / Coming Soon</h2>
        <ul className="list-disc list-inside text-accent-foreground space-y-2">
          <li>Better export/import and CSV reporting.</li>
          <li>Real-time notifications & websockets for live updates.</li>
          <li>More analytics (funnel, retention, cohort analysis).</li>
          <li>Billing & subscription features for premium plans.</li>
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center space-y-5 py-10">
        <Rocket className="w-12 h-12 mx-auto text-primary" />
        <h2 className="text-3xl font-bold">Ready to get started?</h2>
        <p className="text-accent-foreground">
          Create an account to explore the dashboard, or contact our team for a
          demo tailored to your organization.
        </p>
        <div className="space-x-4">
          <Link
            to={
              data
                ? `/${
                    data?.data?.role === role.USER
                      ? "user"
                      : data?.data?.role === role.AGENT
                      ? "agent"
                      : "admin"
                  }`
                : "/register"
            }
          >
            <button className="px-6 py-3 rounded-xl bg-primary text-white font-semibold shadow-md hover:bg-indigo-700">
              Get Started
            </button>
          </Link>
          <Link to="/contact" >
            <button className="px-6 py-3 rounded-xl bg-gray-200 text-gray-800 font-semibold shadow-md hover:bg-gray-300">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
