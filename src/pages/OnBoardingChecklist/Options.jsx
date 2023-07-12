import React, { useState } from 'react';

const Options = ({ onChange, selectedOption }) => {
    const [hoveredOption, setHoveredOption] = useState(null);

    const handleMouseEnter = (option) => {
        setHoveredOption(option);
    };

    const handleMouseLeave = () => {
        setHoveredOption(null);
    };

    const getLabelClassName = (option) => {
        let className = 'bg-white cursor-pointer block w-full rounded-lg border-2 border-gray-200 p-3';
        if (selectedOption === option) {
            if (option === 'Not Applicable') {
                className += ' peer-checked:bg-red-600 peer-checked:text-white';
            } else if (option === 'Open') {
                className += ' peer-checked:bg-yellow-500 peer-checked:text-white';
            } else if (option === 'Complete') {
                className += ' peer-checked:bg-green-600 peer-checked:text-white';
            }
        } else if (hoveredOption === option) {
            className += ' hover:border-orange-400';
        } else {
            className += ' hover:border-orange-200';
        }
        return className;
    };

    const getLabelText = (option) => {
        if (option === 'Open' && hoveredOption === option) {
            return 'Documents are ready for uploading';
        } else if (option === 'Complete' && hoveredOption === option) {
            return 'All documents are uploaded';
        } else if (option === 'Not Applicable' && hoveredOption === option) {
            return 'No documents to upload';
        }
        return option;
    };

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
                        value="Not Applicable"
                        onChange={onChange}
                        checked={selectedOption === 'Not Applicable'}
                    />

                    <label
                        htmlFor="option1"
                        className={getLabelClassName('Not Applicable')}
                        tabIndex="0"
                        onMouseEnter={() => handleMouseEnter('Not Applicable')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <span className={`text-sm font-medium overflow-hidden transition-transform ${hoveredOption === 'Not Applicable' ? 'hover:-translate-y-2' : ''}`}>
                            {getLabelText('Not Applicable')}
                        </span>
                    </label>
                </div>

                <div>
                    <input
                        className="peer sr-only"
                        id="option2"
                        type="radio"
                        tabIndex="-1"
                        name="option"
                        value="Open"
                        onChange={onChange}
                        checked={selectedOption === 'Open'}
                    />

                    <label
                        htmlFor="option2"
                        className={getLabelClassName('Open')}
                        tabIndex="0"
                        onMouseEnter={() => handleMouseEnter('Open')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <span className={`text-sm font-medium overflow-hidden transition-transform ${hoveredOption === 'Open' ? 'hover:-translate-y-2' : ''}`}>
                            {getLabelText('Open')}
                        </span>
                    </label>
                </div>

                <div>
                    <input
                        className="peer sr-only"
                        id="option3"
                        type="radio"
                        tabIndex="-1"
                        name="option"
                        value="Complete"
                        onChange={onChange}
                        checked={selectedOption === 'Complete'}
                    />

                    <label
                        htmlFor="option3"
                        className={getLabelClassName('Complete')}
                        tabIndex="0"
                        onMouseEnter={() => handleMouseEnter('Complete')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <span className={`text-sm font-medium overflow-hidden transition-transform ${hoveredOption === 'Complete' ? 'hover:-translate-y-2' : ''}`}>
                            {getLabelText('Complete')}
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Options;
