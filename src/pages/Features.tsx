/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/Features/Features.tsx
import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IconCheck,
  IconDeviceMobile,
  IconUsers,
  IconShieldLock,
  IconChartLine,
  IconSearch,
} from "@tabler/icons-react";

const features = [
  {
    id: "role-based",
    title: "Role-based Dashboards",
    desc: "Distinct experiences for User, Agent and Admin. Each role sees the tools they need (wallet operations, agent tools, admin controls).",
    icon: <IconUsers />,
    tag: "Core",
  },
  {
    id: "wallet",
    title: "Secure Wallets & Fast Transfers",
    desc: "User wallets with instant transfers, cash-in/cash-out flows via agents, transaction history with fee & commission transparency.",
    icon: <IconDeviceMobile />,
    tag: "Payments",
  },
  {
    id: "transactions",
    title: "Advanced Transactions & Filters",
    desc: "Full transaction listing with server-side pagination, search, date-range and status filters so admins and agents can find entries quickly.",
    icon: <IconSearch />,
    tag: "UX",
  },
  {
    id: "analytics",
    title: "Analytics & Timeseries",
    desc: "Visualize activity with time-series charts and summary cards — transaction count, daily volume, top counterparties.",
    icon: <IconChartLine />,
    tag: "Insights",
  },
  {
    id: "security",
    title: "Secure by Design",
    desc: "JWT auth, role-based authorization, bcrypt password hashing and server-side validation to reduce attack surface.",
    icon: <IconShieldLock />,
    tag: "Security",
  },
  {
    id: "integration",
    title: "API-first & Extensible",
    desc: "Consume REST APIs (or swap in GraphQL) — endpoints for overview, aggregates, user/wallet/transaction management. Easy to integrate with payment gateways.",
    icon: <IconCheck />,
    tag: "Developer",
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-20 pb-16">
      <section className="container mx-auto px-6 lg:px-8">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <Badge className="mx-auto mb-4">Product</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Feature-rich Digital Wallet for Users, Agents & Admins
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Secure wallets, fast transfers, powerful admin tools and clear
            analytics — all in a responsive, role-aware frontend built with
            React, TypeScript and Redux Toolkit.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Button asChild>
              <Link to="/register">Get Started — Free</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">Request a Demo</Link>
            </Button>
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.id} className="h-full">
              <CardHeader className="flex items-start gap-3">
                <div className="p-3 rounded-md bg-muted/10 text-primary">
                  {/* icon */}
                  <span className="inline-flex items-center justify-center">
                    {React.cloneElement(f.icon as any, { size: 24 })}
                  </span>
                </div>
                <div className="flex-1">
                  <CardTitle className="text-base font-semibold">
                    {f.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mt-1">
                    {f.desc}
                  </CardDescription>
                </div>
                <div className="ml-2 self-start">
                  <Badge variant="outline">{f.tag}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-1">
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <IconCheck size={16} /> Reliable server-side pagination &
                    filtering
                  </li>
                  <li className="flex items-center gap-2">
                    <IconCheck size={16} /> Audit-friendly transaction logs
                  </li>
                  <li className="flex items-center gap-2">
                    <IconCheck size={16} /> Easy role & user management
                  </li>
                </ul>
                <div className="mt-4 flex justify-end">
                  <Button size="sm" variant="ghost" asChild>
                    <Link to="/features#details">Learn more</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Integrations / Trust area */}
        <div className="mt-12 max-w-4xl mx-auto text-center">
          <h3 className="text-lg font-semibold">Integrations & Trust</h3>
          <p className="mt-3 text-muted-foreground">
            Designed for production — easy to connect to payment gateways,
            monitoring tools and external services. Comes with comprehensive
            developer-friendly APIs and example endpoints.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Badge>JWT Auth</Badge>
            <Badge>Server-side pagination</Badge>
            <Badge>Timeseries aggregation</Badge>
            <Badge>Responsive UI</Badge>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 max-w-2xl mx-auto text-center">
          <h4 className="text-xl font-semibold">
            Start building with the demo
          </h4>
          <p className="mt-2 text-muted-foreground">
            Sign up and try the dashboard flows for User, Agent and Admin. Swap
            to your backend or use the provided mock endpoints.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <Button asChild>
              <Link to="/register">Create Account</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
