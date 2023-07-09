import React, { useEffect, useState } from 'react';

import { doc, getDoc } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import { db } from "../../config/firebase";

function EventDetail() {
	const [event, setEvent] = useState({title: ''});
	const {event_id} = useParams();

	useEffect(() => {
		const getEvent = async () => {
			try {
				const docRef = doc(db, "events", event_id);
				const docSnap = await getDoc(docRef);
				setEvent(docSnap)
			} catch (err) {
				console.error(err)
			}
		};
	}, []);

	return (
		<div>
			<p>{event.title}</p>
		</div>
	);
}

export default EventDetail;