import React from 'react';

export default function Select({
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className="select select-bordered w-full" {...props}></select>;
}
