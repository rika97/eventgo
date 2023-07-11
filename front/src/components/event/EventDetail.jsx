import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { db } from "../../config/firebase";


function EventDetail() {
	const [commentList, setCommentList] = useState([]);

	const event = {
		details: "KDDI Developers Hacksは、KDDIが提供する学生向けのハッカソンです。今回で第7回目の開催となる本イベントは、これからの未来を切り拓く学生の皆さんを対象とした共創の場です。KDDIグループ全体の技術力を体感することができるイベント内容となっています。エネルギッシュな学生のみなさんの創造性と至上性に溢れたアイデアの創出と実装、そしてデモンストレーション、プレゼンテーションに挑戦していただきます。 初めて会った仲間とコミュニケーションを楽しくとりながらお互いを刺激しつつ理解しあい、友達の輪を広げるチャンスにもなります。本イベントでの「経験」と「絆」は、これからの皆さんのイノベーション活動の糧となることでしょう。自身のスキルを試したい、新しい技術を身に付けたい、プログラミングが好き、興味をもっているデジタル技術がある皆さんからの応募をお待ちしております。 今回のテーマは \"イベントの新しい楽しみ方をデザインしよう\" です。コロナ禍での行動制限が解除されたことで、これまで中止となっていたイベントが復活したり、制限されていた声出しが可能となりました。 一方でコロナ禍を経たことで、オンラインでのコミュニケーションやイベント開催も定着をしました。 そんな今、ワクワクするイベントの「新しい楽しみ方」をテクノロジーの力を使って実現していただきます。 KDDIは、ユーザーの目線に立ち価値ある物を素早く提供できるように、アイデアや仮説の具体化から検証・改善までのプロセスを繰り返す「リーンスタートアップ、アジャイル開発」を導入しております。今回のハッカソンは、実際にサービスを開発しているメンバーがチューターとしてフォローする予定でおります。ぜひこの機会に多くの事を得ていただければと思いますので、気軽にご応募ください。",
		endTime: "7/9 18:00",
		location: "オンライン",
		photoURI: "https://firebasestorage.googleapis.com/v0/b/tactile-acrobat-392115.appspot.com/o/eventPhotos%2FScreenshot%202023-07-08%20at%2010.37.43%20AM.png?alt=media&token=b701e690-5732-4d0b-a20e-4b7b28656d6f",
		startTime: "7/8 9:00",
		title: "KDDI Hackathon",
		type: "tech",
		userId: "0x82BD5fD0F73bA74f335917991519b151f7eD6E02",
		userName: "KDDI Inovation Makers"
	}

	const eventsCollectionRef = collection(db, "comments");

    const getCommentList = async () => {
        try { 
            const data = await getDocs(eventsCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(), 
            }));
            setCommentList(filteredData)
        } catch (err) {
            console.error(err)
        }
    };
    useEffect(() => {
        getCommentList();
    }, []);

	console.log(commentList);

	return (
		<div>
			<h1>{event.title}</h1>
			<img src="https://redlistimages.s3.ap-northeast-1.amazonaws.com/image1.png"/>
			<p>{event.details}</p>
			<br />
			<br />
			<div>
				<h2>みんなの感想</h2>
				{commentList.map((comment) => {
					return (
						<div>
							<br />
							<p>ニックネーム：{comment.formData.nickname}</p>
							<p>{comment.formData.comment}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default EventDetail;