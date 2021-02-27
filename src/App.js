import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://course-api.com/react-tours-project";

function App() {
	const [loading, setLoading] = useState(true);
	const [tours, setTours] = useState([]);

	const fetchTours = async () => {
		setLoading(true);
		try {
			const response = await fetch(url);
			const tours = await response.json();
			setLoading(false);
			setTours(tours);
		} catch (err) {
			setLoading(true);
			console.log(err);
		}
	};

	const removeTour = (id) => {
		const newTours = tours.filter((tour) => tour.id !== id);
		setTours(newTours);
	};

	useEffect(() => {
		fetchTours();
	}, []);

  console.log(tours.length);
	return (
		<main>
			{
      loading ? (
				<Loading />
			) : tours.length <= 0 ? (
				<div className="title">
					<h2>no tours left</h2>
					<button onClick={ () => fetchTours() } className="btn">Refresh</button>
				</div>
			) : (
				<Tours tours={tours} removeTour={removeTour} />
      )}
		</main>
	);
}

export default App;
