"use client";

interface DrawerProps {
  children: React.ReactNode;
  side: "start" | "end";
  id: string;
  size: "sm" | "md" | "lg";
}

const Drawer: React.FC<DrawerProps> = ({ children, side, id, size }) => {
  return (
    <div
      className={`drawer ${
        side === "start" ? "drawer-start" : side === "end" ? "drawer-end" : ""
      }`}>
      <input id={id} type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'></div>
      <div className='drawer-side backdrop-blur-md'>
        <label
          htmlFor={id}
          aria-label='close sidebar'
          className='drawer-overlay'></label>
        <div
          className={`menu bg-base-200 text-base-content min-h-full p-4 ${
            size === "sm"
              ? "w-80"
              : size === "md"
              ? "w-96"
              : size === "lg"
              ? "w-4xl"
              : ""
          }`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
