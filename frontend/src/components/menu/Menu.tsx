// frontend/src/components/menu/Menu.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { menu } from './data';
import MenuItem from './MenuItem';

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-5">
        {menu(navigate).map((item, index) => (
          <MenuItem
            key={index}
            catalog={item.catalog}
            listItems={item.listItems}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;