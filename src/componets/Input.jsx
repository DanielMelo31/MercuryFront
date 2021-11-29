import React from 'react';

const Input = ({ label, name, type, required, defaultValue }) => {
	return (
		<label htmlFor={name} className="flex flex-col my-3">
			<span>{label}</span>
			<input
				type={type}
				name={name}
				className="input"
				defaultValue={defaultValue}
                required={required}
			/>
		</label>
	);
};

export default Input;
