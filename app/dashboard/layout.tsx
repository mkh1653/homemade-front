import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "@/src/components/layout/Sidebar";
import Header from "@/src/components/layout/Header";
import { BreadcrumbsProvider } from "@/src/components/layout/Breadcrumbs";
import Providers from "./Providers";
import "@fortawesome/fontawesome-svg-core/styles.css";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  if (!token || token!.value.length === 0) {
    redirect("/login");
  }
  return (
    <Providers>
      <div className='flex min-h-screen bg-base-100 text-base-content items-stretch'>
        <BreadcrumbsProvider>
          <Sidebar />
          <main className='flex-1 p-8'>
            <Header />
            <div className='container'>{children}</div>
          </main>
        </BreadcrumbsProvider>
      </div>
    </Providers>
  );
}
