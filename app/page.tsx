import Image from "next/image";
import { getSortedPostsData } from '../lib/posts';

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData
//     }
//   };
// }

export default async function Home() {
  const allPostsData = await getSortedPostsData();

  return (
    <ul>
      {allPostsData.map(({ id, date, title }) => (
        <li key={id}>
          {date}
          {title}
          {/* <br /> */}
          {/* {id} */}
          {/* <br /> */}
          <br/>
        </li>
      ))}
    </ul>
  );
}
