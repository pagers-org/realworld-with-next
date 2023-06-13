import Head from 'next/head';
import { withAuth } from '@/hoc';
import { ArticleList } from '@/templates/article';
import { Banner, TabList, Tags } from '@/templates/home';

type HomePageProps = {
  favorite: string;
  follow: string;
  tag: string;
  pid: string;
};

const HomePage = (props: HomePageProps) => (
  <>
    <Head>
      <title>HOME | NEXT REAL-WORLD</title>
      <meta
        name="description"
        content="Next.js + SWR codebase containing realworld examples (CRUD, auth, advanced patterns, etc) that adheres to the realworld spec and API"
      />
    </Head>
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <TabList tag={props.tag} />
            </div>
            <ArticleList {...props} />
          </div>
          <div className="col-md-9">
            <div className="sidebar">
              <p>Popular Tags</p>
              <Tags />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default HomePage;

export const getServerSideProps = withAuth(async ({ query, initialZustandState }) => ({
  props: {
    favorite: query.favorite ?? '',
    follow: query.follow ?? '',
    tag: query.tag ?? '',
    pid: query.pid ?? '',
    initialZustandState,
  },
}));
