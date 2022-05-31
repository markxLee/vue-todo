import React, { useEffect, useRef } from 'react';

const useFirstMount = () => {
	const firstMountRef = useRef(true);

	useEffect(() => {
		if (firstMountRef.current) {
			firstMountRef.current = false;
		}
	}, []);

	return { isFirstMount: firstMountRef.current };
};

export default useFirstMount;
