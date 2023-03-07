import React, { useEffect, useState } from 'react';
import './App.css';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { API, graphqlOperation } from 'aws-amplify';
import { ListZellerCustomers } from './graphql/queries';
import CustomerList from './components/CustomerList';
Amplify.configure(awsconfig);

export type GetCustomersQuery = {
  listZellerCustomers: {
    items: [
      {
        email: string;
        id: string;
        name: string;
        role: string;
      }
    ];
  };
};

function App() {
  const [customers, setCustomers]: any = useState([]);
  const [filteredCustomers, setfilteredCustomers]: any = useState([]);
  const [selectedOption, setSelectedOption]: any = useState('admin');

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);

    const filteredCustomers = customers.filter(
      (customer: any) => customer.role.toLowerCase() == event.target.value
    );
    setfilteredCustomers(filteredCustomers);
  };

  const fetchAllCustomers = async () => {
    try {
      const result = (await API.graphql(
        graphqlOperation(ListZellerCustomers)
      )) as {
        data: GetCustomersQuery;
      };

      setCustomers(result?.data?.listZellerCustomers?.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  useEffect(() => {
    const filteredCustomers = customers.filter(
      (customer: any) => customer.role.toLowerCase() == selectedOption
    );
    setfilteredCustomers(filteredCustomers);
  }, [customers]);

  return (
    <div className="container mx-auto flex flex-col p-12 text-lg">
      <h1 className="text-4xl">User Types</h1>
      <div className="mt-6 ">
        <div className="flex flex-col">
          <label
            style={
              selectedOption === 'admin' ? { backgroundColor: 'aliceblue' } : {}
            }
            className="flex items-center p-4 rounded-lg"
          >
            <input
              className="w-[20px] h-[20px]"
              type="radio"
              value="admin"
              checked={selectedOption === 'admin'}
              onChange={handleOptionChange}
            />
            <span className="ml-2">Admin</span>
          </label>
          <label
            style={
              selectedOption === 'manager'
                ? { backgroundColor: 'aliceblue' }
                : {}
            }
            className="flex items-center p-4 rounded-lg"
          >
            <input
              className="w-[20px] h-[20px]"
              type="radio"
              value="manager"
              checked={selectedOption === 'manager'}
              onChange={handleOptionChange}
            />
            <span className="ml-2">Manager</span>
          </label>
        </div>
      </div>
      <hr className="my-8" />
      <CustomerList
        filteredCustomers={filteredCustomers}
        selectedOption={selectedOption}
      />
      <hr className="my-8" />
    </div>
  );
}

export default App;
