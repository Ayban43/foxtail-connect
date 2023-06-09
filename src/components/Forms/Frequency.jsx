import React from 'react';

const Frequency = ({ onChange, frequency }) => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
        <div>
          <input
            className="peer sr-only"
            id="option1"
            type="radio"
            tabIndex="-1"
            name="option"
            value="Annual"
            onChange={onChange}
            checked={frequency === 'Annual'}
          />

          <label
            htmlFor="option1"
            className="bg-white cursor-pointer block w-full rounded-lg border-2 border-gray-200 p-3 hover:border-orange-200 peer-checked:border-orange-200 peer-checked:bg-orange-300 peer-checked:text-white"
            tabIndex="0"
          >
            <span className="text-sm font-medium"> Annual </span>
          </label>
        </div>

        <div>
          <input
            className="peer sr-only"
            id="option2"
            type="radio"
            tabIndex="-1"
            name="option"
            value="Monthly"
            onChange={onChange}
            checked={frequency === 'Monthly'}
          />

          <label
            htmlFor="option2"
            className="bg-white  cursor-pointer block w-full rounded-lg border-2 border-gray-200 p-3 hover:border-orange-200 peer-checked:border-orange-200 peer-checked:bg-orange-300 peer-checked:text-white"
            tabIndex="0"
          >
            <span className="text-sm font-medium"> Monthly </span>
          </label>
        </div>

        <div>
          <input
            className="peer sr-only"
            id="option3"
            type="radio"
            tabIndex="-1"
            name="option"
            value="Quarterly"
            onChange={onChange}
            checked={frequency === 'Quarterly'}
          />

          <label
            htmlFor="option3"
            className="bg-white cursor-pointer block w-full rounded-lg border-2 border-gray-200 p-3 hover:border-orange-200 peer-checked:border-orange-200 peer-checked:bg-orange-300 peer-checked:text-white"
            tabIndex="0"
          >
            <span className="text-sm font-medium"> Quarterly </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Frequency;
