import Link from "next/link";

interface BaseDataCardProps {
  title: string;
  desc?: string;
  link: string;
}

const LinkCard: React.FC<BaseDataCardProps> = ({ title, desc, link }) => {
  return (
    <div className='card bg-primary text-primary-content rounded-lg shadow-lg'>
      <div className='card-body'>
        <h2 className='card-title'>{title}</h2>
        {desc && <p>{desc}</p>}
        <div className='card-action flex-end mt-3'>
          <Link className='btn btn-sm btn-neutral rounded-lg' href={link}>
            مشاهده
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
