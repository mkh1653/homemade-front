import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Rating from "../../../../src/components/ui/Rating";

interface Provider {
  id: string;
  name: string;
  bio: string;
  skills: string[];
  rating: number;
}

async function getProvider(id: string): Promise<Provider | null> {
  // در دنیای واقعی، اینجا با دیتابیس یا API ارتباط می‌گیرید
  // برای مثال، با استفاده از fetch
  // const res = await fetch(`https://api.example.com/providers/${id}`);
  // if (!res.ok) {
  //   return null;
  // }
  // return res.json();

  // داده‌های نمونه
  const allProviders: Provider[] = [
    {
      id: "1",
      name: "رضا حسینی",
      bio: "متخصص در طراحی رابط کاربری و تجربه کاربری با فریم‌ورک فیگما.",
      skills: ["UI/UX", "Figma", "Prototyping"],
      rating: 5,
    },
    {
      id: "2",
      name: "مریم احمدی",
      bio: "توسعه‌دهنده React با تجربه در ساخت اپلیکیشن‌های تک‌صفحه‌ای.",
      skills: ["برنامه‌نویسی", "React", "TypeScript"],
      rating: 4,
    },
    // ... اضافه کردن فریلنسرهای بیشتر
  ];

  return allProviders.find((provider) => provider.id === id) || null;
}

export default async function ProviderProfilePage({
  params,
}: {
  params: { providerId: string };
}) {
  const provider = await getProvider(params.providerId);

  if (!provider) {
    notFound();
  }

  return (
    <div className='flex flex-col items-center bg-base-100 gap-4'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <div className='card w-full bg-base-200 shadow-xl p-8'>
          {/* Image */}
          <div className='flex justify-center'>
            <div className='avatar'>
              <div className='rounded-full ring-primary ring-offset-base-200 ring-2 ring-offset-4 w-30 '>
                <Image
                  src='/user.jpg'
                  width={200}
                  height={200}
                  alt={provider.name}
                />
              </div>
            </div>
          </div>
          <div className='divider'>
            <Rating
              rate={provider.rating}
              title='میانگین امتیاز'
              size='xs'
              readonly
            />
          </div>
          {/* Name and bio */}
          <div>
            <h1 className='text-3xl font-bold text-base-content text-center mb-4'>
              {provider.name}
            </h1>
            <p className='text-base-content text-md'>{provider.bio}</p>
          </div>
        </div>
        <div className='card col-span-2 bg-base-200 shadow-xl'>
          <div className='card-body'>
            <div className='card-title mb-3'>
              <h4 className='text-2xl font-bold'>مهارت‌ها</h4>
            </div>
            <div className='flex flex-wrap gap-2 mb-4'>
              {provider.skills.map((skill, index) => (
                <div
                  key={index}
                  className='badge badge-lg badge-neutral text-lg'>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {[...Array(5)].map((order, i) => (
          <div className='card bg-neutral' key={i}>
            <div className='card-body'>
              <div className='card-title'>
                <h4 className='text-lg font-semibold'>پخت خورشت قیمه خانگی</h4>
              </div>
              <div className='text-sm line-clamp-3'>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان
                جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد
                وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
