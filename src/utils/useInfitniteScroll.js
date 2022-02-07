// // https://upmostly.com/tutorials/build-an-infinite-scroll-component-in-react-using-react-hooks

import { useState, useEffect } from "react";

const useInfiniteScroll = (callback) => {
	const [isFetching, setIsFetching] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		console.log("eventlistnered added");
		//remove the eventhandler when the component unmounts
		return () => {
			window.removeEventListener("scroll", handleScroll);
			console.log("eventlistener removed");
		};
	}, []);

	useEffect(() => {
		if (!isFetching) return;
		callback(() => {
			console.log("called back");
		});
	}, [isFetching]);

	function handleScroll() {
		if (
			window.innerHeight + document.documentElement.scrollTop !==
				document.documentElement.offsetHeight ||
			isFetching
		) {
			return;
		}
		setIsFetching(true);
	}

	return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
