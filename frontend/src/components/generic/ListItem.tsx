import React from 'react';

interface FormAutocompleteItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

export const ListItem = ({ children, ...props }: FormAutocompleteItemProps) => {
  return (
    <li
      className="p-3 cursor-pointer text-white bg-gray-900 hover:bg-gray-700 hover:text-white border-b border-gray-700 last:border-b-0 transition-all duration-200 hover:pl-4"
      {...props}
    >
      {children}
    </li>
  );
};
