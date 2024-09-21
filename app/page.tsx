import Image from "next/image";
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData:any = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  };
}

export default function Home({ allPostsData:any }) {
  return (
    <ul>
      {allPostsData.map(({ id, date, title }) => (
        <li key={id}>
          {title}
          <br />
          {id}
          <br />
          {date}
        </li>
      ))}
    </ul>
  );
}
