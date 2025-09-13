import React from "react";
import ProviderTable from "./components/ProviderTable";

async function getProviders() {
  // در آینده، اینجا با یک API یا ORM ارتباط برقرار می‌کنید
  // const res = await fetch('https://api.example.com/providers');
  // const data = await res.json();
  // return data;

  // فعلاً از داده‌های نمونه استفاده می‌کنیم
  return [
    { id: "1", name: "رضا حسینی", skills: ["UI/UX", "Figma"], rating: 5 },
    {
      id: "2",
      name: "مریم احمدی",
      skills: ["برنامه‌نویسی", "React"],
      rating: 4,
    },
    { id: "3", name: "علی کریمی", skills: ["گرافیک", "Photoshop"], rating: 5 },
    {
      id: "4",
      name: "سارا امینی",
      skills: ["مدیریت پروژه", "Scrum"],
      rating: 3,
    },
  ];
}

const ProvidersPage = async () => {
  const providers = await getProviders();

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-3xl font-bold text-base-content'>متخصصین</h1>
      <ProviderTable providers={providers} />
    </div>
  );
};

export default ProvidersPage;
