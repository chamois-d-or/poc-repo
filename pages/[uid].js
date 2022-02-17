
// pages/[uid].js
import Head from 'next/head'
import SliceZone from 'next-slicezone'
import { Client } from '../utils/prismicHelpers'
import Prismic from '@prismicio/client'

import React from 'react'
import { useRouter } from 'next/router'

// Custom components
import Loader from '../components/Loader'
import Custom404 from './404'

// Preview hook
import useUpdatePreviewRef from '../utils/useUpdatePreviewRef'

//Slices
import * as Slices from '../slices'
const resolver = ({ sliceName }) => Slices[sliceName];

export default function Page({ id, previewRef, slices }) {
  const router = useRouter()
  if (router.isFallback) {
    return <Loader />
  }
  
  if (!id) {
    return <Custom404 />
  }

  useUpdatePreviewRef(previewRef, id)

  return (
    <div>
      <Head>
        <title>Prismic PoC</title>
      </Head>
      <SliceZone slices={slices} resolver={resolver}/>
    </div>
  )
}

export async function getStaticProps({params, previewData }) {
  const previewRef = previewData ? previewData.ref : null
  const refOption = previewRef ? { ref: previewRef } : null

  const document = await Client().getByUID('page',params.uid, refOption)
  if(!document){
    return{
      notFound :true
    }
  }
  return {
    props: {
      previewRef,
      id : document.id,
      slices : document.data.slices || [],
    },
  }
}

export async function getStaticPaths() {
  const documents = await Client().query(Prismic.Predicates.at('document.type', 'page'))

  return {
    paths: documents.results.map(doc => `/${doc.uid}`),
    fallback: true,
  }
}