import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'


/* to get the post data and return it as props */
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export default function Post({ postData }) {
    return (
      <Layout>
          <Head>
              <title>{postData.title}</title>
          </Head>
          <article>
          <h1 className={utilStyles.headingXL}>{postData.title}</h1>
           <div className={utilStyles.lightText}><Date dateString={postData.date} /></div>
            <br />
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          </article>
        </Layout>
    )
  }

  /* paths contains the array of known paths returned by getAllPostIds(), which include the params defined by pages/posts/[id].js */
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    /* If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page. */
    fallback: false
  }
}