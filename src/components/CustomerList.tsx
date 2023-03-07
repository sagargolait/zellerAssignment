import React from 'react';
import { camelize } from '../utils/util';

const CustomerList = React.memo(
  ({ filteredCustomers, selectedOption }: any) => {
    return (
      <>
        <h1 className="text-4xl">{`${camelize(selectedOption)} Users`}</h1>
        <div className="mt-2 flex flex-col">
          {filteredCustomers?.map((item: any) => (
            <ul key={item.id}>
              <li className="flex gap-4 my-2 items-center text-medium">
                <span className="px-6 py-4 rounded-md bg-sky-50 outline-none text-sky-600">
                  {item.name.charAt(0)}
                </span>
                <div className="flex flex-col">
                  <span className="text-md text-current">{item.name}</span>
                  <span className="text-sm text-stone-400">
                    {camelize(item.role)}
                  </span>
                </div>
              </li>
            </ul>
          ))}
        </div>
      </>
    );
  }
);

export default CustomerList;
