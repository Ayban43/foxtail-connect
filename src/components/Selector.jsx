import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const Selector = ({ clients, onClientSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(0);

  const handleClientSelect = (clientEmail) => {
    setSelected(clientEmail);
    setOpen(false);
    setInputValue("");
    onClientSelect(clientEmail); // pass the selected email
  };

  const ulStyle = {
    zIndex: 10,
    minWidth: `${width}px`,
  };

  return (
    <div className="font-medium">
      <div
        onClick={() => {
          setOpen(!open);
          setWidth(document.getElementById("selector-wrapper").offsetWidth);
        }}
        className={`bg-white w-full p-2 border border-gray-200 rounded-lg shadow-sm flex items-center justify-between relative ${!selected && "text-gray-700"
          }`}
        style={{ zIndex: 10 }}
      >                                                                                                                                                                                                                                                                                                                                                                                     
        {selected ? (
          
          <div className="flex flex-col">
            {/* {selected} */}
            <span className="text-gray-700 text-sm font-medium">{selected.business_name}</span>
            {/* <span className="text-gray-500 text-sm">{selected.email}</span> */}
          </div>
        ) : (
          <div className="text-gray-700 text-sm font-medium">Select Client</div>
        )}
        <BiChevronDown size={15} className={`${open && "rotate-180"}`} />
      </div>
      <div
        id="selector-wrapper"
        className="relative"
        style={{ zIndex: 9 }}
      >
        <ul
          className={`bg-white mt-2 overflow-y-auto absolute ${open ? "max-h-60 border border-gray-200 rounded-lg shadow-sm" : "max-h-0"
            }`}
          style={ulStyle}
        >
          <div className="flex items-center p-2 sticky top-0 bg-slate-50 border-s-slate-900 border border-b-gray-300">
            <AiOutlineSearch size={18} className="text-gray-700" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toLowerCase())}
              placeholder="Enter business name"
              className="placeholder:text-gray-700 p- outline-none text-base font-normal w-full"
            />
          </div>
          {clients?.map((client) => (
            <li
              key={client?.email}
              className={`p-2 text-sm hover:bg-orange-100 hover:text-white
              ${client?.email?.toLowerCase() === selected?.email?.toLowerCase() &&
                "bg-orange-200 text-white"
                }
              ${client?.business_name?.toLowerCase().startsWith(inputValue)
                  ? "block"
                  : "hidden"
                }`}
              onClick={() => {
                if (client?.email && client.email.toLowerCase()) {
                  setSelected(client);
                  setOpen(false);
                  setInputValue("");
                  handleClientSelect(client);
                }
              }}
            >
              <div className="flex flex-col">
                <span className="text-gray-700 text-sm font-medium">{client.business_name}</span>
                {/* <span className="text-gray-500 text-sm">{client.email}</span> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Selector;
