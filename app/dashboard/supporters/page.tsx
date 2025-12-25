"use client";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useSupporterList } from "@/src/hooks/supporter/useSupporters";
import Avatar from "@/src/components/ui/Avatar";
import { toJalali } from "@/src/lib/utils/convertDate";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Supporters: React.FC = () => {
  const { data, isLoading } = useSupporterList();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className='flex justify-between'>
        <button
          className='btn btn-primary rounded-xl'
          onClick={() => router.push("supporters/create")}>
          <span>ساخت پشتیبان جدید</span>
          <FontAwesomeIcon icon={faPlus} size='1x' />
        </button>
      </div>
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>نام و نام‌خانودگی</th>
              <th>ایمیل</th>
              <th>وضعیت</th>
              <th>تاریخ عضویت</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((supporter) => (
              <tr
                className='cursor-pointer duration-300 transition hover:even:bg-neutral hover:even:neutral-content'
                key={supporter.publicId}>
                <td>
                  <div className='flex items-center'>
                    <div className='ml-2'>
                      {supporter.person.avatar ? (
                        <Avatar src={supporter.person.avatar} size='sm' />
                      ) : (
                        <Avatar src='/default-profile.jpg' size='sm' />
                      )}
                    </div>
                    <span>{supporter.person.firstName}</span>
                    &nbsp;
                    <span>{supporter.person.lastName}</span>
                  </div>
                </td>
                <td>{supporter.person.email}</td>
                <td>
                  {supporter.person.user.isActive ? (
                    <div className='badge badg-soft badge-sm badge-success'>
                      فعال
                    </div>
                  ) : (
                    <div className='badge badg-soft badge-sm badge-error'>
                      غیر فعال
                    </div>
                  )}
                </td>
                <td>{toJalali(supporter.person.createdAt)}</td>
                <td>
                  <button className='btn btn-error btn-sm rounded-lg'>
                    <span>حذف</span>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Supporters;
