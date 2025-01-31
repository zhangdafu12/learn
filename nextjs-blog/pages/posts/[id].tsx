import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'

interface PostProps{
    postData: {
        title: string
        date: string
        contentHtml: string
        id:string
      }
}
export default function Post({ postData }:PostProps) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            {postData.title}
            <br />
            {postData.id}
            <br />
            {postData.date}
            <br />
            <Date dateString={postData.date} />
            <br />
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    )
}

export const getStaticPaths:GetStaticPaths= async ()=> {
    // ?获取id
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps:GetStaticProps= async  ({ params })=> {
    // ?传入id参数
    const postData = await getPostData(params.id as string)
    return {
        props: {
            postData
        }
    }
}