import React from "react";
import { headers } from "next/headers";
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
  const headersList = await headers();
  const cookieHeader = headersList.get("cookie");
  let token = null;

  if (cookieHeader) {
    const cookiesArray = cookieHeader.split(";").map((cookie) => cookie.trim());
    const accessTokenCookie = cookiesArray.find((cookie) =>
      cookie.startsWith("access_token=")
    );

    if (accessTokenCookie) {
      token = accessTokenCookie.split("=")[1];
      console.log(token)
    }
  }
  if (!token || token.length === 0) {
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
