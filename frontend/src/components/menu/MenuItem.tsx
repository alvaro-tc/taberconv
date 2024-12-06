// frontend/src/components/menu/MenuItem.tsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IconType } from 'react-icons';

interface MenuItemProps {
  onClick?: () => void;
  catalog: string;
  listItems: Array<{
    isLink: boolean;
    url?: string;
    icon: IconType;
    label: string;
    onClick?: () => void;
  }>;
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  catalog,
  listItems,
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-stretch gap-2">
      <span className="hidden xl:block px-2 xl:text-sm 2xl:text-base 3xl:text-lg uppercase">
        {catalog}
      </span>
      {listItems.map((listItem, index) => {
        if (listItem.isLink) {
          return (
            <NavLink
              key={index}
              onClick={onClick}
              to={listItem.url || ''}
              className={({ isActive }) =>
                isActive
                  ? 'btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-active btn-ghost btn-block justify-start'
                  : 'btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-ghost btn-block justify-start'
              }
            >
              <listItem.icon className="text-xl 2xl:text-2xl 3xl:text-3xl" />
              <span className="text-sm 2xl:text-base 3xl:text-lg">
                {listItem.label}
              </span>
            </NavLink>
          );
        } else if (listItem.onClick) {
          return (
            <button
              key={index}
              onClick={listItem.onClick}
              className="btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-ghost btn-block justify-start"
            >
              <listItem.icon className="text-xl 2xl:text-2xl 3xl:text-3xl" />
              <span className="text-sm 2xl:text-base 3xl:text-lg">
                {listItem.label}
              </span>
            </button>
          );
        } else {
          return <listItem.icon key={index} />;
        }
      })}
    </div>
  );
};

export default MenuItem;