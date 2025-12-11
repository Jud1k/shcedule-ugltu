interface FormAutocompleteListProps
  extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

export const List = ({ children, ...props }: FormAutocompleteListProps) => {
  return (
    <ul
      className="list absolute z-10 w-full mt-1 border bg-gray-900 border-gray-600 rounded-lg shadow-xl max-h-60 overflow-auto backdrop-blur-sm"
      {...props}
    >
      {children}
    </ul>
  );
};
