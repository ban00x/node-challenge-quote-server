import React, { useState } from 'react';
const GetQuote = () => {
	const [test, updateTest] = useState('');
	const handleClick = () => {
		fetch('http://localhost:5000/quotes/random')
			.then((res) => res.json())
			.then((data) => {
				updateTest(data);
			});
	};
	const LoadQuote = () => {
		if (test) {
			return (
				<div className='quote-container'>
					<h1>{test.quote}</h1>
					<p>{test.author}</p>
				</div>
			);
		} else return null;
	};

	return (
		<div>
			<button className='get-quote-btn' onClick={handleClick}>
				Get a random quote
			</button>
			<LoadQuote />
		</div>
	);
};
export default GetQuote;
