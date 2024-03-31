import React,{useState,useEffect,Fragment} from 'react'
import { Listbox, Transition } from "@headlessui/react";
const index = () => {

    const DropDowns = ({ list }) => {
        const [selected, setSelected] = useState(list[0]);
        return (
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <Listbox.Button className="py-2.5 px-2 border border-[#E7E7E7] flex justify-center items-center gap-1 rounded text-sm text-[#637381] font-normal">
                <span className="block truncate">{selected.name}</span>{" "}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="14" height="14" fill="white" />
                  <path
                    d="M11 5L7.5 8.5L4 5"
                    stroke="#637381"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 z-50 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm min-w-[100px]">
                  {list?.map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-2 pr-4 ₹{
                          active ? "bg-[#F6F8FA] text-gray-900" : "text-gray-900"
                        }`
                      }
                      value={person}
                    >
                      {({ selected }) => (
                        <span
                          className={`block truncate ₹{
                            selected
                              ? "font-medium text-[#212B36]"
                              : "font-normal text-[#637381]"
                          }`}
                        >
                          {person.name}
                        </span>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        );
      };
      const people = [
        { name: "This weekly" },
        { name: "This monthly" },
        { name: "This yearly" },
      ];
    const cardData = [
  {
    type: "Today Sales",
    percentage: "50.43%",
    arrow: "/assets/admin/dashboard/uparrow.svg",
    graph: "/assets/admin/dashboard/graph1.svg",
    price: "₹ 329.50",
  },
  {
    type: "Yesterday Sales",
    percentage: "12.32%",
    arrow: "/assets/admin/dashboard/uparrow.svg",
    graph: "/assets/admin/dashboard/graph1.svg",
    price: "₹ 200.00",
  },
  {
    type: "Weekly Sales",
    percentage: "10.89%",
    arrow: "/assets/admin/dashboard/downarrow.svg",
    graph: "/assets/admin/dashboard/graph3.svg",
    price: "₹ 200.00",
  },
  {
    type: "Monthly Sales",
    percentage: "20.92%",
    arrow: "/assets/admin/dashboard/uparrow.svg",
    graph: "/assets/admin/dashboard/graph4.svg",
    price: "₹ 200.00",
  },
];
const TableData = [
    {
      id: 12809,
      product: "Apple Macbook Pro...",
      order: "20/03/2023,01:10",
      status: "Waiting Payment",
      Qty: "x1",
      price: "₹4.012",
      color: "#DD6107",
      image: "/assets/admin/dashboard/user2.png",
      customer: "Omar Griffith",
    },
    {
      id: 12808,
      product: "iBox iPhone 14Pro...",
      order: "20/03/2023,01:10",
      status: "Transition Done",
      Qty: "x1",
      price: "₹2.092",
      customer: "Omar Griffith",
      image: "/assets/admin/dashboard/user3.png",
      color: "#10B860",
    },
    {
      id: 12807,
      product: "Apple Macbook Pro...",
      order: "20/03/2023,01:10",
      status: "Transition Done",
      Qty: "x1",
      price: "₹1.089",
      customer: "Omar Griffith",
      image: "/assets/admin/dashboard/user4.png",
      color: "#10B860",
    },
    {
      id: 12806,
      product: "Apple Macbook Pro...",
      order: "20/03/2023,01:10",
      status: "Delivery to Cust",
      Qty: "x3",
      price: "₹833",
      customer: "Omar Griffith",
      image: "/assets/admin/dashboard/user5.png",
      color: "#4F80E1",
    },
    {
      id: 12805,
      product: "iBox iPhone 14Pro...",
      order: "20/03/2023,01:10",
      status: "Cancel",
      Qty: "x3",
      price: "₹1.458",
      customer: "Omar Griffith",
      image: "/assets/admin/dashboard/user6.png",
      color: "#FB4949",
    },
  ];
const [openSideBar, setOpenSieBar] = useState(true);
  const changeSideBar = () => {
    setOpenSieBar(!openSideBar);
  };
  const showMenuItems = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className='min-h-screen' >
        
        <div className='lg:ml-64' >
        <div className="w-full py-3 pl-7 pr-5 grid xl:grid-cols-12 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 justify-start">
        {cardData?.map((data, key) => (
              <div
                className="p-5 xl:col-span-3 bg-white flex flex-col max-w-xs 2xl:max-w-none w-full rounded-xl gap-2 border border-[#E7E7E7] hover:shadow-xl cursor-pointer"
                key={key}
              >
                <div
                  className={`flex justify-between ₹{
                    openSideBar ? " sm:flex-col md:flex-row" : " sm:flex-row"
                  }`}
                >
                  <span className="text-[#637381] text-sm font-medium">
                    {data?.type}
                  </span>
                  {/* <div className="flex gap-1 items-center">
                    <span className="">{data?.percentage}</span>
                  </div> */}
                </div>
                <div
                  className={`flex gap-4  justify-between ₹{
                    openSideBar
                      ? "flex-wrap sm:flex-col md:flex-row items-end md:flex-nowrap"
                      : "flex-nowrap items-center"
                  }`}
                >
                  <span className="text-2xl font-bold whitespace-nowrap">
                    {data?.price}
                  </span>
                
                </div>
              </div>
            ))}
            </div>

            <div className="flex items-center justify-between flex-wrap gap-1">
                <span className="text-[#212B36] text-base font-semibold -tracking-[0.15px] whitespace-nowrap">
                  Recent Payments
                </span>
                <DropDowns list={people} />
              </div>
              <div className="w-full overflow-x-scroll md:overflow-auto max-w-xl xs:max-w-xl sm:max-w-xl md:max-w-7xl 2xl:max-w-none mt-1">
                <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border-separate border-spacing-y-1">
                  <thead className="bg-[#222E3A]/[6%] rounded-lg text-base text-white font-semibold w-full">
                    <tr className="">
                      <th className="py-3 pl-3 text-[#212B36] text-sm font-normal whitespace-nowrap rounded-l-lg">
                       Date & Time
                      </th>
                      <th className="py-3 pl-1 text-[#212B36] text-sm font-normal whitespace-nowrap">
                       Customer Name
                      </th>
                      <th className="py-3 text-[#212B36] text-sm font-normal whitespace-nowrap">
                      Purpose
                      </th>
                     
                      <th className="py-3 px-2.5 text-[#212B36] text-sm font-normal whitespace-nowrap">
                        Order Id
                      </th>
                      <th className="py-3 text-[#212B36] text-sm font-normal whitespace-nowrap">
                        Amount
                      </th>
                      <th className="py-3 text-[#212B36] text-sm font-normal whitespace-nowrap">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {TableData.map((data) => (
                      <tr
                        key={data.id}
                        className="drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] bg-[#f6f8fa] hover:shadow-2xl cursor-pointer"
                      >
                        <td className="py-4 pl-3 text-sm font-normal text-[#637381] rounded-l-lg">
                          30/03/2024 , 12:50PM
                        </td>
                        <td className="py-4 px-1 text-sm font-normal text-[#637381]">
                        Rohit Kumar
                        </td>
                        <td className="py-4 px-1 text-sm font-normal text-[#637381]">
                        Shopping
                        </td>
                        
                        <td className="py-4 px-2.5 text-sm font-normal text-[#637381]">
                          #7452154
                        </td>
                        <td className="py-4 px-1 text-sm font-normal text-[#637381]">
                          {data.price}
                        </td>
                        <td
                          className="py-4 px-1 text-sm font-normal text-[#637381]"
                          style={{
                            color: data?.color,
                          }}
                        >
                          {data.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
        </div>
    </div>
  )
}

export default index