import React from 'react';
import Link from 'next/link';
import { COMPANY_ROUTE } from 'routes';
import { companies } from 'constants';

const CompaniesContainer = () => (
  <div className="flex items-center overflow-x-scroll mt-4">
    {
      companies?.map((company) => (
        <Link href={`${COMPANY_ROUTE}/${company.id}`} key={`home-company-${company.id}`}>
          <div className="bg-gray-900 shadow-2xl p-4 my-3 mr-3 cursor-pointer border-2 border-transparent hover:border-primary rounded-md transition duration-300">
            <div style={{ backgroundImage: `url(${company.img})` }} className="bg-transparent bg-no-repeat bg-contain bg-center w-36 rounded-md h-14" />
          </div>
        </Link>
      ))
    }
  </div>
);

export default CompaniesContainer;
