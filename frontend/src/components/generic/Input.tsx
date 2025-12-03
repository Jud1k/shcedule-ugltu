import { cn } from '@/lib/utils';
import { Search } from './Icons';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ className, ...props }: InputProps) => {
  return (
    <div className="relative">
      <input
        className={cn('input input-bordered w-full', className)}
        {...props}
      />
    </div>
  );
};

const SearchInput = ({ className, ...props }: InputProps) => {
  return (
    <label className={cn('input input-bordered w-full', className)}>
      <Search />
      <input type="search" {...props} />
    </label>
  );
};

export { Input, SearchInput };
