import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { BreadcrumbsProvider } from "./components/Breadcrumbs";
import Providers from "./Providers";

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
      <div
        className='flex min-h-screen bg-base-100 text-base-content'
        dir='rtl'>
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
