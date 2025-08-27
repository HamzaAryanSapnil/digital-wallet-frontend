// src/pages/FAQ/FAQ.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React from "react";
import { Link } from "react-router";

const faqList: { q: string; a: React.ReactNode }[] = [
  {
    q: "What is this Digital Wallet?",
    a: (
      <>
        This is a role-based digital wallet platform for Users, Agents and
        Admins. Users can hold wallets, send/receive money, and view transaction
        history. Agents can perform cash-in/cash-out on behalf of users. Admins
        manage users, agents and overall system settings.
      </>
    ),
  },
  {
    q: "How do I create an account?",
    a: (
      <>
        Click <Link to="/register">Register</Link> and fill the signup form.
        Choose your role (User or Agent). After registration, confirm your email
        (if email verification is enabled) and login.
      </>
    ),
  },
  {
    q: "What roles exist and what are the differences?",
    a: (
      <>
        <strong>User:</strong> Personal wallet, send/receive money, view
        transactions. <br />
        <strong>Agent:</strong> Operator who can perform cash-in / withdrawals
        for users. <br />
        <strong>Admin:</strong> Full system access — manage users/agents,
        view/all transactions and system settings.
      </>
    ),
  },
  {
    q: "How do I add money to my wallet?",
    a: (
      <>
        Users typically receive cash-in via an Agent. Agents perform a cash-in
        transaction which increases the user's wallet balance. If a direct
        payment integration exists (e.g., gateway), use the Deposit/Cash-in flow
        in the UI.
      </>
    ),
  },
  {
    q: "How can I withdraw money?",
    a: (
      <>
        Withdrawals are processed via Agents or via the withdrawal feature in
        the app. Create a withdraw request, follow the confirmation steps, and
        the agent or the system will process it depending on your setup.
      </>
    ),
  },
  {
    q: "What are transaction fees and how are they displayed?",
    a: (
      <>
        Transaction fees (if any) are shown on confirmation screens and in
        transaction details. Admins can configure fees in the backend. The UI
        shows `amount`, `fee`, and `commission` fields for transparency.
      </>
    ),
  },
  {
    q: "How does pagination, filtering and search work?",
    a: (
      <>
        Lists (users, wallets, transactions) use server-side pagination. Use the
        search input to filter results (query param `searchTerm`) and dropdowns
        for filters (e.g., `role`, `status`). Page size and page number are sent
        as query params (`limit`, `page`) to the API.
      </>
    ),
  },
  {
    q: "What should I do if a transaction is missing or incorrect?",
    a: (
      <>
        First check the transaction details in the app (date, from/to, status).
        If it’s still missing or wrong, contact support with the transaction ID
        and timestamp. For agent-performed operations, include the agent ID.
      </>
    ),
  },
  {
    q: "How is security handled?",
    a: (
      <>
        The platform uses JWT-based authentication, role-based access control,
        secure password storage (bcrypt), and server-side validation. Always
        keep your password safe and enable any available two-factor mechanisms.
      </>
    ),
  },
  {
    q: "Can I test the API / integrate with the backend?",
    a: (
      <>
        Yes — the backend exposes REST endpoints (e.g.
        `/api/v1/dashboard/overview`, `/api/v1/admin/all-users`,
        `/api/v1/admin/transactions-summery`). Use the documented endpoints and
        API tokens (or login) for authenticated requests. Ask the admin for API
        keys or test credentials if needed.
      </>
    ),
  },
  {
    q: "How to handle disputes or refund requests?",
    a: (
      <>
        Open a support ticket with relevant transaction IDs, timestamps, and a
        short description. Admins will investigate transaction logs and respond
        according to the policy configured in the backend.
      </>
    ),
  },
  {
    q: "What are common troubleshooting steps?",
    a: (
      <>
        - Make sure you are logged in and have the correct role. <br />- Check
        network tab for failed API calls and share logs with support. <br />
        - Clear browser cache if UI behaves strangely (old bundles). <br />-
        Ensure backend is reachable and tokens not expired.
      </>
    ),
  },
  {
    q: "Where can I find help or report bugs?",
    a: (
      <>
        Use the <Link to="/contact">Contact</Link> page or open an issue in the
        project repository (if available). For production systems, use the
        official support channel provided by the operator.
      </>
    ),
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-20 pb-16">
      <section className="container mx-auto px-6 lg:px-8">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
          <p className="mt-3 text-muted-foreground">
            Answers to common questions about accounts, transactions, fees and
            security. If you don't find your question, please{" "}
            <Link to="/contact" className="text-primary underline">
              contact support
            </Link>
            .
          </p>
        </header>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {faqList.map((item, idx) => (
            // <details
            //   key={idx}
            //   className="group rounded-md border bg-card p-4 open:shadow-sm"
            // >
            //   <summary className="cursor-pointer list-none text-lg font-medium">
            //     <span>{item.q}</span>
            //     <span className="float-right text-muted-foreground group-open:rotate-90 transition-transform">
            //       ▶
            //     </span>
            //   </summary>
            //   <div className="mt-3 text-sm text-muted-foreground">{item.a}</div>
            // </details>
            <Accordion key={idx} type="single" collapsible>
              <AccordionItem value={`item-${idx}`}>
                <AccordionTrigger> {item.q} </AccordionTrigger>
                <AccordionContent>
                  <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>

        <footer className="mt-10 text-sm text-muted-foreground">
          <p>
            Still need help? Visit the{" "}
            <Link to="/contact" className="text-primary underline">
              Contact
            </Link>{" "}
            page or open a support ticket.
          </p>
        </footer>
      </section>
    </main>
  );
}
