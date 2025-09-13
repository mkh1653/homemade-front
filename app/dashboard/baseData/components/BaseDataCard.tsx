import Link from "next/link";

interface BaseDataCardProps {
  title: string;
  desc: string;
  link: string;
}

const BaseDataCard: React.FC<BaseDataCardProps> = ({ title, desc, link }) => {
  return (
    <div className='card bg-primary text-primary-content rounded-lg shadow-lg'>
      <div className='card-body'>
        <h2 className='card-title'>{title}</h2>
        <p>{desc}</p>
        <div className='card-action flex-end'>
          <Link className='btn btn-neutral rounded-xl' href={link}>
            مشاهده
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BaseDataCard;
