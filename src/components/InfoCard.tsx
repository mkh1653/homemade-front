import React from "react";

interface InfoCardProps {
  title: React.ReactNode | string;
  content: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, content }) => {
  return (
    <div className='card w-full bg-primary-content shadow-xl rounded-2xl'>
      <div className='card-body text-primary'>
        <h2 className='card-title'>{title}</h2>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default InfoCard;
