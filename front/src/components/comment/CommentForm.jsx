import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';

function CommentForm() {
	const {event_id} = useParams();
	const [formData, setFormData] = useState({
		comment: '', nickname: '', userId: '', eventId: event_id});

	const handleSubmit = async (e) => {
		try {
			const docRef = await addDoc(collection(db, 'comments'), {
				formData: formData
			});
			console.log("Document written with ID: ", docRef.id);
		} catch (err) {
			console.log(`Error: ${JSON.stringify(err)}`);
		}
	};

	// const addEvent = async (e) => {
    //     try {
    //         const docRef = await addDoc(collection(db, "events"), {
    //           event: event
    //         });
    //         console.log("Document written with ID: ", docRef.id);
    //       } catch (e) {
    //         console.error("Error adding document: ", e);
    //       }
    // }	

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label for="comment">
						感想を記入してください。みなさんの感想をもとに画像を生成します。<br/>
					</label>
					<textarea name="comment" onChange={(e) => setFormData({ ...formData, comment: e.target.value })} />
				</div>
				<div>
					<label for="nickname">
						ニックネーム<br/>
					</label>
					<input name="nickname" type="text" onChange={(e) => setFormData({ ...formData, nickname: e.target.value })} />
				</div>
				<div>
					<input type="submit" value="Send" />
				</div>
			</form>
		</div>
	)
}

export default CommentForm