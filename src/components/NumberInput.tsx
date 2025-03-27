import React, { useState, useCallback } from 'react';

interface NumberInputProps {
    onNumbersChange: (numbers: number[]) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ onNumbersChange }) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        const numbers = value
            .split(',')
            .map(Number)
            .filter(num => Number.isInteger(num) && num >= 0);

        onNumbersChange(numbers);
    }, [onNumbersChange]);

    return (
        <div>
            <label htmlFor="numbers">Nhập dãy số (phân tách bằng dấu phẩy):</label>
            <input
                type="text"
                id="numbers"
                value={inputValue}
                onChange={handleChange}
                style={{ width: '200px', height: '40px', padding: '10px', marginLeft: '10px' }}
            />
        </div>
    );
};

export default NumberInput;